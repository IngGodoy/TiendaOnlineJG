import { useContext,useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { db } from "../../config/firebase";
import { getDocs, collection,addDoc, writeBatch,doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, cartQuantity, setCart } = useContext(CartContext); // datos del cart
  const [idOrden,setIdOrden]=useState("") //orden de compra

  const createOrder = async () => {
    try {
      console.log("Iniciando generación de orden de compra");
      console.log("Array carrito de compras");
      console.log(cart);

      // Leer datos del formulario "pendiente modificar"
      //objeto de la orden
    const objetOrder = {
      buyer: {
        name: "nombre del cliente",
        phone: "123456",
        email: "correo_prueba@gmail.com",
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
    return(
      <div>
      <div>Checkout</div>
      <div>
        <button onClick={createOrder}>Generar Orden de compra</button>
      </div>
    </div>
    )
  }

  return (
    <>
    </>
  );
};

export default Checkout;


