import type { Cohort, Session as UiSession } from "@/mocks/cohorts";
import type {
  Enrollment,
  Masterclass,
  MasterclassWithSessions,
  Session,
  SessionDetail,
  SessionStatus,
} from "@/types/masterclass.types";
import heroFallback from "@/assets/home/basemasterclass2.jpg";

function mapSessionStatus(status: SessionStatus): UiSession["status"] {
  switch (status) {
    case "live":
      return "live";
    case "completed":
      return "completed";
    default:
      return "upcoming";
  }
}

export function mapSessionToUi(session: Session | SessionDetail, index: number): UiSession {
  return {
    id: session.id,
    sessionNumber: session.orderIndex != null ? session.orderIndex + 1 : index + 1,
    title: session.title,
    description: session.description ?? "",
    status: mapSessionStatus(session.status),
  };
}

function formatEndDate(endsAt?: string | null): string {
  if (!endsAt) return "";
  const date = new Date(endsAt);
  if (Number.isNaN(date.getTime())) return "";
  return date
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();
}

export function mapMasterclassToCohort(
  masterclass: Masterclass | MasterclassWithSessions,
  sessions: Session[] = [],
  enrollment?: Enrollment | null,
): Cohort {
  const progressPercent = enrollment?.progressPct ?? enrollment?.progressPercent ?? 0;
  const isActive =
    masterclass.status !== "completed" && progressPercent < 100;

  return {
    id: masterclass.id,
    title: masterclass.title,
    description: masterclass.description,
    image: masterclass.coverImageUrl || masterclass.imageUrl || heroFallback,
    bannerImage: masterclass.bannerUrl || masterclass.coverImageUrl || masterclass.imageUrl || heroFallback,
    status: isActive ? "ACTIVE" : "COMPLETED",
    sessions: masterclass.sessionsCount ?? masterclass.sessionCount ?? sessions.length,
    endDate: formatEndDate(masterclass.endsAt),
    sessionList: sessions.map(mapSessionToUi),
    resourceList: [],
  };
}

export function formatPaymentAmount(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);
}
