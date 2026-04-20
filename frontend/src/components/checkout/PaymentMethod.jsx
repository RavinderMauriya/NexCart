import { CreditCard, Truck } from "lucide-react";

const PaymentMethod = ({ selectedMethod, onSelect }) => {
  return (
    <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 border-b flex items-center gap-3">
        <CreditCard className="text-primary" size={20} />
        <h2 className="font-bold">Payment Method</h2>
      </div>

      <div className="p-4 space-y-3">
        <label
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
            selectedMethod === "COD"
              ? "border-primary bg-primary/5"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={selectedMethod === "COD"}
            onChange={() => onSelect("COD")}
          />
          <Truck size={20} className="text-text-light" />
          <div>
            <p className="font-medium">Cash on Delivery</p>
            <p className="text-xs text-text-light">Pay when you receive</p>
          </div>
        </label>

        <label
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
            selectedMethod === "UPI"
              ? "border-primary bg-primary/5"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={selectedMethod === "UPI"}
            onChange={() => onSelect("UPI")}
          />
          <CreditCard size={20} className="text-text-light" />
          <div>
            <p className="font-medium">Online Payment</p>
            <p className="text-xs text-text-light">UPI, Card, Net Banking</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
