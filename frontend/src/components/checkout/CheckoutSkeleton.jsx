const SkeletonBox = ({ className }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const CheckoutSkeleton = () => {
    return (
        <div className="min-h-screen bg-bg-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

                {/* Back button */}
                <SkeletonBox className="h-5 w-32 mb-6" />

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:w-[65%] space-y-6">

                        {/* Address section */}
                        <div className="bg-white p-4 rounded-xl shadow space-y-4">
                            <SkeletonBox className="h-6 w-40" />
                            <div className="space-y-3">
                                <SkeletonBox className="h-16 w-full" />
                                <SkeletonBox className="h-16 w-full" />
                            </div>
                        </div>

                        {/* Payment method */}
                        <div className="bg-white p-4 rounded-xl shadow space-y-4">
                            <SkeletonBox className="h-6 w-40" />
                            <div className="space-y-3">
                                <SkeletonBox className="h-12 w-full" />
                                <SkeletonBox className="h-12 w-full" />
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lg:w-[35%]">
                        <div className="bg-white p-4 rounded-xl shadow space-y-4">

                            <SkeletonBox className="h-6 w-32" />

                            {/* Items */}
                            <div className="space-y-3">
                                <SkeletonBox className="h-14 w-full" />
                                <SkeletonBox className="h-14 w-full" />
                            </div>

                            {/* Price */}
                            <div className="space-y-2 pt-2">
                                <SkeletonBox className="h-4 w-full" />
                                <SkeletonBox className="h-4 w-full" />
                                <SkeletonBox className="h-4 w-full" />
                            </div>

                            {/* Button */}
                            <SkeletonBox className="h-12 w-full mt-4" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutSkeleton;