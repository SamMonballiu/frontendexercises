require ('./index.css');
const crel = require('crel');

const root = document.getElementById('root');
const buttonDiv = crel('div');
buttonDiv.classList.add('flex');

const display = crel('p',);
const displayDiv = crel('div', display);
displayDiv.classList.add('displayDiv');

root.appendChild(displayDiv);
root.appendChild(buttonDiv);


const buttonBackspace = crel('button', '⇦');
buttonBackspace.classList.add('numberButton');
buttonBackspace.classList.add('doubleWidth');

const buttonCE = crel('button', 'CE');
buttonCE.classList.add('numberButton');
buttonCE.classList.add('doubleWidth');

const specialButtonsDiv = crel('div', buttonCE, buttonBackspace);
specialButtonsDiv.classList.add('flex');
root.appendChild(specialButtonsDiv);

const buttonOne = crel('button', '1');
const buttonTwo = crel('button', '2');
const buttonThree = crel('button', '3');
const buttonFour = crel('button', '4');
const buttonFive = crel('button', '5');
const buttonSix  = crel('button', '6');
const buttonSeven = crel('button', '7');
const buttonEight = crel('button', '8');
const buttonNine = crel('button', '9');
const buttonZero= crel('button', '0');
const buttonDecimal = crel('button', ',');
const buttonEquals = crel('button', '=');

const buttonAdd = crel('button', '+');
const buttonSubtract = crel('button', '-');
const buttonMultiply = crel('button', '*');
const buttonDivide = crel('button', '/');



const numberButtons = crel('div', 
    buttonSeven,
    buttonEight, 
    buttonNine, 

    buttonFour, 
    buttonFive, 
    buttonSix, 

    buttonOne, 
    buttonTwo, 
    buttonThree, 

    buttonDecimal,
    buttonZero,
    buttonEquals,
);

for (let i = 0; i < numberButtons.children.length; i ++) {
    numberButtons.children[i].classList.add('numberButton');
}
numberButtons.classList.add("numberbuttonPad");

const operatorButtons = crel('div', buttonAdd, buttonSubtract, buttonMultiply, buttonDivide);
for (let i = 0; i < operatorButtons.children.length; i ++) {
    operatorButtons.children[i].classList.add('numberButton');
}
operatorButtons.classList.add("operatorbuttonPad");

buttonDiv.appendChild(numberButtons);
buttonDiv.appendChild(operatorButtons);

root.addEventListener('click', handleButtonClick)

function handleButtonClick(event) {
    if (event.target.tagName !== "BUTTON") { return;}    
    if (display.textContent === "ERROR") {
        display.textContent ="";
    }

    const buttonText = event.target.textContent;
    
    // CE button
    if (buttonText === "CE") {
        console.log("yaaaay");
        display.textContent = "";
        return;
    }

    // backspace
    if (buttonText === "⇦") {
        console.log("backspace");
        display.textContent = display.textContent.substring(0, display.textContent.length-1);
        return;
    }

    // equals
    if (buttonText === "=") {
        console.log('equals');
        
        evaluate();
        return;
    }

    // decimals
    if (buttonText === ",") {
        if (contains(display.textContent, ",")) {
            if (getLastCharacter(display.textContent) === ".") {
                return;
            }
        }
        display.textContent += ".";
        return;
    }

    if (!containsOperator(buttonText)) {

        console.log('clicked operator');
        if (display.textContent === "" && buttonText !== "-") {
            console.log("can't insert operator here")
            return;
        }

        if (!containsOperator(display.textContent)) {
            console.log('operator already in string');
            evaluate();
            display.textContent += buttonText;
        }

        else {
            display.textContent +=  buttonText;
        }
    }

    else {
        display.textContent += buttonText;
    }

}

function containsOperator(text)
{
    console.log("is operator? " + text);
    const operators = ['*', '/', '-', '+',];
    for (let i = 0; i < text.Length; i ++){
        console.log(text[i]);
        if (operators.includes(text[i]))
        {
            return false;
        }
    }
    return true;
}

function getLastCharacter(string) {
    return string[string.length];
}

function contains(text, character){
    for (let i = 0; i < text.length; i++) {
        if (text[i] === character) {
            return true;
        }
    }
    return false;
}

function evaluate()
{
    try {
        console.log(eval(display.textContent));
        display.textContent = eval(display.textContent);
    }

    catch {
        display.textContent = "ERROR";
    }
}

