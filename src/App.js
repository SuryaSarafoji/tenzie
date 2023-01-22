import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Button from "./Button.js";

function App() {
  React.useEffect(() => {
    if (!Number(localStorage.getItem("topscore")) > 0) {
      localStorage.setItem("topscore", "100");
    }
    if (!Number(localStorage.getItem("toptime")) > 0) {
      localStorage.setItem("toptime", "100");
    }
  }, [0]);
  const randNumber = () => Math.ceil(Math.random() * 6);
  const [gameCount, setGameCount] = React.useState(0);
  let secondTimer = 0;

  const [timer, setTimer] = React.useState(Number(0));
  const [forthTime, setForthTime] = React.useState(timer);
  const [bestOfScore, setBestScore] = React.useState(
    localStorage.getItem("topscore")
  );
  const [bestTime, setBestTime] = React.useState(
    Number(localStorage.getItem("toptime"))
  );
  const [state, setState] = React.useState([
    { id: 0, isHeldBool: false, randNum: randNumber() },
    { id: 1, isHeldBool: false, randNum: randNumber() },
    { id: 2, isHeldBool: false, randNum: randNumber() },
    { id: 3, isHeldBool: false, randNum: randNumber() },
    { id: 4, isHeldBool: false, randNum: randNumber() },
    { id: 5, isHeldBool: false, randNum: randNumber() },
    { id: 6, isHeldBool: false, randNum: randNumber() },
    { id: 7, isHeldBool: false, randNum: randNumber() },
    { id: 8, isHeldBool: false, randNum: randNumber() },
    { id: 9, isHeldBool: false, randNum: randNumber() },
  ]);
  const [gameOver, setGameOver] = React.useState("Reset");
  const [boolen, setBoolen] = React.useState(true);
  let b;

  React.useEffect(() => {
    let timerFn = setInterval(() => {
      setTimer((prevVal) => prevVal + 1);
    }, 1000);

    return () => clearInterval(timerFn);
  }, []);
  function isHeld(id, heldBool) {
    state[id].isHeldBool = !heldBool;
    setState((prevState) => {
      b = state[0].randNum;

      if (
        state.every((elt) => {
          return elt.isHeldBool;
        }) &&
        state.every((elt) => b === elt.randNum)
      ) {
        secondTimer = timer;
        setForthTime(timer);
        setGameOver("Game Over");
        setBoolen(false);
        if (gameCount < localStorage.getItem("topscore")) {
          localStorage.setItem("topscore", String(gameCount));
        }
        if (secondTimer < Number(localStorage.getItem("toptime"))) {
          localStorage.setItem("toptime", String(secondTimer));
        }

        return [...prevState];
      } else {
        setGameOver("Reset");
        prevState[id].isHeldBool = !heldBool;
        return [...prevState];
      }
    });
  }
  function reset() {
    setState((prevState) => {
      setGameCount((prevCount) => Number(prevCount) + 1);
      if (gameOver === "Reset") {
        return prevState.map((elt) => {
          return elt.isHeldBool
            ? {
                id: elt.id,
                isHeldBool: elt.isHeldBool,
                randNum: elt.randNum,
              }
            : {
                id: elt.id,
                isHeldBool: elt.isHeldBool,
                randNum: randNumber(),
              };
        });
      }
      setGameCount(0);
      let val = prevState.map((elt) => {
        return { id: elt.id, isHeldBool: false, randNum: randNumber() };
      });
      setGameOver("Reset");
      setBoolen(true);
      setTimer(Number(0));
      return val;
    });
  }
  React.useEffect(() => {
    setBestScore(String(localStorage.getItem("topscore")));

    setBestTime(String(localStorage.getItem("toptime")));
  }, [boolen]);
  return (
    <div className="maindiv">
      <div className="bestscore">Best Score : {bestOfScore}</div>
      <div className="bestscore">Best Time : {bestTime}</div>
      <div className="prevval">{gameCount}</div>
      <div className="flexcontainer">
        {state.map((buttonElt) => (
          <Button
            key={buttonElt.id}
            held={() => isHeld(buttonElt.id, buttonElt.isHeldBool)}
            initBool={buttonElt.isHeldBool}
            rand={buttonElt.randNum}
            boolen={boolen}
          />
        ))}
      </div>
      <br></br>
      <button onClick={reset} className="resetbutton">
        {gameOver}
      </button>
      <div className="timetaken">
        Time Taken : {boolen ? timer : forthTime} Seconds
      </div>
    </div>
  );
}

export default App;
