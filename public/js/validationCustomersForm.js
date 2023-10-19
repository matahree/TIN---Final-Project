function validateForm() {

    // input constants
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const addressInput = document.getElementById('address');
    const emailInput = document.getElementById('email');

    // error constants
    const errorName = document.getElementById('errorName');
    const errorSurname = document.getElementById('errorSurname');
    const errorAddress = document.getElementById('errorAddress');
    const errorEmail = document.getElementById('errorEmail');

    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')

    // reset errors
    resetErrors([nameInput, surnameInput, addressInput, emailInput], [errorName, errorSurname, errorAddress, errorEmail], errorsSummary);

    let valid = true;

    // validate name
    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "The field is required.";
    }
    else if (!checkTextLengthRange(nameInput.value, 3, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "This field should contain 3 to 60 characters.";
    }

    // validate surname
    if (!checkRequired(surnameInput.value)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "The field is required.";
    }
    else if (!checkTextLengthRange(surnameInput.value, 3, 60)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "This field should contain 3 to 60 characters.";
    }

    // validate address
    if (!checkRequired(addressInput.value)) {
        valid = false;
        addressInput.classList.add("error-input");
        errorAddress.innerText = "The field is required.";
    }
    else if (!checkTextLengthRange(addressInput.value, 3, 60)) {
        valid = false;
        addressInput.classList.add("error-input");
        errorAddress.innerText = "This field should contain 3 to 60 characters.";
    }

    // validate e mail
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "The field is required.";
    }
    else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "This field should contain 5 to 60 characters.";
    }
    else if (!checkEmail(emailInput, value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "The field should contain a valid email address."
    }

    // validate summary
    if (!valid)
        errorsSummary.innerText = "Form contains errors.";

    return valid;
}

// VALIDATION COMMON 


// will clean formatting of erroneous field
function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++)
        inputs[i].classList.remove("error_input");

    for (let i = 0; i < errorTexts.length; i++)
        errorTexts[i].innerText = "";

    errorInfo.innerText = "";
}

// check if the filed has been filled
function checkRequired(value) {
    if (!value)
        return false;

    value = value.toString().trim();

    if (value == "")
        return false;

    return true;
}

// checking a text length of the field value
function checkTextLengthRange(value, min, max) {
    if (!value)
        return false;

    value = value.toString().trim();
    const length = value.length;

    if (max && length > max)
        return false;

    if (min && length < min)
        return false;

    return true;
}

function checkEmail(value) {
    if (!value)
        return false;

    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(value);
}
