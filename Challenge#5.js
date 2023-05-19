function stringManipulation(word) {
    let vokal = ["a", "i", "u", "e", "o"];
    let firstLetter = word[0].toLowerCase();
    //
    const letters = word.split('');
    const secondLetter = letters.shift();

    
    if (vokal.includes(firstLetter)) {
      return word;
    } else {
        letters.push(secondLetter);
        const result =  letters.join('') + "nyo" ;

        return result;
    } 
    }
  
console.log(stringManipulation("bebek"))
console.log(stringManipulation("ayam"))