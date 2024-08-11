import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const heroImages = [
  {
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717925928/Default_Discover_Our_Latest_ProductsHigh_quality_and_affordabl_2_leglgh.jpg',
    title: 'Discover Famous Products',
    subtitle: 'High quality and affordable prices',
    buttonText: 'Shop Now',
    buttonLink: '#'
  },
  {
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717925843/Default_Exclusive_Summer_CollectionTrendy_and_comfortable_appa_2_tb1vuf.jpg',
    title: 'Exclusive Summer Collection',
    subtitle: 'Trendy and comfortable apparel',
    buttonText: 'Explore Now',
    buttonLink: '#'
  },
  {
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717925773/Default_Discover_Our_Latest_ProductsHigh_quality_and_affordabl_0_ng1r4i.jpg',
    title: 'Upgrade Your Home Decor',
    subtitle: 'Stylish and modern designs',
    buttonText: 'View Collection',
    buttonLink: '#'
  }
];

const Hero = () => {
  return (
    <div className="relative">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
      >
        {heroImages.map((hero, index) => (
          <div key={index}>
            <img src={hero.img} alt={`Slide ${index}`} className="w-full h-[500px] object-cover"/>
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center">
              <h2 className="text-4xl font-bold mb-2">{hero.title}</h2>
              <p className="text-xl mb-4">{hero.subtitle}</p>
<Link to='/products'>
              <button className="bg-accent text-white px-4 py-2 rounded-full hover:bg-[#DF4C73CC]">
                {hero.buttonText}
              </button>
</Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
