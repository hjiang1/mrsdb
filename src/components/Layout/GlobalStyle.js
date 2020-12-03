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

  html {
    font-size: 16px;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }

  body {
    --maxPageWidth: 1400px;
    --primaryColor: #0f4c75;
    --headerHeight: 4rem;

    margin: 0;
  }
  
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    background: none;

    :focus {
      /* outline: none; */
    }
  }

  .button {
    padding: 0.5rem 1rem;
    font-weight: bold;

    font-size: 16px;

    border: 1px solid var(--primaryColor);
    border-radius: 0;

    color: white;
    background-color: var(--primaryColor);
    cursor: pointer;

    transition-property: color, background-color, border;
    transition-duration: 0.1s;
    transition-timing-function: ease;

    svg {
      transition: color 0.1s ease;
      color: white;
    }

    &.white {
      color: var(--primaryColor);
      background-color: white;
    }

    :hover {
      background-color: #bbe1fa;
      color: var(--primaryColor);

      svg {
        color: var(--primaryColor);
      }
    }

    &.cancel {
      color: var(--primaryColor);
      background: none;
      border: none;

      :hover {
        background: none;
      }
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

  table {
    border-collapse: collapse;

    tr,
    th {
      padding: 0.5rem;
    }
  }
`

export default GlobalStyle
