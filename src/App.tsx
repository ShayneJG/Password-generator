import { useState } from "react";

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
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-almostWhite
"
    >
      <div id="container" className="w-[375px] h-[667px] bg-[#08070B]">
        <h1>Password Generator</h1>
        <div id="password">{password}</div>
        <div id="option-container">
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
        </div>
        <div id="strength"></div>
        <div id="generate-button"></div>
      </div>
    </div>
  );
}

export default App;

//functions
