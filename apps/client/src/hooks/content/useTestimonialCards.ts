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

// Static fallback shown whenever the backend has no testimonials yet (or is unreachable).
const MOCK_TESTIMONIALS: TestimonialCard[] = [
  {
    title: "Rock-Solid Every Time",
    name: "Nathaniel Bassey",
    role: "Gospel Artist, Nigeria",
    text: "Joe's timing and feel on bass anchor every band he plays with. He's one of the most dependable musicians I've worked with on stage and in the studio.",
    avatar: fallbackAvatars[0],
    stars: 5,
  },
  {
    title: "A True Music Director",
    name: "Diana Hamilton",
    role: "Gospel Artist, Ghana",
    text: "Beyond his bass playing, Joe understands arrangement and direction. He brings structure and creativity to every production he's part of.",
    avatar: fallbackAvatars[1],
    stars: 5,
  },
  {
    title: "Professional to the Core",
    name: "Cwesi Oteng",
    role: "Gospel Artist, Ghana",
    text: "Joe shows up prepared, plays with excellence, and elevates everyone around him. A pleasure to work with, every single time.",
    avatar: fallbackAvatars[2],
    stars: 5,
  },
];

export function useTestimonialCards() {
  const query = useTestimonials();

  const cards: TestimonialCard[] = query.data?.length
    ? query.data.map((item, index) => ({
        title: item.title || "Testimonial",
        name: item.name,
        role: item.role || "Client",
        text: item.text,
        avatar: item.avatarUrl || fallbackAvatars[index % fallbackAvatars.length],
        stars: item.rating ?? 5,
      }))
    : MOCK_TESTIMONIALS;

  return {
    ...query,
    cards,
  };
}
