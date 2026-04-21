import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../context/cartContext";

const ProductInfo = ({
  productId,
  title,
  description,
  brand,
  rating,
  reviewCount,
  variant,
  attributes,
  selectedAttrs,
  onAttributeChange,
  onBuyNow
}) => {
  const displayPrice = variant?.discountPrice || variant?.price;
  const originalPrice = variant?.discountPrice ? variant?.price : null;
  const inStock = variant?.stock > 0;
  
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 

  return (
    
    <div className="bg-bg-card p-6 md:p-8 rounded-xl shadow space-y-6">

      {/* Brand & Title */}
      <div>
        <p className="text-text-light text-sm uppercase tracking-wide">{brand}</p>
        <h1 className="text-xl md:text-3xl font-bold mt-1">{title}</h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 text-yellow-500 text-sm">
        <span>{"★".repeat(Math.round(rating || 0))}</span>
        <span className="text-text-light text-xs">({reviewCount || 0} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl md:text-4xl font-bold text-primary">₹{displayPrice}</span>
        {originalPrice && (
          <span className="line-through text-text-muted text-lg">₹{originalPrice}</span>
        )}
      </div>

      {/* Variant Selectors */}
      {attributes?.map((attr) => (
        <div key={attr.name} className="space-y-2">
          <label className="text-sm font-medium text-text-dark">
            {attr.name}: <span className="text-text-light">{selectedAttrs[attr.name]}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {attr.values.map((val) => (
              <button
                key={val}
                onClick={() => onAttributeChange(attr.name, val)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all
                  ${selectedAttrs[attr.name] === val
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                  }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Stock Status */}
      <div className="flex items-center gap-2 text-sm">
        <span className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}></span>
        <span className={inStock ? "text-green-600" : "text-red-500"}>
          {inStock ? `In Stock (${variant?.stock} left)` : "Out of Stock"}
        </span>
      </div>

      {/* SKU trancate for long length convert to ... */}
      <p className="text-xs text-text-light truncate" title={variant?.sku}>SKU: {variant?.sku}</p>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          disabled={!inStock || !variant?._id}
          onClick={() => {
            console.log("[ProductInfo] productId:", productId, "variantId:", variant?._id);
            if (!variant?._id) {
              toast.error("Error: Variant ID missing. Please refresh the page.");
              return;
            }
            addToCart({
              productId,
              variantId: variant._id,
              quantity: 1
            });
            toast.success("Added to cart");
          }}
          className="bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Add to Cart
        </button>
        <button
          disabled={!inStock || !variant?._id}
          onClick={() => {
            if (!variant?._id) {
              toast.error("Error: Variant ID missing. Please refresh the page.");
              return;
            }
            onBuyNow({
              productId,
              variantId: variant._id,
              quantity: 1,
              title,
              price: variant?.discountPrice || variant?.price,
              originalPrice: variant?.price,
              variant,
              image: variant?.images?.[0]
            });
          }}
          className="bg-secondary py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
        >
          Buy Now
        </button>
      </div>

    </div>
  );
};

export default ProductInfo;