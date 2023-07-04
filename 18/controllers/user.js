import { rl, batas, welcome } from "../views/util.js";
import Mahasiswa from "./mahasiswa.js";
import Jurusan from "./jurusan.js";
import Dosen from "./dosen.js";
import MataKuliah from "./mataKuliah.js";
import Kontrak from "./kontrak.js";
import Table from "cli-table";

export default class User {
  static start() {
    batas();
    welcome();
    batas();
  }

  static login() {
    rl.question("Username: ", (username) => {
      rl.question("Password: ", (password) => {
        User.checkLogin(username, password);
      });
    });
  }

  static checkLogin(username, password) {
    if (username === "asd" && password === "qwe") {
      batas();
      console.log("Login successful!");
      User.showMenu();
    } else {
      console.log("Invalid username or password.");
      User.login();
    }
  }

  static showMenu() {
    batas();
    console.log("\nsilahkan pilih opsi dibawah ini:");
    console.log("[1] Mahasiswa");
    console.log("[2] Jurusan");
    console.log("[3] Dosen");
    console.log("[4] Mata Kuliah");
    console.log("[5] Kontrak");
    console.log("[6] Keluar");
    batas();

    rl.question("Masukan salah satu nomor dari opsi diatas: ", (menu) => {
      User.handleMenu(menu);
    });
  }

  static handleMenu(menu) {
    switch (menu) {
      case "1":
        Mahasiswa.tampilkanMahasiswa();
        break;
      case "2":
        console.log("Tampilkan data jurusan");
        Jurusan.tampilkanJurusan();
        break;
      case "3":
        console.log("Tampilkan data dosen");
        Dosen.tampilkanDosen();
        break;
      case "4":
        console.log("Tampilkan data Mata Kuliah");
        MataKuliah.tampilkanMataKuliah();
        break;
      case "5":
        console.log("Tampilkan data Kontrak");
        Kontrak.showKontrak();
        break;
      case "6":
        console.log("Bye bye");
        rl.close();
        break;
      default:
        console.log("Menu tidak valid.");
        User.showMenu();
        break;
    }
  }
}
