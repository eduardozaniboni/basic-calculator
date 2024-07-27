# Calculadora Básica

-   Conceitos aplicados: Variáveis, operadores, funções, eventos

## Descrição:

Desenvolva uma calculadora simples que realize operações básicas como adição, subtração, multiplicação e divisão.
Passos:

-   Crie um layout básico com botões e uma tela.
-   Use JavaScript para capturar os cliques nos botões e realizar os cálculos.

## JavaScript - Código antigo:

```js
<script>
    onload = () => {
        let buttons = document.querySelectorAll('.buttons')
        let display = document.querySelector('.display')
        let operators = document.querySelectorAll('.operation')
        let clearButton = document.querySelector('.clear')
        let modeToggle = document.querySelector('.mode-toggle')

        let numbers = []
        let operations = []
        let disp = []
        let result = null
        let resetDisplay = false

        if (disp.length == 0) {
            operators.forEach((e) => e.setAttribute('disabled', ''))
            operators.forEach((e) => e.classList.add('opac'))
        }

        buttons.forEach(
            (b) =>
                (b.onclick = () => {
                    console.log(b.innerHTML)
                    if (
                        resetDisplay &&
                        !(
                            b.innerHTML == '+' ||
                            b.innerHTML == '-' ||
                            b.innerHTML == '*' ||
                            b.innerHTML == '/' ||
                            b.innerHTML == '=' ||
                            b.innerHTML == 'C'
                        )
                    ) {
                        dsp.innerHTML = ''
                        disp = []
                        resetDisplay = false
                    }
                    if (
                        !(
                            b.innerHTML == '+' ||
                            b.innerHTML == '-' ||
                            b.innerHTML == '*' ||
                            b.innerHTML == '/' ||
                            b.innerHTML == '=' ||
                            b.innerHTML == 'C'
                        )
                    ) {
                        if (disp.length < 15) {
                            numbers.push(parseInt(b.innerHTML))
                            disp.push(parseInt(b.innerHTML))
                            display.innerHTML = disp.join('')
                        }
                    }
                    if (b.innerHTML == '+' || b.innerHTML == '-' || b.innerHTML == '*' || b.innerHTML == '/') {
                        if (disp.length < 15) {
                            operations.push(b.innerHTML)
                            disp.push(b.innerHTML)
                            display.innerHTML = disp.join('')
                        }
                    }
                    if (disp.at(-1) == '+' || disp.at(-1) == '-' || disp.at(-1) == '*' || disp.at(-1) == '/') {
                        operators.forEach((e) => e.setAttribute('disabled', ''))
                        operators.forEach((e) => e.classList.add('opac'))
                    } else {
                        operators.forEach((e) => e.removeAttribute('disabled', ''))
                        operators.forEach((e) => e.classList.remove('opac'))
                    }
                    if (b.innerHTML == '=') {
                        try {
                            result = eval(display.innerHTML)
                            if (result.toString().length > 15) {
                                display.innerHTML = 'Error'
                            } else {
                                display.innerHTML = result
                                disp = [result]
                            }
                            numbers = []
                            operations = []
                            resetDisplay = true
                        } catch {
                            display.innerHTML = 'Error'
                            resetDisplay = true
                        }
                    }
                    if (b.innerHTML == 'C') {
                        display.innerHTML = ''
                        disp = []
                        operations = []
                        numbers = []
                        result = null
                        resetDisplay = false
                    }
                })
        )

        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode')
        })
    }
</script>
```

## JavaScript - Código novo:

```js
<script>
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
</script>
```
