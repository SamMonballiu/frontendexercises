require ('./index.css');
const crel = require('crel');

let calculationMade = false;

// get the div that has 'root' id
const root = document.getElementById('root');
root.classList.add('strobe');

// create a div to hold the buttons, give it appropriate CSS class
const buttonDiv = crel('div');
buttonDiv.classList.add('flex');

// create a div to display the results, give it appropriate CSS class
const display = crel('p',);
const displayDiv = crel('div', display);
displayDiv.classList.add('displayDiv');

// put both divs in the root
root.appendChild(displayDiv);
root.appendChild(buttonDiv);



// create clear button, add CSS classes
const buttonCE = crel('button', 'CE');
buttonCE.classList.add('numberButton');
buttonCE.classList.add('doubleWidth');
buttonCE.classList.add('redHover');

// create equals button, add CSS classes
const buttonEquals = crel('button', '=');
buttonEquals.classList.add('numberButton');
buttonEquals.classList.add('doubleWidth');
buttonEquals.classList.add('equalsBtn');

// create div for double-wide buttons (CE & Equals), add to root
const doubleWideButtonsDiv = crel('div', buttonCE, buttonEquals);
doubleWideButtonsDiv.classList.add('flex');
root.appendChild(doubleWideButtonsDiv);

// create sea sick mode div & buttons, add to root
const seasickButton = crel('button', 'Disable sea sick mode');
seasickButton.classList.add('seasickBtn');
const seasickDiv = crel('div', seasickButton);
root.appendChild(seasickDiv);


// create buttons to put in the numberButtons div
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
const buttonBackspace = crel('button', '⮘');
buttonBackspace.classList.add('redHover');

// create buttons to put in the operatorButtons div
const buttonAdd = crel('button', '+');
const buttonSubtract = crel('button', '-');
const buttonMultiply = crel('button', '*');
const buttonDivide = crel('button', '/');

// make div, put the numbers buttons in it (+ decimal & backspace buttons)
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
    buttonBackspace,
);

// add css class to every numbers button
for (let i = 0; i < numberButtons.children.length; i ++) {
    numberButtons.children[i].classList.add('numberButton');
}
numberButtons.classList.add("numberbuttonPad");

// make div for operator buttons, add css class to every button
const operatorButtons = crel('div', buttonAdd, buttonSubtract, buttonMultiply, buttonDivide);
for (let i = 0; i < operatorButtons.children.length; i ++) {
    operatorButtons.children[i].classList.add('numberButton');
}
operatorButtons.classList.add("operatorbuttonPad");

// put number & operator buttons divs in the general buttons div
buttonDiv.appendChild(numberButtons);
buttonDiv.appendChild(operatorButtons);

// add event listener to the root div
root.addEventListener('click', handleButtonClick)

function handleButtonClick(event) {
    // do nothing if we clicked something other than a button
    if (event.target.tagName !== "BUTTON") { return;}    
    
    const numbers = "0123456789";
    const buttonText = event.target.textContent;
    
    // if what is on the display right now is the result of a calculation, 
            // AND we either pressed a number key, OR the display currently shows the word "ERROR",
            // erase the display first, then carry on
    if ((numbers.includes(buttonText) && buttonText != "⇦" 
        || display.textContent === "ERROR" )
        && calculationMade
        )  {
        display.textContent="";
    }

    // special case for sea sick mode button
    if (buttonText === "Disable sea sick mode") {
        root.classList.remove('strobe');
        root.removeChild(seasickDiv);
        return;
    }

    // CE button: clear display
    if (buttonText === "CE") {
        display.textContent = "";
        return;
    }

    // backspace : remove last character from the display
    if (buttonText === "⮘") {
        display.textContent = display.textContent.substring(0, display.textContent.length-1);
        return;
    }

    // equals: calculate & show result
    if (buttonText === "=") {
        evaluate();
        return;
    }

    // decimals: add a decimal point, but only in these cases:
            // - there are no decimals yet, AND there are no operators (+, -, /, *) on the display yet
            // - there is a decimal already, but there is also an operator already, so we are on the second number and the decimal point can be safely placed
            // BUG: you can add as many decimals as you want as long as there is an operator in the text...
    if (buttonText === ",") {
        
        if (display.textContent.includes(".")) {
            if (display.textContent.indexOf(",") > getFirstIndexOfOperator(display.textContent)) 
            {
                return;
            }
        }
        display.textContent += ".";
        return;
    }

    // operators: if you click the plus, minus, multiply or divide buttons,
            // check if there's already an operator in the display, if so: refuse to place another one
                    // unless the one already in there is a minus (for instance if the display reads "-64")
            
            // if not, add it to the display
            // and switch calculationMade to false
    if (containsOperator(buttonText)) {

        console.log('clicked operator');
        if (display.textContent === "" && buttonText !== "-") {
            console.log("can't insert operator here")
            return;
        }

        console.log("current: " + display.textContent)

        if (containsOperator(display.textContent)) {
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

    calculationMade = false;
}

// HELPER FUNCTIONS

function containsOperator(text) {
    const operators = "*/-+.";

    return Array.from(text).reduce((x,y) => operators.includes(x) ? x : y).length == 0
}

// older version
// function containsOperator(text)
// {
//     const operators = "*/-+.";

//     for (let i = 0; i < operators.length; i ++){
//         if (text.includes(operators[i])) {
//             return true;
//         }
//     }

//     return false;
// }

function getFirstIndexOfOperator(text)
{
    const operators = "*/-+";

    for (let i = 0; i < operators.length; i ++){
        if (text.includes(operators[i])) {
            return text.indexOf(operators[i]);
        }
    }

    return false;
}

function evaluate()
{
    try {
        console.log(eval(display.textContent));
        display.textContent = eval(display.textContent);
        calculationMade = true;
    }
    
    catch {
        display.textContent = "ERROR";
    }
    
}

