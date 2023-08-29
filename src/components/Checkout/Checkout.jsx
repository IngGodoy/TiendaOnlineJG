import { useContext,useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { db } from "../../config/firebase";
import { getDocs, collection,addDoc, writeBatch,doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./checkout.css"

const Checkout = () => {
  const { cart, cartQuantity, setCart } = useContext(CartContext); // datos del cart

  const [idOrden,setIdOrden]=useState("") //orden de compra

  const [nombreFormulario, setNombreFormuario]=useState("")
  const [apellidoFormulario, setApellidoFormuario]=useState("")
  const [telefonoFormulario, setTelefonoFormuario]=useState("")
  const [correoFormulario, setCorreoFormuario]=useState("")
  const [verificacionCorreoFormulario, setVerificacionFormuario]=useState("")
  

  const verificarDatosCliente = () => {
    let verificacionFormularioNombre = nombreFormulario !== "";
    let verificacionFormularioApellido = apellidoFormulario !== "";
    let verificacionFormularioTelefono = telefonoFormulario !== "";
    let verificacionFormularioCorreo = validarCorreoElectronico(correoFormulario);
    let verificacionFormularioCorreo2 = correoFormulario === verificacionCorreoFormulario;

    let verificacionTotal = verificacionFormularioNombre &&
                           verificacionFormularioApellido &&
                           verificacionFormularioTelefono &&
                           verificacionFormularioCorreo &&
                           verificacionFormularioCorreo2;

    if (verificacionTotal) {
        createOrder();
    } else {
        alert("Datos incorrectos. Por favor, verifica los campos.");
    }
};

  const validarCorreoElectronico= (correo)=>{
    const formatoCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (formatoCorreo.test(correo)) {
      return true; // El correo tiene un formato válido
    } else {
      return false; // El correo no tiene un formato válido
    }
  };

  const createOrder = async () => {
    try {
      console.log("Iniciando generación de orden de compra");
      console.log("Array carrito de compras");
      console.log(cart);

      // Leer datos del formulario "pendiente modificar"
      //objeto de la orden
    const objetOrder = {
      buyer: {
        name: nombreFormulario,
        apellido:apellidoFormulario,
        phone: telefonoFormulario,
        email: correoFormulario,
      },
      items: cart,
      total: cartQuantity(cart).priceQuantity
    };

      // Traer los datos actualizados de Firebase
      const itemsCollectionRef = collection(db, "Item");
      const querySnapshot = await getDocs(itemsCollectionRef);
      const productosAdaptados = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("datos de firebase");
      console.log(productosAdaptados);
      //verificar si hay stock de los productos del cart

      const batch = writeBatch(db); // crear caja para guardar los cambias realizar en firebase
      const productSinStock = [];
      cart.forEach((prod) => {
        const productoCantidad = prod.cantidad; // cantidad de productos del cart
        const prodDb = productosAdaptados.find(
          (element) => element.id === prod.id
        );
        const prodDbStock = prodDb.stock; //stock disponible en firebase

        if (prodDbStock >= productoCantidad) {
          //updateDoc
          const prodDocRef = doc(db, "Item", prod.id); //Referencia al doc a actualizar en firebase
          batch.update(prodDocRef, { stock: prodDbStock - productoCantidad });
        } else {
          productSinStock.push(prod);
        }
      });
     
      if(productSinStock.length===0){
        batch.commit()
        const orderRef=collection(db,"orders")
        const {id}= await addDoc(orderRef,objetOrder)
        console.log("numero de la orden de compra:  "+id)
        setIdOrden(id)
        setCart([]) // vaciar carrito de compras una vez generada la orden de compra

        
      }
    } catch (error) {
      console.error("Error al obtener los datos de Firebase:", error);
    }
  };
  
  if (idOrden) {
    return (
      <div>
        <h2>Su compra fue realida con exito...!</h2>
        <h3>
          {"El número de ID de su compra es: "} {idOrden}
        </h3>
        <Link to="/" className="nav-button">Volver al inicio</Link>
      </div>
    );
  } else {
    return (
      <div id="containerFormulario">
        <div>
          <h1>Formulario de datos de Cliente:</h1>
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" name="nombre" placeholder="escriba su nombre" onChange={(e)=>setNombreFormuario(e.target.value)}/>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" name="apellido" placeholder="escriba su apellido" onChange={(e)=>setApellidoFormuario(e.target.value)}/>
          <label htmlFor="telefono">Telefono:</label>
          <input type="text" name="telefono" placeholder="escriba su telefono" onChange={(e)=>setTelefonoFormuario(e.target.value)}/>
          <label htmlFor="correo">e-mail:</label>
          <input type="text" name="correo" placeholder="escriba su correo" onChange={(e)=>setCorreoFormuario(e.target.value)}/>
          <label htmlFor="verificacionCorreo"> Verificación de e-mail:</label>
          <input type="text" name="verificacionCorreo" placeholder="vuelval a escriba su correo" onChange={(e)=>setVerificacionFormuario(e.target.value)}/>
        </div>
        <div>
          <button onClick={verificarDatosCliente}>Generar Orden de compra</button>
        </div>
      </div>
    );
  }

  return (
    <>
    </>
  );
};

export default Checkout;


