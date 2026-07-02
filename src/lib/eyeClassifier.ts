import { EyeGesture, Point } from "@/types";

const LEFT_EYE_CORNERS = [33, 133];
const RIGHT_EYE_CORNERS = [362, 263];
const LEFT_EYE_TOP_BOTTOM = [159, 145];
const RIGHT_EYE_TOP_BOTTOM = [386, 374];
const LEFT_IRIS = 468;
const RIGHT_IRIS = 473;
const UPPER_LIP = 13;
const LOWER_LIP = 14;
const NOSE_BRIDGE = 168;
const CHIN = 152;

function dist(a: Point, b: Point): number {
 return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

let blinkHysteresisActive = false;

function eyeAspectRatio(landmarks: Point[], cornerL: number, cornerR: number, top: number, bottom: number): number {
 const eyeWidth = dist(landmarks[cornerL], landmarks[cornerR]);
 const eyeHeight = dist(landmarks[top], landmarks[bottom]);
 if (eyeWidth < 1e-6) return 1;
 return eyeHeight / eyeWidth;
}

function irisOffset(landmarks: Point[], cornerL: number, cornerR: number, iris: number): { x: number; y: number } {
 const eyeCenter = {
   x: (landmarks[cornerL].x + landmarks[cornerR].x) / 2,
   y: (landmarks[cornerL].y + landmarks[cornerR].y) / 2,
 };
 const eyeWidth = dist(landmarks[cornerL], landmarks[cornerR]);
 if (eyeWidth < 1e-6) return { x: 0, y: 0 };
 return {
   x: (landmarks[iris].x - eyeCenter.x) / eyeWidth,
   y: (landmarks[iris].y - eyeCenter.y) / eyeWidth,
 };
}

function mouthOpenness(landmarks: Point[]): number {
  const lipGap = dist(landmarks[UPPER_LIP], landmarks[LOWER_LIP]);
  const faceHeight = dist(landmarks[NOSE_BRIDGE], landmarks[CHIN]);
  if (faceHeight < 1e-6) return 0;
  return lipGap / faceHeight;
}

export type EyeClassifierResult = {
 gesture: EyeGesture;
 confidence: number;
 isBlinking: boolean;
};

export function classifyEyeGesture(
 faceLandmarks: Point[]
): EyeClassifierResult | null {
 if (!faceLandmarks || faceLandmarks.length < 478) return null;

 const leftEAR = eyeAspectRatio(
   faceLandmarks,
   LEFT_EYE_CORNERS[0], LEFT_EYE_CORNERS[1],
   LEFT_EYE_TOP_BOTTOM[0], LEFT_EYE_TOP_BOTTOM[1]
 );
 const rightEAR = eyeAspectRatio(
   faceLandmarks,
   RIGHT_EYE_CORNERS[0], RIGHT_EYE_CORNERS[1],
   RIGHT_EYE_TOP_BOTTOM[0], RIGHT_EYE_TOP_BOTTOM[1]
 );
 const avgEAR = (leftEAR + rightEAR) / 2;

 const leftIrisOff = irisOffset(faceLandmarks, LEFT_EYE_CORNERS[0], LEFT_EYE_CORNERS[1], LEFT_IRIS);
 const rightIrisOff = irisOffset(faceLandmarks, RIGHT_EYE_CORNERS[0], RIGHT_EYE_CORNERS[1], RIGHT_IRIS);
  const avgIrisX = (leftIrisOff.x + rightIrisOff.x) / 2;

  const BLINK_CLOSE = 0.22;
  const BLINK_OPEN = 0.28;
  const GAZE_X_THRESHOLD = 0.05;
  const MOUTH_OPEN_THRESHOLD = 0.08;

  const isBlinking = blinkHysteresisActive ? avgEAR < BLINK_OPEN : avgEAR < BLINK_CLOSE;
  blinkHysteresisActive = isBlinking;

  if (isBlinking) {
    return { gesture: null, confidence: 0, isBlinking: true };
  }

  if (avgIrisX < -GAZE_X_THRESHOLD) {
    const confidence = Math.min(1, Math.abs(avgIrisX) * 10);
    return { gesture: "YES", confidence, isBlinking: false };
  }
  if (avgIrisX > GAZE_X_THRESHOLD) {
    const confidence = Math.min(1, avgIrisX * 10);
    return { gesture: "NO", confidence, isBlinking: false };
  }

  const mouthOpen = mouthOpenness(faceLandmarks);
  if (mouthOpen > MOUTH_OPEN_THRESHOLD) {
    const confidence = Math.min(1, Math.max(0, mouthOpen - 0.08) * 12);
    return { gesture: "WATER", confidence, isBlinking: false };
  }

  return { gesture: null, confidence: 0, isBlinking: false };
}

export class EyeGestureSmoother {
  private gazeBuffer: EyeClassifierResult[] = [];
  private blinkStartTime = 0;
  private blinkCount = 0;
  private lastBlinkEndTime = 0;
  private stableGesture: EyeGesture = null;
  private stableConf = 0;
  private helpCooldownUntil = 0;

  private readonly DOUBLE_BLINK_WINDOW = 700;
  private readonly SMOOTHING_FRAMES = 12;
  private readonly HOLD_TIME_MS = 800;
  private readonly HELP_COOLDOWN_MS = 2000;
  private gazeStartTime = 0;

 private adjustedConfidence(): { gesture: EyeGesture; confidence: number } {
   const holdTime = Date.now() - this.gazeStartTime;
   const holdMultiplier = Math.min(1, holdTime / this.HOLD_TIME_MS);
   return { gesture: this.stableGesture, confidence: Math.min(this.stableConf * holdMultiplier, 1) };
 }

 push(result: EyeClassifierResult | null): { gesture: EyeGesture; confidence: number } {
   const now = Date.now();

   if (!result) {
     return this.adjustedConfidence();
   }

   if (result.isBlinking) {
     if (this.blinkStartTime === 0) this.blinkStartTime = now;
     return this.adjustedConfidence();
   }

    if (this.blinkStartTime > 0) {
      this.blinkStartTime = 0;

      if (now < this.helpCooldownUntil) {
        return this.adjustedConfidence();
      }

      if (this.lastBlinkEndTime > 0 && now - this.lastBlinkEndTime < this.DOUBLE_BLINK_WINDOW) {
        this.blinkCount++;
      } else {
        this.blinkCount = 1;
      }
      this.lastBlinkEndTime = now;

      if (this.blinkCount >= 2) {
        this.stableGesture = "HELP";
        this.stableConf = 0.85;
        this.gazeStartTime = now;
        this.helpCooldownUntil = now + this.HELP_COOLDOWN_MS;
        this.blinkCount = 0;
        this.gazeBuffer = [];
        return this.adjustedConfidence();
      }
    }

   {
     this.gazeBuffer.push(result ?? { gesture: null, confidence: 0, isBlinking: false });
     if (this.gazeBuffer.length > this.SMOOTHING_FRAMES) this.gazeBuffer.shift();

     const counts = new Map<string, { count: number; confs: number[] }>();
     for (const item of this.gazeBuffer) {
       const key = item.gesture ?? "__none__";
       if (!counts.has(key)) counts.set(key, { count: 0, confs: [] });
       const entry = counts.get(key)!;
       entry.count++;
       entry.confs.push(item.confidence);
     }

     let bestKey = "__none__";
     let bestCount = 0;
     for (const [key, val] of counts) {
       if (val.count > bestCount) {
         bestCount = val.count;
         bestKey = key;
       }
     }

     if (bestCount >= Math.ceil(this.SMOOTHING_FRAMES * 0.75)) {
       const entry = counts.get(bestKey)!;
       const newGesture = bestKey === "__none__" ? null : (bestKey as EyeGesture);
       const newConf = entry.confs.reduce((a, b) => a + b, 0) / entry.confs.length;

       if (newGesture !== this.stableGesture) {
         this.gazeStartTime = now;
       }

       this.stableGesture = newGesture;
       this.stableConf = newConf;
     }
   }

   return this.adjustedConfidence();
 }

  reset() {
    this.gazeBuffer = [];
    this.blinkStartTime = 0;
    this.blinkCount = 0;
    this.lastBlinkEndTime = 0;
    this.stableGesture = null;
    this.stableConf = 0;
    this.gazeStartTime = 0;
    this.helpCooldownUntil = 0;
  }
}
