import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import axios from "axios";
import Image from "../Image";
import "../../../styles/recipecard.css";
import Button from "../Button";

const RecipeCardModal = ({ recipe, likedRecipes, shoppingList = null, handleLike = null, handleShoppingList = null }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  //console.log(likedRecipes.likedPostIds)
  
  const onClickLike = () => {
    handleLike();
  };

  const onClickShopping = () => {
    handleShoppingList();
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // You can send a request to your server here to update the follow status.
  };

  // console.log('recipe card')
  // console.log(shoppingList)

  return (
    <div className="recipe-card pointer" key={recipe._id} >
      <div className="name flex center">
        <p>Suggested by </p>
        <h4> {recipe.user.first_name} {recipe.user.last_name}</h4>

        <button
          className= 
          {isFollowing ? "follow-btn pointer blue" : "follow-btn pointer"}
          onClick={handleFollowToggle}
        >
         {isFollowing ? "Unfollow" : "Follow"}
        </button>
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
            likedRecipes.likedPostIds.length > 0 &&
            likedRecipes.likedPostIds.some((likedPostId) => likedPostId == recipe._id)
              ? "Unlike"
              : "Like"
          }
          className={
            likedRecipes.likedPostIds.length > 0 &&
            likedRecipes.likedPostIds.some((likedPostId) => likedPostId == recipe._id)
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
                (shoppingList) => shoppingList.recipe_id === recipe._id
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