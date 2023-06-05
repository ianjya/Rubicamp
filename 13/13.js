const fs = require("fs");
const process = require("process");
const { argv } = require("process");
const data = fs.readFileSync("daftar.json", "utf-8");

let file = JSON.parse(data);
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv2 = process.argv[2];
const index = process.argv[3];
const filter = process.argv[2];
const args = process.argv;

let sentences = args.splice(3, argv.length);
let words = sentences.join(" ");
let n = sentences[0];

switch (argv2) {
  case undefined:
    console.log(`
      >>> JS TODO <<<
      command "help" untuk menampilkan bantuan`);
    rl.close();
    break;

  case "help":
    console.log(` >>> JS TODO <<<
$ node c13.js list
$ node c13.js add <task-content>
$ node c13.js delete <number> <all>
$ node c13.js complete <number> <all>
$ node c13.js uncomplete <number> <all>
$ node c13.js list:uncompleted
$ node c13.js list:completed 
$ node c13.js filter:<task_name>
    `);
    rl.close();
    break;

  case "list":
    if (file.length === 0) {
      console.log("Tidak ada list, gunakan add untuk menambahkan list");
    } else {
      for (let i = 0; i < file.length; i++) {
        if (file[i].complete === true) {
          console.log(`${i + 1}. [x] ${file[i].list} `);
        } else {
          console.log(`${i + 1}. [ ] ${file[i].list}`);
        }
      }
    }
    rl.close();
    break;

  case "add":
    const newTaskContent = words;

    const existingTask = file.find((task) => task.list === newTaskContent);
    if (existingTask) {
      console.log(`List "${newTaskContent}" telah tersedia`);
      rl.close();
      break;
    }

    const newTask = {
      list: newTaskContent,
      complete: false,
      tag: "",
    };

    file.push(newTask);

    const updatedData = JSON.stringify(file, null, 2);
    fs.writeFileSync("daftar.json", updatedData, "utf8");

    console.log(`"${newTaskContent}" telah ditambahkan`);
    rl.close();
    break;

  case "delete":
    if (index === "all") {
      file = [];
      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("daftar.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Something wong.");
        } else {
          console.log(`Semua daftar list telah dihapus dari daftar.`);
        }
        rl.close();
      });
    } else if (index >= 1 && index <= file.length) {
      const deletedList = file[index - 1].list;
      file.splice(index - 1, 1);
      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("daftar.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(`"${deletedList}" telah dihapus dari daftar`);
        }
        rl.close();
      });
    } else {
      console.log(`index tidak ada`);
      rl.close();
    }
    break;

  case "complete":
    if (index === "all") {
      file.forEach((list) => {
        list.complete = true;
      });

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("daftar.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(`Semua list ditandai sebagai selesai.`);
        }
        rl.close;
      });
    } else if (index >= 1 && index <= file.length) {
      const completedList = file[index - 1];
      completedList.complete = true;

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("daftar.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(`List "${completedList.list}" ditandai sebagai selesai.`);
        }
        rl.close();
      });
    } else {
      console.log("Indeks list tidak ada");
      rl.close();
    }
    rl.close();
    break;

  case "uncomplete":
    if (index === "all") {
      file.forEach((list) => {
        list.complete = false;
      });

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("daftar.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(`Semua list ditandai belum selesai.`);
        }
        rl.close;
      });
    } else if (index >= 1 && index <= file.length) {
      const completedList = file[index - 1];
      completedList.complete = false;

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("daftar.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("something wong.");
        } else {
          console.log(`List "${completedList.list}" ditandai belum selesai.`);
        }
        rl.close();
      });
    } else {
      console.log("Indeks list tidak ada");
      rl.close();
    }
    rl.close();
    break;

  case "list:completed":
    const completedLists = file.filter((item) => item.complete === true);
    if (completedLists.length === 0) {
      console.log("Tidak ada list yang selesai.");
    } else {
      completedLists.forEach((item, index) => {
        const listNumber = file.indexOf(item) + 1;
        console.log(`${listNumber}. [x] ${item.list}`);
      });
    }
    rl.close();
    break;

  case "list:uncompleted":
    const uncompletedLists = file.filter((item) => item.complete === false);
    if (uncompletedLists.length === 0) {
      console.log("Tidak ada list yang tidak selesai.");
    } else {
      uncompletedLists.forEach((item, index) => {
        const listNumber = file.indexOf(item) + 1;
        console.log(`${listNumber}. [ ] ${item.list}`);
      });
    }
    rl.close();
    break;

  case filter:
    const kata = filter.split(":")[1];
    for (let i = 0; i < file.length; i++) {
      if (file[i].list.toString().includes(kata) == true) {
        console.log(
          `${i + 1}. ${file[i].complete ? "[X]" : "[ ]"} ${file[i].list}`
        );
      }
    }
    rl.close();
    break;
}
