import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Start(props) {
  return (
    <div className="start-page">
      <div className="deco-haut"></div>

      <div className="social-icons">
        <a href="https://www.instagram.com/fraykjin/">
          <FontAwesomeIcon
            className="instagram-icon"
            icon={faInstagram}
            size="2x"
          />
        </a>
        <a href="https://www.linkedin.com/in/yang-kang-jin">
          <FontAwesomeIcon
            className="linkedin-icon"
            icon={faLinkedin}
            size="2x"
          />
        </a>
        <a href="https://github.com/FraykJin">
          <FontAwesomeIcon className="github-icon" icon={faGithub} size="2x" />
        </a>
      </div>
      <p className="social-p">Don't hesitate to check it !</p>
      <h1>Frayk Quizz</h1>
      <p>Test yourself ! Click on the button to start the quizz !</p>
      <button className="start-button" onClick={props.start}>
        Start quiz
      </button>

      <div className="deco-bas"></div>
    </div>
  );
}

export default Start;
