onload = () => {
    const buttons = document.querySelectorAll('.buttons')
    const display = document.querySelector('.display')
    const operators = document.querySelectorAll('.operation')
    const clearButton = document.querySelector('.clear')
    const modeToggle = document.querySelector('.mode-toggle')

    let calculatorState = {
        numbers: [],
        operations: [],
        displayArray: [],
        result: null,
        resetDisplay: false,
    }

    const updateDisplay = () => {
        display.innerHTML = calculatorState.displayArray.join('')
    }

    const isOperation = (char) => ['+', '-', '*', '/'].includes(char)

    const clearCalculator = () => {
        display.innerHTML = ''
        calculatorState = {
            numbers: [],
            operations: [],
            displayArray: [],
            result: null,
            resetDisplay: false,
        }
        disableOperators()
    }

    const disableOperators = () => {
        operators.forEach((e) => e.setAttribute('disabled', ''))
        operators.forEach((e) => e.classList.add('opac'))
    }

    const enableOperators = () => {
        operators.forEach((e) => e.removeAttribute('disabled', ''))
        operators.forEach((e) => e.classList.remove('opac'))
    }

    const processEqualOperation = () => {
        try {
            const result = eval(display.innerHTML)
            if (result.toString().length > 15) {
                display.innerHTML = '+ 15 caracters'
            } else {
                display.innerHTML = parseFloat(result)
                calculatorState.displayArray = [parseFloat(result)]
            }
            calculatorState.numbers = []
            calculatorState.operations = []
            calculatorState.resetDisplay = false
        } catch {
            display.innerHTML = 'Error'
            calculatorState.resetDisplay = true
        }
    }

    buttons.forEach((button) => {
        button.onclick = () => {
            const value = button.innerHTML

            if (calculatorState.resetDisplay && !isOperation(value) && value !== '=' && value !== 'C') {
                display.innerHTML = ''
                calculatorState.displayArray = []
                calculatorState.resetDisplay = false
            }

            if (!isOperation(value) && value !== '=' && value !== 'C') {
                if (calculatorState.displayArray.length < 15) {
                    calculatorState.numbers.push(parseInt(value))
                    calculatorState.displayArray.push(parseInt(value))
                    updateDisplay()
                }
            } else if (isOperation(value)) {
                if (calculatorState.displayArray.length < 15) {
                    calculatorState.operations.push(value)
                    calculatorState.displayArray.push(value)
                    updateDisplay()
                }
            }

            if (isOperation(calculatorState.displayArray.at(-1))) {
                disableOperators()
            } else {
                enableOperators()
            }

            if (value === '=') {
                processEqualOperation()
            }

            if (value === 'C') {
                clearCalculator()
            }
        }
    })

    if (calculatorState.displayArray.length === 0) {
        disableOperators()
    }

    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode')
        if (document.body.classList.contains('dark-mode')) {
            modeToggle.innerHTML = 'Light Mode'
        } else {
            modeToggle.innerHTML = 'Dark Mode'
        }
    })
}
