import { apiClient } from "./client";
import { dataOf } from "@/lib/api";
import type { LoginResponse, User } from "@joe-wilson/shared/types/auth.types";

export interface MasterclassInput { title: string; description: string; coverImageUrl?: string; priceCents: number; status: "draft" | "upcoming" | "active" | "completed"; startsAt: string; endsAt: string; isPublished?: boolean; maxEnrollments?: number; }
export interface Masterclass extends MasterclassInput { id: string; isPublished?: boolean; sessionsCount?: number; enrollmentsCount?: number; createdAt?: string; }
export interface TestimonialInput { quote: string; authorName: string; authorOrg?: string; avatarUrl?: string; isFeatured: boolean; orderIndex: number; }
export interface Testimonial extends TestimonialInput { id: string; }
export interface MediaItem { id: string; filename: string; mimeType: string; fileType: string; sizeBytes: number; url: string; createdAt: string; }
export interface SessionInput { title: string; description?: string; orderIndex: number; status?: "upcoming" | "live" | "completed"; scheduledAt?: string; muxAssetId?: string; muxPlaybackId?: string; durationSeconds?: number; liveStreamUrl?: string; }
export interface Session extends SessionInput { id: string; }
export interface MasterclassDetail extends Masterclass { sessions?: Session[]; }
export type SettingsMap = Record<string, string>;
export interface Inquiry { id:string; senderName:string; senderEmail:string; senderPhone?:string|null; type:"general"|"booking"; subject?:string|null; message:string; status:string; adminReply?:string|null; handledAt?:string|null; createdAt:string; }
export interface Quote { id:string; clientName:string; clientEmail:string; clientPhone?:string|null; eventDate?:string|null; eventType?:string|null; budgetMinCents?:number|null; budgetMaxCents?:number|null; projectNotes?:string|null; status:string; adminNotes?:string|null; createdAt:string; }
export interface Payment { id:string; amountCents:number; currency:string; status:string; createdAt:string; refundedAt?:string|null; masterclass?:{id:string;title:string}; }
export interface ServiceInput { slug:string; title:string; tagline?:string; description?:string; coverImageUrl?:string; isPublished:boolean; orderIndex:number; }
export interface Service extends ServiceInput { id:string; }
export interface EventInput { title:string; description?:string; location?:string; eventDate:string; isPublished:boolean; }
export interface Event extends EventInput { id:string; }

export const adminApi = {
  login: (email: string, password: string) => apiClient.post<LoginResponse>("/auth/login", { email, password }).then(dataOf),
  me: () => apiClient.get<User>("/auth/me").then(dataOf),
  updateMe: (input: { firstName?: string; lastName?: string; avatarUrl?: string }) => apiClient.patch<User>("/auth/me", input).then(dataOf),
  dashboard: () => apiClient.get("/dashboard").then(dataOf),
  masterclasses: () => apiClient.get<Masterclass[]>("/admin/masterclasses").then(dataOf),
  masterclass: (id: string) => apiClient.get<MasterclassDetail>(`/masterclasses/${id}`).then(dataOf),
  createMasterclass: (input: MasterclassInput) => apiClient.post<Masterclass>("/admin/masterclasses", input).then(dataOf),
  updateMasterclass: (id: string, input: MasterclassInput) => apiClient.patch<Masterclass>(`/admin/masterclasses/${id}`, input).then(dataOf),
  deleteMasterclass: (id: string) => apiClient.delete(`/admin/masterclasses/${id}`).then(dataOf),
  createSession: (masterclassId: string, input: SessionInput) => apiClient.post<Session>(`/admin/masterclasses/${masterclassId}/sessions`, input).then(dataOf),
  updateSession: (id: string, input: SessionInput) => apiClient.patch<Session>(`/admin/masterclasses/sessions/${id}`, input).then(dataOf),
  deleteSession: (id: string) => apiClient.delete(`/admin/masterclasses/sessions/${id}`).then(dataOf),
  testimonials: () => apiClient.get<Testimonial[]>("/testimonials").then(dataOf),
  createTestimonial: (input: TestimonialInput) => apiClient.post<Testimonial>("/testimonials", input).then(dataOf),
  updateTestimonial: (id: string, input: TestimonialInput) => apiClient.patch<Testimonial>(`/testimonials/${id}`, input).then(dataOf),
  deleteTestimonial: (id: string) => apiClient.delete(`/testimonials/${id}`).then(dataOf),
  settings: () => apiClient.get<SettingsMap>("/settings").then(dataOf),
  updateSettings: (input: SettingsMap) => apiClient.patch<SettingsMap>("/settings", input).then(dataOf),
  media: () => apiClient.get<MediaItem[]>("/media").then(dataOf),
  uploadMedia: (file: File) => { const form = new FormData(); form.append("file", file); return apiClient.post<MediaItem>("/media/upload", form, { headers: { "Content-Type": "multipart/form-data" } }).then(dataOf); },
  deleteMedia: (id: string) => apiClient.delete(`/media/${id}`).then(dataOf),
  inquiries: () => apiClient.get<Inquiry[]>("/inquiries").then(dataOf),
  replyInquiry: (id:string, replyText:string) => apiClient.post<Inquiry>(`/inquiries/${id}/reply`,{replyText}).then(dataOf),
  handleInquiry: (id:string) => apiClient.patch<Inquiry>(`/inquiries/${id}/handle`).then(dataOf),
  quotes: () => apiClient.get<Quote[]>("/quotes").then(dataOf),
  updateQuote: (id:string,status:string,adminNotes?:string) => apiClient.patch<Quote>(`/quotes/${id}/status`,{status,adminNotes}).then(dataOf),
  users: (q="") => apiClient.get("/users",{params:{q,limit:100}}).then(response=>dataOf<Array<User & {createdAt?:string}>>(response)),
  user: (id:string) => apiClient.get(`/users/${id}`).then(dataOf),
  payments: () => apiClient.get<{payments:Payment[];stats:{netRevenueCents:number;refundedCents:number;failedCount:number}}>("/admin/payments",{params:{limit:100}}).then(dataOf),
  refundPayment: (id:string) => apiClient.post(`/admin/payments/${id}/refund`).then(dataOf),
  services: () => apiClient.get<Service[]>("/services").then(dataOf),
  createService: (input:ServiceInput) => apiClient.post<Service>("/services",input).then(dataOf),
  updateService: (id:string,input:ServiceInput) => apiClient.patch<Service>(`/services/${id}`,input).then(dataOf),
  deleteService: (id:string) => apiClient.delete(`/services/${id}`).then(dataOf),
  events: () => apiClient.get<Event[]>("/events").then(dataOf),
  createEvent: (input:EventInput) => apiClient.post<Event>("/events",input).then(dataOf),
  updateEvent: (id:string,input:EventInput) => apiClient.patch<Event>(`/events/${id}`,input).then(dataOf),
  deleteEvent: (id:string) => apiClient.delete(`/events/${id}`).then(dataOf),
};
