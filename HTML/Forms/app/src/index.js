require ('./index.css');
require('./validate.js');


const btnShow = document.getElementById("btnShowPasswords");
let passwordsVisible = false;

btnShow.addEventListener('click', showPasswords, false);



function showPasswords(event) {
    let input;
    const eyeButton = document.getElementById("btnShowPasswords");

    if (!passwordsVisible) {
        input = Array.from(document.getElementsByClassName("hidden-password"));
        for (let i = 0; i < input.length; i++) {

            input[i].setAttribute("type", "text");
            input[i].classList.add("visible-password");
            input[i].classList.remove("hidden-password");
        }
    }
        eyeButton.classList.remove('eye-button-off');
        eyeButton.classList.add('eye-button-on');

        if (passwordsVisible) {
            input = Array.from(document.getElementsByClassName("visible-password"));
            for (let i = 0; i < input.length; i++) {
                input[i].setAttribute("type", "password");
                input[i].classList.add("hidden-password");
                input[i].classList.remove("visible-password");
            }

            eyeButton.classList.remove('eye-button-on');
            eyeButton.classList.add('eye-button-off');
        }

        passwordsVisible = !passwordsVisible;


    }

