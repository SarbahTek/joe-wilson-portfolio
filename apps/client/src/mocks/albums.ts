import img1 from "@/assets/music/6aa8044f870f06ff0b5b3ccb5db3a23c.jpg";
import img2 from "@/assets/music/albumcoverphoto1.jpg";
import img3 from "@/assets/music/albumcoverphoto2.jpg";
import img4 from "@/assets/music/albumcoverphoto3.jpg";
import img5 from "@/assets/music/albumcoverphoto4.jpg";
import img6 from "@/assets/music/albumcoverphoto5.jpg";

export interface Track {
  id: string;
  title: string;
  duration: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  coverImage: string;
  tracks: Track[];
}

export const albums: Album[] = [
  {
    id: "saying-things",
    title: "Saying Things",
    artist: "Edit Philips",
    year: "2021",
    description: "Saying Things is a deeply personal album that blends contemporary jazz with soulful bass lines and introspective lyrics. Recorded over six months in New York, this album captures the raw emotion of human connection and the power of musical storytelling.",
    coverImage: img1,
    tracks: [
      { id: "hello", title: "Hello", duration: "3:42" },
      { id: "saying-things-track", title: "Saying Things", duration: "4:15" },
      { id: "field-of-joy-track", title: "Field of Joy", duration: "3:58" },
      { id: "all-the-same-track", title: "All The Same", duration: "5:02" },
    ],
  },
  {
    id: "field-of-joy",
    title: "Field of Joy",
    artist: "Kristi Simon",
    year: "2020",
    description: "Field of Joy is an electrifying fusion of jazz and electronic music, featuring intricate bass work and hypnotic rhythms that transport listeners to another dimension.",
    coverImage: img2,
    tracks: [
      { id: "opening", title: "Opening", duration: "2:30" },
      { id: "field-main", title: "Field of Joy", duration: "4:45" },
      { id: "sunrise", title: "Sunrise", duration: "3:22" },
      { id: "echo", title: "Echo", duration: "4:10" },
    ],
  },
  {
    id: "all-the-same",
    title: "All The Same",
    artist: "Kristi Simon",
    year: "2020",
    description: "All The Same explores themes of unity and diversity through a rich tapestry of bass-driven grooves and melodic compositions that challenge conventional music boundaries.",
    coverImage: img3,
    tracks: [
      { id: "intro-ats", title: "Intro", duration: "1:45" },
      { id: "same-old", title: "Same Old", duration: "3:55" },
      { id: "different", title: "Different", duration: "4:20" },
      { id: "unity", title: "Unity", duration: "5:15" },
    ],
  },
  {
    id: "before-we-met",
    title: "Before We Met",
    artist: "Kristi Simon",
    year: "2019",
    description: "Before We Met is a nostalgic journey through memories and emotions, featuring lush arrangements and heartfelt bass performances that resonate deeply with listeners.",
    coverImage: img4,
    tracks: [
      { id: "memories", title: "Memories", duration: "4:02" },
      { id: "before-main", title: "Before We Met", duration: "3:48" },
      { id: "yesterday", title: "Yesterday", duration: "4:30" },
      { id: "goodbye", title: "Goodbye", duration: "3:15" },
    ],
  },
  {
    id: "november-birdie",
    title: "November Birdie",
    artist: "Kristi Simon",
    year: "2019",
    description: "November Birdie captures the melancholic beauty of autumn through experimental bass compositions and ambient soundscapes that paint vivid sonic landscapes.",
    coverImage: img5,
    tracks: [
      { id: "november-intro", title: "November", duration: "3:10" },
      { id: "birdie", title: "Birdie", duration: "4:55" },
      { id: "autumn-leaves", title: "Autumn Leaves", duration: "3:40" },
      { id: "winter-coming", title: "Winter Coming", duration: "5:20" },
    ],
  },
  {
    id: "a-simpler-time",
    title: "A Simpler Time",
    artist: "Kristi Simon",
    year: "2018",
    description: "A Simpler Time is a reflective album that strips back the complexity of modern music to reveal the pure, unfiltered beauty of bass guitar and minimalist arrangements.",
    coverImage: img6,
    tracks: [
      { id: "simpler-intro", title: "Simpler Days", duration: "3:25" },
      { id: "back-then", title: "Back Then", duration: "4:08" },
      { id: "nostalgia", title: "Nostalgia", duration: "3:52" },
      { id: "peace", title: "Peace", duration: "4:45" },
    ],
  },
];
