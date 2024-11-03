import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search, Heart, Trash2, PlusCircle } from "lucide-react";
import Navbar from "./Navbar";

const RecipeCard = ({ recipe, onDelete, onAddToFavorites }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{recipe.title}</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              Ingredients
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Instructions
            </h3>
            {recipe.instructions.match(/^\d+\./) ? (
              <div className="space-y-2 text-gray-600">
                {recipe.instructions.split("\n").map((step, index) => (
                  <p key={index} className="text-sm">{step}</p>
                ))}
              </div>
            ) : (
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                {recipe.instructions.split("\n").map((step, index) => (
                  <li key={index} className="text-sm">{step}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onDelete(recipe._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button
            onClick={() => onAddToFavorites(recipe._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Heart className="w-4 h-4" />
            Favorite
          </button>
          {/* View Details Button */}
        <Link
          to={`/recipedetails`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          View Details
        </Link>
        </div>
      </div>
    </div>
  );
};

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:2000/auth/recipe", {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch recipe data");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch recipes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to delete this recipe?")) {
        const response = await fetch(
          `http://localhost:2000/auth/recipe/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Recipe deleted successfully");
          getRecipes();
        } else {
          throw new Error("Failed to delete recipe");
        }
      }
    } catch (error) {
      console.error("An error occurred while deleting the recipe:", error);
      toast.error("Failed to delete recipe");
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    try {
      const response = await fetch(
        `http://localhost:2000/auth/likedRecipes/${recipeId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Recipe added to favorites successfully");
      } else {
        const data = await response.json();
        if (data.error === "Recipe already exists in your favorites") {
          toast.warn("Recipe already exists in your favorites");
        } else {
          throw new Error(data.error);
        }
      }
    } catch (error) {
      console.error("An error occurred while adding to favorites:", error);
      toast.error("Failed to add recipe to favorites");
    }
  };

  const searchRecipes = async (searchTerm) => {
    setIsLoading(true);
    try {
      if (searchTerm) {
        const response = await fetch(
          `http://localhost:2000/auth/searchRecipes/${searchTerm}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to search recipes");
        }

        const searchedRecipes = await response.json();

        if (Array.isArray(searchedRecipes)) {
          setRecipes(searchedRecipes);
        } else {
          setRecipes([]);
        }
      } else {
        getRecipes();
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
      toast.error("Failed to search recipes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-14">
        
        {/* Search Section */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8 mt-14">
          <div className="mb-8">
            <input
              type="text"
              className="w-full p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search recipes"
              onChange={(e) => searchRecipes(e.target.value)}
            />
          </div>
          <input
            type="text"
            className="w-full pl-[3rem] pr-[1rem] py-[0.75rem] rounded-xl shadow-md focus:outline-none focus:ring focus:ring-blue transition-shadow duration-[0.25s]"
            placeholder="Search for recipes..."
            onChange={(e) => searchRecipes(e.target.value)}
          />
        </div>

        
        {/* Header Section */}
        <div className="text-center mb-[3rem]">
          <h1 className="text-[2.5rem] font-bold text-gray mb-[1rem]">
            Discover Delicious Recipe Ideas
          </h1>
          <p className="text-gray text-lg">
            Find and save your favorite recipes
          </p>
        </div>

        
        {/* Recipes Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-xl text-gray">Loading recipes...</div>
         

          <h1 className="text-4xl font-bold mb-8">Huge selection of delicious recipe ideas</h1>

          {isLoading ? (
            <div className="text-center">
              <p className="text-xl">Loading recipes...</p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
                    
                    <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
                    <ul className="list-disc list-inside mb-4">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
                    {recipe.instructions.match(/^\d+\./) ? (
                      <div className="space-y-2">
                        {recipe.instructions.split("\n").map((step, index) => (
                          <p key={index}>{step}</p>
                        ))}
                      </div>
                    ) : (
                      <ol className="list-decimal list-inside space-y-2">
                        {recipe.instructions.split("\n").map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    )}
                    
                    <div className="mt-6 flex space-x-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={() => handleDeleteRecipe(recipe._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => handleAddToFavorites(recipe._id)}
                      >
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-center">No Recipes Found</h2>
          )}
          
          <div className="mt-8 text-center">
            <Link 
              to="/addRecipe" 
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition inline-block"
            >
              Add more recipes
            </Link>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-[1fr] md:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(3,_1fr)] gap-[2rem]">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onDelete={handleDeleteRecipe}
                onAddToFavorites={handleAddToFavorites}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-[3rem]">
            <h2 className="text-[2rem] font-bold text-gray mb-[1rem]">
              No Recipes Found
            </h2>
            <p className="text-gray">
              Try adjusting your search or add a new recipe
            </p>
          </div>
        )}

        
        {/* Add Recipe Button */}
        <div className="mt-[3rem] text-center">
          <Link
            to="/addRecipe"
            className="inline-flex items-center gap-[0.5rem] bg-green text-white px-[1.5rem] py-[0.75rem] rounded-xl hover:bg-green-dark transition-colors duration-[0.25s] shadow-md hover:shadow-lg"
          >
            <PlusCircle className="w-[1.25rem] h-[1.25rem]" />
            Add New Recipe
          </Link>
        </div>
      </main>

      
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Recipes;