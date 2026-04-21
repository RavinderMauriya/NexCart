import { CreditCard, Truck } from "lucide-react";

const PaymentMethod = ({ selectedMethod, onSelect }) => (
  <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden">
    <div className="p-4 border-b flex items-center gap-3">
      <CreditCard className="text-primary" size={20} />
      <h2 className="font-bold">Payment Method</h2>
    </div>

    <div className="p-4 space-y-3">
      {["COD", "UPI"].map((method) => (
        <label
          key={method}
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
            selectedMethod === method ? "border-primary bg-primary/5" : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={method}
            checked={selectedMethod === method}
            onChange={() => onSelect(method)}
          />
          {method === "COD" ? <Truck size={20} className="text-text-light" /> : <CreditCard size={20} className="text-text-light" />}
          <div>
            <p className="font-medium">{method === "COD" ? "Cash on Delivery" : "Online Payment"}</p>
            <p className="text-xs text-text-light">{method === "COD" ? "Pay when you receive" : "UPI, Card, Net Banking"}</p>
          </div>
        </label>
      ))}
    </div>
  </div>
);

export default PaymentMethod;
