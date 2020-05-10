class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.currentOperandTextElement.innerText = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (!equalsBtn) {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        } else {
            this.currentOperand = number.toString();
        }
        if (this.currentOperand.length === 9) {
            numBtn = false;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '%':
                computation = prev / 100
                break
            case '+/-':
                computation = prev * -1
                break
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    plusMinus(num) {
        return num * -1
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '0'
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
    }
}


const output = document.getElementById("output");
const currentSize = () => {
    if (output.innerText.length == 8) {
        output.style.fontSize = "60px";
    } else if (output.innerText.length > 7) {
        output.style.fontSize = "50px";
    } else if (output.innerText.length < 6) {
        output.style.fontSize = "70px";
    }
}

let equalsBtn = false;
let numBtn = true;

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const acButton = document.getElementById("ac");
const percentButton = document.getElementById("percent");
const plusMinusButton = document.getElementById("plusMinus");


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (numBtn) {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        }
        acButton.innerText = "C";
        currentSize();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperandTextElement.innerText === '0') {
            return calculator.clear()
        } else {
            calculator.chooseOperation(button.innerText);
            currentOperandTextElement.innerText = calculator.getDisplayNumber(calculator.previousOperand); //
        }
        equalsBtn = false;
        numBtn = true;
    })

})

equalsButton.addEventListener('click', button => {
    if (currentOperandTextElement.innerText == '0') {
        return calculator.clear()
    } else {
        calculator.compute();
    }
    equalsBtn = true;
    numBtn = true;
    calculator.updateDisplay();
    currentSize();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
    acButton.innerText = "AC";
    currentOperandTextElement.innerText = '0';
    equalsBtn = false;
    numBtn = true;
    currentSize();
})

percentButton.addEventListener('click', button => {
    if (currentOperandTextElement.innerText == '0') {
        return calculator.clear()
    } else {
        calculator.compute();
    }
    calculator.updateDisplay();
    equalsBtn = false;
    numBtn = true;
})

plusMinusButton.addEventListener('click', button => {
    if (currentOperandTextElement.innerText == '0') {
        return calculator.clear()
    } else {
        calculator.compute();
    }
    calculator.updateDisplay();
    equalsBtn = false;
    numBtn = true;
})