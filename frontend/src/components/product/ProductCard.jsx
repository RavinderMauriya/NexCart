
const ProductCard = ({ title, price, oldPrice, brand, rating, image }) => {
    return (
        <div className="bg-bg-card rounded-xl shadow p-3 sm:p-4">
            <img
                src={image}
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
            />
            <p className="text-xs text-text-light mt-2">{brand}</p>

            <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>

            <div className="text-yellow-500 text-xs">
                {"★".repeat(rating)}
            </div>

            <div className="flex gap-2 items-center mt-2">
                <span className="font-bold">${price}</span>
                {oldPrice && (
                    <span className="line-through text-text-muted text-sm">
                        ${oldPrice}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProductCard;