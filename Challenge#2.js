function deretKaskus(n){
    let result = []
    let end = []
    
    for (let i = 1; i <= n; i++) {
        let number = i * 3;
        result.push(number)
    }

    for (let j = 0; j < result.length; j++){
        if(result[j] % 5 === 0 && result[j] % 6 === 0){
            end.push("KASKUS")
        } else if(result[j] % 6 === 0){
            end.push("KUS")
        } else if(result[j] % 5 === 0){
            end.push("KAS")
        } else {
            end.push(result[j])
        }
        
    }
    return end;
}
console.log(deretKaskus(10));