import { useState } from "react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden">
      <img
        src="https://storage.readdy-site.link/project_files/c0c1db3d-22db-46b5-85e9-428db5f1168e/b3d923cc-beb8-4218-a43a-a21fc5c2797d_7c507e8d2c983df9651f5bed267c84d209e005e6.jpg?v=b1fdb56e4aa0dd0ed24acdee5767e872"
        alt="Video Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 flex items-center justify-center h-full">
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full border-4 border-white bg-white/10 hover:bg-white/25 transition-all cursor-pointer group"
          >
            <i className="ri-play-fill text-white text-3xl sm:text-4xl ml-1" />
          </button>
        ) : (
          <div className="w-full max-w-xs sm:max-w-xl md:max-w-3xl aspect-video px-4">
            <iframe
              className="w-full h-full rounded"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Joseph Wilson Performance"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
