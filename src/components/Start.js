import React from "react";

function Start(props) {
  return (
    <div className="start-page">
      <div className="deco-haut"></div>
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
