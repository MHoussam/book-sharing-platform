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
  const [isFollowing, setIsFollowing] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
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
  const follow = localStorage.getItem("follow");

  const fetchRecipes = async () => {
    try {
      const data = { token: token, follow: [follow] };
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFollow = async () => {
    try {
      const data = { token: token, userId: userId };
      const check = localStorage.getItem("follow");

      if (check) {
        setIsFollowing(JSON.parse(check));
        //console.log("hellooooo");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/users/following",
           data
        );
        const allData = response.data;

        localStorage.setItem("follow", JSON.stringify(allData));
        setIsFollowing(allData);

        //e.log(allData);
        console.log("fetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = async (recipeId) => {
    try {
      const data = { token: token, postId: recipeId, userId: userId };
      const response = await axios.post("http://127.0.0.1:8000/books/like", data);
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

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  useEffect(() => {
    if(token !== null){
      fetchLikes();
      fetchRecipes();
      fetchFollow();
    }

    const clearLocalStorageOnExit = (e) => {
      localStorage.removeItem("recipes");
      localStorage.removeItem("likes");
      localStorage.removeItem("follow");
    };

    window.addEventListener("beforeunload", clearLocalStorageOnExit);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorageOnExit);
    };
  }, []);

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
                handleLike={() => handleLike(recipe._id)}
                isFollowing={isFollowing}
                setIsFollowing={setIsFollowing}
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