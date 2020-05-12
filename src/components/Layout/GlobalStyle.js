import { createGlobalStyle } from "styled-components"

import LatoFont from "../../fonts/Lato-Regular.ttf"

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Lato";
    src: url(${LatoFont});
  }

  * {
    font-family: 'Lato';
  }

  body {
    --maxPageWidth: 1400px;
    --primaryColor: #0f4c75;
    --headerHeight: 4rem;
  }
  
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    background: none;

    :focus {
      outline: none;
    }
  }

  .button {
    padding: 0.2rem 1rem;
    font-weight: bold;

    border: 2px solid var(--primaryColor);
    border-radius: 3px;

    color: white;
    background-color: var(--primaryColor);
    cursor: pointer;

    transition-property: color, background-color, border;
    transition-duration: 0.1s;
    transition-timing-function: ease;

    &.white {
      color: var(--primaryColor);
      background-color: white;
    }

    :hover {
      background-color: #bbe1fa;
      color: var(--primaryColor);
    }

    &.disabled {
      background-color: lightgray;
      cursor: default;
      border-color: gray;
      color: gray;

      svg {
        color: gray !important;
      }
    }
  }
`

export default GlobalStyle
