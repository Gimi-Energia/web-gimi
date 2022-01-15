import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    --webkit-font-smoothing: antialiased;
    font-family: 'Roboto', 'Sans Serif';
    background: #fafafa;
    color: #212121;
  }

  button {
    cursor: pointer;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  li {
    list-style: none;
  }
`;
