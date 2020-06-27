import React from 'react';
import { render } from 'react-dom';

const mainElement = document.createElement('div');

document.body.appendChild(mainElement);

const App = () => {
  return <h1>Hi from a react app 123</h1>;
};

render(<App />, mainElement);
