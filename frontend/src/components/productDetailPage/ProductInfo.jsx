const ProductInfo = ({ title, price, oldPrice, brand, rating }) => {
  return (
    <div className="bg-bg-card p-6 md:p-8 rounded-xl shadow space-y-6">

      {/* Title */}
      <h1 className="text-xl md:text-3xl font-bold">
        {title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 text-yellow-500 text-sm">
        {"★".repeat(rating)}
        <span className="text-text-light text-xs">(1248 reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl md:text-4xl font-bold">{price}</span>
        <span className="line-through text-text-muted">{oldPrice}</span>
      </div>

      {/* Colors */}
      <div>
        <p className="font-semibold mb-2">Colors</p>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-black rounded-full border-2 border-primary" />
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-primary text-white py-3 rounded-lg">
          Add to Cart
        </button>
        <button className="bg-secondary py-3 rounded-lg">
          Buy Now
        </button>
      </div>

    </div>
  );
};

export default ProductInfo;