import React, { createContext, useState, useEffect } from 'react';

export const CountryStateContext = createContext();

export const CountryStateProvider = ({ children }) => {
  // Initialize state with a function to ensure localStorage is read only once
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    return savedCountry ? savedCountry : '';
  });

  const [selectedState, setSelectedState] = useState(() => {
    const savedState = localStorage.getItem('selectedState');
    return savedState ? savedState : '';
  });

  // Save selectedCountry to localStorage whenever it changes
  useEffect(() => {
    if (selectedCountry) {
      localStorage.setItem('selectedCountry', selectedCountry);
    }
  }, [selectedCountry]);

  // Save selectedState to localStorage whenever it changes
  useEffect(() => {
    if (selectedState) {
      localStorage.setItem('selectedState', selectedState);
    }
  }, [selectedState]);

  return (
    <CountryStateContext.Provider value={{ selectedCountry, setSelectedCountry, selectedState, setSelectedState }}>
      {children}
    </CountryStateContext.Provider>
  );
};
