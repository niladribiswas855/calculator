document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    const operators = ['+', '-', '*', '/'];

    let currentInput = '';
    let operatorPressed = false;

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (value === 'C') {
                display.innerText = '0';
                currentInput = '';
                operatorPressed = false;
            } else if (value === '←') {
                // Remove last character
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
            } else if (value === '=') {
                try {
                    // Validate and evaluate expression
                    if (currentInput === '' || operators.includes(currentInput.slice(-1))) {
                        throw new Error('Invalid input');
                    }

                    // Evaluate the expression
                    const result = eval(currentInput);

                    // Handle special cases like Infinity and NaN
                    if (result === Infinity || isNaN(result)) {
                        throw new Error('Math error');
                    }

                    // Update display with result
                    currentInput = result.toString();
                    display.innerText = currentInput;
                } catch (error) {
                    display.innerText = 'Error';
                }
                operatorPressed = false;
            } else if (operators.includes(value)) {
                // Prevent consecutive operators
                if (operatorPressed || currentInput === '') return;

                // Append operator to current input
                currentInput += value;
                display.innerText = currentInput;
                operatorPressed = true;
            } else {
                // Handle numbers and decimal point
                if (display.innerText === '0' || operatorPressed) {
                    display.innerText = value;
                    currentInput = value;
                } else {
                    display.innerText += value;
                    currentInput += value;
                }
                operatorPressed = false;
            }
        });
    });
});
