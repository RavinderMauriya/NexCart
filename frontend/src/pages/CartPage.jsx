import AddressBar from "../components/cart/AddressBar";
import CartList from "../components/cart/CartList";
import PriceSummary from "../components/cart/PriceSummary";

const CartPage = () => {
    return (
        <div className="bg-bg-main min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-12">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* LEFT */}
                    <div className="lg:w-[70%] space-y-4">
                        <AddressBar />
                        <CartList />
                    </div>

                    {/* RIGHT */}
                    <div className="lg:w-[30%]">
                        <PriceSummary />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CartPage;