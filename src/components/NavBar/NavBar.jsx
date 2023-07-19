import CartWidget from "../CartWidget/CartWidget"
import "./navBar.css"

const NavBar=()=>{
    return(
        <header>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WeUq6QlV3WRV4hCctIS1rOWpJkUR4jtAGHAP-XJ3W5ACThRMVDbieCkVV9PwRPWhrz8&usqp=CAU" alt="incono de la tienda" />
            <nav>
                <button>Incio</button>
                <button>Protecciones eléctricas</button>
                <button>Cables</button>
                <button>Puesta a tierra</button>
                <button>Equipo eléctricos</button>
                <button>Ver carrito</button>
            </nav>
            <CartWidget/>
        </header>
    )
}
export default NavBar;