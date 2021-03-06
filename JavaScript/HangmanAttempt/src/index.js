require('./index.css');
const crel = require('crel');

document.title="Hangman";

const revealString = "Reveal the word";
const newGameString = "Play again";

let score = 9;

// declare the alphabet
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// declare the list of words
const words = [
    "factory",
    "java",
    "javascript",
    "function",
    "method",
    "static",
    "public",
    "private",
    "void",
    "document",
    "body",
    "child",
    "random",
    "mathematics",
    "letter",
    "keyword",
    "warning",
    "value",
    "assign",
    "man",
    "mountain",
    "state",
    "ocean",
    "country",
    "building",
    "airline",
    "love",
    "wealth",
    "happiness",
    "pride",
    "fear",
    "religion",
    "belief",
    "history",
    "communication",
    "photograph",
    "banana",
    "light",
    "sunlight",
    "snowflake",
    "luggage",
    "music",
];

const word = words[Math.floor(Math.random()*words.length)]; // pick word from list
console.log(word);

const wrongGuesses = [];

document.body.appendChild(crel('h2', 'Guess the word!'));

var lettersDiv = crel('div');
lettersDiv.classList.add("flex"); //display the letters next to each other instead of under each other
document.body.appendChild(lettersDiv);

const buttonsDiv = crel('div');
document.body.appendChild(buttonsDiv);

// add a button to buttonsDiv for every letter of the alphabet
for (let i = 0; i < alphabet.length; i++) {
    const newButton = crel('button', alphabet[i]);
    newButton.classList.add("letterbutton");
    newButton.classList.add("neutralbackground");
    buttonsDiv.appendChild(newButton);
}

// add a <p> to lettersDiv for every letter in the word
for (let i = 0; i < word.length; i++) {
    const letterLabel = crel('p', word[i]);
    letterLabel.classList.add("invisible");
    lettersDiv.appendChild(letterLabel);
}
const finalDiv = crel('div');
const revealButton = crel('button', revealString);
const newGameButton = crel('button', newGameString);    


const scoreLabel = (crel('label', score));
const scoreDiv = crel('div', scoreLabel);

//finalDiv.appendChild(revealButton);
document.body.appendChild(finalDiv);
document.body.appendChild(scoreDiv);
updateScore();

// add event listener to the document
document.addEventListener('click', handleClick, false);

function handleClick(event){
    // do nothing if the event target is not a button
    if (event.target.nodeName.toLowerCase() !== "button") {
        return;
    }

    // special case for when the user clicks the button to reveal the word
    if (event.target.textContent === revealString || event.target.textContent === newGameString)
    {
        if (event.target.textContent === newGameString)
        {
            window.location.reload();
            return;
        }

        for (let i = 0; i < lettersDiv.children.length; i++) {
            lettersDiv.children[i].classList.remove("invisible");
        }

        document.body.removeChild(buttonsDiv);
        finalDiv.removeChild(event.target);
        finalDiv.appendChild(newGameButton);
        return;
    }
    event.target.classList.remove("neutralbackground");

    // get the letter from the button that was clicked
    const letter = event.target.textContent;

    // bad guess: make the button red, subtract a point from the score
    if (!word.includes(letter)){
        
        if (wrongGuesses.includes(letter)) { return;}

        event.target.classList.add("redbackground");
        wrongGuesses.push(letter);
        console.log(wrongGuesses);
        score--;
        updateScore();
        if (score == 0) {
            handleLoseState()
        };
    }

    // good guess: make correctly guessed letters visible, make button green
    else {
        event.target.classList.add("greenbackground");
        
        for (let i = 0; i < lettersDiv.children.length; i++) {
            if (lettersDiv.children[i].textContent === letter)
            {
                lettersDiv.children[i].classList.remove("invisible");
            }
        }

        // if there are no more invisible letters, that means every letter has been guessed (throw a party)
        if (noClassListContains(lettersDiv.children, "invisible"))
        {
            handleWinState();
        }
    }
}

function updateScore() {
    
    const guess = score == 1 ? "guess" : "guesses";
    scoreLabel.textContent = "You have " + score + " " + guess+ " left.";
}

function handleWinState() {
    const header = crel('h3', 'You guessed the word!');
    finalDiv.appendChild(header);
    finalDiv.appendChild(newGameButton);
    document.body.removeChild(buttonsDiv);
    document.body.removeChild(scoreDiv);
}

function handleLoseState() {
    const header = crel('h3', "You didn't guess the word in time...");
    const solutionDiv = crel('div', "The word was: " + word);
    finalDiv.appendChild(header);
    finalDiv.appendChild(solutionDiv);
    finalDiv.appendChild(newGameButton);
    document.body.removeChild(buttonsDiv);
    document.body.removeChild(scoreDiv);
}

function noClassListContains(elements, cssClass) {
    for (let i = 0; i < elements.length; i++) {
        const list = [].slice.apply(elements[i].classList);
        if (list.includes(cssClass)) {
            return false;
        }
    }
    return true;
}


