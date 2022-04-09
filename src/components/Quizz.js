import React, { useState, useEffect } from "react";
import Question from "./Question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Quizz() {
  //array questions avec un ajout answers = toutes les reponses
  const [data, setData] = useState([]);
  // tableau des questions et reponses
  const [arrayQuestions, setArrayQuestions] = useState([]);
  // contient les composants Questions
  const [questions, setQuestions] = useState([]);
  // Index de la question courante auquel on aura repondu via une selection unique de reponse
  const [currentIndex, setCurrentIndex] = useState(-1);
  // Les choix qu'on aura (c a d, quand on clique sur une reponse, la reponse choisit sera stocker)
  // dans le tableau choices, pour permettre les comparaisons plus tard
  const [choix, setChoix] = useState(null);
  const [choices, setChoices] = useState(() => {
    return [null, null, null, null, null];
  });

  const [count, setCount] = useState(0);

  const [listAnswers, setListAnswers] = useState([]);

  const [endGame, setEndGame] = useState(false);
  const [replay, setReplay] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((resp) => {
        setData(resp.results);
        // console.log(resp.results);
        setArrayQuestions(
          resp.results.map((question) => {
            return {
              question: question.question,
              // answers shuffled
              answers: [...question.incorrect_answers, question.correct_answer]
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
              correct: question.correct_answer,
            };
          })
        );
      });

    return () => {
      setChoices([null, null, null, null, null]);
      setCount(0);
      setEndGame(false);
      setReplay(false);
      setListAnswers([]);
    };
  }, [replay]);

  useEffect(() => {
    setQuestions(
      arrayQuestions.map((question, index) => {
        return (
          <Question
            key={question.question}
            data={question}
            index={index}
            setIndex={setCurrentIndex}
            setChoices={setChoices}
            setChoix={setChoix}
            isCorrect={undefined}
            correctAnswer={question.correct}
            verification={listAnswers}
            endGame={endGame}
            questions={questions}
          />
        );
      })
    );
  }, [arrayQuestions]);

  useEffect(() => {
    setChoices(
      choices.map((choice, index) => {
        return currentIndex === index ? choix : choice;
      })
    );
  }, [choix]);

  let checkAnswer = () => {
    //activable uniquement si toutes les reponses sont selectionnees

    if (choices.every((choice) => Boolean(choice) == true)) {
      setCount(0);
      let compteur = 0;
      let tab = [];
      choices.forEach((choice, index) => {
        if (choice.answer == arrayQuestions[index].correct) {
          compteur++;
        }
        tab.push({
          numeroRep: choice.numero,
          isCorrect: choice.answer == arrayQuestions[index].correct,
        });
      });
      setCount(compteur);
      setListAnswers(tab);

      setQuestions(
        arrayQuestions.map((question, index) => {
          return (
            <Question
              key={question.question}
              data={question}
              index={index}
              questions={questions}
              setIndex={setCurrentIndex}
              setChoices={setChoices}
              setChoix={setChoix}
              correctAnswer={question.correct}
              verification={listAnswers[index]}
              endGame={endGame}
            />
          );
        }),
        setEndGame(true)
      );
    }
  };

  // console.log("choices", choices);
  return (
    <div className="quizz-page">
      <div className="deco-haut"></div>
      <div className="question-list">{questions}</div>

      {endGame ? (
        <div className="boutons">
          <button id="again" className="button-check" onClick={checkAnswer}>
            Click again
          </button>
          <button className="button-replay" onClick={() => setReplay(true)}>
            Replay
          </button>
          <h3>{count}/5 </h3>
        </div>
      ) : (
        <button className="button-check" onClick={checkAnswer}>
          Check answers
        </button>
      )}

      <footer id="social-mobile" className="social-icons">
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
      </footer>
      <p className="social-p">Don't hesitate to check it !</p>
      <div className="deco-bas"></div>
    </div>
  );
}

export default Quizz;
