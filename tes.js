const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban: ",
});

console.log("Selamat datang di permainan tebak-tebakan\n");

// Memeriksa argumen command line untuk nama file JSON
const fileName = process.argv[2];

// Memeriksa apakah argumen file JSON diberikan
if (!fileName) {
  console.error("Mohon berikan nama file JSON sebagai argumen command line.");
  process.exit(1);
}

// Membaca file JSON
fs.readFile(fileName, "utf8", (err, data) => {
  if (err) {
    console.error(`Gagal membaca file JSON: ${err}`);
    process.exit(1);
  }

  try {
    const myJson = JSON.parse(data);
    let i = 0;
    let skippedQuestions = [];

    function askQuestion(index) {
      console.log(`Pertanyaan: ${myJson[index].definition}`);
      rl.prompt();
    }

    askQuestion(i);

    rl.on("line", (line) => {
      const input = line.trim().toLowerCase();

      if (input === "skip") {
        skippedQuestions.push(myJson[i]);
        i++;
        if (i === myJson.length) {
          console.log("Anda telah menyelesaikan semua pertanyaan.");
          askSkippedQuestions();
        } else {
          console.log(`Anda telah melewati pertanyaan ini. \n`);
          askQuestion(i);
        }
      } else {
        const answer = myJson[i].term.toLowerCase();

        if (input === answer) {
          console.log("Benar!!\n");
          i++;
          if (i === myJson.length) {
            console.log("Anda menang!\n");
            askSkippedQuestions();
          } else {
            askQuestion(i);
          }
        } else {
          console.log(`Salah!\n\nPertanyaan: ${myJson[i].definition}`);
          rl.prompt();
        }
      }
    }).on("close", () => {
      console.log(`Anda Berhasil!
      `);
      process.exit(0);
    });

    function askSkippedQuestions() {
      console.log("Pertanyaan yang di-skip:");
      let skippedIndex = 0;

      function askSkippedQuestion() {
        if (skippedIndex < skippedQuestions.length) {
          console.log(
            `Pertanyaan: ${skippedQuestions[skippedIndex].definition}`
          );
          rl.prompt();
        } else {
          console.log("Anda telah menjawab semua pertanyaan yang di-skip.");
          console.log(
            "Terima kasih telah bermain. Semoga kamu datang kembali!"
          );
          process.exit(0);
        }
      }

      askSkippedQuestion();

      rl.on("line", (line) => {
        const input = line.trim().toLowerCase(); // Mengubah input menjadi lowercase dan menghapus spasi di awal dan akhir

        if (input === "skip") {
          skippedIndex++;
          askSkippedQuestion();
        } else {
          const answer = skippedQuestions[skippedIndex].term.toLowerCase(); // Mengubah jawaban menjadi lowercase

          if (input === answer) {
            console.log("Benar!!\n");
            skippedIndex++;
            askSkippedQuestion();
          } else {
            console.log(
              `Salah!\n\nPertanyaan: ${skippedQuestions[skippedIndex].definition}`
            );
            rl.prompt();
          }
        }
      });
    }
  } catch (err) {
    console.error(`Gagal parsing file JSON: ${err}`);
    process.exit(1);
  }
});
