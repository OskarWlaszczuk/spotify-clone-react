import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  };

  *, ::after, ::before {
    box-sizing: inherit;
  };

  body {
    margin: 0;
    padding: 5px 10px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.codGray};
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  };
`;