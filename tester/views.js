// views.js
import readline from "readline";
import Table from "cli-table";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function displayTable(headers, rows) {
  const table = new Table({
    head: headers,
  });
  table.push(...rows);
  console.log(table.toString());
}

export function getInput(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}
