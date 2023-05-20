function weirdMultiply(number) {
    if (number < 10)
        return number;

    if (typeof number !== "number" || number > 99) {
        return "Error banh";
    }

    var firstNumber = Math.floor(number / 10);
    var secondNumber = number % 10;
    var result = firstNumber * secondNumber;

    if (result >= 10) {
        return weirdMultiply(result)
    }

    return result
}
console.log(weirdMultiply(3))