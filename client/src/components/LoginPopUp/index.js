import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
const LoginPopUp = ({ toggleLogin, loginpopup, isLogin,setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    const email=localStorage.getItem("email");
    if (email){
      toggleLogin(false);
    }
  },[email])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const response=await axios.post("https://localtreasures.onrender.com/auth/login",{email,password});
      console.log(response.data)
      if (response.data.success==true){
        alert("Successfull SignIn");
        localStorage.setItem("email",email);
        toggleLogin(false);
      }
      else{
        alert("UnSuccessfull");
        setError(response.message);
      }
    } else {
      const response=await axios.post("https://localtreasures.onrender.com/auth/signup",{name,email,password});
      if (response.data.success==true){
        alert("Successfull SignUp");
        setIsLogin(!isLogin);

      }
      else{
        alert("Unsuccessfull");
        setError(response.message)
      }
    }
  };

  return (
    <>
      {loginpopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md bg-white rounded-lg p-8">
            
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-4 text-text ">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
            <button onClick={toggleLogin} className=" text-black hover:text-gray-800 text-3xl">
              &times;
            </button>
            </div>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent" />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent" />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent" />
                <button type="button" onClick={togglePasswordVisibility} className="absolute pt-10 right-5 transform -translate-y-1/2 text-gray-400 hover:text-gray-800">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button type="submit" className="w-full bg-accent text-white py-2 rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"> {isLogin ? 'Sign in' : 'Sign Up'}</button>
            </form>
            
            <p className="text-center text-blue-400 text-sm cursor-pointer hover:text-text mt-4" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign Up here" : "Already have an account? Sign in here"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopUp;
