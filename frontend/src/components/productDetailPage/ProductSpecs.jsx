const ProductSpecs = ({ description, attributes }) => {
  return (
    <>
      {/* Overview */}
      <div className="md:col-span-2 bg-bg-card p-6 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-4">Description</h2>
        <p className="text-text-dark text-sm leading-relaxed">
          {description || "No description available."}
        </p>
      </div>

      {/* Attributes */}
      <div className="bg-bg-card p-6 rounded-xl">
        <h2 className="font-bold mb-4">Specifications</h2>

        <div className="space-y-3 text-sm">
          {attributes?.map((attr) => (
            <div key={attr.name} className="flex justify-between">
              <span className="text-text-light">{attr.name}</span>
              <span className="font-medium">{attr.values.join(", ")}</span>
            </div>
          ))}
          {!attributes?.length && (
            <p className="text-text-light">No specifications available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSpecs;