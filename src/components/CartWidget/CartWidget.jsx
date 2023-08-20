import "./CartWidget.css"
import { CartContext } from "../CartContext/CartContext";
import { useContext } from "react";


const CartWidget = () => {

  const { cart,cartQuantity } = useContext(CartContext);
  
  return (
    <div>
      <img id="imgIncono"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRtfaVx5DisNr2qRNtIo443Qv-jn7deffGKA&usqp=CAU"
        alt="incono de carrito de compras"
      />
      <p id="containerCount">{cartQuantity(cart).quantity}</p>
    </div>
  );
};
export default CartWidget;
