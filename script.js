const radios = document.querySelectorAll("input");
const body = document.querySelector("body");
const theme = window.getComputedStyle(body, "::before").content;
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operation]");
const reset = document.querySelector("#reset");
const del = document.querySelector("#del");
const equal = document.querySelector(".equal");
const topDisplay = document.querySelector(".screen__top");
const bottomDisplay = document.querySelector(".screen__bottom");

const getBottomDisplayNumber = () => {
  return bottomDisplay.textContent.toString();
};
const getTopDisplayNumber = () => {
  return topDisplay.textContent.toString();
};

const checkForZero = () => {
  let bottomDisplayNumber = getBottomDisplayNumber();

  if (
    bottomDisplayNumber.charAt(0) === "0" &&
    bottomDisplayNumber.charAt(1) !== "."
  ) {
    bottomDisplayNumber = bottomDisplayNumber.substring(1);
    bottomDisplay.textContent = bottomDisplayNumber;
  }
};

const handleThemeChange = (e) => {
  body.className = e.target.id;
};



const performOperation = (e) => {
  let operation = e.target.id.toString();
  let topNumber = getTopDisplayNumber()
  if ( topNumber === '') {
    topDisplay.textContent = getBottomDisplayNumber() + ' ' + operation;
    bottomDisplay.textContent = '0'
    return
  }
  let splitTop = topNumber.split(' ');

  if (splitTop[1]) {
    handleOperation(splitTop[0], splitTop[1], operation);
  }
};

const handleNumberPress = (e) => {
  let bottomDisplayNumber = getBottomDisplayNumber();

  if (e.target.id === "." && bottomDisplayNumber.includes(".")) return;

  bottomDisplay.textContent = bottomDisplayNumber + e.target.id.toString();
  checkForZero();
};

const handleOperation = (number, operator, operation = '') => {
  
  switch (operator) {
    case "+":
      topDisplay.textContent =
        parseFloat(number) +
        parseFloat(getBottomDisplayNumber()) +
        " " +
        operation;
      bottomDisplay.textContent = "0";
      break;
    case "-":
      topDisplay.textContent =
        parseFloat(number) -
        parseFloat(getBottomDisplayNumber()) +
        " " +
        operation;
      bottomDisplay.textContent = "0";
      break;
    case "/":
      topDisplay.textContent =
        parseFloat(number) / parseFloat(getBottomDisplayNumber()) +
        " " +
        operation;
      bottomDisplay.textContent = "0";
      break;
    case "*":
      topDisplay.textContent =
        parseFloat(number) * parseFloat(getBottomDisplayNumber()) +
        " " +
        operation;
      bottomDisplay.textContent = "0";
      break;
    default:
      return;
  }
}

const handleDelete = () => {
  let number = getBottomDisplayNumber();
  bottomDisplay.textContent = number.substring(0, number.length - 1);
};
const handleReset = () => {
  topDisplay.textContent = "";
  bottomDisplay.textContent = "0";
};
const handleEqual = () => {
  let splitTop = getTopDisplayNumber().split(" ");
  handleOperation(splitTop[0], splitTop[1]);
  bottomDisplay.textContent = topDisplay.textContent;
  topDisplay.textContent = ''
};

//Onload
window.onload = () => {
  if (theme === `"dark"`) {
    body.className = "themeThree";
    document.querySelector("#themeThree").checked = true;
    return;
  }
  body.className = "themeTwo";
  document.querySelector("#themeTwo").checked = true;
};

//Event Listeners
radios.forEach((radio) => radio.addEventListener("change", handleThemeChange));

operators.forEach((operator) =>
  operator.addEventListener("click", performOperation)
);

numbers.forEach((number) =>
  number.addEventListener("click", handleNumberPress)
);

del.addEventListener("click", handleDelete);
reset.addEventListener("click", handleReset);
equal.addEventListener("click", handleEqual);
