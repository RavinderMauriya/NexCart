import { useParams } from 'react-router-dom';
import { products } from "../data/products";
import ProductGallery from "../components/productDetailPage/ProductGallery";
import ProductInfo from "../components/productDetailPage/ProductInfo";
import ProductSpecs from "../components/productDetailPage/ProductSpecs";
import ProductReviews from "../components/productDetailPage/ProductReviews";

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="text-center pt-24">Product not found</div>;
    }

    const { title, price, oldPrice, brand, rating, images } = product;

    return (
        <div className="bg-bg-main min-h-screen">
            <div className="max-w-[1400px] mx-auto pt-4 pb-20 px-4 md:px-6">

                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className="lg:col-span-5">
                        <ProductGallery images={images || []} />
                    </div>

                    <div className="lg:col-span-7">
                        <ProductInfo title={title} price={price} oldPrice={oldPrice} brand={brand} rating={rating} />
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ProductSpecs />
                </div>

                <div className="mt-12">
                    <ProductReviews />
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;
