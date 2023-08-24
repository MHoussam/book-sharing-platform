import React, { useState } from "react";
import Button from "../Button";
import axios from "axios";
import "../../../styles/postmodal.css";

const PostModal = ({ isOpen, onClose, books, setBooks }) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");
  const [data, setData] = useState({
    name: "",
    author: "",
    shortReview: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setData({
        ...data,
        [name]: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("author", data.author);
    formData.append("shortReview", data.shortReview);
    formData.append("image", data.image);
    formData.append("token", token);
    formData.append("user_id", user_id);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/post", formData);

      // if (response.data.message === "Posted") {
      //   const updatedBooks = [...books, response.data.data];
      //   localStorage.setItem("books", JSON.stringify(updatedBooks));
      //   setBooks(updatedBooks);
      // } else {
      //   console.log("Didn't Post");
      // }
    } catch (error) {
      console.log(error);
    }
    
    // Clear form data after posting
    setData({ name: "", author: "", shortReview: "", image: null });
  };

  return (
    <div className={`${isOpen ? "opened" : "closed"}`}>
        <div className="post-form-container">
            <div className="form-title flex center">
                <div className="title-text width-100">
                    <h2>Add a New Book</h2>
                </div>
                
                <div className="close-btn flex end width-100">
                    <Button
                        text={"Close"}
                        className="button close-button"
                        onClick={onClose}
                    />
                </div>
            </div>

            <div className="recipe-form flex column">
                <div className="name margin-btm">
                    <label className="bold">Book Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        className="name-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="cuisine margin-btm">
                    <label className="bold">Author</label>
                    <input
                        type="text"
                        name="cuisine"
                        value={data.author}
                        className="cuisine-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="ingredients margin-btm">
                    <label className="bold">Short Review</label>
                    <textarea
                        name="ingredients"
                        value={data.shortReview}
                        className="ingredients-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="image margin-btm">
                    <label className="bold">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="image-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="submit flex center">
                    <Button
                        text={"Post"}
                        className={"button post-submit-btn pointer"}
                        onClick={handlePost}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default PostModal;