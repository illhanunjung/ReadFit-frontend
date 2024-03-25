// CustomHeader.js
import React from "react";

const CustomHeader = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src="/img/navlogo.png"
        alt="Logo"
        style={{ width: "50px", height: "40px" }}
      />
      <h2 style={{ color: "white", marginLeft: "10px" }}>Read Fit</h2>
    </div>
  );
};

export default CustomHeader;
