import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const RecipeDetails = () => {

    const navigate = useNavigate(); // Use the navigate hook


  // Static data for the recipe
  const recipe = {
    photoUrl: 'https://www.budgetbytes.com/wp-content/uploads/2024/01/Chicken-Stir-Fry-V1-800x1067.jpeg',
    title: 'Chicken Stir Fry',
    ingredients: [
      'Chicken breast',
      'Mixed vegetables (bell peppers, broccoli, carrots)',
      'Soy sauce',
      'Ginger',
      'Ginger',
    ],
    instructions: `1. Slice chicken and vegetables. \n
    2. Heat oil in a wok, stir-fry chicken until cooked.\n
    3. Add vegetables and stir-fry for 3-5 minutes.\n
    4. Add soy sauce, ginger, and garlic.\n
    5. Cook for 2 more minutes.`,
    review: {
      rating: 4.5,
      totalReviews: 24,
    },
    comments: [
      {
        name: 'Harshit Gyanchandani',
        comment: 'This recipe is amazing! The instructions were super easy to follow, and the result was delicious.',
        date: 'October 20, 2024',
      },
      {
        name: 'Mehul Rupchandani',
        comment: 'I loved it! I added some mushrooms for an extra twist. Will definitely make it again.',
        date: 'October 21, 2024',
      },
    ],
  };


  // State for handling new review input
  const [newReview, setNewReview] = useState('');
  const [comments, setComments] = useState(recipe.comments);

  // Handle submission of new review
  const handleReviewSubmit = () => {
    if (newReview.trim() === '') return;

    // Adding the new review to the comments array
    const newComment = {
      name: 'Anonymous', // Assuming the user is anonymous for now
      comment: newReview,
      date: new Date().toLocaleDateString(),
    };

    setComments([newComment, ...comments]);
    setNewReview(''); // Clear the input field after submission
  };

  return (

    <div>
        <Navbar />
    <div className="min-h-screen bg-gray-50 py-10 px-5 pt-[65px] md:px-20 lg:px-40">
        {/* Back Button */}
      <button 
        onClick={() => navigate('/recipes')} 
        className="mb-4 p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
      >
        &larr; Back to Recipes
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Recipe Image & Title */}
        <div className="relative">
          <img
            src={recipe.photoUrl}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
          <h1 className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-3xl md:text-4xl font-bold p-4">
            {recipe.title}
          </h1>
        </div>

        {/* Ingredients & Instructions */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ingredients
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cooking Instructions
          </h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {recipe.instructions}
          </div>

          {/* Review Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Reviews
            </h2>
            <div className="flex items-center mb-6">
              <div className="text-yellow-500 text-3xl mr-2">
                {'★'.repeat(Math.floor(recipe.review.rating)) + (recipe.review.rating % 1 >= 0.5 ? '☆' : '')}
              </div>
              <div className="text-gray-700 text-lg">
                {recipe.review.rating} out of 5 ({recipe.review.totalReviews} reviews)
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comments
            </h2>
            <div className="space-y-6">
              {recipe.comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">
                      {comment.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

              {/* Write a Review Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Write a Review
            </h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
              rows="4"
              placeholder="Share your thoughts about this recipe..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <button
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>
          


        </div>



      </div>
    </div>
    </div>
  );
};

export default RecipeDetails;
