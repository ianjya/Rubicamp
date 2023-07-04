import Table from "cli-table";
import { bar, rl, batas, welcome } from "../views/util.js";

import ListDosen from "../models/dosen.js";
import User from "./user.js";

export default class Dosen {
  static tampilkanDosen() {
    rl.question(
      `${bar()}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Dosen\n[2] Cari Dosen\n[3] Tambah Dosen\n[4] Hapus Dosen\n[5] Kembali
${bar()}
    Pilih menu dosen: `,
      (option) => {
        switch (option) {
          case "1":
            batas();
            console.log("\nDaftar Dosen   ");
            Dosen.ambilDataDosen(() => {
              Dosen.tampilkanDosen();
            });
            break;
          case "2":
            batas();
            console.log("Cari Dosen");
            Dosen.cariDataDosen(() => {
              Dosen.tampilkanDosen();
            });
            break;
          case "3":
            batas();
            console.log("Tambah Data Dosen");
            Dosen.tambahDataDosen(() => {
              Dosen.tampilkanDosen();
            });
            break;
          case "4":
            batas();
            console.log("Hapus Dosen");
            Dosen.hapusDataDosen(() => {
              Dosen.tampilkanDosen();
            });
            break;
          case "5":
            batas();
            console.log("Kembali ke menu");
            User.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            Dosen.tampilkanDosen();
            break;
        }
      }
    );
  }

  static ambilDataDosen(next) {
    ListDosen.daftar((rows) => {
      const table = new Table({
        head: ["NIP", "Nama Dosen"],
        colWidths: [12, 20],
      });

      rows.forEach((row) => {
        table.push([row.nip, row.dosen]);
      });
      console.log(table.toString());
      next();
    });
  }

  static cariDataDosen(next) {
    rl.question("Masukkan NIM: ", (nip) => {
      ListDosen.cari(nip, (row) => {
        if (row) {
          batas();
          console.log("\n**Data Dosen");
          console.log(`NIM: ${row.nip}`);
          console.log(`Nama: ${row.dosen}`);
        } else {
          batas();
          console.log("Data dosen tidak ditemukan");
        }
        next();
      });
    });
  }

  static tambahDataDosen(next) {
    console.log("\n**Menambahkan data dosen baru...");
    console.log("Lengkapi data dibawah ini:");
    ListDosen.daftar((rows) => {
      const table = new Table({
        head: ["NIP", "Nama"],
        colWidths: [12, 20],
      });
      rows.forEach((row) => {
        table.push([row.nip, row.dosen]);
      });
      console.log(table.toString());
      rl.question("Masukkan NIP: ", (nip) => {
        rl.question("Masukkan Nama Dosen: ", (dosen) => {
          ListDosen.tambah(nip, dosen, () => {
            next();
          });
        });
      });
    });
  }

  static hapusDataDosen(next) {
    console.log("\n**Menghapus Data Dosen...");
    rl.question("Masukan NIP Dosen yang ingin dihapus: ", (nip) => {
      ListDosen.hapus(nip, (data) => {
        if (data.length > 0) {
          console.log("Data dosen berhasil dihapus.");
          this.ambilDataDosen(next);
        } else {
          console.log("Data Dosen tidak ditemukan.");
          console.log(`[*] Untuk kembali ke menu dosen`);
          console.log("[a] untuk menginput NIP kembali");
          rl.question("Input: ", (data) => {
            switch (data) {
              case "*":
                next();
                break;
              default:
                this.hapusDataDosen(next);
                break;
            }
          });
        }
      });
    });
  }
}
