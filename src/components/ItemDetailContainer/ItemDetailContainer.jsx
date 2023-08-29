import { useEffect, useState } from "react";
import ItemCounter from "../ItemCounter/ItemCounter.jsx";
import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom";
import { getDoc,doc } from "firebase/firestore";
import { db } from "../../config/firebase.js";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const ProductoRef= doc(db,"Item",itemId)
    getDoc(ProductoRef)
    .then(querySnapshot=>{
      const componentesProducto=querySnapshot.data()
      const ProductoAdaptado={id:querySnapshot.id,...componentesProducto}
      setProducto(ProductoAdaptado)

    })
    
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
      <ItemCounter stock={producto.stock} objetoProducto={productoAgregar} categoria={producto.categoria} />
    </div>
  );
};

export default ItemDetailContainer;
