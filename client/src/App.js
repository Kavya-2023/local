import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import LoginPopUp from './components/LoginPopUp';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import ViewMore from './components/ViewMore';
import DisplayDistrict from './components/DisplayDistrict';
import Map from './components/Map';
import Checkout from './components/Checkout';
import { CartProvider } from './contexts/CartContext';
import { CountryStateProvider } from './contexts/CountryStateContext'; 
import axios from 'axios';
function App() {
  const [currentLocation,setCurrentLocation]=useState({});
  const [loginpopup, setLoginpopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => {
    setLoginpopup(!loginpopup);
  };
  useEffect(()=>{
    getLocation();
  },[])
  const getLocation=async()=>{
    const location=await axios.get('https://ipapi.co/json');
    setCurrentLocation(location.data);
  }
  return (
    <Router>
      <CartProvider>
        <CountryStateProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar toggleLogin={toggleLogin} />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart toggleLogin={toggleLogin}/>} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/:name" element={<ViewMore />} />
                <Route path="/district/:id" element={<DisplayDistrict />} />
                <Route path="/map" element={<Map />} />
                <Route path='/checkout' element={<Checkout/>}/>
              </Routes>
            </main>
            <Footer />
            <LoginPopUp toggleLogin={toggleLogin} loginpopup={loginpopup} isLogin={isLogin} setIsLogin={setIsLogin} />
          </div>
        </CountryStateProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
