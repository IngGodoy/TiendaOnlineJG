import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greetin={"Bienvenidos a mi tienda Online"} />}/>
        <Route path="/category/:categoryId" element={<ItemListContainer greetin={"Productos por categoria"} />}/>
        <Route path="/item/:itemId" element={<ItemDetailContainer />}/>
        <Route path="*" element={<h2>404 NOT FOUND</h2>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
