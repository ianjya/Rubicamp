const fs = require("fs");
const process = require("process");
const { argv } = require("process");
const data = fs.readFileSync("list.json", "utf8");

let file = JSON.parse(data);
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv2 = process.argv[2];
const index = process.argv[3];
const args = process.argv;
const filter = process.argv[2];

let sentences = args.slice(4);
let words = sentences.join(" ");
let n = args[3];
//~~~
// console.log(argv.length + "!!!");

switch (argv2) {
  case undefined:
    console.log(`
    >>> JS TODO <<<
    $ node challenge13.js <command>
    $ node challenge13.js list
    $ node challenge13.js task <task_id>
    $ node challenge13.js add <task-content>
    $ node challenge13.js delete <task_id>
    $ node challenge13.js complete <task_id>
    $ node challenge13.js uncomplete <task_id>
    $ node challenge13.js list:outstanding asc|desc
    $ node challenge13.js list:completed asc|desc
    $ node challenge13.js tag <task_id> <tag_name_1> <tag_name2>...<tag_name_N>
    $ node challenge13.js filter:<tag_name>`);
    rl.close();
    break;

  case "list":
    if (file.length === 0) {
      console.log("Tidak ada list, gunakan metode add untuk menambahkan list");
    } else {
      for (let i = 0; i < file.length; i++) {
        if (file[i].complete === true) {
          console.log(`${i + 1}. [X] ${file[i].list}`);
        } else {
          console.log(`${i + 1}. [ ] ${file[i].list} 
              ==> modlist: "${file[i].tag}"`);
        }
      }
    }
    rl.close();
    break;

  case "add":
    const newTaskContent = words;

    const existingTask = file.find((task) => task.list === newTaskContent);
    if (existingTask) {
      console.log(
        `List "${newTaskContent}" sudah ditambahkan. Anda tidak dapat membuat list yang sama berulang kali.`
      );
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
    fs.writeFileSync("list.json", updatedData, "utf8");

    console.log(`"${newTaskContent}" telah ditambahkan`);
    rl.close();
    break;

  case "delete":
    if (index === "all") {
      const deletedLists = file.map((item) => item.list);
      file = [];
      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("list.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(
            `Semua list (${deletedLists.join(", ")}) telah dihapus dari daftar.`
          );
        }
        rl.close();
      });
    } else if (index >= 1 && index <= file.length) {
      const deletedList = file[index - 1].list;
      file.splice(index - 1, 1);
      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("list.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(`"${deletedList}" telah dihapus dari daftar`);
        }
        rl.close();
      });
    } else {
      console.log("Indeks list tidak ada");
      rl.close();
    }
    break;

  case "complete":
    if (index === "all") {
      file.forEach((list) => {
        list.complete = true;
      });

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("list.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(`Semua list ditandai sebagai selesai.`);
        }
        rl.close();
      });
    } else if (index.includes(",")) {
      const indexes = index.split(",");
      const completedLists = [];

      indexes.forEach((idx) => {
        const listIndex = parseInt(idx);
        if (listIndex >= 1 && listIndex <= file.length) {
          const completedList = file[listIndex - 1];
          completedList.complete = true;
          completedLists.push(completedList.list);
        }
      });

      if (completedLists.length > 0) {
        const jsonData = JSON.stringify(file, null, 2);
        fs.writeFile("list.json", jsonData, "utf8", function (err) {
          if (err) {
            console.log("Terjadi kesalahan saat menulis ke file.");
          } else {
            console.log(
              `List [${completedLists.join(", ")}] ditandai sebagai selesai.`
            );
          }
          rl.close();
        });
      } else {
        console.log("Indeks list tidak ada");
        rl.close();
      }
    } else if (index >= 1 && index <= file.length) {
      const completedList = file[index - 1];
      completedList.complete = true;

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("list.json", jsonData, "utf8", function (err) {
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
    break;

  case "uncomplete":
    if (index === "all") {
      file.forEach((list) => {
        list.complete = false;
      });

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("list.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(`Semua list ditandai sebagai belum selesai.`);
        }
        rl.close();
      });
    } else if (index.includes(",")) {
      const indexes = index.split(",");
      const uncompletedLists = [];

      indexes.forEach((idx) => {
        const listIndex = parseInt(idx);
        if (listIndex >= 1 && listIndex <= file.length) {
          const uncompletedList = file[listIndex - 1];
          uncompletedList.complete = false;
          uncompletedLists.push(uncompletedList.list);
        }
      });

      if (uncompletedLists.length > 0) {
        const jsonData = JSON.stringify(file, null, 2);
        fs.writeFile("list.json", jsonData, "utf8", function (err) {
          if (err) {
            console.log("Terjadi kesalahan saat menulis ke file.");
          } else {
            console.log(
              `List [${uncompletedLists.join(
                ", "
              )}] ditandai sebagai belum selesai.`
            );
          }
          rl.close();
        });
      } else {
        console.log("Indeks list tidak ada");
        rl.close();
      }
    } else if (index >= 1 && index <= file.length) {
      const uncompletedList = file[index - 1];
      uncompletedList.complete = false;

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("list.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(
            `List "${uncompletedList.list}" ditandai sebagai belum selesai.`
          );
        }
        rl.close();
      });
    } else {
      console.log("Indeks list tidak ada");
      rl.close();
    }
    break;

  case "list:outstanding":
    if (file.length === 0) {
      console.log("Tidak ada list, gunakan metode add untuk menambahkan list");
    } else {
      const filteredLists = file.filter((task) => !task.complete);
      if (filter === "asc") {
        filteredLists.sort((a, b) => a.list.localeCompare(b.list));
      } else if (filter === "desc") {
        filteredLists.sort((a, b) => b.list.localeCompare(a.list));
      }
      for (let i = 0; i < filteredLists.length; i++) {
        console.log(
          `${i + 1}. [ ] ${filteredLists[i].list} 
              ==> modlist: "${filteredLists[i].tag}"`
        );
      }
    }
    rl.close();
    break;

  case "list:completed":
    if (file.length === 0) {
      console.log("Tidak ada list, gunakan metode add untuk menambahkan list");
    } else {
      const filteredLists = file.filter((task) => task.complete);
      if (filter === "asc") {
        filteredLists.sort((a, b) => a.list.localeCompare(b.list));
      } else if (filter === "desc") {
        filteredLists.sort((a, b) => b.list.localeCompare(a.list));
      }
      for (let i = 0; i < filteredLists.length; i++) {
        console.log(`${i + 1}. [X] ${filteredLists[i].list}`);
      }
    }
    rl.close();
    break;

  case "tag":
    if (index >= 1 && index <= file.length) {
      const taskIndex = index - 1;
      const tags = args.slice(4);

      file[taskIndex].tag = tags.join(" ");

      const jsonData = JSON.stringify(file, null, 2);
      fs.writeFile("list.json", jsonData, "utf8", function (err) {
        if (err) {
          console.log("Terjadi kesalahan saat menulis ke file.");
        } else {
          console.log(
            `List "${file[taskIndex].list}" ditandai dengan tag "${tags.join(
              ", "
            )}".`
          );
        }
        rl.close();
      });
    } else {
      console.log("Indeks list tidak ada");
      rl.close();
    }
    break;

  case "filter":
    const tagToFilter = index;
    const filteredByTag = file.filter(
      (task) => task.tag.toLowerCase() === tagToFilter.toLowerCase()
    );

    if (filteredByTag.length === 0) {
      console.log(`Tidak ada list dengan tag "${tagToFilter}".`);
    } else {
      for (let i = 0; i < filteredByTag.length; i++) {
        console.log(
          `${i + 1}. [ ] ${filteredByTag[i].list} 
              ==> modlist: "${filteredByTag[i].tag}"`
        );
      }
    }
    rl.close();
    break;

  default:
    console.log(`Command "${argv2}" tidak ditemukan. Silakan coba lagi.`);
    rl.close();
    break;
}
