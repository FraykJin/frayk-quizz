import React, { useState, useEffect } from "react";
import _ from "underscore";

export default function Question(props) {
  const [buttons, setButtons] = useState([]);
  const [answersObj, setAnswersObj] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setButtons(
      props.data.answers.map((answer) => {
        return (
          <button
            key={answer}
            className="answer"
            onClick={() => {
              clicked(answer);
            }}
          >
            {decodeEntity(answer)}
          </button>
        );
      })
    );
    setAnswersObj(
      props.data.answers.map((answer, index) => {
        return {
          numero: index,
          answer: answer,
          isClicked: false,
        };
      })
    );
  }, []);

  useEffect(() => {
    // console.log("Verification", props.verification);
    // console.log(props.endGame);

    setButtons(
      answersObj.map((answer) => {
        // est que c clike
        return answer.isClicked === true ? (
          <button
            key={answer.answer}
            id="choosed"
            className="answer choosed"
            onClick={() => clicked(answer.answer)}
          >
            {decodeEntity(answer.answer)}
          </button>
        ) : (
          <button
            key={answer.answer}
            className="answer"
            onClick={() => clicked(answer.answer)}
          >
            {decodeEntity(answer.answer)}
          </button>
        );
      })
    );
    // console.log("arrayObj abswer changed");
    props.setChoix(answersObj.find((answer) => answer.isClicked === true));
    props.setIndex(props.index);
    if (props.endGame == true) {
      setUpdate(true);
    }
  }, [answersObj]);

  // on peuit jouer sur les props qui varient pour update les enfants !!!!!
  useEffect(() => {
    Boolean(props.verification) == true && changeEverything();
  }, [props.questions]);

  // console.log("is EndGame ?", props.endGame);
  let clicked = (currentId) => {
    // modifie le boolean isClicked si la reponse est cliquee
    setAnswersObj(
      answersObj.map((answer) => {
        return currentId == answer.answer
          ? { ...answer, isClicked: !answer.isClicked }
          : { ...answer, isClicked: false };
      })
    );
  };

  let changeEverything = () => {
    const numero = props.verification.numeroRep;
    const isCorrect = props.verification.isCorrect;

    setButtons(
      answersObj.map((answer, index) => {
        return index == numero && isCorrect == false ? (
          <button key={answer.answer} id="false" className="answer">
            {decodeEntity(answer.answer)}
          </button>
        ) : props.correctAnswer == answer.answer ? (
          <button key={answer.answer} id="true" className="answer">
            {decodeEntity(answer.answer)}
          </button>
        ) : (
          <button key={answer.answer} className="answer">
            {decodeEntity(answer.answer)}
          </button>
        );
      })
    );
  };
  // verification

  function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  return (
    <div className="question">
      <h2>{decodeEntity(props.data.question)}</h2>
      <div className="answer-list">{buttons}</div>
      <hr />
    </div>
  );
}
