import React, { useState, useEffect } from "react";
import "../../../styles/books.css";
import SearchBar from "../SearchBar";
import RecipeCard from "../../base/RecipeCard";
import axios from "axios";
import PostModal from "../../base/PostModal";
import Button from "../../base/Button";

const BooksList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeContent, setRecipeContent] = useState([
    {
      user_id: "",
      name: "",
      author: "",
      review: "",
      image: "",
    },
  ]);
  //const [likesColor, setLikesColor] = useState('like-btn pointer bold round');
  //const [like, setLike] = useState("Like");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const fetchRecipes = async () => {
    try {
      const data = { token: token };
      const check = localStorage.getItem("recipes");

      if (check) {
        setRecipes(JSON.parse(check));
        setFilteredRecipes(JSON.parse(check));
        //console.log("hellooooo");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/books/all",
           data
        );
        const allData = response.data;
        console.log(allData[0]._id)

        localStorage.setItem("recipes", JSON.stringify(allData));
        setRecipes(allData);
        setFilteredRecipes(allData);

        //e.log(allData);
        console.log("fetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const data = { token: token, userId: userId };
      const check = localStorage.getItem("likes");
      //console.log(check);
      if (check) {
        setLikedRecipes(JSON.parse(check));
        console.log('try')
        console.log(likedRecipes)
        //console.log(likedRecipes);
      } else {
         const response = await axios.post(
          "http://127.0.0.1:8000/books/liked",
           data
        );
        const allData = response.data;
        console.log(response.data)
        localStorage.setItem("likes", JSON.stringify(allData));
        setLikedRecipes(allData);


        //console.log(allData);
        //console.log("fffffetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchShoppingList = async () => {
    try {
      const data = { token: token, userId: userId };
      const check = localStorage.getItem("shoppingList");
      //console.log(check);
      if (check) {
        setShoppingList(JSON.parse(check));
        //console.log("hhhhhello");
      } else {
        //// const response = await axios.post(
        ////   "http:////127.0.0.1:8000/api/getShoppings",
        ////   data
        //// );
        //// const allData = response.data;

        //// localStorage.setItem("shoppingList", JSON.stringify(allData));
        //// setShoppingList(allData);

        //console.log(allData[0].recipe.cuisine);

        // allData.map((item) => {
        //   setRecipeContent((prev) => [
        //     ...prev,
        //     {
        //       publisher_id: item.recipe.publisher_id,
        //       name: item.recipe.name,
        //       cuisine: item.recipe.cuisine,
        //       ingredients: item.recipe.ingredients,
        //       image_url: item.recipe.image_url
        //     },
        //   ]);
        // });
        //console.log("fffffetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = async (recipeId) => {
    try {
      const data = { token: token, postId: recipeId, userId: userId };
      console.log(data)
      const response = await axios.post("http://127.0.0.1:8000/books/like", data);
console.log(response.data.updatedPost._id)
console.log(response.data.message)
      if (response.data.message === "Liked") {
        const updatedLikedRecipes = {
          ...likedRecipes,
          likedPostIds: [...likedRecipes.likedPostIds, response.data.updatedPost._id],
        };
      setLikedRecipes(updatedLikedRecipes);
        console.log(likedRecipes);
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        //setLikedRecipes(updatedLikedRecipes);
        console.log("add");
      } else {
        console.log('hereeeeeeee');
        console.log(likedRecipes);
        const updatedLikedRecipes = {
          ...likedRecipes,
          likedPostIds: likedRecipes.likedPostIds.filter(
            (likedPostId) => likedPostId !== response.data.updatedPost._id
          ),
        };
        setLikedRecipes(updatedLikedRecipes);
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        //console.log("remove");
      }
      //console.log(response.data);
      //console.log(likedRecipes);
    } catch (error) {
      console.log("Error Like: " + error);
    }
    //console.log(likedRecipes);
  };

  const handleShoppingList = async (recipeId) => {
    try {
      const data = { token: token, recipeId: recipeId, userId: userId };
      //console.log(data);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/shopping",
        data
      );

      const allData = response.data;
      //console.log(allData.data[0]);
       if (allData.message === "Added") {

        const updatedShoppingList = [...shoppingList, allData.data[0]];
          // setRecipeContent((prev) => [...prev, updatedShoppingList]);

        //   localStorage.setItem("shoppingList", JSON.stringify(allData));
        // setShoppingList(allData);
        // console.log(allData[0].recipe.cuisine);
        // console.log(allData.data[0]);
        // console.log(shoppingList);
        localStorage.setItem("shoppingList", JSON.stringify([...shoppingList, allData.data[0]]));
        setShoppingList([ ...shoppingList, allData.data[0] ]);
      //   //console.log("add");       
      } else {
      //   //console.log(shoppingList);
        const updatedShoppingList = shoppingList.filter(
          (shoppingList) => shoppingList.recipe_id !== recipeId
        );
        localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));
        setShoppingList(updatedShoppingList);
        //console.log("remove");
      }
      //console.log(response.data);
      //console.log(shoppingList);
    } catch (error) {
      console.log("Error ShoppingList: " + error);
    }
    //console.log(shoppingList);
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
console.log("whattttttttttttttttttttttttt")
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  useEffect(() => {
    fetchLikes();
    fetchRecipes();
    fetchShoppingList();

    const clearLocalStorageOnExit = (e) => {
      localStorage.removeItem("recipes");
      localStorage.removeItem("likes");
      localStorage.removeItem("shoppingList");
    };

    window.addEventListener("beforeunload", clearLocalStorageOnExit);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorageOnExit);
    };
  }, []);

  //console.log(shoppingList);

  //console.log(likedRecipes);
  //console.log(recipes);

  //console.log("here");
  //console.log(shoppingList);
  return (
    <div className="content">
      <div className="search-post flex">
        <div className="search flex center width-90">
          <SearchBar recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
        </div>

        <div className="post width-10 flex center">
          <div className="post-btn">
            <Button text={'Post'} onClick={openPostModal} className={'button pointer posting'} />
          </div>
        </div>
      </div>

      <div className="recipes">
        <div className="recipe-container">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id}>
              <RecipeCard
                recipe={recipe}
                likedRecipes={likedRecipes}
                shoppingList={shoppingList}
                handleLike={() => handleLike(recipe._id)}
                handleShoppingList={() => handleShoppingList(recipe._id)}
              />
            </div>
          ))}
        

          <PostModal
            isOpen={isPostModalOpen}
            onClose={closePostModal}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        </div>
      </div>
    </div>
  );
};

export default BooksList;