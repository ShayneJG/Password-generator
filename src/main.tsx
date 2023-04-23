import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const colors = {
  red: "#F64A4A",
  orange: "#FB7C58",
  yellow: "#F8CD65",
  neonGreen: "#A4FFAF",
  almostWhite: "#E6E5EA",
  grey: "#817D92",
  darkGrey: "#24232C",
  veryDarkGrey: "#18171F",
};

const components = {
  Checkbox: {
    baseStyle: {
      control: {
        _checked: {
          bg: "neonGreen",
          borderColor: "neonGreen",
        },
        _hover: {
          borderColor: "neonGreen",
        },
      },
    },
  },
};

const theme = extendTheme({ colors, components });
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
