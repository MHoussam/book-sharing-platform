import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/searchbar.css";
import Image from "../../base/Image";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ recipes, setFilteredRecipes }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (newQuery) => {
    const trimmedQuery = newQuery.trim();
    if (trimmedQuery === "") {
      setFilteredRecipes(recipes);
    } else {
      const filteredRecipes = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
          recipe.author.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      setFilteredRecipes(filteredRecipes);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    handleSearch(newQuery);
  };

  const onClickSearch = (recipeId) => {
    localStorage.setItem("book_id", recipeId);
    navigate(`../Book`);
  };

  // useEffect(() => {
  //   // Cleanup function to remove event listener
  //   // const handleClickOutside = (e) => {
  //   //   if (!e.target.closest(".search-bar-input")) {
  //   //     // Clear the query and reset the recipes to the original list
  //   //     setQuery("");
  //   //     setRecipes(recipes);
  //   //   }
  //   // };

  //   // Add click event listener to handle clicks outside the input
  //   //document.addEventListener("click", handleClickOutside);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [recipes, setRecipes]);

  console.log(recipes)
  return (
    <div className="search-bar flex column center">
      <input
        type="text"
        placeholder="Search Recipes"
        className="search-bar-input width-30"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;