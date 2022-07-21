let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]');
let equalsButton = document.querySelector('[data-equals]');
let allClearButton = document.querySelector('[data-all-clear]');
let deleteButton = document.querySelector('[data-delete]');
let previousOperandElement = document.querySelector('[data-previous-operand]');
let currentOperandElement = document.querySelector('[data-current-operand]');

let currentOperand = '';
let previousOperand = '';


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    result();
    updateDisplay();
});

allClearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    deleteNumber();
    updateDisplay();
});

function clear() {

    currentOperandElement = '';
    previousOperandElement = '';
    operation = undefined;
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);

}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) {
        return;
    }
    currentOperand = currentOperand.toString() + number.toString();

}

function chooseOperation(operation) {
    if (currentOperand == '') {
        return
    }
    if (previousOperand != '') {
        result();
    }
    operation = operation;
    previousOperand = currentOperand;
    currentOperand = '';
}

function result() {
    let computation;
    let previousVar = parseFloat(previousOperand);
    let currentVar = parseFloat(currentOperand);
    if (isNaN(previousVar) || isNaN(currentVar)) {
        return;
    }
    switch (operation) {
        case '/':
            computation = previousVar / currentVar;
            break;
        case '*':
            computation = previousVar * currentVar;
            break;


        case '+':
            computation = previousVar + currentVar;
            break;


        case '-':
            computation = previousVar - currentVar;
            break;

        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';

    if (currentOperand == 420) {
        alert('Special Number!');
    }
    if (currentOperand == 69) {
        alert('Special Number!');
    }
    if (currentOperand == 80085) {
        alert('Special Number!');
    }
    if (currentOperand == 177013) {
        alert('Special Number!');
    }
}

function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay

    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

function updateDisplay() {
    currentOperandElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandElement.textContent = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
    previousOperandElement.innerText = previousOperand;

}
























