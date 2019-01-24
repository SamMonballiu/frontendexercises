console.log("running");

document.addEventListener('click', handleClick, false);

function handleClick(event) {
    const types = [ "text", "email"];

    if (event.target.nodeName.toLowerCase() === "input" &&  types.includes(event.target.type.toLowerCase())
    || event.target.nodeName.toLowerCase() === "textarea")
    {
        event.target.setAttribute("value", "");
    }
}