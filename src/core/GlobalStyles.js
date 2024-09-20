import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  };

  *, ::after, ::before {
    box-sizing: inherit;
  };

  body {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 0.3fr 1fr;
    grid-template-areas: 
      "nav nav nav nav"
      "aside main main main"
      "aside main main main";
    grid-gap: 8px;
    margin: 0;
    padding: 8px 10px;
    word-break: break-word;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.codGray};
    font-family: "Lexend Deca", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  };
`;