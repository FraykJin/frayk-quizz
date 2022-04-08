import React, { useState } from "react";
import Start from "./components/Start";
import Quizz from "./components/Quizz";

function App() {
  const [isStart, setIsStart] = useState(false);

  let start = () => {
    setIsStart((prevStart) => !prevStart);
  };
  return (
    <div className="App">{isStart ? <Quizz /> : <Start start={start} />}</div>
  );
}

export default App;
