import { Route, Routes } from "react-router-dom";
import CancelTransaction from "./components/client/CancelTransaction";
import Cart from "./components/client/Cart";
import Checkout from "./components/client/Checkout";
import ConfirmPayment from "./components/client/ConfirmPayment";
import HeaderBar from "./components/client/HeaderBar";
import Navigation from "./components/client/Navigation";
import Preview from "./components/client/Preview";
import { CartProvider } from "./utils/CartContext";
import Products from "./components/client/Products";
import NewProducts from "./components/client/NewProducts";


function App() {
  
  return (
    
    <div className="App">
    <CartProvider>
      <HeaderBar />
      <Routes>
        {/* <Route path="/" element={<Navigation />} /> */}
        <Route path="/" element={<NewProducts />} />
        {/* <Route path="/" element={<Products />} /> */}
        <Route path="/preview" element={<Preview />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cancel" element={<CancelTransaction /> } />
        <Route path="/confirm" element={ <ConfirmPayment /> } />
      </Routes>
    </CartProvider>
    </div>
    );
}

export default App;
