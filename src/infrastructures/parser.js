const { BinaryOperationNode } = require("../entities/binary-operation");
const { NumberNode } = require("../entities/number_node");

class ExpressionParser {
  constructor(expression) {
    this.tokens = expression.match(/\d+|\S/g) || [];
    this.index = 0;
  }

  getNextToken() {
    return this.tokens[this.index++];
  }

  parseExpression() {
    return this.processLowPriority();
  }

  processLowPriority() {
    let leftNode = this.processHighPriority();

    while (true) {
      const operator = this.getNextToken();

      if (operator === "*" || operator === "/" || operator === "%") {
        const rightNode = this.processHighPriority();
        leftNode = new BinaryOperationNode(operator, leftNode, rightNode);
      } else {
        this.index--;
        break;
      }
    }

    return leftNode;
  }

  processHighPriority() {
    let leftNode = this.processAtom();

    while (true) {
      const operator = this.getNextToken();

      if (operator === "+" || operator === "-") {
        const rightNode = this.processAtom();
        leftNode = new BinaryOperationNode(operator, leftNode, rightNode);
      } else {
        this.index--;
        break;
      }
    }

    return leftNode;
  }

  processAtom() {
    const token = this.getNextToken();

    if (token === "(") {
      const node = this.processLowPriority();
      this.getNextToken(); // pour consommer la parenthèse fermante
      return node;
    } else {
      return new NumberNode(parseFloat(token));
    }
  }
}

module.exports = { ExpressionParser };
