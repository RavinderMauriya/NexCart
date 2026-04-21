import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
    { id: 1, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80", title: "Fashion Sale" },
  { id: 2, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600", title: "Summer Collection" },
  { id: 3, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80", title: "New Arrivals" },
  { id: 4, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80", title: "Sneakers Week" },
  { id: 5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600", title: "Head Phones" }
];

export default function SlideBackground() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // auto slide
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl m-2 md:m-4">
      {/* slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="min-w-full relative h-[200px] sm:h-[280px] md:h-[360px] lg:h-[420px]"
          >
            {imageErrors[slide.id] ? (
              <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                <ImageOff size={48} className="text-gray-400" />
                <span className="text-gray-500 mt-2 text-sm">{slide.title}</span>
              </div>
            ) : (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => handleImageError(slide.id)}
              />
            )}

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center px-6 sm:px-10 md:px-16">
              <span className="bg-yellow-400 text-black text-xs sm:text-sm px-3 py-1 rounded-full w-fit mb-3 font-medium">
                Exclusive
              </span>

              <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold max-w-lg leading-tight">
                {slide.title}
              </h1>

              <p className="text-white/80 text-sm sm:text-base mt-2 max-w-md">
                Curated for excellence. Shop the latest trends now.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-4 sm:mt-6 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium w-fit hover:bg-gray-100 hover:scale-105 transition-all"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "bg-white w-5" : "bg-white/50 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors hidden sm:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors hidden sm:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}