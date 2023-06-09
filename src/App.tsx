import { SetStateAction, useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import "./App.css";
import { Checkbox } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

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
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(false);
  const [num, setNum] = useState(false);
  const [sym, setSym] = useState(false);
  //state for strength
  const [strength, setStrength] = useState("");
  //state for copy button
  const [copied, setCopied] = useState(false);

  return (
    <div
      className="w-full m-auto max-w-sm lg:pt-10 md:max-w-[540px] h-full text-almostWhite font-jetBrainsMono 
"
    >
      <div id="container" className="p-5 mx-auto">
        <h1 className="font-bold text-base md:text-2xl mt-5 p-5 text-grey text-center">
          Password Generator
        </h1>
        <div className="relative">
          <input
            readOnly
            id="password"
            value={password}
            placeholder="P4$5W0rD!"
            className="w-full outline-none h-16 md:h-20 bg-darkGrey p-3 mb-4 text-almostWhite placeholder:opacity-20 font-bold text-2xl md:text-[32px] "
          />
          <CopyButton
            password={password}
            copied={copied}
            setCopied={setCopied}
          />
        </div>
        <div className="bg-darkGrey p-5">
          {/* options section */}
          <div id="option-container" className="">
            <div id="slider-container">
              <div className="flex justify-between font-bold items-center">
                <p className="text-base md:text-lg leading-[21px] text-almostWhite">
                  Character Length
                </p>
                <p className="text-neonGreen text-2xl md:text-[32px]">
                  {length}
                </p>
              </div>
              <Slider
                marginY={"1.0rem"}
                id="slider"
                min={0}
                max={20}
                defaultValue={length}
                onChange={(v) => {
                  setLength(v);
                }}
              >
                <SliderTrack bg={"#18171F"} height={"8px"} rounded={"none"}>
                  <SliderFilledTrack bg={"#A4FFAF"} />
                </SliderTrack>
                <SliderThumb
                  bg="almostWhite"
                  height={"28px"}
                  width={"28px"}
                  _hover={{
                    bg: "veryDarkGrey",
                    border: "2px solid",
                    borderColor: "neonGreen",
                  }}
                />
              </Slider>
            </div>
            <div id="check-container">
              {/* checkboxes */}
              <div className="flex flex-col">
                <Options
                  state={upper}
                  toggle={setUpper}
                  label="Include Uppercase Letters"
                />
                <Options
                  state={lower}
                  toggle={setLower}
                  label="Include Lowercase Letters"
                />
                <Options state={num} toggle={setNum} label="Include Numbers" />
                <Options state={sym} toggle={setSym} label="Include Symbols" />
              </div>
            </div>
          </div>
          <div id="strength">
            <StrengthRating strength={strength} />
          </div>
          <Tooltip
            hasArrow
            arrowSize={15}
            isDisabled={(upper || lower || sym || num) && length >= 4}
            label="Please tick at least one box and have a length of 4 or more!"
          >
            <button
              disabled={(!upper && !lower && !sym && !num) || length < 4}
              id="generate-button"
              className="flex items-center lg:mt-7 text-center group disabled:opacity-30 disabled:hover:cursor-not-allowed hover:border-neonGreen hover:border hover:text-neonGreen hover:bg-darkGrey bg-neonGreen text-darkGrey justify-center w-full h-14 md:h-16 box-content hover:cursor-pointer"
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
              <p className="pr-5 text-base leading-[21px] font-bold">
                GENERATE
              </p>
              <svg width="11" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="group-hover:fill-neonGreen"
                  d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
                />
              </svg>
            </button>
          </Tooltip>
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
    <div className="flex bg-[#18171F] my-3 h-14 md:h-[72px] p-5 justify-between items-center">
      <p className="text-grey text-base font-bold md:text-lg">STRENGTH</p>
      <div className="flex items-center">
        <p className="text-almostWhite text-lg md:text-2xl font-bold pr-2">
          {strength}
        </p>
        <StrengthBars strength={strength} />
      </div>
    </div>
  );
};
//generates the 4 bars according to strength
const StrengthBars: React.FC<StrengthRatingProps> = ({ strength }) => {
  let colours: string[] = [];
  switch (strength) {
    case "TOO WEAK!":
      colours = ["bg-red", "", "", ""];
      break;
    case "WEAK":
      colours = ["bg-orange", "bg-orange", "", ""];
      break;
    case "MEDIUM":
      colours = ["bg-yellow", "bg-yellow", "bg-yellow", ""];
      break;
    case "STRONG":
      colours = [
        "bg-neonGreen",
        "bg-neonGreen",
        "bg-neonGreen",
        "bg-neonGreen",
      ];
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
  let boxStyle: string = "border-2 border-almostWhite";

  if (colour) {
    boxStyle = `${colour}`;
  }
  return <div className={`h-[28px] w-[10px] mx-1 ${boxStyle}`}></div>;
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
      <div className="w-4 h-5 md:h-6 md:w-[21px]">
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

interface OptionsProps {
  state: boolean;
  toggle: React.Dispatch<SetStateAction<boolean>>;
  label: string;
}

const Options: React.FC<OptionsProps> = ({ state, toggle, label }) => {
  return (
    <Checkbox
      className="text-base md:text-lg leading-[21px] font-bold"
      id={label}
      marginBottom="0.7rem"
      spacing="1.2rem"
      iconColor="black"
      isChecked={state}
      onChange={(e) => toggle(e.target.checked)}
      rounded="none"
    >
      {label}
    </Checkbox>
  );
};
