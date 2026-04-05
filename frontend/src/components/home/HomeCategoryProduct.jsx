const products = [
  { id: 1, name: "Classic T-Shirt", price: "₹799", image: "https://picsum.photos/id/1025/400/500" },
  { id: 2, name: "Denim Jacket", price: "₹1999", image: "https://picsum.photos/id/1074/400/500" },
  { id: 3, name: "Casual Shirt", price: "₹999", image: "https://picsum.photos/id/1011/400/500" },
  { id: 4, name: "Hoodie", price: "₹1499", image: "https://picsum.photos/id/1005/400/500" },
  { id: 5, name: "Jeans", price: "₹1299", image: "https://picsum.photos/id/1047/400/500" },
  { id: 6, name: "Sweater", price: "₹1199", image: "https://picsum.photos/id/1028/400/500" }
];

const ClothingSection = () => {
  return (
    <section
      className="max-w-7xl mx-auto px-4 py-10 rounded-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2
          className="text-2xl font-bold text-text-dark"
        >
          Clothing
        </h2>

        <button
          className="text-sm font-semibold transition-all hover:opacity-80 text-text-dark hover:text-primary"
        >
          View More →
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-bg-card border-border"
          >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3
                className="text-sm font-semibold truncate mb-1 text-text-dark"
              >
                {item.name}
              </h3>

              <p
                className="text-xs mb-3 text-text-light"
              >
                {item.price}
              </p>

              <button
                className="w-full text-xs font-medium py-2 rounded-lg transition-all hover:opacity-90 active:scale-95 bg-primary text-white"             
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClothingSection;
