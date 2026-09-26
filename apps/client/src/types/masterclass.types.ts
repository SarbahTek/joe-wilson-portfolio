export type MasterclassStatus = "draft" | "upcoming" | "active" | "completed";

export type SessionStatus = "upcoming" | "live" | "completed";

export interface Masterclass {
  priceCents: number;
  coverImageUrl?: string | null;
  sessionsCount?: number;
  isPublished?: boolean;
  id: string;
  title: string;
  description: string;
  slug?: string;
  status: MasterclassStatus;
  imageUrl?: string | null;
  bannerUrl?: string | null;
  price?: number;
  currency?: string;
  sessionCount?: number;
  endsAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  muxPlaybackId?: string | null;
  liveStreamUrl?: string | null;
  id: string;
  masterclassId: string;
  title: string;
  description?: string;
  orderIndex: number;
  status: SessionStatus;
  durationSeconds?: number;
  scheduledAt?: string | null;
  videoUrl?: string | null;
  createdAt?: string;
}

export interface SessionProgress {
  lastWatchedSeconds?: number;
  sessionId: string;
  watchedSeconds: number;
  completed: boolean;
  lastWatchedAt?: string;
}

export interface SessionDetail extends Session {
  muxSignedToken?: string | null;
  playbackUrl?: string | null;
  progress?: SessionProgress | null;
}

export interface UpdateProgressInput {
  watchedSeconds: number;
  completed?: boolean;
}

export interface Enrollment {
  progressPct?: number;
  id: string;
  userId: string;
  masterclassId: string;
  progressPercent?: number;
  enrolledAt: string;
  masterclass?: Masterclass;
}

export interface MasterclassWithSessions extends Masterclass {
  sessions?: Session[];
  progress?: SessionProgress[];
  enrollment?: Enrollment | null;
}
