import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";
import { CountryStateContext } from "../../contexts/CountryStateContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader"; 

function DisplayDistrict() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { selectedState } = useContext(CountryStateContext);

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const response = await axios.get(`https://local-kdy0.onrender.com/productsbydistrict?stateName=${selectedState}&districtName=${id}`);
        setProducts(response.data.products);
      } catch (error) {
        setError("Failed to fetch district data.");
        console.error("Failed to fetch district data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictData();
  }, [id, selectedState]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-text text-center">Products in {id}</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border border-gray-300 p-4 rounded-md shadow-md flex flex-col">
            <Link to={`/productdetails/${product._id}`}>
              <div style={{ height: "200px" }}>
                <img src={product.url} alt={product.name} className="w-full h-full object-cover rounded-md" />
              </div>
              <p className="text-gray-400">{product.name}</p>
              <div className="flex justify-between mt-2">
                <p className="text-gray-400">Quantity: {product.quantity}</p>
                <p className="text-gray-600">Price: {product.cost}</p>
              </div>
            </Link>
            <button
              onClick={() => handleAddToCart(product)} 
              className="px-4 py-2 bg-accent text-white rounded-md mt-auto hover:bg-[#DF4C73CC]"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayDistrict;
