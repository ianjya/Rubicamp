const fs = require("node:fs");

let data = fs.readFileSync("data.json", "utf8");

const myJson = JSON.parse(data);

const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban: ",
});

console.log("Selamat datang di permainan tebak-tebakan");

let i = 0;

console.log(`Pertanyaan: ${myJson[i].definition}`);
rl.prompt();

rl.on("line", (line) => {
  if (line == myJson[i].term) {
    console.log("Benar!!");
    i++;
  } else {
    console.log("Salah!!");
  }
  if (i == myJson.length) {
    rl.close();
  }

  console.log(`Pertanyaan: ${myJson[i].definition}`);
  rl.prompt();
}).on("close", () => {
  console.log("Anda menang!");
  process.exit(0);
});
