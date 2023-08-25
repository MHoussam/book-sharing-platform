import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Image from "../Image";
import "../../../styles/recipecard.css";
import Button from "../Button";

const RecipeCardModal = ({ recipe, likedRecipes, handleLike, isFollowing, setIsFollowing }) => {
  
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  //const navigate = useNavigate();
  //console.log(likedRecipes.likedPostIds)
  
  const onClickLike = () => {
    handleLike();
  };

const handleFollow = async () => {
  try {
    const data = { token: token, followerId: userId, followeeId: recipe.user.id};
    const isAlreadyFollowing = isFollowing.includes(recipe.user.id);
    const response = await axios.post(
      `http://localhost:8000/users/follow`,
      data
    );
console.log(isAlreadyFollowing)
    if (isAlreadyFollowing) {      
      if (response.status === 200) {
        const updatedFollow = isFollowing.filter((follow) => follow !== recipe.user._id);
        setIsFollowing(updatedFollow);
        console.log(isFollowing)
        console.log(updatedFollow)
        localStorage.setItem('follow', JSON.stringify(updatedFollow));
      } else {
        console.error("Failed to unfollow user");
      }
    } else {      
      if (response.status === 200) {
        const updatedFollow = [...isFollowing, recipe.user.id];
        console.log(recipe.user.id)
        console.log(updatedFollow)
        setIsFollowing(updatedFollow);
        localStorage.setItem('follow', JSON.stringify(updatedFollow));
      } else {
        console.error("Failed to follow user");
      }
    }
  } catch (error) {
    console.error("Error following/unfollowing user:", error);
  }
};

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