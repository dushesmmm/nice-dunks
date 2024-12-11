import React from 'react';
import App from './App';
<<<<<<< HEAD
import { hydrate, render } from 'react-dom';
 
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
=======


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
>>>>>>> 61e66f90a786f08d8bde6db3da65185ed0eb6b67
