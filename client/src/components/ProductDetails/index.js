import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiPhone } from 'react-icons/fi'; // Importing address and phone icons
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext'; // Import CartContext
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://local-kdy0.onrender.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> {/* Add ToastContainer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="col-span-1 md:col-span-1">
          <img src={product.url} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        {/* Product Details */}
        <div className="col-span-1 md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-semibold mb-2 text-text">{product.name}</h1>
              <Link to="/products" className="text-blue-500 hover:underline">Go Back</Link>
            </div>
            <p className="text-lg text-gray-600 mb-4">{product.desc}</p>
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold text-accent">{product.cost}</span>
              <span className="ml-4 text-gray-500">Quantity: {product.quantity}</span>
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-accent text-white px-5 py-2 rounded hover:bg-[#DF4C73CC] mb-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* Trusted Sellers */}
        <div className="col-span-2 md:col-span-2">
          <h2 className="text-3xl font-semibold mb-4 text-center text-text">Trusted Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {product.sellers.map((seller, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <p className="text-lg font-semibold mb-1">{seller.name}</p>
                <div className="flex items-center mb-1">
                  <FiMapPin className="mr-2" /> {/* Address Icon */}
                  <p className="text-gray-600">{seller.address}</p>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-2" /> {/* Phone Icon */}
                  <p className="text-gray-600">{seller.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
