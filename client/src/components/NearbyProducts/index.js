import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext'; 
import axios from 'axios';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105">
        <img className="w-full h-32 object-cover" src={product.url} alt={product.name} />
        <div className="px-4 py-2">
          <div className="font-bold text-md mb-2">{product.name}</div>
          <div className="text-md mb-2 text-gray-700">Price: {product.cost}</div>
          <div className="text-md mb-2 text-gray-700">Quantity: {product.quantity}</div>
          <button
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const NearbyProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Latitude:', latitude, 'Longitude:', longitude);

            setCurrentLocation({ latitude, longitude });

            try {
              const response = await axios.get(`https://localtreasures.onrender.com/getCurrentLocationProducts?latitude=${latitude}&longitude=${longitude}`);
              setProducts(response.data);
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    getLocation();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-semibold text-blue-600 text-center">Nearby Products</h2>
      <div className="flex flex-wrap">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="text-center w-full py-10">
            <p className="text-gray-500">No nearby products found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default NearbyProducts;
