// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


const button = document.getElementById('button-printer-friendly');
const buttonDiv = document.getElementById('button-container');
const container = document.getElementById('body-container');

button.addEventListener('click', makePrinterFriendly);


function makePrinterFriendly()
{
    document.body.style.background = 'none';
    const container = document.getElementById('body-container');
    buttonDiv.classList.add('display-none');
    container.classList.remove('black-border');
    container.classList.add('width-100');
    container.classList.add('page-margin');
    container.classList.add('print-friendly');
    window.print();
}