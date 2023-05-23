function checkParam(n){
    for(let i = 2; i < n; i++){
        if(n % i === 0 ){
            return false   
        } 
    }
    return true;
}
function indexPrime(param1){
    let counter = 0;
    for(var bahan = 2; counter < param1 ; bahan++){
       if(checkParam(bahan)){
        counter++
       }
    }
    console.log(bahan - 1);
}
indexPrime(3);
