function separateWords(sentence) {
    const words = sentence.split(' ');
    const separatedWords = [];
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
  
      if (/^[aeiou]/i.test(word)) {
        separatedWords.push(word);
      } else {
        const firstLetter = word.charAt(0);
        const baba = word.slice(1);
        const asd = baba + firstLetter + "nyo"
        separatedWords.push(asd)
    }
    }
  
    return separatedWords.join(' ');
}
console.log(separateWords("ibu tidak pernah aku"))
