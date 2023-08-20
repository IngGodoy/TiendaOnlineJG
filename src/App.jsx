import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext/CartContext";
import Cart from "./components/Cart/Cart"

function App() { 
  return (
    <BrowserRouter>
    <CartProvider> 
        <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greetin={"Bienvenidos a mi tienda Online"} />}/>
        <Route path="/category/:categoryId" element={<ItemListContainer greetin={"Productos por categoria"} />}/>
        <Route path="/item/:itemId" element={<ItemDetailContainer />}/>
        <Route path="*" element={<h2>404 NOT FOUND</h2>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </CartProvider>
     
    </BrowserRouter>
  );
}

export default App;
