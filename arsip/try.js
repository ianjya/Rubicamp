const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "history") {
    const history = rl.history.reverse();
    console.log("Riwayat Input:");
    history.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  } else {
    console.log(`Input: ${input}`);
  }
});

rl.on("close", () => {
  console.log("Terima kasih! Sampai jumpa lagi.");
});

console.log('Ketik "history" untuk melihat riwayat input.');
