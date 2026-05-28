import client1 from "@/assets/about/client1.png";
import client2 from "@/assets/about/client2.png";
import client3 from "@/assets/about/client3.png";
import client4 from "@/assets/about/client4.png";
import client5 from "@/assets/about/client5.png";
import client6 from "@/assets/about/client6.png";
import client7 from "@/assets/about/client7.png";
import client8 from "@/assets/about/client8.png";
import client9 from "@/assets/about/client9.png";
import client10 from "@/assets/about/client10.png";

const clientLogos = [
  { name: "Client 1", src: client1 },
  { name: "Client 2", src: client2 },
  { name: "Client 3", src: client3 },
  { name: "Client 4", src: client4 },
  { name: "Client 5", src: client5 },
  { name: "Client 6", src: client6 },
  { name: "Client 7", src: client7 },
  { name: "Client 8", src: client8 },
  { name: "Client 9", src: client9 },
  { name: "Client 10", src: client10 },
];

export default function ClientsSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center font-inter font-black uppercase tracking-[0.2em] mb-12"
          style={{ fontSize: "clamp(16px,2vw,24px)", color: "#111" }}
        >
          My Clients
        </h2>

        {/* Responsive Grid Layout with individual borders and gaps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {clientLogos.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center overflow-hidden border border-gray-200"
              style={{ height: "auto", aspectRatio: "16/9" }}
            >
              <img
                src={client.src}
                alt={client.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
