import Table from "cli-table";
import User from "./user.js";
import { rl, batas, bar, welcome } from "../views/util.js";

import ListJurusan from "../models/jurusan.js";

export default class Jurusan {
  static tampilkanJurusan() {
    rl.question(
      `${bar()}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Jurusan\n[2] Cari Jurusan\n[3] Tambah Jurusan\n[4] Hapus Jurusan\n[5] Kembali
${bar()}
    Pilih menu jurusan: `,
      (option) => {
        switch (option) {
          case "1":
            batas();
            console.log("\nDaftar Jurusan   ");
            Jurusan.ambilDataJurusan(() => {
              Jurusan.tampilkanJurusan();
            });
            break;
          case "2":
            batas();
            console.log("Cari Jurusan");
            Jurusan.cariDataJurusan(() => {
              Jurusan.tampilkanJurusan();
            });
            break;
          case "3":
            batas();
            console.log("Tambah Data Jurusan");
            Jurusan.tambahDataJurusan(() => {
              Jurusan.tampilkanJurusan();
            });
            break;
          case "4":
            batas();
            console.log("Hapus Jurusan");
            Jurusan.hapusDataJurusan(() => {
              Jurusan.tampilkanJurusan();
            });
            break;
          case "5":
            batas();
            console.log("Kembali ke menu");
            User.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            Jurusan.tampilkanJurusan();
            break;
        }
      }
    );
  }

  static ambilDataJurusan(next) {
    ListJurusan.daftar((rows) => {
      const table = new Table({
        head: ["ID Jurusan", "Nama Jurusan"],
        colWidths: [12, 20],
      });

      rows.forEach((row) => {
        table.push([row.idJurusan, row.namaJurusan]);
      });
      console.log(table.toString());
      next();
    });
  }

  static cariDataJurusan(next) {
    rl.question("Masukkan ID: ", (idJurusan) => {
      ListJurusan.cari(idJurusan, (row) => {
        if (!row) {
          batas();
          console.log("Data jurusan tidak ditemukan");
        } else {
          batas();
          console.log("\n**Data Jurusan");
          console.log(`NIM: ${row.idJurusan}`);
          console.log(`Nama: ${row.namaJurusan}`);
        }
        next();
      });
    });
  }

  static tambahDataJurusan(next) {
    console.log("\n**Menambahkan data jurusan baru...");
    console.log("Lengkapi data dibawah ini:");
    ListJurusan.daftar((rows) => {
      const table = new Table({
        head: ["ID Jurusan", "Nama Jurusan"],
        colWidths: [12, 20],
      });
      rows.forEach((row) => {
        table.push([row.idJurusan, row.namaJurusan]);
      });
      console.log(table.toString());
      rl.question("Masukkan idJurusan: ", (idJurusan) => {
        rl.question("Masukkan Nama Jurusan: ", (namaJurusan) => {
          ListJurusan.tambah(idJurusan, namaJurusan, () => {
            next();
          });
        });
      });
    });
  }

  static hapusDataJurusan(next) {
    console.log("\n**Menghapus Data Jurusan...");
    rl.question("Masukan ID Jurusan yang ingin dihapus: ", (idJurusan) => {
      ListJurusan.hapus(idJurusan, (data) => {
        if (data.length > 0) {
          console.log("Data jurusan berhasil dihapus.");
          next();
        } else {
          console.log("Data jurusan tidak ditemukan.");
          console.log(`[*] Untuk kembali ke menu jurusan`);
          console.log("[a] untuk menginput NIM kembali");
          rl.question("Input: ", (data) => {
            switch (data) {
              case "*":
                next();
                break;
              default:
                this.hapusDataJurusan(next);
                break;
            }
          });
        }
      });
    });
  }
}
