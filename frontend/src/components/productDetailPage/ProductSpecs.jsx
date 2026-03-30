const ProductSpecs = () => {
  return (
    <>
      {/* Overview */}
      <div className="md:col-span-2 bg-bg-card p-6 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-4">Overview</h2>
        <p className="text-text-dark text-sm">
          High-end noise cancelling headphones with 60-hour battery,
          premium drivers, and multi-device connectivity.
        </p>
      </div>

      {/* Technical */}
      <div className="bg-bg-card p-6 rounded-xl">
        <h2 className="font-bold mb-4">Specs</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Bluetooth</span>
            <span>5.3</span>
          </div>
          <div className="flex justify-between">
            <span>Driver</span>
            <span>40mm</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSpecs;