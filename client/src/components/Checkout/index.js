import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getTotalAmount } = useContext(CartContext);
  const email = localStorage.getItem("email");
  const currency = "INR";
  const amount = getTotalAmount() * 100;
  const receiptId = "asjokcnjdf";

  // State variables
  const [form, setForm] = useState(() => {
    // Fetch initial form data from localStorage if available
    const savedForm = JSON.parse(localStorage.getItem('checkoutForm')) || {
      name: '',
      email: '',
      phone: '',
      address: '',
      pincode: '',
      paymentMethod: 'offline'
    };
    return savedForm;
  });

  // Update localStorage whenever form state changes
  useEffect(() => {
    localStorage.setItem('checkoutForm', JSON.stringify(form));
  }, [form]);

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      pincode: '',
      paymentMethod: 'offline'
    });
    localStorage.removeItem('checkoutForm');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.paymentMethod === 'offline') {
      handleOfflinePayment(e);
    } else if (form.paymentMethod === 'online') {
      handleOnlinePayment(e);
    }
  };

  const handleOnlinePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localtreasures.onrender.com/order", {
        amount,
        currency,
        receipt: receiptId,
      });

      const order = response.data;

      const options = {
        key: "rzp_test_pnqesD1bWPOsNm",
        amount,
        currency,
        name: "Local Tresures",
        description: "Test Transaction",
        image: "",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };

          const validateRes = await axios.post("https://localtreasures.onrender.com/order/validate", body);
          console.log(validateRes.data);
          const jsonRes = validateRes.data;
          if (jsonRes.msg === "success") {
            await createOnlineOrder(
              form.name,
              form.email,
              form.phone,
              form.address,
              form.pincode,
              getTotalAmount(),
              'online',
              jsonRes.orderId,
              jsonRes.paymentId
            );
            clearCart();
            resetForm();
            toast.success('Order placed successfully!');
            navigate('/');
          } else {
            console.log("failed");
          }

        },
        prefill: {
          email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);

      });
      rzp1.open();

    } catch (error) {
      console.error("Error during order creation:", error);

    }
  };

  const createOnlineOrder = async (name, email, phone, address, pincode, amount, paymentMethod, orderId, paymentId) => {
    try {
      await axios.post('https://localtreasures.onrender.com/api/payment/order', {
        name,
        email,
        phone,
        address,
        pincode,
        paymentMethod,
        amount,
        orderId,
        paymentId,
      });

    } catch (err) {
      console.error('Error adding products to database:', err);
    }
  };

  const handleOfflinePayment = async () => {
    try {
      const response = await axios.post('https://localtreasures.onrender.com/api/payment/order', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        pincode: form.pincode,
        paymentMethod: form.paymentMethod,
        amount: getTotalAmount()
      });

      if (response.status === 200) {
        clearCart();
        resetForm();
        toast.success('Order placed successfully!');
        navigate('/');
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="checkout-container max-w-6xl mx-4 p-4 flex">
        <div className="checkout-form-container w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-text">Checkout</h2>
          <form onSubmit={handleSubmit} className="checkout-form space-y-4">
            <div className="flex flex-col">
              <label className="mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Address:</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="1"
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Pincode:</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Payment Method:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="offline"
                    checked={form.paymentMethod === 'offline'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Offline
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={form.paymentMethod === 'online'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Online
                </label>
              </div>
            </div>

            {cart.length === 0 ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-not-allowed opacity-50"
                disabled
              >
                Place Order
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Place Order
              </button>
            )}
          </form>
        </div>
        <div className="image-container w-1/2 flex justify-center items-center ml-2">
          <img src="https://res.cloudinary.com/dyjkp0r0x/image/upload/v1718552532/checkout_pg8r0h.jpg" alt="Checkout Image" className="max-w-full h-auto rounded-md shadow-lg"/>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
