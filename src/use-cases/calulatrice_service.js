const { BinaryOperationNode } = require("../entities/binary-operation");
const { NumberNode } = require("../entities/number_node");
const { ExpressionParser } = require("../infrastructures/parser");

class CalculatorService {
  calculate(expression) {
    const parser = new ExpressionParser(expression);
    const expressionTree = parser.parseExpression();
    return this.evaluateTree(expressionTree);
  }

  evaluateTree(node) {
    if (node instanceof NumberNode) {
      return node.value;
    } else if (node instanceof BinaryOperationNode) {
      const leftValue = this.evaluateTree(node.left);
      const rightValue = this.evaluateTree(node.right);

      switch (node.operator) {
        case "+":
          return leftValue + rightValue;
        case "-":
          return leftValue - rightValue;
        case "*":
          return leftValue * rightValue;
        case "/":
          if (rightValue === 0) {
            throw new Error("Erreur : Division par zéro");
          }
          return leftValue / rightValue;
        case "%":
          if (rightValue === 0) {
            throw new Error("Erreur : Modulo par zéro");
          }
          return leftValue % rightValue;
        default:
          throw new Error(`Opérateur non pris en charge : ${node.operator}`);
      }
    } else {
      throw new Error("Type de nœud non pris en charge");
    }
  }
}

module.exports = { CalculatorService };
