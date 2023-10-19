function validateForm() {

    // input constants
    const carModelInput = document.getElementById('carModel');
    const VINInput = document.getElementById('VIN');
    const manufacturedInput = document.getElementById('manufactured');
    const numberOfCarsInput = document.getElementById('numberOfCars');
    const colorInput = document.getElementById('color');
    const manufacturedDateInput = document.getElementById('manufacturedDate');

    // error constants
    const errorCarModel = document.getElementById('errorCarModel');
    const errorVIN = document.getElementById('errorVIN');
    const errorManufactured = document.getElementById('errorManufactured');
    const errorNumberOfCars = document.getElementById('errorNumberOfCars');
    const errorColor = document.getElementById('errorColor');
    const errorManufacturedDate = document.getElementById('errorManufacturedDate');

    // summary constant
    const errorsSummary = document.getElementById('errorsSummary')

    // reset errors
    resetErrors([carModelInput, VINInput, manufacturedInput, numberOfCarsInput, colorInput, manufacturedDateInput], [errorCarModel, errorVIN, errorManufactured, errorNumberOfCars, errorColor, errorManufacturedDate], errorsSummary);

    let valid = true;

    // validate car model
    if (!checkRequired(carModelInput.value)) {
        valid = false;
        carModelInput.classList.add("error-input");
        errorCarModel.innerText = "The field is required.";
    }
    else if (!checkTextLengthRange(carModelInput.value, 3, 60)) {
        valid = false;
        carModelInput.classList.add("error-input");
        errorCarModel.innerText = "This field should contain 3 to 60 characters.";
    }

    // validate VIN
    if (!checkRequired(VINInput.value)) {
        valid = false;
        VINInput.classList.add("error-input");
        errorVIN.innerText = "The field is required.";
    }

    else if (VINInput.value != "" && !checkVIN(VINInput.value))
    {
        valid = false;
        VINInput.classList.add("error-input");
        errorVIN.innerText = "The field should contain a valid VIN address in accordance with the pattern";
    }

     // validate manufactured
     if (!checkRequired(manufacturedInput.value)) {
        valid = false;
        manufacturedInput.classList.add("error-input");
        errorManufactured.innerText = "The field is required.";
    }
    else if (!checkTextLengthRange(manufacturedInput.value, 3, 60)) {
        valid = false;
        manufacturedInput.classList.add("error-input");
        errorManufactured.innerText = "This field should contain 3 to 60 characters.";
    }



      // validate number of cars
      if (numberOfCarsInput.value != "")
      {
          if ( (numberOfCarsInput.value > 100) || (numberOfCarsInput.value < 1) )
          {
              valid = false;
              numberOfCarsInput.classList.add("error=input");
              errorNumberOfCars.innerText = "The number should be between 1 and 100.";
          }
      }


      // validate color
      if (colorInput.value != "" && !checkTextLengthRange(colorInput.value, 2, 60))
    {
        valid = false;
        colorInput.classList.add("error-input");
        errorColor.innerText = "The field should contain from 2 to 60 characters";
    }

     // validate color
     if (manufacturedDateInput.value != "" && !checkTextLengthRange(manufacturedDateInput.value, 2, 60))
     {
         valid = false;
         manufacturedDateInput.classList.add("error-input");
         errorManufacturedDate.innerText = "The field should contain from 2 to 60 characters";
     }
      // validate summary
    if (!valid)
    errorsSummary.innerText = "The form contains errors.";

return valid;

}

function resetErrors(inputs, errorTexts, errorInfo)
{
    for(let i=0; i<inputs.length; i++)
        inputs[i].classList.remove("error_input");
    
    for(let i=0; i<errorTexts.length; i++)
        errorTexts[i].innerText = "";
    
    errorInfo.innerText = "";
}

function checkRequired(value)
{
    if (!value)
        return false;
    
    value = value.toString().trim();
    
    if (value === "")
        return false;
    
    return true;
}

function checkTextLengthRange(value, min, max)
{
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
/*
function checkVIN(value) // RECHECK IT, IT MIGHT NOT WORK CUZ OF CONST R = ...
{
    if (!value)
        return false;

    value = value.toString().trim();
    const re = /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;

    return re.test(value);

}
*/

function checkVIN(value) { // IT DOESNT WORK I GUESS 
    return validate(value);
  

    function transliterate(c) {
      return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
    }
  
    function get_check_digit(value) {
      var map = '0123456789X';
      var weights = '8765432X098765432';
      var sum = 0;
      for (var i = 0; i < 17; ++i)
        sum += transliterate(value[i]) * map.indexOf(weights[i]);
      return map[sum % 11];
    }
  
    function validate(value) {
        if (value.length !== 17) return false;
        return get_check_digit(value) === value[8];
      }
     
  }