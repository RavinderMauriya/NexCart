import React from "react";

const brands = [
  {
    name: "Nike",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nike.svg",
  },
  {
    name: "Adidas",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adidas.svg",
  },
  {
    name: "Apple",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg",
  },
  {
    name: "Samsung",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/samsung.svg",
  },
  {
    name: "Puma",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/puma.svg",
  },
  {
    name: "Amazon",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg",
  },
];

const LogoTicker = () => {
  return (
    <section className="w-full py-10 md:py-14 bg-bg-main">
      <div className="max-w-7xl mx-auto px-4">

        {/* Wrapper */}
        <div className="relative overflow-hidden">

          {/* gradient fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-24 z-10 bg-linear-to-r from-bg-main to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-24 z-10 bg-linear-to-l from-bg-main to-transparent" />

          {/* Track */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">

            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-6 md:px-10 flex-shrink-0"
              >
                <img
                  src={brand.img}
                  alt={brand.name}
                  loading="lazy"
                  className="h-8 md:h-10 w-[80px] md:w-[100px] object-contain grayscale opacity-100 transition duration-300"
                />
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        .animate-marquee {
          animation: marquee 18s linear infinite;
          will-change: transform;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default LogoTicker;