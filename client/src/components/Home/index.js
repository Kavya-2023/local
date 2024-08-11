import React from 'react';
import Hero from '../Hero';
import Categories from '../Categories';
import Banner from '../Banner';
import DistrictCarousel from '../DistrictCarousel';
import NearbyProducts from '../NearbyProducts';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Banner/>
      <NearbyProducts/>
      <DistrictCarousel/>
    </div>
  );
};

export default Home;
