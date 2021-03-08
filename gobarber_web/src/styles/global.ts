import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --background  : #312E38;
  --input       : #232129;
  --dark        : #28262E;
  --shape       : #3E3B47;
  --text-dark   : #666360;
  --text        : #999591;
  --white       : #F4EDE8;
  --primary     : #FF9000;
}

* {
  clear: both;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
  border: 0;
}

body, input, button, textarea, select {
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
}

body {
  background: var(--background);
  color: var(--white);
 
}

h1, h2, h3, h4, h5, h6, b, strong {
  font-weight: 500;
}

`;
