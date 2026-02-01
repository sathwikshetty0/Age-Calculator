let currentInput = "";
let operator = "";
let previousInput = "";
let history = "";

function appendNum(num) {
    if (currentInput.includes(".") && num === ".") return;
    currentInput += num;
    updateScreen();
}

function appendOp(op) {
    if (currentInput === "" && previousInput === "") return;

    // If just chaining operators after calculation
    if (currentInput === "" && previousInput !== "") {
        operator = op;
        history = `${previousInput} ${op}`;
        updateScreen();
        return;
    }

    if (previousInput !== "") {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    history = `${previousInput} ${op}`;
    currentInput = "";
    updateScreen();
}

function updateScreen() {
    const screen = document.getElementById("cal-screen");
    const historyScreen = document.getElementById("calc-history");

    screen.innerText = currentInput || previousInput || "0";
    historyScreen.innerText = history;
}

function clearScreen() {
    currentInput = "";
    previousInput = "";
    operator = "";
    history = "";
    updateScreen();
}

function deleteChar() {
    currentInput = currentInput.toString().slice(0, -1);
    updateScreen();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+": computation = prev + current; break;
        case "-": computation = prev - current; break;
        case "*": computation = prev * current; break;
        case "/": computation = prev / current; break;
        default: return;
    }

    // Round to avoid floating point weirdness
    computation = Math.round(computation * 1000) / 1000;

    history = `${previousInput} ${operator} ${currentInput} =`;
    currentInput = computation.toString();
    operator = "";
    previousInput = "";
    updateScreen();
}
