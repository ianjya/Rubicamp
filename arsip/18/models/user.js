import { batas } from "../views/util.js";
import Mahasiswa from "./mahasiswa.js";
import Jurusan from "./jurusan.js";
import Dosen from "./dosen.js";
import MataKuliah from "./mataKuliah.js";
import Kontrak from "./kontrak.js";
import readline from "readline";

export default class User {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.mahasiswa = new Mahasiswa();
    this.jurusan = new Jurusan();
    this.dosen = new Dosen();
    this.mataKuliah = new MataKuliah();
    this.kontrak = new Kontrak();
  }

  startLoginSystem() {
    console.log(batas);
    console.log(`Universitas Pendidikan Indonesia\nJalan Setiabudhi No. 255`);
    console.log(batas);

    this.login();
  }

  login() {
    this.rl.question("Username: ", (username) => {
      this.rl.question("Password: ", (password) => {
        this.checkLogin(username, password);
      });
    });
  }

  checkLogin(username, password) {
    if (username === "asd" && password === "qwe") {
      console.log(batas);
      console.log("Login successful!");
      this.showMenu();
    } else {
      console.log("Invalid username or password.");
      this.login();
    }
  }

  showMenu() {
    console.log(batas);
    console.log("\nsilahkan pilih opsi dibawah ini:");
    console.log("[1] Mahasiswa");
    console.log("[2] Jurusan");
    console.log("[3] Dosen");
    console.log("[4] Mata Kuliah");
    console.log("[5] Kontrak");
    console.log("[6] Keluar");
    console.log(batas);

    this.rl.question("Masukan salah satu nomor dari opsi diatas: ", (menu) => {
      this.handleMenu(menu);
    });
  }

  handleMenu(menu) {
    switch (menu) {
      case "1":
        this.tampilkanMahasiswa();
        break;
      case "2":
        console.log("Tampilkan data jurusan");
        this.tampilkanJurusan();
        break;
      case "3":
        console.log("Tampilkan data dosen");
        this.tampilkanDosen();
        break;
      case "4":
        console.log("Tampilkan data Mata Kuliah");
        this.tampilkanMataKuliah();
        break;
      case "5":
        console.log("Tampilkan data Kontrak");
        this.showKontrak();
        break;
      case "6":
        console.log("Bye bye");
        this.rl.close();
        break;
      default:
        console.log("Menu tidak valid.");
        this.showMenu();
        break;
    }
  }

  tampilkanMahasiswa() {
    this.rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Mahasiswa\n[2] Cari Mahasiswa\n[3] Tambah Mahasiswa\n[4] Hapus Mahasiswa\n[5] Kembali
${batas}
Pilih menu mahasiswa: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Mahasiswa   ");
            this.mahasiswa.ambilDataMahasiswa(() => {
              this.tampilkanMahasiswa();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Mahasiswa");
            this.mahasiswa.cariDataMahasiswa(() => {
              this.tampilkanMahasiswa();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Mahasiswa");
            this.mahasiswa.tambahDataMahasiswa(() => {
              this.tampilkanMahasiswa();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Mahasiswa");
            this.mahasiswa.hapusDataMahasiswa(() => {
              this.tampilkanMahasiswa();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            this.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            this.tampilkanMahasiswa();
            break;
        }
      }
    );
  }

  tampilkanJurusan() {
    this.rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Jurusan\n[2] Cari Jurusan\n[3] Tambah Jurusan\n[4] Hapus Jurusan\n[5] Kembali
${batas}
Pilih menu jurusan: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Jurusan   ");
            this.jurusan.ambilDataJurusan(() => {
              this.tampilkanJurusan();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Jurusan");
            this.jurusan.cariDataJurusan(() => {
              this.tampilkanJurusan();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Jurusan");
            this.jurusan.tambahDataJurusan(() => {
              this.tampilkanJurusan();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Jurusan");
            this.jurusan.hapusDataJurusan(() => {
              this.tampilkanJurusan();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            this.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            this.tampilkanJurusan();
            break;
        }
      }
    );
  }

  tampilkanDosen() {
    this.rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Dosen\n[2] Cari Dosen\n[3] Tambah Dosen\n[4] Hapus Dosen\n[5] Kembali
${batas}
Pilih menu dosen: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Dosen   ");
            this.dosen.ambilDataDosen(() => {
              this.tampilkanDosen();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Dosen");
            this.dosen.cariDataDosen(() => {
              this.tampilkanDosen();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Dosen");
            this.dosen.tambahDataDosen(() => {
              this.tampilkanDosen();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Dosen");
            this.dosen.hapusDataDosen(() => {
              this.tampilkanDosen();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            this.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            this.tampilkanDosen();
            break;
        }
      }
    );
  }

  tampilkanMataKuliah() {
    this.rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Mata Kuliah\n[2] Cari Mata Kuliah\n[3] Tambah Mata Kuliah\n[4] Hapus Mata Kuliah\n[5] Kembali
${batas}
Pilih menu mata kuliah: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Mata Kuliah   ");
            this.mataKuliah.ambilDataMataKuliah(() => {
              this.tampilkanMataKuliah();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Mata Kuliah");
            this.mataKuliah.cariDataMataKuliah(() => {
              this.tampilkanMataKuliah();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Mata Kuliah");
            this.mataKuliah.tambahDataMataKuliah(() => {
              this.tampilkanMataKuliah();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Mata Kuliah");
            this.mataKuliah.hapusDataMataKuliah(() => {
              this.tampilkanMataKuliah();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            this.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            this.tampilkanMataKuliah();
            break;
        }
      }
    );
  }

  showKontrak() {
    console.log(batas);
    console.log("\nsilahkan pilih opsi dibawah ini:");
    console.log("[1] Daftar Kontrak");
    console.log("[2] Cari Kontrak");
    console.log("[3] Tambah Kontrak");
    console.log("[4] Hapus Kontrak");
    console.log("[5] Update Nilai");
    console.log("[6] Kembali");
    console.log(batas);

    this.rl.question("Masukan salah satu nomor dari opsi diatas: ", (opsi) => {
      this.nextKontrak(opsi);
    });
  }

  nextKontrak(opsi) {
    switch (opsi) {
      case "1":
        console.log(batas);
        console.log("\nDaftar Mata Kuliah   ");
        this.kontrak.ambilKontrak(() => {
          this.showKontrak();
        });
        break;
      case "2":
        console.log(batas);
        console.log("Cari Mata Kuliah");
        this.kontrak.cariKontrak(() => {
          this.showKontrak();
        });
        break;
      case "3":
        console.log(batas);
        console.log("Tambah Data Mata Kuliah");
        this.kontrak.tambahKontrak(() => {
          this.showKontrak();
        });
        break;
      case "4":
        console.log(batas);
        console.log("Hapus Kontrak");
        this.kontrak.hapusKontrak(() => {
          this.showKontrak();
        });
        break;
      case "5":
        console.log(batas);
        console.log("Update Nilai");
        this.kontrak.updateNilai(() => {
          this.showKontrak();
        });
        break;
      case "6":
        console.log(batas);
        console.log("Kembali ke menu");
        this.showMenu();
        break;
      default:
        console.log("pilih angka yang ada");
        this.showKontrak();
        break;
    }
  }
}
