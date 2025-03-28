import React from "react";
import "./Loading.css"; // Import the CSS file

const Loading = () => {
  return (
    <div className="loading">
      {"Generatingtext...".split("").map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default Loading;
