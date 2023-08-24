import React, { useState, useEffect } from 'react';
import Image from '../../base/Image';
import "../../../styles/recipedetails.css";
import Button from '../../base/Button';
import axios from 'axios';

const RecipeDetails = () => {
  const recipes = JSON.parse(localStorage.getItem('books'));
  const liked = JSON.parse(localStorage.getItem('likes'));
  const [likedRecipes, setLikedRecipes] = useState(liked);
  const shopping = JSON.parse(localStorage.getItem('shoppingList'));
  const [shoppingList, setShoppingList] = useState(shopping);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipeId = localStorage.getItem('book_id');
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id')

  console.log('recipe: ' + recipes)

  const handleLike = async (recipeId) => {
    try {
      const data = { token: token, recipeId: recipeId, userId: userId };
      const response = await axios.post("http://127.0.0.1:8000/api/like", data);

      if (response.data.message === "Liked") {
        const updatedLikedRecipes = [...likedRecipes, response.data.data];
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        setLikedRecipes(updatedLikedRecipes);
      } else {
        const updatedLikedRecipes = likedRecipes.filter(
          (likedRecipe) => likedRecipe.recipe_id !== recipeId
        );
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        setLikedRecipes(updatedLikedRecipes);
      }
    } catch (error) {
      console.log("Error Like: " + error);
    }
  };

  const handleShoppingList = async () => {
    try {
      const data = { token: token, recipeId: recipeId, userId: userId };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/shopping",
        data
      );

      const allData = response.data;
      console.log(allData)
       if (allData.message === "Added") {

        const updatedShoppingList = [...shoppingList, allData.data[0]];
        //setRecipeContent((prev) => [...prev, updatedShoppingList]);

        localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));
        setShoppingList(updatedShoppingList);
      } else {
        const updatedShoppingList = shoppingList.filter(
          (shoppingList) => shoppingList.recipe_id !== recipeId
        );
        localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));
        setShoppingList(updatedShoppingList);
      }
    } catch (error) {
      console.log("Error ShoppingList: " + error);
    }
  };

  useEffect(() => {
    const foundRecipe = recipes.find(recipe => recipe._id == recipeId);

    console.log('maybe')
    if (foundRecipe) {
      console.log('yes')
      setSelectedRecipe(foundRecipe);
    }
  }, []);

  return (
    <div className="recipe-details-container flex">
      <div className="recipe-details-left flex center">
        {selectedRecipe && (
            <Image src={`http://localhost:8000/${selectedRecipe.photo}`} alt={selectedRecipe.name} />
        )}
      </div>
      <div className="recipe-details-right">
          <div className="recipe-right flex column">
            <div className="name flex center">
            {selectedRecipe && (
                <h1>{selectedRecipe.name}</h1>
            )}
            </div>

            <div className="cuisine">
            {selectedRecipe && (
                <p><strong>Author:</strong> {selectedRecipe.author}</p>
            )}
            </div>

            <div className="ingredients">
            {selectedRecipe && (
                <p><strong>Review:</strong> {selectedRecipe.review}</p>
            )}
            </div>
          </div>

          <div className="buttons flex space-between">
        {/* <div className="like">
          <Button
            text={
              likedRecipes.some(
                (likedRecipe) => likedRecipe.recipe_id === recipeId
              )
                ? "Unlike"
                : "Like"
            }
            className={
              likedRecipes.some(
                (likedRecipe) => likedRecipe.recipe_id === recipeId
              )
                ? "like-btn like-btn-active pointer bold round red"
                : "like-btn like-btn-inactive pointer bold round"
            }
            onClick={handleLike}
          />
        </div>

        <div className="shopping">
          <Button
            text={"ShoppingList"}
            className={
              shoppingList.some(
                (shoppingList) => shoppingList.recipe_id === recipeId
              )
                ? "shopping-btn shopping-btn-active pointer bold round blue"
                : "shopping-btn shopping-btn-inactive pointer bold round"
            }
            onClick={handleShoppingList}
          />
        </div> */}
      </div>
      </div>
    </div>
  );
};

export default RecipeDetails;