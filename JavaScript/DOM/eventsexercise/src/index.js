require ("./index.css");

// declare an array of articles
const articles = [
    document.getElementById("articleOne"),
    document.getElementById("articleTwo"),
    document.getElementById("articleThree")
];

// declare an array of the links in the nav bar
const navlinks = [
    document.getElementById("navOne"),
    document.getElementById("navTwo"),
    document.getElementById("navThree"),
];

makeAllInvisible(articles);

document.addEventListener('click', handleClick, false);

function handleClick(event)
{
    console.log('clicked: ', arguments);
    if (event.target.nodeName.toLowerCase() !== "a") { return;} // don't do anything if the thing we clicked isn't a link (<a>)

    const href = (event.target.href).substring((window.location.origin + "/#").length);

    // make all articles invisible (add .noDisplay css class) and strip all css classes from link in nav-bar (unselect all)
    makeAllInvisible(articles);
    removeCssClasses(navlinks);

    const index = getIndexOfElementInListById(articles, href);
    if (index !== -1)
    {
        navlinks[index].className += " selected"; // add selected css class to link in nav bar
        articles[index].className = ""; // remove "noDisplay" css class from selected article
    }

    else console.log("clicked a nav bar link, but no corresponding article found for the link's href: " + href);
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

function getIndexOfElementInListById(list, id)
{
    for (let i = 0; i < list.length; i ++)
    {
        if (list[i].id === id)
        {
            return i;
        }
    }
    
    return -1;
}

