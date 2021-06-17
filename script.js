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
let resetWithNextPress = false

const getBottomDisplayNumber = () => {
  return bottomDisplay.textContent.toString();
};
const getTopDisplayNumber = () => {
  return topDisplay.textContent.toString();
};

//Remove lefthand zero from integer
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

const checkForReset = () => {
  if (resetWithNextPress) {
    handleReset();
    resetWithNextPress = false;
  }
}

const addCommas = (number) => {
  let integerNum = parseFloat(number.split(".")[0].replace(/,/g, ''));
  let decimalNum = number.split(".")[1];
  let withCommas = integerNum ? integerNum.toLocaleString("en-US") : '0';
  return decimalNum != null
    ? `${withCommas}.${decimalNum}`
    : `${withCommas}`;
}

const handleThemeChange = (e) => {
  body.className = e.target.id;
};


//When operator is pressed
const performOperation = (e) => {
  checkForReset();
  let operation = e.target.id.toString();
  let topNumber = getTopDisplayNumber()

  //Start a negative number
  if (operation === "-" && (bottomDisplay.textContent === '0' || bottomDisplay.textContent === '')) {
    bottomDisplay.textContent = '-'
    return
  }
    if (topNumber === "") {
      topDisplay.textContent =
        parseFloat(getBottomDisplayNumber().replace(/,/g, "")).toLocaleString(
          "en-US"
        ) +
        " " +
        operation;
      bottomDisplay.textContent = "0";
      return;
    }
  let splitTop = topNumber.split(' ');
  if (splitTop[1]) {
    topDisplay.textContent = handleOperation(
      parseFloat(splitTop[0].replace(/,/g, "")).toLocaleString("en-US"),
      splitTop[1],
      operation
    );
    bottomDisplay.textContent = "0";
  }
};

const handleNumberPress = (e) => {
  checkForReset();
  let buttonPress = (e.target.id).toString()
  let bottomDisplayNumber = getBottomDisplayNumber();
  if (buttonPress === "." && bottomDisplayNumber.includes(".")) return;
  bottomDisplay.textContent = !bottomDisplayNumber ? buttonPress :  addCommas(`${bottomDisplayNumber}${buttonPress}`)
  checkForZero();
};

const handleOperation = (number, operator, operation = '') => {
  switch (operator) {
    case "+": return (
      (
        parseFloat(number.replace(/,/g, "")) + parseFloat(getBottomDisplayNumber())
      ).toLocaleString("en-US") +
      " " +
      operation
    );
    case "-": return (topDisplay.textContent =
      (
        parseFloat(number.replace(/,/g, "")) -
        parseFloat(getBottomDisplayNumber())
      ).toLocaleString("en-US") +
      " " +
      operation);
    case "/": return (topDisplay.textContent =
      (
        parseFloat(number.replace(/,/g, "")) /
        parseFloat(getBottomDisplayNumber())
      ).toLocaleString("en-US") +
      " " +
      operation);
    case "*": return (topDisplay.textContent =
      (
        parseFloat(number.replace(/,/g, "")) *
        parseFloat(getBottomDisplayNumber())
      ).toLocaleString("en-US") +
      " " +
      operation);
    default:
      return;
  }
}

const handleDelete = () => {
  let number = getBottomDisplayNumber();
  bottomDisplay.textContent = addCommas(number.substring(0, number.length - 1));
};

//Clear Display
const handleReset = () => {
  topDisplay.textContent = "";
  bottomDisplay.textContent = "0";
};

//Perform operation when Equal sign is pressed
const handleEqual = () => {
  //Separate number and operator
  let splitTop = getTopDisplayNumber().split(" ");
  bottomDisplay.textContent = addCommas(handleOperation(splitTop[0], splitTop[1])) || addCommas(bottomDisplay.textContent);
  topDisplay.textContent = ''
  resetWithNextPress = true
};

//On load check for theme preference
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