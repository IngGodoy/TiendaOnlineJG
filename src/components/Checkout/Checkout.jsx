import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { db } from "../../config/firebase";
import { getDocs, collection,addDoc, writeBatch,doc } from "firebase/firestore";

const Checkout = () => {
  const { cart, cartQuantity } = useContext(CartContext); // datos del cart

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
      //total: cartQuantity.priceQuantity
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
        const orderRef=collection(db,"ordes")
        const {idOrden}= await addDoc(orderRef,objetOrder)
        console.log("numero de la orden de compra:  "+idOrden)
      }
    } catch (error) {
      console.error("Error al obtener los datos de Firebase:", error);
    }
  };

  return (
    <div>
      <div>Checkout</div>
      <div>
        <button onClick={createOrder}>Generar Orden de compra</button>
      </div>
    </div>
  );
};

export default Checkout;


