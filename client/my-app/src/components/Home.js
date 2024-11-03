import React from 'react';
import { ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';



const RecipeCard = ({ image, title }) => (
  <div className="relative rounded-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <p className="mt-2 text-sm font-medium text-gray-900">{title}</p>
  </div>
);

const CategoryCard = ({ image, title }) => (
  <div className="relative rounded-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-32 object-cover" />
    <p className="mt-2 text-base font-medium text-gray-900">{title}</p>
  </div>
);

const Home = () => {

  const navigate = useNavigate();
  // Sample data - replace image URLs with your actual images
  const latestRecipes = [
    { id: 1, title: 'New Chocolate Cake', image: 'https://img.freepik.com/free-photo/front-view-delicious-chocolate-cake-concept_23-2148801104.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid' },
    { id: 2, title: "Tom Daley's sweet & sour chicken", image: 'https://img.freepik.com/free-photo/close-up-delicious-asian-food_23-2150535861.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid' },
    { id: 3, title: 'Stir-fried vegetables', image: 'https://img.freepik.com/free-photo/chicken-stir-fry-vegetables_123827-21543.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid' },
    { id: 4, title: 'Spring rolls', image: 'https://img.freepik.com/free-photo/plate-food-with-side-sauce_188544-8402.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid' },
    { id: 5, title: 'Paneer Butter Masala', image: 'https://img.freepik.com/premium-photo/paneer-butter-masala-cheese-cottage-curry_762785-219936.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid' }
  ];

  const handleCategoryShift = (name) => {
    navigate('/recipes')
  };

  const categories = [
    {
      name: "Indian",
      image: "https://img.freepik.com/premium-photo/tray-food-including-rice-rice-other-foods_1264538-6613.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid",
    },
    {
      name: "Chinese",
      image: "https://img.freepik.com/free-photo/noodles-with-beef-vegetables-black-table_141793-1729.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid",
    },
    {
      name: "Thai",
      image: "https://img.freepik.com/premium-photo/authentic-thai-food-image-collection_1046319-79209.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid",
    },
    {
      name: "American",
      image: "https://img.freepik.com/premium-photo/hamburger-fries-are-tray-with-usa-flag-background_740566-1475.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid",
    },
    {
      name: "Italian",
      image: "https://img.freepik.com/premium-photo/pasta-beef-restaurant-gourmet-flavor-italian-specialties-ambiance-chefs-dishes-quality_1246444-73304.jpg?ga=GA1.1.285610388.1728144351&semt=ais_hybrid",
    },
  ];

  const renderCategories = () => (
    <div className="flex justify-center items-center space-x-8 py-8">
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center group" onClick={handleCategoryShift}>
          <div className="w-32 h-32 rounded-full overflow-hidden mb-2 transition-transform duration-300 group-hover:scale-110">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-center text-sm font-semibold">{category.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-white pt-[30px]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Huge selection of delicios recipe ideas
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our huge selection of delicious recipe ideas including: easy desserts,
              delicious vegan and vegetarian dinner ideas, gorgeous pasta recipes, quick
              bakes, family-friendly meals and gluten-free recipes.
            </p>
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Explore Latest
              </button>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                Show Random
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative rounded-full overflow-hidden aspect-square">
              <img 
                src="https://img.freepik.com/free-photo/top-view-eid-al-fitr-celebration-with-delicious-food_23-2151205103.jpg?t=st=1730069816~exp=1730073416~hmac=8156b0d45cde801c9f8c8630e8549a304fe79e52f0458a91e3a6bf4ce9f7977e&w=1380" 
                alt="Food" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
  <div className="flex justify-between items-center ">
    <h2 className="text-4xl font-bold">Categories</h2>
    
  </div>
  {renderCategories()}
</section>


      {/* Latest Recipes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Latest Recipes</h2>
          <button className="text-gray-900 font-medium hover:text-gray-700 transition">
            View More
            <ChevronRight className="inline-block ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {latestRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </section>

      {/* Thai Recipes Section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Thai Recipes</h2>
          <button className="text-gray-900 font-medium hover:text-gray-700 transition">
            View More
            <ChevronRight className="inline-block ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {latestRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </section> */}
    </div>

    <Footer />
    </div>
  );
};

export default Home;
=======
import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
        
        <Navbar />
        <Hero />
        


    </div>
  )
}

export default Home
