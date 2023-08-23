import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log(cart);

  // Función para agregar productos al carrito
  const addProduct = (nuevoProducto) => {
    if (!isInCart(nuevoProducto.id)) {
      setCart([...cart, nuevoProducto]);
      alert("productos agregados al carrito de compras");
    } else {
      alert("Este producto ya está agregado al carrito de compras");
    }
  };

  // Función para verificar si el producto ya fue agregado al carrito
  const isInCart = (productoId) => {
    return cart.some((product) => product.id === productoId); 
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (productoId) => {
    const nuevaArray = cart.filter((prod) => prod.id!==productoId); 
    setCart(nuevaArray);
  };

  // Función para eliminar todos los elementos del carrito
  const clearCart = () => {
    setCart([]);
  };
  // Función para mostrar el precio total y la cantidad de productos
  const cartQuantity = (carritoProductos) => {
    const priceQuantity = carritoProductos.reduce((acumulador, elemento) => acumulador + elemento.precio*elemento.cantidad, 0);
    const quantity = carritoProductos.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0);
  
    return {
      priceQuantity: priceQuantity,
      quantity: quantity
    };
  };

  return (
    <CartContext.Provider value={{ addProduct, eliminarProducto, clearCart,cart,cartQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

