const { CalculatorService } = require("./use-cases/calulatrice_service");

const calculatorService = new CalculatorService();
const expression = "3 + 4 * (5 - 2) / 2";

try {
  const result = calculatorService.calculate(expression);
  console.log("Résultat de l'expression:", result);
} catch (error) {
  console.error(error.message);
}
