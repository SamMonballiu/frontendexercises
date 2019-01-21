require('./index.css'); /*adds content of index.css in JS */


// const para = document.createElement("PARAGRAPH");
// para.appendChild(document.createTextNode("hello world"));
// document.getElementById("root").appendChild(para);

// append text node to document body
// document.body.appendChild(
//     document.createTextNode("hello world"));

const heading = document.createElement("h1");
heading.id = "testId";
heading.appendChild(document.createTextNode("Hello World"));
document.getElementById("root").appendChild(heading);

const inbox = [
    {
      subject: "What's happening", 
      from: "waldo", 
      body: "I'm trapped inside my PC, hjälp" 
    },

    {
      subject: "Make your p33n larger", 
      from: "Totalegit Pharmacy", 
      body: "you know..."
    },

    {
      subject: 
    "Meeting details for Sat 19/01", 
    from: "Shift supervisor", 
    body: "Hey we're meeting up next saturday to discuss flower pots. Everybody bring your A game!"
    },
];



function renderArticle(message){
    const messageView = document.createElement("li"); // make a listitem to go in the unordered list
    const headerView = document.createElement("h2"); // make header, then insert message subject
    headerView.appendChild(document.createTextNode(message.subject));

    const fromView = document.createElement("h3"); // make from field (as h3), insert message author
    fromView.appendChild(document.createTextNode("From: " + message.from));

    const messageBodyView = document.createElement("p"); // make body paragraph, insert message body
    messageBodyView.appendChild(document.createTextNode(message.body));

    messageView.appendChild(headerView); // append header, author and body to listitem
    messageView.appendChild(fromView);
    messageView.appendChild(messageBodyView);
    messageView.className = "messageContainer"; // css trickery

    return messageView;
}



function renderInbox(inbox) {
    const inboxView = document.createElement("ul"); // make unordered list that will contain messages as listitems
    for (let i = 0; i < inbox.length; i++)
    {
        const messageView = renderArticle(inbox[i]); // make a listitem, fill it with the message details
        inboxView.appendChild(messageView); // add the listitem to the unordered list
    }
    return inboxView;
}

const view = renderInbox(inbox);
document.getElementById("root").appendChild(view);
