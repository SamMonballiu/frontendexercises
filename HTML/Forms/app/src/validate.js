const crel = require('crel');
require('./index.css');

const oldpassword = document.getElementById("old_password");
const newpassword = document.getElementById("new_password");
const confirm = document.getElementById("confirm_password");

const inputs = [oldpassword, newpassword, confirm];

// document.getElementById("passwordForm")
for (let i = 0; i < inputs.length; i ++)
{
    inputs[i].addEventListener('input', doValidation)
}

function doValidation(event) {
    const errors = [];

    let noEmptyFields = true;
    if (oldpassword.value === "" || newpassword.value === "" || confirm.value === "") {
        noEmptyFields = false;
    }

    if (oldpassword.value === newpassword.value && noEmptyFields) {
        errors.push("New password cannot be the same as the old one.");
    }
    
    else if (newpassword.value !== confirm.value && newpassword.value !== "" && confirm.value !== "") {
        errors.push("Error: please confirm your passsword (passwords do not match).");
    }

    showErrors(errors);

    if (errors.length == 0 && noEmptyFields) {
        document.getElementById('submit-button').disabled = false;
    }

    else {
        document.getElementById('submit-button').disabled = true;
    }
}

function showErrors(errors) {
    const paragraphs = [];
    const div = document.getElementById('errorDiv');

    for (let i = 0; i < div.children.length; i ++)
    {
        div.removeChild(div.children[i]);
    }

    for (let i = 0; i < errors.length; i ++)
    {
        div.appendChild(crel('p', errors[i]));
    }
}


