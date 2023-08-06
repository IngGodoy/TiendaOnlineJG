import "./itemListContainer.css";
import { getProductos, getProductosCategory } from "../../asyncMock.js";
import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greetin }) => {
  const [productos, setProductos] = useState([]);
  const {categoryId}=useParams();

  const funcionAsync=categoryId?getProductosCategory:getProductos;
  useEffect(() => {
    funcionAsync(categoryId)
      .then((response) => {
        setProductos(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categoryId]);

  return (
    <main>
      <h1>{greetin}</h1>
      <ItemList productos={productos}/>
    </main>
  );
};

export default ItemListContainer;
