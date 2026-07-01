"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { classifyEyeGesture, EyeGestureSmoother } from "@/lib/eyeClassifier";
import { voiceAlert } from "@/lib/tts";
import { addGestureLog } from "@/lib/gestureLog";
import { EyeGesture, EYE_GESTURE_MAP } from "@/types";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm";
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task";

export function useEyeGesture() {
 const videoRef = useRef<HTMLVideoElement>(null);
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const landmarkerRef = useRef<FaceLandmarker | null>(null);
 const animRef = useRef<number>(0);
 const streamRef = useRef<MediaStream | null>(null);
 const smootherRef = useRef(new EyeGestureSmoother());
 const lastLoggedGesture = useRef<string | null>(null);
 const restState = useRef({ transitions: 0, windowStart: 0, cooldownUntil: 0 });

 function getEffectiveThreshold(): number {
   if (Date.now() < restState.current.cooldownUntil) return 0.85;
   return 0.7;
 }

 const [gesture, setGesture] = useState<EyeGesture>(null);
 const [confidence, setConfidence] = useState(0);
 const [fps, setFps] = useState(0);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [cameraOn, setCameraOn] = useState(false);
 const [faceDetected, setFaceDetected] = useState(false);

 const init = useCallback(async () => {
   try {
     setLoading(true);
     const wasm = await FilesetResolver.forVisionTasks(WASM_URL);
     const landmarker = await FaceLandmarker.createFromOptions(wasm, {
       baseOptions: { modelAssetPath: MODEL_URL },
       runningMode: "VIDEO",
       outputFaceBlendshapes: true,
       minFaceDetectionConfidence: 0.5,
       minTrackingConfidence: 0.5,
     });
     landmarkerRef.current = landmarker;
     setLoading(false);
   } catch {
     setError("Failed to load face tracking model. Please ensure you have a stable internet connection.");
     setLoading(false);
   }
 }, []);

 const startCamera = useCallback(async () => {
   try {
     const stream = await navigator.mediaDevices.getUserMedia({
       video: { width: 640, height: 480, facingMode: "user" },
     });
     if (videoRef.current) {
       videoRef.current.srcObject = stream;
       streamRef.current = stream;
       await videoRef.current.play();
       setCameraOn(true);
       processFrames();
     }
   } catch {
     setError("Camera access denied. Please allow camera permission in your browser settings.");
   }
 }, []);

 const stopCamera = useCallback(() => {
   if (animRef.current) cancelAnimationFrame(animRef.current);
   if (streamRef.current) {
     streamRef.current.getTracks().forEach((t) => t.stop());
     streamRef.current = null;
   }
   setCameraOn(false);
   setGesture(null);
   setConfidence(0);
   setFaceDetected(false);
   smootherRef.current.reset();
   lastLoggedGesture.current = null;
 }, []);

 const processFrames = useCallback(() => {
   if (!videoRef.current || !landmarkerRef.current) return;
   const video = videoRef.current;
   if (video.readyState < 2) {
     animRef.current = requestAnimationFrame(processFrames);
     return;
   }

   const now = performance.now();
   const result = landmarkerRef.current.detectForVideo(video, now);

   const hasFace = result.faceLandmarks && result.faceLandmarks.length > 0;
   setFaceDetected(!!hasFace);

   let raw = null;
   if (hasFace) {
     const faceLm = result.faceLandmarks[0].map((lm) => ({ x: lm.x, y: lm.y, z: lm.z ?? 0 }));
     raw = classifyEyeGesture(faceLm);
   }

   const smoothed = smootherRef.current.push(raw);
   setGesture(smoothed.gesture);
   setConfidence(smoothed.confidence);

   const threshold = getEffectiveThreshold();
   if (smoothed.gesture && smoothed.confidence > threshold) {
     const entry = EYE_GESTURE_MAP[smoothed.gesture];
     if (entry) {
       voiceAlert.speak(smoothed.gesture, "eye");
       if (smoothed.gesture !== lastLoggedGesture.current) {
         addGestureLog(smoothed.gesture, entry.description, smoothed.confidence, "eye", voiceAlert.getLanguage());
         lastLoggedGesture.current = smoothed.gesture;
       }
     }
   }

   const rs = restState.current;
   if (smoothed.gesture && smoothed.confidence > 0.5) {
     const now = Date.now();
     if (now - rs.windowStart > 10000) {
       rs.transitions = 0;
       rs.windowStart = now;
     }
     rs.transitions++;
     if (rs.transitions >= 5) {
       rs.cooldownUntil = now + 30000;
       rs.transitions = 0;
     }
   }

   if (canvasRef.current && videoRef.current) {
     const canvas = canvasRef.current;
     const ctx = canvas.getContext("2d");
     if (ctx) {
       const w = video.videoWidth;
       const h = video.videoHeight;
       canvas.width = w;
       canvas.height = h;
       ctx.drawImage(video, 0, 0);
       if (result.faceLandmarks) {
         const faceLm = result.faceLandmarks[0];
         const eyeOutline = [33,246,161,160,159,158,157,173,133,155,154,153,145,144,163,7,33];
         const rightEyeOutline = [362,398,384,385,386,387,388,466,263,249,390,373,374,380,381,382,362];
         const leftIris = [468,469,470,471,468];
         const rightIris = [473,474,475,476,473];
         ctx.strokeStyle = "rgba(34,197,94,0.5)";
         ctx.lineWidth = 1.5;
         const drawPath = (indices: number[]) => {
           ctx.beginPath();
           ctx.moveTo(faceLm[indices[0]].x * w, faceLm[indices[0]].y * h);
           for (let i = 1; i < indices.length; i++) {
             ctx.lineTo(faceLm[indices[i]].x * w, faceLm[indices[i]].y * h);
           }
           ctx.stroke();
         };
         drawPath(eyeOutline);
         drawPath(rightEyeOutline);
         ctx.strokeStyle = "rgba(59,130,246,0.6)";
         drawPath(leftIris);
         drawPath(rightIris);

         const gazeConf = smoothed.confidence > 0.3 ? smoothed.confidence : 0.1;
         ctx.fillStyle = `rgba(34,197,94,${Math.max(0.3, gazeConf)})`;
         for (const lm of faceLm) {
           ctx.beginPath();
           ctx.arc(lm.x * w, lm.y * h, 1.5, 0, 2 * Math.PI);
           ctx.fill();
         }

         if (smoothed.gesture) {
           ctx.strokeStyle = "rgba(255,255,255,0.3)";
           ctx.lineWidth = 1;
           ctx.setLineDash([4, 4]);
           ctx.strokeRect(
             faceLm[33].x * w - 20,
             faceLm[33].y * h - 20,
             (faceLm[263].x - faceLm[33].x) * w + 40,
             (faceLm[152].y - faceLm[10].y) * h + 40
           );
           ctx.setLineDash([]);
         }
       }
     }
   }

   animRef.current = requestAnimationFrame(processFrames);
 }, []);

 useEffect(() => {
   init();
   return () => {
     stopCamera();
     if (animRef.current) cancelAnimationFrame(animRef.current);
   };
 }, []);

 return {
   videoRef,
   canvasRef,
   gesture,
   confidence,
   fps,
   loading,
   error,
   cameraOn,
   faceDetected,
   startCamera,
   stopCamera,
 };
}
