const { Node } = require("./node");

class NumberNode extends Node {
  constructor(value) {
    super();
    this.value = value;
  }
  evaluate() {
    return this.value;
  }
}

module.exports = { NumberNode };
