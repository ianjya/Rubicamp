const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Tulis kalimatmu disini> ",
});

rl.prompt();

rl.on("line", (line) => {
  console.log(`hasil konversi: ${separateWords(line)}`);

  rl.prompt();
}).on("close", () => {
  console.log("Bye bye!");
  process.exit(0);
});

function separateWords(sentence) {
  const words = sentence.split(" ");
  const separatedWords = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (/^[aeiou]/i.test(word)) {
      separatedWords.push(word);
    } else {
      const firstLetter = word.charAt(0);
      const baba = word.slice(1);
      const asd = baba + firstLetter + "nyo";
      separatedWords.push(asd);
    }
  }
  return separatedWords.join(" ");
}
