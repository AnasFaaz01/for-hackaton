import { GestureLogEntry, GestureType } from "@/types";

const STORAGE_KEY = "carespeak_gesture_log";
const MAX_ENTRIES = 200;
const BC_CHANNEL_NAME = "carespeak_bystander";

let broadcastChannel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
 if (typeof window === "undefined") return null;
 if (!broadcastChannel) {
   try {
     broadcastChannel = new BroadcastChannel(BC_CHANNEL_NAME);
   } catch {
     return null;
   }
 }
 return broadcastChannel;
}

export function loadGestureLog(): GestureLogEntry[] {
 if (typeof window === "undefined") return [];
 try {
   const stored = localStorage.getItem(STORAGE_KEY);
   return stored ? JSON.parse(stored) : [];
 } catch {
   return [];
 }
}

export function addGestureLog(
 gesture: string,
 description: string,
 confidence: number,
 type: GestureType,
 language = "en-US"
): GestureLogEntry {
 const entry: GestureLogEntry = {
   id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
   gesture,
   description,
   confidence,
   type,
   timestamp: Date.now(),
   language,
 };

 const log = loadGestureLog();
 log.unshift(entry);
 if (log.length > MAX_ENTRIES) log.length = MAX_ENTRIES;
 try {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
 } catch {}

 const channel = getChannel();
 if (channel) {
   try {
     channel.postMessage({ type: "new_gesture", entry });
   } catch {}
 }

 return entry;
}

export function clearGestureLog(): void {
 if (typeof window === "undefined") return;
 localStorage.removeItem(STORAGE_KEY);
 const channel = getChannel();
 if (channel) {
   try {
     channel.postMessage({ type: "clear" });
   } catch {}
 }
}

export function subscribeToGestureUpdates(
 onGesture: (entry: GestureLogEntry) => void,
 onClear?: () => void
): () => void {
 const channel = getChannel();
 if (!channel) return () => {};

 const handler = (event: MessageEvent) => {
   const data = event.data;
   if (data?.type === "new_gesture" && data.entry) {
     onGesture(data.entry as GestureLogEntry);
   } else if (data?.type === "clear" && onClear) {
     onClear();
   }
 };

 channel.addEventListener("message", handler);
 return () => channel.removeEventListener("message", handler);
}

export function getLatestGesture(): GestureLogEntry | null {
 const log = loadGestureLog();
 return log.length > 0 ? log[0] : null;
}
