require ('./index.css');
const crel = require('crel');

let calculationMade = false;
const operators = "*/-+";

// HELP BUBBLE
const help = document.getElementById('help');
const header = crel('h1', 'Hey there!');
const textOne = crel('p', "You can click the buttons or the NumPad to perform all kinds of magical calculations on this wonderful device! Don't tell your friends, they will think you are a witch.");
const buttonGotIt = crel('button', "Got it");
buttonGotIt.addEventListener('click', removeHelpBubble)
function removeHelpBubble(event)
{
    if (event.target.textContent != "Got it") { return;}
    help.parentElement.removeChild(help);
}

help.appendChild(header);
help.appendChild(textOne);
help.appendChild(buttonGotIt);



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
display.id = "display";

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
const seasickButton = crel('button', 'Disable seasick mode');
seasickButton.classList.add('seasickBtn');
const seasickDiv = document.getElementById("seasick");
seasickDiv.appendChild(seasickButton);

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
seasickButton.addEventListener('click', removeSeaSick);

function removeSeaSick(event) {
    // special case for sea sick mode button
    if (event.target.textContent === "Disable seasick mode") {
        root.classList.remove('strobe');
        document.body.removeChild(document.getElementById('seasick'));
        return;
    }
}

// button click handler
function handleButtonClick(event) {
    // do nothing if we clicked something other than a button
    if (event.target.tagName !== "BUTTON") { return;}    
    
    const numbers = "0123456789";
    const buttonText = event.target.textContent;
    
    // if what is on the display right now is the result of a calculation, 
            // AND we either pressed a number key, OR the display currently shows the word "ERROR",
            // erase the display first, then carry on
    if ((numbers.includes(buttonText) && buttonText != "⇦" || display.textContent === "ERROR" )
        && calculationMade)  {
        display.textContent="";
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
        evaluateCalculation();
        return;
    }

    // don't let the user type a 0 as the first digit (it seems to crash eval, eg. eval(02.35 + 2) will crash)
    if (display.textContent === "-" || display.textContent === "") {
        if (buttonText === "0") {
            return;
        }
    }

    // decimals: add a decimal point, but only in these cases:
            // - there are no decimals yet, AND there are no operators (+, -, /, *) on the display yet
            // - there is a decimal already, but there is also an operator already, so we are on the second number and the decimal point can be safely placed
            // BUG: you can add as many decimals as you want as long as there is an operator in the text...
    if (buttonText === ",") {
        
        addDecimalToDisplay();
        return;
    }

        display.textContent += buttonText;
    
    // if there's two operators in the display, and the first one ISN'T minus (belonging to a negative number)
    // do the operation, put the result in the display, then add the last operator
    let maxOperators = 0;
    if (display.textContent[0] === '-') {
        maxOperators = 2;
        console.log(" ");
        console.log('char in first position is -')
        console.log("Operators in text: " + countOperators(display.textContent));
        console.log("Max operators: " + maxOperators);
    }
    else { 
        maxOperators = 1;
    }

    if (countOperators(display.textContent) > maxOperators ) {
        console.log('trimming last char then evaluating')
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);

        evaluateCalculation();
        display.textContent += buttonText;
    }

    // switch calculationMade to false, because if we've gotten to this stage, we've started work on a new calculation
    // so we don't need to clear the display before we type new stuff in
    calculationMade = false;
}


// keypress handler
document.addEventListener('keydown', handleKeyDown)
function handleKeyDown(event)
{
    console.log(event.key)

    switch (event.key.toLowerCase()) {
        // backspace
        case "backspace":
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            break;

        // decimal
        case ".":
        case ",":
            addDecimalToDisplay();
            break;

        // evaluate
        case "enter":
            document.activeElement.blur();
            evaluateCalculation();
            break;
        // clear everything
        case "delete":
            display.textContent = "";
            break;
    }

    if (arrayContainsElement("0123456789", event.key)) {
        if (display.textContent === "-" || display.textContent === "") {
            if (event.key === "0") {
                return;
            }
        }
        display.textContent += event.key;
    }

    if (arrayContainsElement("+-*/", event.key)) {
        console.log('Key pressed: ' + event.key);
        addOperatorToDisplay(event.key);
    }
}


// HELPER FUNCTIONS

function addOperatorToDisplay(operator) {
    console.log('inserting operator ' + operator);
    
    let maxOperators = 0;
    if (display.textContent[0] === '-') {
        maxOperators = 2;
        console.log(" ");
        console.log('char in first position is -')
        console.log("Operators in text: " + countOperators(display.textContent));
        console.log("Max operators: " + maxOperators);
    }
    else { 
        maxOperators = 1;
    }

    if (countOperators(display.textContent) > maxOperators ) {
        console.log('trimming last char then evaluating')
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);

        evaluateCalculation();
        display.textContent += operator;
    }

    else {
        display.textContent += operator;
    }
}

function addDecimalToDisplay()
{
    console.log("OPERATORS:" + countOperators(display.textContent));
        console.log("DECIMALS: " + countDecimals(display.textContent));
        
        if (countDecimals(display.textContent) > countOperators(display.textContent)) {
            return;
        }
        
        else {
            display.textContent += ".";
            calculationMade = false;
        }
}

function arrayContainsElement(array, element){
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return true;
        }
    }
    return false;
}

function countOperators(text) {
    let counter = 0;
    for (let i = 0; i < text.length; i ++)
    {
        if (operators.includes(text[i])) { counter++;}
    }

    return counter;
}

function countDecimals(text) {
    let counter = 0;
    for (let i = 0; i < text.length; i ++)
    {
        if (text[i] === ".") { counter++;}
    }
    return counter;
}

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

function evaluateCalculation()
{
    try {
        console.log("Evaluating the following: " + display.textContent);
        console.log(eval(display.textContent));
        display.textContent = eval(display.textContent);
    }
    
    catch {
        display.textContent = "ERROR";
    }

    finally {
        calculationMade = true;
    }

    
}

