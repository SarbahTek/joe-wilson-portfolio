export type MasterclassStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type SessionStatus = "DRAFT" | "SCHEDULED" | "LIVE" | "COMPLETED" | "ARCHIVED";

export interface Masterclass {
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
  id: string;
  masterclassId: string;
  title: string;
  description?: string;
  order: number;
  status: SessionStatus;
  durationSeconds?: number;
  scheduledAt?: string | null;
  videoUrl?: string | null;
  createdAt?: string;
}

export interface SessionProgress {
  sessionId: string;
  watchedSeconds: number;
  completed: boolean;
  lastWatchedAt?: string;
}

export interface SessionDetail extends Session {
  playbackUrl?: string | null;
  progress?: SessionProgress | null;
}

export interface UpdateProgressInput {
  watchedSeconds: number;
  completed?: boolean;
}

export interface Enrollment {
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
