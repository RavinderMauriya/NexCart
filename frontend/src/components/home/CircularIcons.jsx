import React from "react";

const data = [
  {
    name: "Fashion",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
  },
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop",
  },
  {
    name: "Home",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8oSa71huciFLa7ZffLyve15jUzHoVA43e9B4ABKA3A9jsUvjH",
  },
  {
    name: "Beauty",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop",
  },
  {
    name: "Sports",
    img: "https://thumbs.dreamstime.com/b/collection-various-sports-balls-equipment-different-games-pile-white-background-445891320.jpg",
  },
  {
    name: "Grocery",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop",
  },
  {
    name: "Toys",
    img: "https://images.unsplash.com/photo-1532330393533-443990a51d10?w=300&h=300&fit=crop",
  },
  {
    name: "Automotive",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=300&fit=crop",
  },
  {
    name: "Books",
    img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=300&fit=crop",
  },
];

const CircularIcons = () => {
  return (
    <section className="px-4 max-w-7xl mx-auto md:px-6 lg:px-8 py-4">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-text-dark">
          Shop by Department
        </h2>
        <button className="text-primary font-medium hover:underline text-sm">
          View All
        </button>
      </div>

      {/* SCROLLABLE CONTAINER */}
      <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar snap-x snap-mandatory">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center group cursor-pointer min-w-[100px] md:min-w-[140px] snap-start"
          >
            {/* icon - aspect-square prevents CLS */}
            <div className="w-14 sm:w-16 md:w-28 aspect-square rounded-full md:rounded-xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition bg-bg-card border-border">
              <img
                src={item.img}
                className="w-full h-full object-cover"
                alt={item.name}
                loading="lazy"
              />
            </div>

            {/* label */}
            <span
              className="
                            text-xs sm:text-sm
                            font-medium text-center mt-2
                            transition text-text-dark
                        "
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CircularIcons;
