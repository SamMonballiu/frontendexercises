import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

const helloWorld = <h1>Hi!</h1>
console.log(helloWorld);

const root = document.getElementById('root');

ReactDOM.render(
    <div className="grayBackground">
        <h1>Hello, world!</h1>
        <p>I'm just embedding elements all day long.</p>
        <div className = "whiteBackground">
        <p>text text text</p>
        </div>
    </div>,
    document.getElementById('root')
  );

class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }

class Initial extends React.Component {
    render () {
        return <div>
            <Welcome name="Sara"/>
            <Intro />
        </div>
    }
}

class Intro extends React.Component {
render() {
    return <p>intro text blablabla</p>
  }
}

  // any render calls to the same element supersede previous renders
  ReactDOM.render(<Initial/>, root);
