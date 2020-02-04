import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const App = () => {
  // const startTime = 3;
  const [startTime, setStartTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const [text, setText] = useState("");
  const textBox = useRef(null);
  const startTimeInput = useRef(null);

  const countDownTimer = () => {
    setTimeRemaining(prevState => prevState - 1);
  };

  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(startTime);
    setText("");
    setTotalWords("0");
    textBox.current.disabled = false;
    textBox.current.focus();
  };

  const textChange = e => {
    const { value, name } = e.target;
    console.log(name);
    if (name === "texArea") {
      setText(value);
    } else {
      setStartTime(value);
    }
  };

  const wordCount = () => {
    const getText = text.split(" ");
    const check = getText.filter(text => text !== "");
    setTotalWords(check.length);
  };

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        countDownTimer();
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimeRunning(false);
      wordCount();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>Typing Game</h1>
      <textarea
        name="texArea"
        ref={textBox}
        onChange={textChange}
        disabled={!isTimeRunning}
        value={text}
      />
      <h1>
        Set timming:{" "}
        <input
          name="startTime"
          type="text"
          value={startTime}
          ref={startTimeInput}
          onChange={textChange}
        />
      </h1>
      <h1>Time Remaining: {timeRemaining}</h1>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start Game
      </button>
      <h1>Word Counts: {totalWords}</h1>
    </div>
  );
};

export default App;
