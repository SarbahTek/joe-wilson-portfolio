import mc1 from "@/assets/masterclass/pocketngroove.png";
import mc2 from "@/assets/masterclass/isthisforyou1.png";
import mc3 from "@/assets/masterclass/isthisforyou2.jpg";
import media1 from "@/assets/media/photos1.jpg";
import media2 from "@/assets/media/photos2.jpg";
import media3 from "@/assets/media/photos3.jpg";
import media4 from "@/assets/media/photos4.jpg";
import media5 from "@/assets/media/photos5.jpg";
import media6 from "@/assets/media/photos6.jpg";

export interface Session {
  id: string;
  sessionNumber: number;
  title: string;
  description: string;
  status: "completed" | "live" | "upcoming";
}

export interface Resource {
  id: string;
  title: string;
  fileSize: string;
  type: "pdf" | "video" | "audio";
}

export interface Cohort {
  id: string;
  title: string;
  description: string;
  image: string;
  bannerImage?: string;
  status: "ACTIVE" | "COMPLETED";
  sessions: number;
  endDate: string;
  sessionList?: Session[];
  resourceList?: Resource[];
}

const mockSessions: Session[] = [
  {
    id: "s1",
    sessionNumber: 1,
    title: "The Architecture of Rhythm",
    description: "A deep dive into subdivisions, internal clock development, and the physics of living ahead.",
    status: "completed",
  },
  {
    id: "s2",
    sessionNumber: 2,
    title: "Pocket & Timing Fundamentals",
    description: "Mastering the 'push and pull' of professional rhythm sections. Live interaction with Isaiah Sharkey's rhythat feels.",
    status: "live",
  },
  {
    id: "s3",
    sessionNumber: 3,
    title: "Harmonic Foundations & Gospel Substitutions",
    description: "Advanced harmonic vocabulary built upon and movement theory for contemporary church music.",
    status: "upcoming",
  },
  {
    id: "s4",
    sessionNumber: 4,
    title: "Slap Technique & Tone Shaping",
    description: "Developing a signature slap tone and exploring the full dynamic range of the bass.",
    status: "upcoming",
  },
  {
    id: "s5",
    sessionNumber: 5,
    title: "Walking Bass Lines in Jazz Contexts",
    description: "Building strong harmonic awareness through walking bass lines across standard chord progressions.",
    status: "upcoming",
  },
];

const mockResources: Resource[] = [
  { id: "r1", title: "Groove Charts.pdf", fileSize: "PDF • 4.2 MB", type: "pdf" },
  { id: "r2", title: "Backing Tracks.zip", fileSize: "ZIP • 58.1 MB", type: "audio" },
  { id: "r3", title: "Session Notes.pdf", fileSize: "PDF • 1.3 MB", type: "pdf" },
  { id: "r4", title: "Chord Voicings.pdf", fileSize: "PDF • 2.8 MB", type: "pdf" },
];

export const cohorts: Cohort[] = [
  {
    id: "1",
    title: "Advanced Sound Design",
    description:
      "Bibendum enim facilisis gravida neque convallis a cras semper auctor. Mauris vitae ultricies leo integer malesuada nunc vel. Purus sit amet luctus venenatis lectus. Blandit massa enim nec dui nunc mattis enim ut tellus.",
    image: media1,
    bannerImage: mc1,
    status: "ACTIVE",
    sessions: 12,
    endDate: "MAY 15",
    sessionList: mockSessions,
    resourceList: mockResources,
  },
  {
    id: "2",
    title: "Modern Jazz Theory",
    description:
      "Bibendum enim facilisis gravida neque convallis a cras semper auctor. Mauris vitae ultricies leo integer malesuada nunc vel. Purus sit amet luctus venenatis lectus.",
    image: media2,
    bannerImage: mc2,
    status: "ACTIVE",
    sessions: 12,
    endDate: "MAY 15",
    sessionList: mockSessions,
    resourceList: mockResources,
  },
  {
    id: "3",
    title: "Scoring For Film",
    description:
      "Bibendum enim facilisis gravida neque convallis a cras semper auctor. Mauris vitae ultricies leo integer malesuada nunc vel.",
    image: media3,
    bannerImage: mc3,
    status: "ACTIVE",
    sessions: 12,
    endDate: "MAY 15",
    sessionList: mockSessions,
    resourceList: mockResources,
  },
  {
    id: "4",
    title: "Vocal Performance",
    description:
      "Bibendum enim facilisis gravida neque convallis a cras semper auctor. Mauris vitae ultricies leo integer malesuada nunc vel.",
    image: media4,
    bannerImage: media5,
    status: "COMPLETED",
    sessions: 12,
    endDate: "MAY 15",
    sessionList: mockSessions,
    resourceList: mockResources,
  },
  {
    id: "5",
    title: "Bass Mastery",
    description:
      "Bibendum enim facilisis gravida neque convallis a cras semper auctor. Mauris vitae ultricies leo integer malesuada nunc vel.",
    image: media5,
    bannerImage: mc1,
    status: "COMPLETED",
    sessions: 12,
    endDate: "MAY 15",
    sessionList: mockSessions,
    resourceList: mockResources,
  },
  {
    id: "6",
    title: "Advanced Sound Design II",
    description:
      "Bibendum enim facilisis gravida neque convallis a cras semper auctor. Mauris vitae ultricies leo integer malesuada nunc vel.",
    image: media6,
    bannerImage: mc2,
    status: "COMPLETED",
    sessions: 12,
    endDate: "MAY 15",
    sessionList: mockSessions,
    resourceList: mockResources,
  },
];
