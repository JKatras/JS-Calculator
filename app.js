//main display
var display = document.getElementsByClassName('display')[0];
//sub display
var displaySub = document.getElementsByClassName('display-sub')[0];
//chain of operations, default is zero
var opChain = [0];
//keeps track of whether solution is returned
var solutionReturned = false;
//all buttons
var btns = document.getElementsByTagName('button');

//add click events to each button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', getBtnValue);
}
//get button value and send it to be processed
function getBtnValue(e) {
  var entry = e.currentTarget.value;
  processInput(entry);
}
//process input based on button pressed, perform next appropriate operation
function processInput(input) {
  switch (input) {
    case "=":
      calculate();
      break;
    case "ce":
      clearEntry();
      break;
    case "ac":
      clearAll();
      break;
    case "/":
    case "*":
    case "+":
    case "-":
    case ".":
    case "0":
      validateInput(input);
      break;
    default:
      updateDisplay(input);
  }
}
//function determines how display will be updated
function updateDisplay(input) {
  //if display is blank and input isn't zero or solution has been returned
  if ((display.innerHTML === "0" && input !== "0") || opChain === 0 || solutionReturned === true) {
    //if solution is displayed and input is an operator or display is blank and input is an operator
    if ((solutionReturned === true && !isNumeric(input)) || (display.innerHTML === "0" && !isNumeric(input))) {
      //set solution to false because operation chain is increasing
      solutionReturned = false;
      //add input to the chain
      chainOperation(input);
      //add input to the display
      display.innerHTML += input;
    } else {
      //if above conditions not met, clear the chain, input replaces blank display state of 0 and replaces default 0 in operation chain
      solutionReturned = false;
      clearOpChain();
      display.innerHTML = input;
      opChain.push(input);
    }
  } else {
    //if not starting from blank state, add input to display and operation chain
    display.innerHTML += input;
    chainOperation(input);
  }
  displaySub.innerHTML = opChain.join("");
}
//function validates 0, operators, and decimals
function validateInput(input) {
  var currentDisplay = display.innerHTML;
  //if input is zero and display isn't, or input is the first decimal in display and solution is not displayed
  if ((input === "0" && currentDisplay !== "0") || (input === "." && currentDisplay.indexOf(".") < 0 && solutionReturned === false)) {
    //update display
    updateDisplay(input);
  }
  //if input is an operator
  if (input === "/" || input === "*" || input === "-" || input === "+") {
    var lastChar = opChain[opChain.length - 1];
    //if last character was a number
    if (isNumeric(lastChar)) {
      //update display
      updateDisplay(input);
    }
  }
}
//checks whether given character is a number
function isNumeric(value) {
  return (value == Number(value));
}
//clears last entry
function clearEntry() {
  //if chain of operations is not empty
  if (opChain.length >= 2) {
    //remove last character
    display.innerHTML = display.innerHTML.slice(0, -1);
  } else {
    //or set display to default 0
    display.innerHTML = "0";
  }
  //remove last character from operation chain
  opChain.pop();
  //update sub display
  displaySub.innerHTML = opChain.join("");
}
//clears chain of operations
function clearOpChain() {
  opChain.length = 0;
}
//clears display, sub display, and sets chain of operations to default 0
function clearAll() {
  opChain = [0];
  display.innerHTML = "0";
  displaySub.innerHTML = "";
}
//adds to chain of operations
function chainOperation(input) {
  opChain.push(input);
}
//returns solution
function calculate() {
  //if operation chain isn't empty
  if (opChain !== 0) {
    //evaluate operation chain
    var solution = eval(opChain.join(""));
    //update display with solution
    display.innerHTML = solution;
    //update display to reflect previous operations
    displaySub.innerHTML += "=";
    //reset operation chain
    opChain.length = 0;
    //operation chain now contains solution
    opChain.push(solution);
    //set global variable to indicate solution was reached
    solutionReturned = true;
  }
}