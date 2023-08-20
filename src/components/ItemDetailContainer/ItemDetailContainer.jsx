import { getProductoById } from "../../asyncMock.js";
import { useEffect, useState } from "react";
import ItemCounter from "../ItemCounter/ItemCounter.jsx";
import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    getProductoById(itemId)
      .then((response) => {
        setProducto(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [itemId]);

  const productoAgregar = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
  };

  return (
    <div id="itemContainer">
      <p>{producto.nombre}</p>
      <img src={producto.foto} alt={producto.categoria} />
      <p id="p-categoria">Categoria: {producto.categoria}</p>
      <ItemCounter stock={producto.stock} objetoProducto={productoAgregar} />
    </div>
  );
};

export default ItemDetailContainer;
