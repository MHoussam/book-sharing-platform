import React, { useState } from "react";
import RecipeCard from "../RecipeCard";
import Button from "../Button";
import "../../../styles/cartrecipemodal.css";
import Image from "../Image";
import { useNavigate } from "react-router-dom";

const RecipeCartModal = ({ isOpen, onClose, shoppingList }) => {
  const navigate = useNavigate();
  //console.log("open?");
  //console.log(isOpen);
  //console.log(shoppingList);

  const onClickCard = (recipeId) => {
    localStorage.setItem('recipe_id', recipeId);
    navigate(`../Recipe`);
  };
  
  return (
    <div className={`${isOpen ? "modal-content" : "modal"}`}>
      <div className="close-btn flex end width-100">
        <Button
          text={"Close"}
          className="button close-button"
          onClick={onClose}
        />
      </div>

      <div className="flex wrap">
        {shoppingList.map((shoppingList) => (
          <div key={shoppingList.id}>
            <div className="recipe-card-modal pointer" key={shoppingList.recipe.id} onClick={() => onClickCard(shoppingList.recipe.id)}>
              <Image
                src={`http://localhost:8000/${shoppingList.recipe.image_url}`}
                alt={shoppingList.recipe.name}
              />
              <div className="name flex center">
                <h3>{shoppingList.recipe.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCartModal;
