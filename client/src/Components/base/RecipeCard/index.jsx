import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import axios from "axios";
import Image from "../Image";
import "../../../styles/recipecard.css";
import Button from "../Button";

const RecipeCardModal = ({ recipe, likedRecipes = null, shoppingList = null, handleLike = null, handleShoppingList = null }) => {
  const navigate = useNavigate();
  
  const onClickLike = () => {
    handleLike();
  };

  const onClickShopping = () => {
    handleShoppingList();
  };

  const onClickCard = (e) => {
    const button = e.target.tagName === 'BUTTON';

    if (!button) {
      localStorage.setItem('book_id', recipe._id);
      navigate(`../Book`);
    }
  };

  // console.log('recipe card')
  // console.log(shoppingList)

  return (
    <div className="recipe-card pointer" key={recipe.id} onClick={onClickCard}>
      <div className="name flex center">
        <p>Suggested by </p>
        <h4> {recipe.user.first_name} {recipe.user.last_name}</h4>
      </div>

      <Image
        src={`http://localhost:8000/${recipe.photo}`}
        alt={recipe.name}
      />
      <div className="name flex center">
        <h3>{recipe.name}</h3>
      </div>

      <div className="buttons flex space-between">
        <div className="like">
          <Button
            text={
              likedRecipes.some(
                (likedRecipe) => likedRecipe.recipe_id === recipe.id
              )
                ? "Unlike"
                : "Like"
            }
            className={
              likedRecipes.some(
                (likedRecipe) => likedRecipe.recipe_id === recipe.id
              )
                ? "like-btn like-btn-active pointer bold round red"
                : "like-btn like-btn-inactive pointer bold round"
            }
            onClick={onClickLike}
          />
        </div>

        <div className="shopping">
          <Button
            text={"ShoppingList"}
            className={
              shoppingList.some(
                (shoppingList) => shoppingList.recipe_id === recipe.id
              )
                ? "shopping-btn shopping-btn-active pointer bold round blue"
                : "shopping-btn shopping-btn-inactive pointer bold round"
            }
            onClick={onClickShopping}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCardModal;