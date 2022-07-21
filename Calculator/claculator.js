class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    deleteButton() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        let previousVar = parseFloat(this.previousOperand);
        let currentVar = parseFloat(this.currentOperand);
        if (isNaN(previousVar) || isNaN(currentVar)) {
            return;
        }

        switch (this.operation) {
            case '/':
                result = previousVar / currentVar;
                break;
            case '*':
                result = previousVar * currentVar;
                break;


            case '+':
                result = previousVar + currentVar;
                break;


            case '-':
                result = previousVar - currentVar;
                break;

            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';

        const popupShinji = document.getElementById('shinji');

        if (this.currentOperand == 420) {
            this.blur();
        }

        if (this.currentOperand == 69) {
            this.blur();
        }

        if (this.currentOperand == 80085) {
            this.blur();
        }

        if (this.currentOperand == 177013) {
            this.blur();
        }
    }

    getDisplayNumber(number) {
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
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.textContent = '';
        }
    }

    popupsGiver(number) {
        const popups = {
            420: document.getElementById('snoop'),
            80085: document.getElementById('marin'),
            69: document.getElementById('nicememe'),
            177013: document.getElementById('emergence'),
            1: document.getElementById('shinji')
        }

        return popups[number];
    }

    specialTextEdit(number) {
        const specTexts = {
            420: document.getElementById('weed'),
            80085: document.getElementById('oppai'),
            69: document.getElementById('nice'),
            177013: document.getElementById('ohno')
        }

        return specTexts[number];
    }

    blur(number) {
        number = this.currentOperand;
        let spec = document.querySelector('.special').style.filter = 'blur(20px)';
        let calc = document.querySelector('.calculator-grid').style.filter = 'blur(20px)';

        this.popupsGiver(number).style.visibility = "visible";
        this.popupsGiver(number).style.opacity = '1';;

        const mineInterval = setInterval(() => {
            spec = document.querySelector('.special').style.filter = 'none';
            calc = document.querySelector('.calculator-grid').style.filter = 'none';
            this.popupsGiver(number).style.visibility = "hidden";
            this.popupsGiver(number).style.opacity = '0';
            this.specialTextEdit(number).style.textDecoration = 'line-through';
            clearInterval(mineInterval);

            if (document.getElementById('weed').style.textDecoration == 'line-through' &&
                document.getElementById('oppai').style.textDecoration == 'line-through' &&
                document.getElementById('nice').style.textDecoration == 'line-through' &&
                document.getElementById('ohno').style.textDecoration == 'line-through') {

                spec = document.querySelector('.special').style.filter = 'blur(20px)';
                calc = document.querySelector('.calculator-grid').style.filter = 'blur(20px)';
                this.popupsGiver(1).style.visibility = "visible";
                this.popupsGiver(1).style.opacity = '1';;

                const shinjiInterval = setInterval(() => {
                    spec = document.querySelector('.special').style.filter = 'none';
                    calc = document.querySelector('.calculator-grid').style.filter = 'none';
                    this.popupsGiver(1).style.visibility = "hidden";
                    this.popupsGiver(1).style.opacity = '0';
                }, 9000);
            }
        }, 4000);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.deleteButton();
    calculator.updateDisplay();
});

