require ("./index.css");

// declare an array of articles
// const articles = [
//     document.getElementById("articleOne"),
//     document.getElementById("articleTwo"),
//     document.getElementById("articleThree")
// ];

const articles = document.getElementsByTagName("article"); // loosely coupled way of getting the articles present

// declare an array of the links in the nav bar
// const navlinks = [
//     document.getElementById("navOne"),
//     document.getElementById("navTwo"),
//     document.getElementById("navThree"),
// ];
const navlinks = document.getElementsByTagName("a"); // loosely coupled way of getting all the links on the page.

// declare dict
const dict = [];

// fill dict
for (let i = 0; i < navlinks.length; i++)
{
    const link = navlinks[i];
    // const href = (navlinks[i].href).substring((window.location.origin + "/#").length);
    // const href = (navlinks[i].href).substring(navlinks[i].href.indexOf("#")+1);
    const href = navlinks[i].hash.substring(1); //optimal
    
    if (href.length > 0) {
        dict[link] = href;
        dict.push({
            key: link,
            value: href
        });
    }
}

console.log(dict);

makeAllInvisible(articles);
document.addEventListener('click', handleClick, false);

function handleClick(event)
{
    console.log('clicked: ', arguments);

    const parent = event.target.parentElement.parentElement;
    console.log(parent);

    let containerArticles = [];
    for (let i = 0; i < articles.length; i++)
    {
        if (Object.is(articles[i].parentElement.parentElement, parent))
        {
            containerArticles.push(articles[i]);
        }
    }

    console.log(containerArticles);

    if (event.target.nodeName.toLowerCase() !== "a") { return;} // don't do anything if the thing we clicked isn't a link (<a>)
    if (event.target.hash.length === 0) // handle links that go off the page. Those don't need to be looked up in the dictionary because they are not in it
    {
        alert('clicked a link that goes off the page');
        console.log("clicked a link, but it is not a local one.");
        return;
    }

    // make all articles invisible (add .noDisplay css class) and strip all css classes from link in nav-bar (unselect all)
    makeAllInvisible(containerArticles);
    removeCssClasses(navlinks);

    event.target.classList.add("selected");

    // iterate thru dict
    for (let i = 0; i < dict.length; i++) {
        
        if (Object.is(dict[i].key, event.target))
        {
            const value = dict[i].value;
            if (articles[value] == null) {
                console.log("clicked a nav bar link, but no corresponding article found with the following id: " + dict[i].value);
                return;
            }
            articles[value].className = "";
            break;
        }
    }

    // const index = getIndexOfElementInListById(articles, href);
    // if (index !== -1)
    // {
    //     navlinks[index].className += " selected"; // add selected css class to link in nav bar
    //     articles[index].className = ""; // remove "noDisplay" css class from selected article
    // }

    // else console.log("clicked a nav bar link, but no corresponding article found for the link's href: " + href);
}


function removeCssClasses(articles)
{
    for (let i = 0; i < articles.length; i ++)
    {
        articles[i].className = "";
    }
}

function makeAllInvisible(articles)
{
    for (let i = 0; i < articles.length; i ++)
    {
        articles[i].className += " noDisplay";
    }
}

// function getIndexOfElementInListById(list, id)
// {
//     for (let i = 0; i < list.length; i ++)
//     {
//         if (list[i].id === id)
//         {
//             return i;
//         }
//     }
    
//     return -1;
// }

