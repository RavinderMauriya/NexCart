const ProductReviews = () => {
  return (
    <div className="bg-bg-card p-6 rounded-xl shadow">

      <h2 className="font-bold text-lg mb-6">Reviews</h2>

      {[1,2,3].map((r) => (
        <div key={r} className="border-b pb-4 mb-4">

          <div className="flex justify-between">
            <h4 className="font-semibold">User {r}</h4>
            <span className="text-yellow-500">★★★★★</span>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Great sound quality and battery life.
          </p>

        </div>
      ))}

    </div>
  );
};

export default ProductReviews;