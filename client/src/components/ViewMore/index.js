import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CountryStateContext } from '../../contexts/CountryStateContext';
import Loader from '../Loader';

const ItemCardSmall = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-2 w-[280px] h-[330px]">
      <img src={item.url} alt={item.name} className="rounded-md mb-2 h-[150px] w-full object-cover" />
      <div className="p-2">
        <h2 className="text-base font-semibold mb-1">{item.name}</h2>
        <p className="text-gray-600 mb-1">{item.cost}</p>
        <p className="text-gray-600 mb-1">{item.quantity}</p>
        <button className="bg-accent text-white px-3 py-1 rounded hover:bg-[#DF4C73CC] text-sm"
          onClick={() => onAddToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Notification</h2>
        <p>{message}</p>
        <button className="mt-4 bg-accent text-white px-3 py-1 rounded hover:bg-[#DF4C73CC]" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

const ViewMore = () => {
  const { name } = useParams();
  const category = name;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { selectedState } = useContext(CountryStateContext);

  useEffect(() => {
    if (!selectedState) {
      setShowPopup(true);
      setLoading(false); // Set loading to false if no state selected
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://local-kdy0.onrender.com/productsbycategory?stateName=${selectedState}&categoryName=${category}`);
        setItems(response.data.products);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [category, selectedState]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 mb-[200px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mb-[200px]">
      {showPopup && <Popup message="Please select a state first!" onClose={handleClosePopup} />}
      <h1 className="text-2xl font-semibold mb-8 text-text text-center">{name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {items.map(item => (
          <ItemCardSmall key={item.id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ViewMore;
