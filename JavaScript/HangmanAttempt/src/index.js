require('./index.css');
const crel = require('crel');

document.title="Hangman";

const bar = document.getElementById('myBar');

const revealString = "Reveal the word";
const newGameString = "Play again";

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
];

const word = words[Math.floor(Math.random()*words.length)]; // pick word from list


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

//finalDiv.appendChild(revealButton);
document.body.appendChild(finalDiv);

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

    // bad guess: make the button red
    if (!word.includes(letter)){
        
        event.target.classList.add("redbackground");
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

        if (noClassListContains(lettersDiv.children, "invisible"))
        {
            handleWinState();
        }
    }
    
}

function handleWinState() {
    const header = crel('h3', 'You guessed the word!');
    finalDiv.appendChild(header);
    finalDiv.appendChild(newGameButton);
    document.body.removeChild(buttonsDiv);
}


function noClassListContains(elements, cssClass) {
    for (let i = 0; i < elements.length; i++) {

        const list = [].slice.apply(elements[i].classList);
        console.log(elements[i] + ": Looking at " + list);

        if (list.includes(cssClass)) {
            console.log(elements[i].textContent + " is " + cssClass)
            return false;
        }
    }
    return true;
}


