const PriceSummary = () => {
    return (
        <div className="space-y-4 lg:sticky lg:top-24">

            <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden">

                <div className="p-4 border-b">
                    <h2 className="text-sm font-bold uppercase text-text-light">
                        Price Details
                    </h2>
                </div>

                <div className="p-4 space-y-3 text-sm">

                    <div className="flex justify-between">
                        <span>Price (2 items)</span>
                        <span>₹1248.99</span>
                    </div>

                    <div className="flex justify-between text-success">
                        <span>Discount</span>
                        <span>- ₹225.49</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-success font-bold">FREE</span>
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-base">
                        <span>Total Amount</span>
                        <span>₹1023.50</span>
                    </div>

                </div>

                <div className="p-4 bg-green-50 text-success text-sm font-semibold text-center">
                    You will save ₹225.49
                </div>

            </div>

            <button className="w-full py-3 sm:py-4 bg-primary text-white font-bold rounded-lg text-sm sm:text-lg active:scale-95 transition">
                Place Order
            </button>

            <p className="text-xs text-text-light flex gap-2 items-start px-1">
                🔒 Safe and Secure Payments. Easy returns.
            </p>

        </div>
    );
};

export default PriceSummary;