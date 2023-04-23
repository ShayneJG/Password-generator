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
  //state for copy button
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="md:fixed md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 text-almostWhite font-jetBrainsMono 
"
    >
      <div id="container" className="">
        <h1 className="font-bold text-base p-5 text-grey">
          Password Generator
        </h1>
        <div className="relative">
          <input
            readOnly
            id="password"
            value={password}
            placeholder="P4$5W0rD!"
            className="w-full h-16 bg-darkGrey p-3 mb-4 text-almostWhite text-2xl "
          />
          <CopyButton
            password={password}
            copied={copied}
            setCopied={setCopied}
          />
        </div>
        <div className="bg-darkGrey p-5">
          <div id="option-container" className="">
            <div id="slider-container">
              <p>Character Length</p>
              <p>{length}</p>
              <input
                readOnly={true}
                type="range"
                value={length}
                min={4}
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
          <div id="strength">
            <StrengthRating strength={strength} />
          </div>

          <button
            disabled={!upper && !lower && !sym && !num}
            id="generate-button"
            className="flex items-center disabled:opacity-30 disabled:hover:cursor-not-allowed bg-neonGreen text-darkGrey justify-center w-full h-16 box-content hover:cursor-pointer"
            onClick={() => {
              generatePassword(
                length,
                upper,
                lower,
                num,
                sym,
                setPassword,
                setStrength,
                setCopied
              );
            }}
          >
            <p className="pr-5">Generate </p>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#24232C"
                d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
              />
            </svg>
          </button>
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
  setPassword: React.Dispatch<SetStateAction<string>>,
  setStrength: React.Dispatch<SetStateAction<string>>,
  setCopied: React.Dispatch<SetStateAction<boolean>>
) {
  const upperLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerLetters: string = "abcdefghijklmnopqrstuvwxyz";
  const numbers: string = "0123456789";
  const symbols: string = `!@#$%^&*()-_=+[{]}\\|;:\'",.<>/?`;

  //intiialises results, but also resets password if checkboxes are all unchecked
  let result: string[] = [];
  //resets strength and copy when new password is generated. Strength needs to be reset in the case that a second password is not correctly generated.
  setStrength("");
  setCopied(false);

  let allChar: string = "";

  //ensures at least one of each if they are meant to be included.
  if (upper == true) {
    result.push(upperLetters.charAt(getRandomNumber(upperLetters.length - 1)));
    allChar += upperLetters;
  }
  if (lower == true) {
    result.push(lowerLetters.charAt(getRandomNumber(lowerLetters.length - 1)));
    allChar += lowerLetters;
  }
  if (sym == true) {
    result.push(symbols.charAt(getRandomNumber(symbols.length - 1)));
    allChar += symbols;
  }
  if (num == true) {
    result.push(numbers.charAt(getRandomNumber(numbers.length - 1)));
    allChar += numbers;
  }

  //generates the rest randomly
  for (let i: number = result.length - 1; i < length - 1; i++) {
    result.push(allChar.charAt(getRandomNumber(allChar.length - 1)));
  }

  //shuffles the array to generate random order of characters
  shuffle(result);

  //determines strength of the password
  //FIX THIS
  if (length == 4) {
    setStrength("TOO WEAK!");
  } else {
    let strengthRate: number = 0;
    num ? strengthRate++ : undefined;
    sym ? strengthRate++ : undefined;
    upper ? strengthRate++ : undefined;
    lower ? strengthRate++ : undefined;

    switch (strengthRate) {
      case 1:
        setStrength("TOO WEAK!");
        break;
      case 2:
        setStrength("WEAK");
        break;
      case 3:
        setStrength("MEDIUM");
        break;
      case 4:
        setStrength("STRONG");
        break;
    }
  }

  //sets the state to update the password
  setPassword(result.join(""));
}

//gets random number between 0 and n
function getRandomNumber(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}

//yoinked from stack overflow. Is really effective, thank you internet
function shuffle(array: string[]) {
  let currentIndex: number = array.length,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

interface StrengthRatingProps {
  strength: string;
}

//component for the entire strength rating section
const StrengthRating: React.FC<StrengthRatingProps> = ({ strength }) => {
  return (
    <div className="flex">
      <p>STRENGTH</p>
      <p>{strength}</p>
      <StrengthBars strength={strength} />
    </div>
  );
};
//generates the 4 bars according to strength
const StrengthBars: React.FC<StrengthRatingProps> = ({ strength }) => {
  let colours: string[] = [];
  switch (strength) {
    case "TOO WEAK!":
      colours = ["red", "", "", ""];
      break;
    case "WEAK":
      colours = ["orange", "orange", "", ""];
      break;
    case "MEDIUM":
      colours = ["yellow", "yellow", "yellow", ""];
      break;
    case "STRONG":
      colours = ["neonGreen", "neonGreen", "neonGreen", "neonGreen"];
      break;
    default:
      colours = ["", "", "", ""];
  }

  const bars = (colours: string[]): React.ReactNode[] => {
    return colours.map((colour: string, index) => {
      return <Bar colour={colour} key={index} />;
    });
  };

  return <div className="flex">{bars(colours)}</div>;
};

interface BarProps {
  colour?: string;
}
//generates single bars, can be passed a colour.
const Bar: React.FC<BarProps> = ({ colour }) => {
  let boxStyle: string = "border border-almostWhite";

  if (colour) {
    boxStyle = `bg-${colour}`;
  }
  return <div className={`h-[28px] w-[10px] ${boxStyle}`}></div>;
};

//component for copy button

interface CopyButtonProps {
  password: string;
  copied: boolean;
  setCopied: React.Dispatch<SetStateAction<boolean>>;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  copied,
  setCopied,
  password,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const clickHandle = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <div className="absolute bottom-1/2 right-5">
      <p className="absolute right-10 text-neonGreen h-0">
        {copied ? "COPIED" : ""}
      </p>
      <div className="w-4 h-5">
        <svg
          className="hover:cursor-pointer"
          viewBox="0 0 21 24"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={clickHandle}
        >
          <path
            d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
            fill={isHovered ? "white" : "#A4FFAF"}
          />
        </svg>
      </div>
    </div>
  );
};
