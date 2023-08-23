import React from "react";

const Button = ({ text, onClick=null, className=null }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button className={className} onClick={clickHandler} >
      {text}
    </button>
  );
};

export default Button;
