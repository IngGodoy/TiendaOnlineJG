import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import "./cart.css";
import Checkout from "../Checkout/Checkout";


const Cart = () => {
  const { eliminarProducto, clearCart, cart,cartQuantity } = useContext(CartContext);
  console.log(cart);

  if (cart.length == 0) {
    return (
      <div>
        <h1>No hay productos agregados al carrito de Compras</h1>
        <Link to="/" className="nav-button" id="button-inicio">
          Ir al inicio
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Productos agregados al carrito de compras</h1>
      <section>
        {cart.map((producto) => {
          let total = producto.cantidad * producto.precio;
          return (
            <div key={producto.id} className="product-item">
              <p>
                {" "}
                cantidad: {producto.cantidad} - {producto.nombre} precio c/u:{" "}
                {producto.precio} {" $ Arg"} {""} / {""} sub-Total:{total}{" $ Arg"}
              </p>
              <button className="delete-button" onClick={()=>eliminarProducto(producto.id)}>Eliminar Producto</button>
            </div>
          );
        })}

        <div id="botton-compra">
            <h2>Total a pagar: {cartQuantity(cart).priceQuantity}</h2>
            <button className="delete-button" id="vaciar-cart" onClick={()=>clearCart()}>Borra todos los productos del carrito</button> <br></br>
            <Link to="/" className="nav-button">Agregar mas Productos</Link>
            <Link to="/Checkout" className="nav-button" element={<Checkout/>}>checkout</Link>
        </div>
        
      </section>

    </div>
  );
};

export default Cart;
