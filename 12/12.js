const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban: ",
});

console.log("Selamat datang di permainan tebak-tebakan");

const fileName = process.argv[2];

if (!fileName) {
  console.log("Masukkan nama file");
  process.exit(1);
}

fs.readFile(fileName, "utf8", (err, data) => {
  if (err) {
    console.error(`Gagal membaca file JSON: ${err}`);
    process.exit(1);
  }

  let i = 0;
  let wrong = 1;

  const myJson = JSON.parse(data);
  console.log(`Level: ${fileName}\n`);

  console.log(`Pertanyaan: ${myJson[i].definition}`);
  rl.prompt();

  rl.on("line", (line) => {
    if (line == myJson[i].term) {
      console.log("Anda Beruntung\n");
      i++;
    } else if (line == "skip") {
      myJson.push(myJson[i]);
      i++;
      console.log(`anda skip soal tsb\n`);
    } else {
      console.log(
        `Anda Kurang Beruntung! anda salah ${wrong++} kali, coba lagi\n`
      );
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
});
