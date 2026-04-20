import { useParams, useNavigate } from 'react-router-dom';
import ProductGallery from "../components/productDetailPage/ProductGallery";
import ProductInfo from "../components/productDetailPage/ProductInfo";
import ProductSpecs from "../components/productDetailPage/ProductSpecs";
import ProductReviews from "../components/productDetailPage/ProductReviews";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedAttrs, setSelectedAttrs] = useState({});

    useEffect(() => {
        if (!id) return;
        apiRequest(`/products/${id}`)
            .then((res) => {
                const data = res?.data;
                if (!data) return;
                setProduct(data);
                const defaultVariant = data.variants?.[0] || null;
                setSelectedVariant(defaultVariant);
                if (defaultVariant?.attributes) setSelectedAttrs(defaultVariant.attributes);
            })
            .catch(console.error);
    }, [id]);

    const handleBuyNow = (buyNowItem) => {
        navigate("/checkout", { state: { buyNowItem } });
    };

    const handleAttributeChange = (attrName, value) => {
        const newAttrs = { ...selectedAttrs, [attrName]: value };
        setSelectedAttrs(newAttrs);
        const matched = product.variants.find(v =>
            Object.entries(newAttrs).every(([key, val]) => v.attributes?.[key] === val)
        );
        if (matched) setSelectedVariant(matched);
    };

    // loading state (no extra state needed)
    if (product === null) return <p className="p-6">Loading...</p>;
    if (!product) return <div className="text-center pt-24">Product not found</div>;

    return (
        <div className="bg-bg-main min-h-screen">
            <div className="max-w-[1400px] mx-auto pt-4 pb-20 px-4 md:px-6">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className="lg:col-span-5">
                        <ProductGallery images={selectedVariant?.images} />
                    </div>

                    <div className="lg:col-span-7">
                        <ProductInfo
                            productId={product._id}
                            title={product.title}
                            description={product.description}
                            brand={product.brand}
                            rating={product.rating}
                            reviewCount={product.numReviews}
                            variant={selectedVariant}
                            attributes={product.attributes}
                            selectedAttrs={selectedAttrs}
                            onAttributeChange={handleAttributeChange}
                            onBuyNow={handleBuyNow}
                        />
                    </div>

                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ProductSpecs description={product.description} attributes={product.attributes} />
                </div>

                <div className="mt-12">
                    <ProductReviews />
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;
