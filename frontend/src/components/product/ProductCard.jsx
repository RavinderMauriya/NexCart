import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, oldPrice, brand, rating, image }) => {
    return (
        <div className="bg-bg-card rounded-xl shadow p-3 sm:p-4 hover:shadow-lg transition-shadow">
            <Link to={`/products/${id}`} className="block">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            <p className="text-xs text-text-light mt-2 uppercase tracking-wide">{brand}</p>

            <Link to={`/products/${id}`}>
                <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">{title}</h3>
            </Link>

            {rating > 0 && (
                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                    <span>{"★".repeat(Math.round(rating))}</span>
                </div>
            )}

            <div className="flex gap-2 items-center mt-2">
                <span className="font-bold text-primary">₹{price}</span>
                {oldPrice && (
                    <span className="line-through text-text-muted text-sm">
                        ₹{oldPrice}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProductCard;