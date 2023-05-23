function weirdMultiply(number) {
    var firstNumber = Math.floor(number / 10);
    var secondNumber = number % 10;
    var result = firstNumber * secondNumber;

    if (number < 10)
        return number;
    if (typeof number !== "number") {
        return "Error banh";
    }
    if (number >= 100) {
        const firstNumber = Math.floor(number / 100);
        const third = number % 10;
        const secondNumber = (number - (firstNumber * 100) - third ) /10

        var final = firstNumber*secondNumber*third 
        if (final >= 10){
            return weirdMultiply(final)
        }
        return final;
    }
    if (result >= 10) {
        return weirdMultiply(result)
    }
    return result
}
console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));
