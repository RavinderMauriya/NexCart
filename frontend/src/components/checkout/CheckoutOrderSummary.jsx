import { Loader2 } from "lucide-react";

const CheckoutOrderSummary = ({
  cart,
  totalMRP,
  totalPrice,
  discount,
  selectedAddress,
  error,
  loading,
  onPlaceOrder,
  addressesCount,
  selectedAddressId,
}) => {
  const canPlaceOrder = addressesCount > 0 && selectedAddressId && !loading;

  return (
    <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden sticky top-24">
      <div className="p-4 border-b">
        <h2 className="font-bold">Order Summary</h2>
        <p className="text-sm text-text-light">{cart.length} items</p>
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
          <span>Delivery</span>
          <span className="text-success font-medium">FREE</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-base">
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* Delivery To */}
      {selectedAddress && (
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <p className="font-medium mb-1">Deliver to:</p>
            <p className="text-text-light">
              {selectedAddress.fullName}, {selectedAddress.addressLine}
            </p>
            <p className="text-text-light">
              {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="px-4 pb-2">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* Place Order Button */}
      <div className="p-4 pt-0">
        <button
          onClick={onPlaceOrder}
          disabled={!canPlaceOrder}
          className="w-full py-3 bg-primary text-white font-bold rounded-lg active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>Place Order • ₹{totalPrice}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
