import axios from "axios";
import "../../../styles/loginForm.css";
import "../../../styles/utilities.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoPic from "../../../assets/images/logo.png";
import Button from "../../base/Button";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        data
      );
      console.log(response.data);
      console.log(response.data.user._doc.first_name);
      console.log(response.data.user._doc.last_name);
      console.log(response.data.user._doc._id);
      localStorage.setItem("id", response.data.user._doc._id);
      setData({ email: "", password: "" });

      if (response.data.token !== null) {
        localStorage.setItem("token", response.data.token);
        navigate("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegister = () => {
    navigate("/Register");
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
          <h2>Welcome Back</h2>
        </div>
        <div className="login-form">
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
          <Button className="login-button" onClick={handleSubmit} text={'Login'} />
          <div>Already have an account? <a className="pointer bold" onClick={handleRegister}>Register</a></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
