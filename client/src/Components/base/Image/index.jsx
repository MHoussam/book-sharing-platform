import React from "react";
import '../../../styles/navbar.css';

const Image = ({ src, alt, className=null, onClick }) => {

  return (
    <img src={src} alt={alt} className={className} onClick={onClick} />
  );
};

export default Image;
