import React, { useEffect, useState } from "react";
import "../../../styles/navbar.css";
import logoImage from "../../../assets/images/logo.png";
import Button from "../../base/Button";
import Image from "../../base/Image";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//import RecipeCartModal from "../../base/CartRecipeModal";

const NavBar = ({ setIsModalOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  const handleLogout = () => {
    // axios.get('http://127.0.0.1:8000/api/logout');
    navigate("/");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="navbar flex space-between">
      <div className="logo flex center">
        <Image src={logoImage} alt={"TastyBites Logo"} className={"logoPic"} />
      </div>

      <div className="navbar-right width-10 flex">
        <div className="logout-btn flex center">
          <Button
            text={"Logout"}
            onClick={handleLogout}
            className={"button pointer bold"}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
