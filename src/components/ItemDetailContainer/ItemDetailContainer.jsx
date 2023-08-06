import { getProductoById } from "../../asyncMock.js";
import { useEffect, useState } from "react";
import ItemCounter from "../ItemCounter/ItemCounter.jsx"
import "./ItemDetailContainer.css"
import { useParams } from "react-router-dom";


const ItemDetailContainer=()=>{

    const {itemId}=useParams()
    const [producto,setProducto]= useState({})
    useEffect(()=>{getProductoById(itemId)
    .then((response) => {
        setProducto(response);
      })
      .catch((error) => {
        console.error(error);
      })
    },[])
    return(
        <div id="itemContainer">
          <p>{producto.nombre}</p>
          <img src={producto.foto} alt={producto.categoria} />
          <p>Stock disponible: {producto.stock}</p>
         <ItemCounter stock={producto.stock}/>  
        </div>
    )
}

export default ItemDetailContainer;