import { useContext } from "react";

export const cartContext = createContext();

export const cartProvider = ({children})=>{
    const [cart, setCart] = useState([]);

    //add to cart
    const addToCart = (product)=>{
        setCart([...cart, product]);
        
    }


    return(
        <cartContext.Provider value={{cart, setCart, addToCart}}>
            {children}
        </cartContext.Provider>
    )
    
}