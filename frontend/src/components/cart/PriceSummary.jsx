import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

const PriceSummary = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const itemCount = cart.length;
    const totalMRP = cart.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = totalMRP - totalPrice;
    const hasOutOfStock = cart.some(item => item.stock === 0);

    const canCheckout = itemCount > 0 && !hasOutOfStock;

    if (itemCount === 0) {
        return (
            <div className="bg-bg-card rounded-lg shadow-sm border p-4 text-center">
                <p className="text-text-light">Add items to see price summary</p>
            </div>
        );
    }


    //handle checkout
    const handleCheckout = () => {
        if (hasOutOfStock) {
            // Remove out of stock items
            console.log("Remove out of stock items first");
        } else {
            // Proceed to checkout
            navigate("/checkout");
        }
    };

    return (
        <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-sm font-bold uppercase text-text-light">
                        Price Details ({itemCount} items)
                    </h2>
                </div>

                <div className="p-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span>Total MRP</span>
                        <span>₹{totalMRP}</span>
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between text-success">
                            <span>Discount</span>
                            <span>- ₹{discount}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-success font-bold">FREE</span>
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-base">
                        <span>Total Amount</span>
                        <span>₹{totalPrice}</span>
                    </div>
                </div>

                {discount > 0 && (
                    <div className="p-4 bg-green-50 text-success text-sm font-semibold text-center">
                        You will save ₹{discount}
                    </div>
                )}
            </div>

            <button
                disabled={!canCheckout}
                 onClick={handleCheckout}
                className="w-full py-3 sm:py-4 bg-primary text-white font-bold rounded-lg text-sm sm:text-lg active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {hasOutOfStock ? "Out of Stock Items" : "Place Order"}
            </button>

            <p className="text-xs text-text-light flex gap-2 items-center px-1">
                🔒 Safe and Secure Payments. Easy returns.
            </p>
        </div>
    );
};

export default PriceSummary;