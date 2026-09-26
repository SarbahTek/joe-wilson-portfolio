import { lazy, Suspense, useRef } from "react";
const MuxPlayer = lazy(() => import("@mux/mux-player-react"));

interface Props {
  playbackId: string;
  token?: string | null;
  title: string;
  startTime: number;
  completed?: boolean;
  onProgress: (seconds: number, completed?: boolean) => void;
}

export default function LessonPlayer({ playbackId, token, title, startTime, completed, onProgress }: Props) {
  const initialTime = useRef(startTime);
  const lastSavedAt = useRef(0);
  function save(event: Event, force = false, ended = false) {
    const player = event.target as HTMLVideoElement;
    const now = Date.now();
    if (!Number.isFinite(player.currentTime) || (!force && now - lastSavedAt.current < 15000)) return;
    lastSavedAt.current = now;
    onProgress(Math.floor(player.currentTime), ended || completed ? true : undefined);
  }
  return (
    <Suspense fallback={<p className="text-white p-6">Loading player...</p>}>
      <MuxPlayer
        playbackId={playbackId}
        tokens={token ? { playback: token } : undefined}
        videoTitle={title}
        startTime={initialTime.current}
        className="w-full h-full"
        onTimeUpdate={event => save(event)}
        onPause={event => save(event, true)}
        onEnded={event => save(event, true, true)}
      />
    </Suspense>
  );
}
