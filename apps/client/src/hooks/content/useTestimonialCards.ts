import { useTestimonials } from "./useTestimonials";

export interface TestimonialCard {
  title: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  stars: number;
}

export function useTestimonialCards() {
  const query = useTestimonials();

  const cards: TestimonialCard[] = (query.data ?? [])
      .filter(item => item.isFeatured)
      .map((item) => ({
        title: "Testimonial",
        name: item.authorName,
        role: item.authorOrg || "Client",
        text: item.quote,
        avatar: item.avatarUrl || "",
        stars: 5,
      }));

  return {
    ...query,
    cards,
  };
}
