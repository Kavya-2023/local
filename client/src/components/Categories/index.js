import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Food',
    label:"food",
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917135/Default_foods_0_p7swyo.jpg',
    buttonText: 'View More'
  },
  {
    name: 'Arts and Crafts',
    label:"artsAndCrafts",
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917170/Default_arts_and_crafts_1_rqyiku.jpg',
    buttonText: 'View More'
  },
  {
    name: 'Fashion and Apparel',
    label:"fashionAndApparel",
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917198/Default_Fashion_and_Apparel_0_etj2n8.jpg',
    buttonText: 'View More'
  },
  {
    name: 'Health and Wellness',
    label:"healthAndWellness",
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917227/Default_Health_and_Wellness_1_aww83r.jpg',
    buttonText: 'View More'
  },
  {
    name: 'Home Decor and Furnishing',
    label:"homeDecorAndFurnishing",
    img: 'https://res.cloudinary.com/dyjkp0r0x/image/upload/v1717917252/Default_Home_Decor_and_Furnishing_3_n0ruw6.jpg',
    buttonText: 'View More'
  }
];

const CategoryCard = ({ category }) => {
  return (
    <div className="w-48 rounded overflow-hidden shadow-lg m-4 bg-background transform transition-transform duration-300 hover:scale-105">
      <img className="w-full h-32 object-cover" src={category.img} alt={category.name} />
      <div className="px-4 py-2">
        <div className="font-bold text-md mb-2 text-text">{category.name}</div>
        <Link to={`/${category.label}`}>
          <button className="bg-accent text-white text-sm px-3 py-1 rounded-full hover:bg-[#DF4C73CC]">
          {category.buttonText}
        </button>
        </Link>
      </div>
    </div>
  );
};

const CategoriesDisplay = () => {
  return (
    <>
      <h2 className="text-text text-3xl font-bold text-center my-4">Categories</h2>
      <div className="flex flex-wrap justify-center">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </>
  );
};

const Categories = () => {
  return (
    <div className="p-4">
      <CategoriesDisplay />
    </div>
  );
};

export default Categories;
