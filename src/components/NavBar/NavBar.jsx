import CartWidget from "../CartWidget/CartWidget"
import "./navBar.css"
import { Link } from "react-router-dom"

const NavBar=()=>{
    return(
        <header>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WeUq6QlV3WRV4hCctIS1rOWpJkUR4jtAGHAP-XJ3W5ACThRMVDbieCkVV9PwRPWhrz8&usqp=CAU" alt="incono de la tienda" />
            <nav>
                <Link className="nav-button" to={"/"}>Incio</Link>
                <Link  className="nav-button" to={"/category/proteccionElectrica"}>Protecciones eléctricas</Link>
                <Link className="nav-button" to={"/category/cable"}>Cables</Link>
                <Link className="nav-button" to={"/category/puestaTierra"}>Puesta a tierra</Link>
                <Link className="nav-button" to={"/cart"}>Ver carrito</Link>
            </nav>
            <CartWidget/>
        </header>
    )
}
export default NavBar;