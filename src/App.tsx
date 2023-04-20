import { SetStateAction, useState } from "react";

import "./App.css";
// user stories
// - Generate a password based on the selected inclusion options
// - Copy the generated password to the computer's clipboard
// - See a strength rating for their generated password
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  //states for the checkboxes.
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [num, setNum] = useState(false);
  const [sym, setSym] = useState(false);
  //state for strength
  const [strength, setStrength] = useState("");
  return (
    <div
      className="md:fixed md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 text-almostWhite font-jetBrainsMono 
"
    >
      <div id="container" className="">
        <h1>Password Generator</h1>
        <input id="password" value={password} placeholder="P4$5W0rD!" />
        <div className="bg-darkGrey p-5">
          <div id="option-container" className="">
            <div id="slider-container">
              <p>Character Length</p>
              <p>{length}</p>
              <input
                type="range"
                value={length}
                min={1}
                max={20}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLength(e.target.valueAsNumber);
                }}
              />
            </div>
            <div id="check-container">
              <div className="flex">
                <input
                  id="upper"
                  type="checkbox"
                  checked={upper}
                  onChange={(e) => {
                    setUpper(e.target.checked);
                  }}
                />
                <label htmlFor="upper">Include Uppercase Letters</label>
              </div>
              <div className="flex">
                <input
                  id="lower"
                  type="checkbox"
                  checked={lower}
                  onChange={(e) => {
                    setLower(e.target.checked);
                  }}
                />
                <label htmlFor="lower">Include Lowercase Letters</label>
              </div>
              <div className="flex">
                <input
                  id="num"
                  type="checkbox"
                  checked={num}
                  onChange={(e) => {
                    setNum(e.target.checked);
                  }}
                />
                <label htmlFor="num">Include Numbers</label>
              </div>
              <div className="flex">
                <input
                  id="sym"
                  type="checkbox"
                  checked={sym}
                  onChange={(e) => {
                    setSym(e.target.checked);
                  }}
                />
                <label htmlFor="sym">Include Symbols</label>
              </div>
            </div>
          </div>
          <div id="strength"></div>

          <div
            id="generate-button"
            className="flex items-center bg-neonGreen text-darkGrey justify-center w-full h-16 box-content hover:cursor-pointer"
            onClick={() => {
              generatePassword(length, upper, lower, num, sym, setPassword);
            }}
          >
            <p className="pr-5">Generate </p>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#24232C"
                d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//functions

function generatePassword(
  length: number,
  upper: boolean,
  lower: boolean,
  num: boolean,
  sym: boolean,
  setPassword: React.Dispatch<SetStateAction<string>>
) {
  const upperLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerLetters: string = "abcdefghijklmnopqrstuvwxyz";
  const numbers: string = "0123456789";
  const symbols: string = `!@#$%^&*()-_=+[{]}\\|;:\'",.<>/?`;

  let result: string[] = [];

  let allChar: string = "";

  //ensures at least one of each if they are meant to be included.
  if (upper == true) {
    result.push(upperLetters.charAt(getRandomNumber(upperLetters.length)));
    allChar += upperLetters;
  }
  if (lower == true) {
    result.push(lowerLetters.charAt(getRandomNumber(lowerLetters.length)));
    allChar += lowerLetters;
  }
  if (sym == true) {
    result.push(symbols.charAt(getRandomNumber(symbols.length)));
    allChar += symbols;
  }
  if (num == true) {
    result.push(numbers.charAt(getRandomNumber(numbers.length)));
    allChar += numbers;
  }

  //generates the rest randomly
  for (let i: number = 3; i < length - 1; i++) {
    result.push(allChar.charAt(getRandomNumber(allChar.length)));
  }

  //shuffles the array to generate random order of characters
  shuffle(result);

  //sets the state to update the password
  setPassword(result.join(""));
}

//gets random number between 0 and n.
function getRandomNumber(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}

//
function shuffle(array: string[]) {
  let currentIndex: number = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
