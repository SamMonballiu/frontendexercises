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
    const messageView = document.createElement("li");
    const headerView = document.createElement("h2");
    headerView.appendChild(document.createTextNode(message.subject));

    const fromView = document.createElement("h3");
    fromView.appendChild(document.createTextNode("From: " + message.from));

    const messageBodyView = document.createElement("p");
    messageBodyView.appendChild(document.createTextNode(message.body));

    messageView.appendChild(headerView);
    messageView.appendChild(fromView);
    messageView.appendChild(messageBodyView);
    messageView.className = "messageContainer";

    return messageView;
}



function renderInbox(inbox) {
    const inboxView = document.createElement("ul");
    for (let i = 0; i < inbox.length; i++)
    {
        const messageView = renderArticle(inbox[i]);
        inboxView.appendChild(messageView);
    }
    return inboxView;
}

const view = renderInbox(inbox);
document.getElementById("root").appendChild(view);
