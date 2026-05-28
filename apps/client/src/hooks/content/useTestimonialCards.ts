import headshot1 from "@/assets/home/testimonialheadshot1.jpg";
import headshot2 from "@/assets/home/testimonialheadshot2.jpg";
import headshot3 from "@/assets/home/testimonialheadshot3.jpg";
import { useTestimonials } from "./useTestimonials";

const fallbackAvatars = [headshot1, headshot2, headshot3];

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

  const cards: TestimonialCard[] =
    query.data?.map((item, index) => ({
      title: item.title || "Testimonial",
      name: item.name,
      role: item.role || "Client",
      text: item.text,
      avatar: item.avatarUrl || fallbackAvatars[index % fallbackAvatars.length],
      stars: item.rating ?? 5,
    })) ?? [];

  return {
    ...query,
    cards,
  };
}
