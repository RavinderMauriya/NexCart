import CartItem from "./CartItem";

const CartList = () => {
  const items = [1, 2];

  return (
    <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden">
      
      <div className="p-4 border-b flex justify-between">
        <h1 className="text-lg font-bold">Cart Item (2)</h1>
      </div>

      {items.map((_, i) => (
        <CartItem key={i} />
      ))}

    </div>
  );
};

export default CartList;