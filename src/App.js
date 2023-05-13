import { Route, Routes } from "react-router-dom";
import CancelTransaction from "./components/client/CancelTransaction";
import Cart from "./components/client/Cart";
import Checkout from "./components/client/Checkout";
import HeaderBar from "./components/client/HeaderBar";
import Navigation from "./components/client/Navigation";
import Preview from "./components/client/Preview";
import SuccessTransaction from "./components/client/SuccessTransaction";
import { CartProvider } from "./utils/CartContext";


function App() {
  
  return (
    
    <div className="App">
    <CartProvider>
      <HeaderBar />

      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/preview" element={<Preview />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cancel" element={<CancelTransaction /> } />
        <Route path="/success" element={<SuccessTransaction /> } />
      </Routes>
    </CartProvider>
    </div>
    );
}

export default App;
