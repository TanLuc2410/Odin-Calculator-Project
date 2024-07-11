const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const negativeButton = document.querySelector("[data-negative]");
const percentButton = document.querySelector("[data-percent]");
const allClearButton = document.querySelector("[data-all-clear]");
const bigDisplayText = document.querySelector("[data-big-display]");
const smallDisplayText = document.querySelector("[data-small-display]");

let currentOperand = "";
let previousOperand = "";
let operation = null;
clear();


numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperator(button.innerText);
        updateDisplay();
    });
});
equalButton.addEventListener("click", () => {
    operate();
    updateDisplay();
})

allClearButton.addEventListener("click", () => {
    clear();
    updateDisplay();
});
negativeButton.addEventListener("click", () => {
    makeNegative();
    updateDisplay();
})
percentButton.addEventListener("click", () => {
    computePercent();
    updateDisplay();
})



function clear() {
    currentOperand = "";
    previousOperand = "";
    operation = null;
}

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    if (currentOperand.toString().length >= 9) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperator(operator) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
        operate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = "";
}

function operate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case "+":
                result = Math.round((prev + current)*1000)/1000;
            break;
        case "-":
                result = Math.round((prev - current)*1000)/1000;
            break;
        case "×":
                result = Math.round((prev * current)*1000)/1000;
            break;
        case "÷":
                if (current === 0) {
                    alert("Can't devide by 0");
                    clear();
                    updateDisplay();
                    return
                }
                result = Math.round((prev / current)*1000)/1000;
            break;
        default:
            return;
    }
    currentOperand = result;
    operation = null;
    previousOperand = "";
}

function updateDisplay() {
    bigDisplayText.innerText = currentOperand;
    if (operation !== null) {
        smallDisplayText.innerText = `${previousOperand} ${operation}`;
    } else {
        smallDisplayText.innerText = "";
    }
}
function makeNegative() {
    let result;
    result = currentOperand * -1;
    currentOperand = result;
    return currentOperand;
}
function computePercent() {
    let result;
    result = currentOperand / 100;
    currentOperand = result;
    return currentOperand;
}
