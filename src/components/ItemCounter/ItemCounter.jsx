import { useState } from "react";
import "./itemCounter.css";

const ItemCounter = ({ stock }) => {
  const [counter, setCounter] = useState(0);

  const agregarProducto = () => {
    if (counter < stock) {
      setCounter(counter + 1);
    } else {
      alert("No hay más stock disponible");
    }
  };

  const quitarProducto = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      alert("No hay productos agregados");
    }
  };

  const agregarProductoCarrito = () => {
    if (counter > 0) {
      alert("productos agregados al carrito de compras");
      console.log(counter);
    } else {
      alert("no has agregado productos");
    }
  };

  return (
    <div className="itemCounter">
      <div className="botonesAgregar">
        <button onClick={agregarProducto}>+</button>
        <div>
          <p> {counter} </p>
        </div>
        <button onClick={quitarProducto}>-</button>
      </div>
      <button onClick={agregarProductoCarrito}>Agregar Producto</button>
    </div>
  );
};

export default ItemCounter;
