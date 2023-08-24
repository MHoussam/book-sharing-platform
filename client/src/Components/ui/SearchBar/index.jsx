import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/searchbar.css";
import Image from "../../base/Image";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ recipes }) => {
  const [query, setQuery] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.author.toLowerCase().includes(query.toLowerCase())
        // recipe.genre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-bar-input")) {
      setShowList(false);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
    setShowList(newQuery);

    if (newQuery === "") {
      setFilteredUsers([]);
    }
  };

  const handleInputClick = () => {
    if (filteredUsers.length > 0) {
      setShowList(true);
    }
  };

  const onClickSearch = (recipeId) => {
    localStorage.setItem('book_id', recipeId);
      navigate(`../Recipe`);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar flex column center">
      <input
        type="text"
        placeholder="Search Recipes"
        className="search-bar-input width-30"
        value={query}
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      {showList && (
        <div className="search-bar-list width-100 flex column center">
          <ul className="search-list flex column">
            {filteredUsers.map((recipe) => (
              <li key={recipe.id} onClick={() => onClickSearch(recipe.id)}>
                <div className="search-list-li flex pointer">
                  <div className="photo width-20">
                    <Image
                      src={`http://localhost:8000/${recipe.photo}`}
                      alt={recipe.name}
                      className={'search-pic'}
                    />
                  </div>
                  <div>{recipe.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;