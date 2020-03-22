function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  expr = expr.replace(/\s/g, '');
  if (!checkBrackets(expr)) {
    throw new Error('ExpressionError: Brackets must be paired');
  }


  const numPattern = /^\d+/;

  const arr = [];

  while (expr !== '') {
    if (numPattern.test(expr)) {
      arr.push(parseInt(expr.match(numPattern)[0]));
      expr = expr.replace(numPattern, '');
    } else {
      arr.push(expr.charAt(0));
      expr = expr.slice(1);
    }
  }

  const rpnArr = convertToRpn(arr);
  return calculateResult(rpnArr);
}

const checkBrackets = (str) => {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '(') {
      stack.push(str.charAt(i))
    }
    if (str.charAt(i) === ')') {
      if (!('(' === stack.pop())) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

const convertToRpn = (expr) => {
  let output = [];
  let operatorStack = [];
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 0
  };

  for (let i = 0; i < expr.length; i++) {
    const element = expr[i];

    if (Number.isInteger(element)) {
      output.push(element);
      continue;
    }

    if (element === '(') {
      operatorStack.push(element);
      continue;
    }

    if (element === ')') {
      let lastFromStack = operatorStack.pop();
      while (lastFromStack !== '(') {
        output.push(lastFromStack);
        lastFromStack = operatorStack.pop();
      }
      continue;
    }

    while ((operatorStack.length !== 0) && (precedence[element] <= precedence[operatorStack[operatorStack.length - 1]])) {
      output.push(operatorStack.pop());
    }
    operatorStack.push(element);
  }

  while (operatorStack.length !== 0) {
    output.push(operatorStack.pop());
  }

  return output;
};

const calculateResult = (output) => {
  let result = [];

  for (let i = 0; i < output.length; i++) {
    const element = output[i];

    if (Number.isInteger(element)) {
      result.push(element);
      continue;
    }

    const b = result.pop();
    const a = result.pop();

    if (output[i] === '+') {

      result.push(a + b);
    }
    if (output[i] === '-') {
      result.push(a - b);
    }
    if (output[i] === '*') {
      result.push(a * b);
    }
    if (output[i] === '/') {
      if (b === 0) {
        throw new Error('TypeError: Division by zero.');
      }
      result.push(a / b);
    }
  }
  return result[0];


};


module.exports = {
  expressionCalculator
}
