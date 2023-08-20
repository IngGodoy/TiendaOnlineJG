import "./itemListContainer.css";
import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const ItemListContainer = ({ greetin }) => {
  const [productos, setProductos] = useState([]);
  const {categoryId}=useParams();
  

  const getProductos=()=>{
    
  }

  useEffect(() => {
    const itemsCollectionRef= collection(db,"Item"); //refencia de la base de datos de firebase
    getDocs(itemsCollectionRef)
    //querySnapshot es una funcion de firebase que trae una foto de la base datos
     .then(querySnapshot=>{
      const productosAdaptados=querySnapshot.docs.map(
        doc=>{
          // funcion data es una funcion que nos permite ver los datos traidos de firebase
          const componentesProducto=doc.data()
          return(
            {id:doc.id,...componentesProducto}
          )
        }
      )
      //filtro dependiendo si hay categoria
      if(categoryId){
        const productosAdaptadosCategory=productosAdaptados.filter((producto)=>producto.categoria===categoryId)
        setProductos(productosAdaptadosCategory)
      }else{
        setProductos(productosAdaptados)
      }
      
     })

  }, [categoryId]);

  return (
    <main>
      <h1>{greetin}</h1>
      <ItemList productos={productos}/>
    </main>
  );
};

export default ItemListContainer;
