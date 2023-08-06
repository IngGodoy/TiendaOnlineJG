import "./item.css"
import { Link } from "react-router-dom";

const Item = ({ id, nombre, precio, foto, categoria }) => {
    return (
      <div key={id} className="card">
        <div>
        <p>{nombre}</p>
        </div>
        <img src={foto} alt={categoria} className="imgProduct" />
        <div>
        <p> Precio: {precio}$ Arg</p>
        </div>
        <Link  className="link-item" to={`/item/${id}`}>Ver detalle</Link>
      </div>
    );
  };
  
  export default Item;
  
  
