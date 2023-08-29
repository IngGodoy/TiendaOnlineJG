import { useState, useContext } from "react";
import "./itemCounter.css";
import { Link } from "react-router-dom";
import {CartContext} from "../CartContext/CartContext"

const ItemCounter = ({ stock, objetoProducto, descripcion }) => {
  const [counter, setCounter] = useState(0); // contador de productos a agregregar
  const [addQuantity, setAddQuantity] = useState(0); // controlador del link al carrito de compra
  const {addProduct} = useContext(CartContext)// indico el context que voy a usar

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
      setAddQuantity(counter);
      addProduct({
        id:objetoProducto.id,
        nombre:objetoProducto.nombre,
        precio:objetoProducto.precio,
        cantidad: counter});
    } else {
      alert("no has agregado productos");
    }
  };
  

  return addQuantity === 0 ? (
    <>
      <p id="p-categoria">Descripción: {descripcion}</p>
      <p id="p-categoria">Stock disponible: {stock}</p>
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
    </>
  ) : (
    <div id="contenedor-prodcuto-agregado">
      <p>Producto agregado al carrito de compras</p>
      <Link to={"/cart"} className="button-link" id="botton-finalizar-compra">
          Finalizar Compra
      </Link>
    </div>
  );
};

export default ItemCounter;
