const clientGroups = [
  {
    region: "🌍 Africa",
    artists: [
      "Nii Okai", "Koda", "Joe Mettle", "MOGmusic",
      "Nathaniel Bassey", "Dunsin Oyekan", "Diana Hamilton",
      "Daniel Twum", "Elder Mireku", "Daughters of Glorious Jesus",
      "Cwesi Oteng", "Siisi Baidoo", "Preye Odede",
      "Sammy Okposo", "Cecy Twum", "Mary Ghansah",
    ],
  },
  {
    region: "🇬🇧 United Kingdom",
    artists: [
      "Evans Ogboi", "Emmanuel Smith", "Lou Fellingham",
      "Noel Robinson", "Checko Ankrah", "Sarah Tiebo",
      "Shekinah", "Lydia Kabs", "Samuel Refined",
    ],
  },
  {
    region: "🇺🇸 America",
    artists: [
      "Jason Nelson", "Jonathan Nelson", "Donnie McClurkin",
      "Israel Houghton", "Todd Galberth",
    ],
  },
  {
    region: "Afrobeats / Mainstream",
    artists: [
      "Runtown", "BLAQBONES", "Victony",
      "Maleek Berry", "Sarkodie", "Edem", "Lily Atkinson",
    ],
  },
];

export default function ClientsSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center font-inter font-black uppercase tracking-[0.2em] mb-12"
          style={{ fontSize: "clamp(16px,2vw,24px)", color: "#111" }}
        >
          Artists I&apos;ve Worked With
        </h2>

        <div className="flex flex-col gap-10">
          {clientGroups.map((group) => (
            <div key={group.region}>
              <p
                className="font-inter font-bold uppercase tracking-widest mb-4"
                style={{ fontSize: "11px", color: "#077DA7" }}
              >
                {group.region}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.artists.map((name) => (
                  <span
                    key={name}
                    className="inline-block border border-gray-200 font-inter text-xs text-gray-700 px-3 py-1.5"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
