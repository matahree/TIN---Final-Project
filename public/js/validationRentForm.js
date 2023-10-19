function validateForm() {

    // input constants
    const customerInput = document.getElementById('customer');
    const carInput = document.getElementById('car');
    const addressInput = document.getElementById('address');
    const rentalDateInput = document.getElementById('rentalDate');
    const returnDateInput = document.getElementById('returnDate');

    // error constants
    const errorCustomer = document.getElementById('errorCustomer');
    const errorCar = document.getElementById('errorCar');
    const errorAddress = document.getElementById('errorAddress');
    const errorRentalDate = document.getElementById('errorRentalDate');
    const errorReturnDate = document.getElementById('errorReturnDate');

    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')

    // reset errors
    resetErrors([customerInput, carInput, addressInput, rentalDateInput, returnDateInput], [errorCustomer, errorCar, errorAddress, errorRentalDate, errorReturnDate], errorsSummary);

    let valid = true;

    // current date
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;

    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    // validate customer
    if (!checkRequired(customerInput.value) || customerInput.value == "---Choose a customer---") {
        valid = false;
        customerInput.classList.add("error-input");
        errorCustomer.innerText = "The field is required";
    }

    // validate car
    if (!checkRequired(carInput.value) || carInput.value == "---Choose a car--") {
        valid = false;
        carInput.classList.add("error-input");
        errorCar.innerText = "The field is required";
    }

    // validate address
    if (addressInput.value != "" && !checkTextLengthRange(addressInput.value, 5, 60)) {
        valid = false;
        addressInput.classList.add("error-input");
        errorAddress.innerText = "This field should contain 5 to 60 characters.";
    }


    // validate rent date
    if (!checkRequired(rentalDateInput.value)) {
        valid = false;
        rentalDateInput.classList.add("error-input");
        errorRentalDate.innerText = "The field is required";
    }
    else if (!checkDate(rentalDateInput.value)) {
        valid = false;
        rentalDateInput.classList.add("error-input");
        errorRentalDate.innerText = "The field should contain a date in the format yyyy-MM-dd (e.g. 2000-01-01)";
    }
    else if (checkDateIfAfter(rentalDateInput.value, nowString)) {
        valid = false;
        rentalDateInput.classList.add("error-input");
        errorRentalDate.innerText = "The date is not valid.";
    }

    // validate return date
    if (returnDateInput.value != null && !checkDate(returnDateInput.value)) {
        valid = false;
        returnDateInput.classList.add("error-input");
        errorReturnDate.innerText = "The field should contain a date in the format yyyy-MM-dd (e.g. 2000-01-01)";
    }
    //if the rent date and return date are correct, we check the order of the dates
    else if (checkRequired(returnDateInput.value) && checkDate(returnDateInput.value)
        && !checkDateIfAfter(returnDateInput.value, rentalDateInput.value)) {
        valid = false;
        returnDateInput.classList.add("error-input");
        errorReturnDate.innerText = "The return date must be later than the rent date";
    }

    // validate summary
    if (!valid)
        errorsSummary.innerText = "The form contains errors.";

    return valid;

}

function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++)
        inputs[i].classList.remove("error_input");

    for (let i = 0; i < errorTexts.length; i++)
        errorTexts[i].innerText = "";

    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value)
        return false;

    value = value.toString().trim();

    if (value === "")
        return false;

    return true;
}

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

function checkDate(value) {
    if (!value)
        return false;

    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
    if (!value)
        return false;

    if (!compareTo)
        return false;

    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    if (!pattern.test(value))
        return false;

    if (!pattern.test(compareTo))
        return false;

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);

    if (valueDate.getTime() <= compareToDate.getTime())
        return false;

    return true;
}
