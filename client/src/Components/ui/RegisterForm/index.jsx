import axios from "axios";
import "../../../styles/loginForm.css";
import "../../../styles/utilities.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoPic from "../../../assets/images/logo.png";
import Button from "../../base/Button";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        data
      );
      console.log(response.data);
      localStorage.setItem("id", response.data.user._id);
      setData({ email: "", password: "", first_name: "", last_name: "" });

      if (response.data.token !== null) {
        navigate("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("recipes");
      localStorage.removeItem("likes");
  }, []);

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logoPic} alt="Logo" className="logoPhoto" />
        </div>
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              value={data.first_name}
              onChange={handleDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              value={data.last_name}
              onChange={handleDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleDataChange}
            />
          </div>
          <Button className="register-button" onClick={handleSubmit} text={'Register'} />
          <div>Already have an account? <a className="pointer bold" onClick={handleLogin}>Login</a></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
