// print de getallen tussen 0 en 100
for (let i = 0; i <= 100; i++)
{
    console.log(i)
}

// grootste getal uit een lijst
function getLargest(arguments)
{
    // let largest = arguments[0];
    // for (let i = 0; i < arguments.length; i++)
    // {
    //     if (arguments[i] > largest)
    //     {
    //         largest = arguments[i]
    //     }
    // }
    // return largest;
    return arguments.reduce((x,y) => x > y ? x : y)
}

// langste string uit lijst
function getLongestString(arguments)
{
    // let longest = "";
    // for (let i = 0; i < arguments.length; i++)
    // {
    //     if (arguments[i].length > longest.length)
    //     {
    //         longest = arguments[i];
    //     }
    // }
    //return longest;

    return arguments.reduce((x,y) => x.length > y.length ? x : y );
}

const names = ["Abigail", "John", "Jack", "Dwight", "Arthur"]
const result = getLongestString(names);
console.log(result)


// gemiddelde van een lijst getallen
function getAverage(arguments)
{
    let sum = 0;
    for (let i = 0; i < arguments.length; i++)
    {
        sum += arguments[i];
    }

    return sum / arguments.length
}

const numbers = [12,14,18,16]
const average = getAverage(numbers)
console.log(average)
console.log(getLargest(numbers))

// check of een string een palindroom is
function isPalindrome(phrase)
{
    // //let phraseAsArray = []
    // let phraseAsArray = Array.from(phrase)

    // for (let i = 0; i < phrase.length; i++)
    // {
    //     phraseAsArray[i] = phrase[i]
    // }

    return Array.from(phrase).toString() == Array.from(phrase).reverse().toString();
}

console.log(isPalindrome("amanaplanacanalpanama"))