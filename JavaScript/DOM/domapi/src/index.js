require('./index.css'); /*adds content of index.css in JS */
const crel = require('crel') /* (first do 'add yarn crel') equiv. of 'using crel;' */

const heading = document.createElement("h1");
heading.id = "testId";
heading.appendChild(document.createTextNode("Hello World"));
document.getElementById("root").appendChild(heading);

const inbox = [
    {
      subject: "What's happening", 
      from: "Waldo", 
      email: "waldo@emerson.com",
      body: "I'm trapped inside my PC, hjälp" 
    },

    {
      subject: "Make your p33n larger", 
      from: "Totalegit Pharmacy", 
      email: "totalegit@notshady.gov",
      body: "you know..."
    },

    {
      subject: 
    "Meeting details for Sat 19/01", 
    from: "Shift supervisor", 
    email: "supervisor@workplace.official",
    body: "Hey we're meeting up next saturday to discuss flower pots. Everybody bring your A game!"
    },
];



function renderMessage(message){
    // const messageView = document.createElement("li"); // make a listitem to go in the unordered list
    // const headerView = document.createElement("h2"); // make header, then insert message subject
    // headerView.appendChild(document.createTextNode(message.subject));

    // const fromView = document.createElement("h3"); // make from field (as h3), insert message author
    // fromView.appendChild(document.createTextNode("From: " + message.from));

    // const messageBodyView = document.createElement("p"); // make body paragraph, insert message body
    // messageBodyView.appendChild(document.createTextNode(message.body));

    // messageView.appendChild(headerView); // append header, author and body to listitem
    // messageView.appendChild(fromView);
    // messageView.appendChild(messageBodyView);
    // messageView.className = "messageContainer"; // css trickery

    const messageView = crel('li',
        { 'class': "messageContainer"},
        crel('h2', message.subject),
        crel('h3', "From: " + message.from),
        crel('a', {href: "mailto:" + message.email }, message.email),
        crel('p', message.body),
    );

    return messageView;
}

function renderInbox(inbox) {
    // //const inboxView = document.createElement("ul"); // make unordered list that will contain messages as listitems
    // const inboxView = crel("ul");
    // for (let i = 0; i < inbox.length; i++)
    // {
    //     const messageView = renderMessage(inbox[i]); // make a listitem, fill it with the message details
    //     inboxView.appendChild(messageView); // add the listitem to the unordered list
    // }
    // return inboxView;

    const inboxView = crel("ul", inbox.map(renderMessage));
    console.log('render inbox: ', inbox, inboxView);
    return inboxView;
}

const view = renderInbox(inbox);
document.getElementById("root").appendChild(view);
