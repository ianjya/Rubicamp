function pola(str){
    let result = [];
    let pattern = str;
    let split =  pattern.split(' ');
    let multiplyBy = split[2]
    let crash1 = split[0];
    let crash2 = split [4];
    let Crashes1 = crash1.split(' ').join(' ');
    let Crashes2 = crash2.split(' ').join(' ');

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (Crashes1.replace('#', i )* multiplyBy == Crashes2.replace('#', j)) {
                result.push(i, j);
                return result
            }
        }
    }
}
console.log(pola("42#3 * 188 = 80#204"))
//result [8, 5]
console.log(pola("8#61 * 895 = 78410#5"))
//result [7, 9]