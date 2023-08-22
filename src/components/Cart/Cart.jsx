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
        <Link to="/" className="nav-button">
          Ir al inicio
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section>
        {cart.map((producto) => {
          let total = producto.cantidad * producto.precio;
          return (
            <div key={producto.id} className="product-item">
              <p>
                {" "}
                cantidad: {producto.cantidad} - {producto.nombre} precio c/u:{" "}
                {producto.precio} / sub-Total:{total}{" "}
              </p>
              <button className="delete-button" onClick={()=>eliminarProducto(producto.id)}>Eliminar Producto</button>
            </div>
          );
        })}
        <h2>Tatal a pagar: {cartQuantity(cart).priceQuantity}</h2>
        <button className="delete-button" onClick={()=>clearCart()}>Borra todos los productos del carrito</button> <br></br>
        <Link to="/" className="nav-button">Agregar mas Productos</Link>
        <Link to="/Checkout" className="nav-button" element={<Checkout/>}>checkout</Link>
        
      </section>

    </div>
  );
};

export default Cart;
