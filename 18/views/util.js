import readline from "node:readline";

export function batas() {
  console.log(
    "=============================================================================="
  );
}

export function bar() {
  return "==============================================================================";
}

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function welcome() {
  console.log(`Universitas Pendidikan Indonesia\nJalan Setiabudhi No. 255`);
}
