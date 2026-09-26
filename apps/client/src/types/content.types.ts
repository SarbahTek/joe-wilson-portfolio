export type QuoteStatus = "NEW" | "CONTACTED" | "QUOTED" | "ACCEPTED" | "DECLINED" | "CLOSED";

export interface SubmitQuoteInput {
  fullName: string;
  email: string;
  service: string;
  eventDate?: string;
  eventType?: string;
  budgetRange?: string;
  notes?: string;
}

export interface Quote {
  id: string;
  fullName: string;
  email: string;
  service: string;
  status: QuoteStatus;
  createdAt: string;
}

export type InquiryType = "GENERAL" | "BOOKING" | "PRESS" | "OTHER";
export type InquiryStatus = "NEW" | "READ" | "REPLIED" | "CLOSED";

export interface SubmitInquiryInput {
  email: string;
  message: string;
  phone?: string;
  name: string;
  type?: InquiryType;
}

export interface Inquiry {
  id: string;
  email: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  description?: string | null;
  coverImageUrl?: string | null;
  isPublished: boolean;
  orderIndex: number;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  eventDate: string;
  isPublished: boolean;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorOrg?: string;
  isFeatured: boolean;
  orderIndex: number;
  id: string;
  avatarUrl?: string | null;
}

export type SettingsMap = Record<string, string | number | boolean | null>;
