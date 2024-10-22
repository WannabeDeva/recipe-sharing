import React, { useEffect, useState } from "react";
import "../styles/RecipeStyle.css";
import { Link } from "react-router-dom";
import "../styles/Searchbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Hero from "./Hero";

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
          getRecipes(); // Refresh the recipes list
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
    <div>
      <Navbar />
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
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Recipes;