import React from 'react';

const Banner = () => {
  return (
    <>
      <h2 className='text-text text-3xl text-center font-semibold mt-3'>Offer Zone</h2>
      <div className="container mx-auto p-4">
        {/* First row with 50% discount offer */}
        <div className="flex justify-center mb-8">
          <div className="w-full h-64 bg-cover bg-center rounded-lg overflow-hidden shadow-lg" style={{ backgroundImage: 'url(https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917135/Default_foods_0_p7swyo.jpg)' }}>
            <div className="bg-black bg-opacity-40 h-full flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">50% Off on Selected Products!</h1>
            </div>
          </div>
        </div>

        {/* Second row with two cards */}
        <div className="flex flex-wrap md:gap-1/2">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 h-48 bg-cover bg-center rounded-lg overflow-hidden shadow-lg" style={{ backgroundImage: 'url(https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917170/Default_arts_and_crafts_1_rqyiku.jpg)' }}>
            <div className="bg-black bg-opacity-30 h-full flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">25% Off on Arts and Crafts</h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-48 bg-cover bg-center rounded-lg overflow-hidden shadow-lg" style={{ backgroundImage: 'url(https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917198/Default_Fashion_and_Apparel_0_etj2n8.jpg)' }}>
            <div className="bg-black bg-opacity-30 h-full flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">25% Off on Fashion and Apparel</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
