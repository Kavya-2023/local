import React, { useState, useContext } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Map = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [nearbyProducts, setNearbyProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);

        // Alert the selected location
        alert(`You clicked on the location: ${lat}, ${lng}`);

        // Fetch nearby products based on latitude and longitude
        fetchNearbyProducts(lat, lng);
      },
    });

    return selectedPosition === null ? null : (
      <Marker position={selectedPosition}>
        <Popup>You clicked here</Popup>
      </Marker>
    );
  };

  const fetchNearbyProducts = async (lat, lng) => {
    try {
      const response = await axios.get(`https://local-kdy0.onrender.com/district/products/nearby`, {
        params: {
          latitude: lat,
          longitude: lng,
        },
      });
      setNearbyProducts(response.data);
    } catch (error) {
      console.error('Error fetching nearby products:', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="w-full md:w-3/4 p-4">
        <div className="w-full h-96 rounded overflow-hidden shadow-lg bg-white">
          <MapContainer center={[16.30, 80.42]} zoom={13} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>

      <div className="w-full md:w-1/4 p-4">
        <h2 className="font-semibold text-lg mb-4 text-text">Nearby Products</h2>
        <div className="flex flex-wrap">
          {nearbyProducts.map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-full lg:w-full p-2">
              <div className="rounded overflow-hidden shadow-lg bg-background transform transition-transform duration-300 hover:scale-105">
                <img className="w-full h-32 object-cover" src={product.url} alt={product.name} />
                <div className="px-4 py-2">
                  <div className="font-bold text-md mb-2 text-text">{product.name}</div>
                  <div className="text-md mb-2 text-gray-700">{product.cost}</div>
                  <Link to={`/productdetails/${product._id}`}>
                    <button className="bg-accent text-white text-sm px-3 py-1 mr-2 rounded-md hover:bg-[#DF4C73CC]">
                      View Details
                    </button>
                  </Link>
                  <button
                    className="bg-accent text-white text-sm px-3 py-1 rounded-md hover:bg-[#DF4C73CC]"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;



