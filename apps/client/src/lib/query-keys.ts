export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  masterclasses: {
    all: ["masterclasses"] as const,
    detail: (id: string) => ["masterclasses", id] as const,
    sessions: (id: string) => ["masterclasses", id, "sessions"] as const,
  },
  enrollments: {
    my: ["enrollments", "my"] as const,
  },
  sessions: {
    detail: (id: string) => ["sessions", id] as const,
  },
  payments: {
    my: ["payments", "my"] as const,
  },
  testimonials: {
    all: ["testimonials"] as const,
  },
  events: {
    all: ["events"] as const,
  },
  settings: {
    public: ["settings", "public"] as const,
  },
  services: {
    all: ["services"] as const,
    bySlug: (slug: string) => ["services", slug] as const,
  },
};
