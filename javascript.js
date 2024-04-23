function operate(expression) {
    const intoParts = expression.split(/([+-*/])/);

    let num1 =parseFloat(intoParts[0]);
    let num2 =parseFloat(intoParts[2]);
    const operatorStr = intoParts[1];

    const operators = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => (b === 0 ? "ERROR: Can't devide by 0" : a / b),
    };

    const operation = operators[operatorStr];
    const result = operation(num1, num2);
    num1 = result;
    return result;
}
