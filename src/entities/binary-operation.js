const { Node } = require("./node");

class BinaryOperationNode extends Node {
  constructor(operator, left, right) {
    super();
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  evaluate() {
    const leftValue = this.left.evaluate();
    const rightValue = this.right.evaluate();

    switch (this.operator) {
      case "+":
        return leftValue + rightValue;

      case "-":
        return leftValue - rightValue;

      case "*":
        return leftValue * rightValue;

      case "/":
        if (rightValue !== 0) {
          return leftValue / rightValue;
        }
        throw new Error("Impossible de diviser par 0");

      case "%":
        if (rightValue !== 0) {
          return leftValue % rightValue;
        }
        throw new Error("Impossible de diviser par 0");

      default:
        throw new Error("Operateur non pris en charge");
    }
  }
}

module.exports = { BinaryOperationNode };
