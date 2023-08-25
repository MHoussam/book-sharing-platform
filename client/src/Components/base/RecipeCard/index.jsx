import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import axios from "axios";
import Image from "../Image";
import "../../../styles/recipecard.css";
import Button from "../Button";

const RecipeCardModal = ({ recipe, likedRecipes, handleLike, isFollowing, setIsFollowing }) => {
  //const navigate = useNavigate();
  //console.log(likedRecipes.likedPostIds)
  
  const onClickLike = () => {
    handleLike();
  };


  const handleFollow = () => {
    const isAlreadyFollowing = isFollowing.includes(recipe.user._id);
    console.log(recipe.user.id)

    if (isAlreadyFollowing) {
      const updatedFollow = isFollowing.filter(follow => follow !== recipe.user.id);
      setIsFollowing(updatedFollow);
      localStorage.setItem('follow', JSON.stringify(updatedFollow));
    } else {
      const updatedFollow = [...isFollowing, recipe.user.id];
      setIsFollowing(updatedFollow);
      localStorage.setItem('follow', JSON.stringify(updatedFollow));
    }
  };

  // console.log('recipe card')
  console.log(isFollowing)

  return (
    <div className="recipe-card pointer" key={recipe._id} >
      <div className="name flex center">
        <p>Suggested by </p>
        <h4> {recipe.user.first_name} {recipe.user.last_name}</h4>

        <Button
          className={isFollowing ? "follow-btn pointer blue" : "follow-btn pointer"}
          onClick={handleFollow}
          text={isFollowing ? "Unfollow" : "Follow"}
        />
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
      </div>
    </div>
  );
};

export default RecipeCardModal;