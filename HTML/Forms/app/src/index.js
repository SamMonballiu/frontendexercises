require ('./index.css');

const btnShow = document.getElementById("btnShowPasswords");
let passwordsVisible = false;

btnShow.addEventListener('click', showPasswords, false);

function showPasswords(event) {
    let input;
    
    if (!passwordsVisible) {
        input = Array.from(document.getElementsByClassName("hidden-password"));
        for (let i = 0; i < input.length; i++) {
            
            input[i].setAttribute("type", "text");
            input[i].classList.add("visible-password");
            input[i].classList.remove("hidden-password");
        }
    }

    if (passwordsVisible) {
        input = Array.from(document.getElementsByClassName("visible-password"));
        for (let i = 0; i < input.length; i++) {
            input[i].setAttribute("type", "password");
            input[i].classList.add("hidden-password");
            input[i].classList.remove("visible-password");
        }
    }

    passwordsVisible = !passwordsVisible;

}