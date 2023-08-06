import Item from "../Item/Item"
import "./itemList.css"

const ItemList= ({productos})=>{

    return(
        <section id="seccionProductos">
           {productos.map(producto=><Item key={producto.id} {...producto}/>)}
        </section>
    )
}

export default ItemList;