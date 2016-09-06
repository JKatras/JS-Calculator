var display = document.getElementsByClassName('display')[0];
var opChain = [];
var btns = document.getElementsByTagName('button');

//add click events to each button to capture values
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', getBtnValue);
}

function getBtnValue(e) {
  var entry = e.currentTarget.value;
  processInput(entry);
}

function processInput(input){
  switch(input){
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
function updateDisplay(input){
  if(display.innerHTML === "0" && input !== "0" || opChain.length == 0){
    display.innerHTML = input;
  }else{
    display.innerHTML += input;
  }
  chainOperation(input);
}
function validateInput(input){
  var current = display.innerHTML;
  if(input === "0" && current !== "0"){
    updateDisplay(input);
  }
  if(input === "." && current.indexOf(".") < 0){
    updateDisplay(input);
  }
  if((input === "/" || input === "*" || input === "-" || input === "+") && current.charAt(current.length-1) !== input){
    updateDisplay(input);
  }
}
function clearEntry(){
  if(opChain.length >= 2){
    display.innerHTML = display.innerHTML.slice(0,-1);
  }else{
    display.innerHTML = "0";
  }
  opChain.pop();
}
function clearOpChain(){
  opChain.length = 0;
}
function clearAll(){
  opChain.length = 0;
  display.innerHTML = "0";
}
function chainOperation(input){
  opChain.push(input);
}
function calculate(){
  if(opChain.length !== 0){
    display.innerHTML = eval(opChain.join(""));
    clearOpChain();
  }
}