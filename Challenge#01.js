
function sum() {
    let a = 0;
    for(let i = 0; i < arguments.length; i++) {
      a += arguments[i];
    }
return a;
}

console.log(sum(1,2,7))
console.log(sum(1,4))
console.log(sum(11))
console.log(sum(1,2,7))
console.log(sum(101,2))
