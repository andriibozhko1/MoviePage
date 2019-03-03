import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__title">
        The project was made by: Andrii Bozhko
      </div>
      <div className="Footer__link-list">
        <div className="Footer__link">
          GitHub:{" "}
          <a href="https://github.com/andriibozhko1">
            https://github.com/andriibozhko1
          </a>
        </div>
        <div className="Footer__link">
          Linkedin:{" "}
          <a href="https://www.linkedin.com/in/andrii-bozhko-857a0a177/">
            https://www.linkedin.com/in/andrii-bozhko-857a0a177/
          </a>
        </div>
      </div>
    </div>
  );
}
