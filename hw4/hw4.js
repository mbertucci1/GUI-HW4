/*
  Name: Michael Bertucci
  Email: Michael_Bertucci@student.uml.edu
  UMass Lowell, COMP.4610 GUI Programming I
  Created: Nov. 11, 2017
  Assignment 4
  
  www.w3schools.com HTML and CSS tutorials were
  used as a resource.
  */


/* Re-create the list of price inputs based on number of
   values chosen by user */
function onNumPricesChange() {
  // Save any values currently in the inputs
  var currentValues = getValues("price");

  // Construct new sequence of input fields in html and insert them
  var num = parseInt(document.getElementById("num_price_values").value, 10);
  var values = document.getElementById("price_values");
  var singleInput = "<input type=\"number\" name=\"price\" value=\"0\" min=\"0\"><br>";
  
  var inputs = "";
  for(var i = 0; i < num; i++) {
    inputs = inputs + singleInput;
  }
  
  values.innerHTML = inputs;
  
  // Restore as many old values as the new number of inputs allows
  var newInputs = document.getElementsByName("price");
  for(var i = 0; i < newInputs.length && i < currentValues.length; i++) {
    newInputs[i].value = currentValues[i];
  }
}

/* Re-create the list of mpg inputs based on number of
   values chosen by user */
function onNumMpgChange() {
  // Save any values currently in the inputs
  var currentValues = getValues("mpg");

  // Construct new sequence of input fields in html and insert them
  var num = parseInt(document.getElementById("num_mpg_values").value, 10);
  var values = document.getElementById("mpg_values");
  var singleInput = "<input type=\"number\" name=\"mpg\" value=\"0\" min=\"0\"><br>";
  
  var inputs = "";
  for(var i = 0; i < num; i++) {
    inputs = inputs + singleInput;
  }
  
  values.innerHTML = inputs;
  
  // Restore as many old values as the new number of inputs allows
  var newInputs = document.getElementsByName("mpg");
  for(var i = 0; i < newInputs.length && i < currentValues.length; i++) {
    newInputs[i].value = currentValues[i];
  }
}

/* Return array of values from list of input fields with
   the specified name */
function getValues(name) {
  var inputs = document.getElementsByName(name);
  var values = [];
  
  for(var i = 0; i < inputs.length; i++) {
    values.push(parseInt(inputs[i].value, 10));
  }
  
  return values;
}

/* Use form values to build an html table and insert
   it into the page */
function createTable() {
  var prices = getValues("price");
  console.log("Prices: " + prices);
  
  var mpgs = getValues("mpg");
  console.log("MpG: " + mpgs);
  
  var table = document.getElementById("comparison_table");
  
  var html_string = "<caption><h2>Cost Comparison</h2></caption>\n";
  
  // Set up header row
  html_string += "<tr>\n<th>Price/\nMpG</th>\n";
  for(var i = 0; i < prices.length; i++) {
    html_string += "<th>$" + prices[i] + "</th>\n";
  }
  html_string += "</tr>\n";
  
  // Prepare values for calculating inner table data
  var total, per_month, per_mile;
  var months = parseInt(document.getElementById("months").value, 10);
  var miles = parseInt(document.getElementById("miles").value, 10);
  var cost_gallon = parseFloat(document.getElementById("cost_of_gal").value);
  var total_miles = (months / 12) * miles;
  
  // Add data rows for each mpg value
  for(i = 0; i < mpgs.length; i++) {
    html_string += "<tr>\n<th>" + mpgs[i] + "</th>\n";
    for (var j = 0; j < prices.length; j++) {
      // Calculate the total cost as initial price + cost of gallons consumed
      total = prices[j] + (total_miles / mpgs[i]) * cost_gallon;
      per_month = (total/months).toFixed(2);
      per_mile = (total/total_miles).toFixed(2);
      html_string += "<td>$" + per_month + "/month\n$" + per_mile + "/mile</td>\n";
    }
    html_string += "</tr>\n";
  }
  
  console.log(html_string);
  
  table.innerHTML = html_string;
}

/* Check validity (type and range) of user inputs */
function validateInput() {

  /* Validate number of months given */
  var field = document.getElementById("months");
  var value = parseInt(field.value, 10);
  
  // Check if value is integer and not less than 1
  if (isNaN(value) || (value % 1) !== 0 || value < 1) {
    alert("INVALID INPUT:\nnumber of months must be an integer greater than or equal to 1");
    return false;
  }
  
  /* Validate number of miles given */
  field = document.getElementById("miles");
  value = parseInt(field.value, 10);
  if (isNaN(value) || (value % 1) !== 0 || value < 1) {
    alert("INVALID INPUT:\nnumber of miles must be an integer greater than or equal to 1");
    return false;
  }
  
  /* Validate price of gallon given */
  field = document.getElementById("cost_of_gal");
  value = parseFloat(field.value);
  // Check if value is a number not less than 1
  if (isNaN(value) || value < 1) {
    alert("INVALID INPUT:\nprice per gallon must be a number greater than or equal to 1.00");
    return false;
  }
  
  /* Validate number of price inputs given */
  field = document.getElementById("num_price_values");
  value = parseInt(field.value, 10);
  if (isNaN(value) || (value % 1) !== 0 || value < 1) {
    alert("INVALID INPUT:\nnumber of price values must be an integer greater than or equal to 1");
    return false;
  }
  
  /* Validate each of the price values given */
  field = document.getElementsByName("price");
  for(var i = 0; i < field.length; i++) {
    value = parseInt(field[i].value, 10);
    if (isNaN(value) || (value % 1) !== 0 
        || value < 2000 || value > 4000000) {
      alert("INVALID INPUT:\nprice value must be an integer between 2000 and 4000000");
      return false;
    }
  }
  
  /* Validate number of mpg inputs given */
  field = document.getElementById("num_mpg_values");
  value = parseInt(field.value, 10);
  if (isNaN(value) || (value % 1) !== 0 || value < 1) {
    alert("INVALID INPUT:\nnumber of mpg values must be an integer greater than or equal to 1");
    return false;
  }
  
  /* Validate each of the mpg values given */
  field = document.getElementsByName("mpg");
  for(var i = 0; i < field.length; i++) {
    value = parseInt(field[i].value, 10);
    if (isNaN(value) || (value % 1) !== 0 
        || value < 5 || value > 100) {
      alert("INVALID INPUT:\nmpg value must be an integer between 5 and 100");
      return false;
    }
  }
  
  return true;
  
}

/* Function to call when user clicks Submit button */
function onSubmit() {
  var valid = validateInput();
  
  if(valid) {
    createTable();
  }
}
