import Table from "cli-table";

import { bar, rl, batas, welcome } from "../views/util.js";
import User from "./user.js";
import ListMataKuliah from "../models/mataKuliah.js";
import ListJurusan from "../models/jurusan.js";

export default class MataKuliah {
  static tampilkanMataKuliah() {
    rl.question(
      `${bar()}\n
    silahkan pilih opsi di bawah ini:\n[1] Daftar Mata Kuliah\n[2] Cari Mata Kuliah\n[3] Tambah Mata Kuliah\n[4] Hapus Mata Kuliah\n[5] Kembali
${bar()}
Pilih menu mata kuliah: `,
      (option) => {
        switch (option) {
          case "1":
            batas();
            console.log("\nDaftar Mata Kuliah   ");
            MataKuliah.ambilDataMataKuliah(() => {
              MataKuliah.tampilkanMataKuliah();
            });
            break;
          case "2":
            batas();
            console.log("Cari Mata Kuliah");
            MataKuliah.cariDataMataKuliah(() => {
              MataKuliah.tampilkanMataKuliah();
            });
            break;
          case "3":
            batas();
            console.log("Tambah Data Mata Kuliah");
            MataKuliah.tambahDataMataKuliah(() => {
              MataKuliah.tampilkanMataKuliah();
            });
            break;
          case "4":
            batas();
            console.log("Hapus Mata Kuliah");
            MataKuliah.hapusDataMataKuliah(() => {
              MataKuliah.tampilkanMataKuliah();
            });
            break;
          case "5":
            batas();
            console.log("Kembali ke menu");
            User.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            MataKuliah.tampilkanMataKuliah();
            break;
        }
      }
    );
  }

  static ambilDataMataKuliah(next) {
    ListMataKuliah.daftar((rows) => {
      const table = new Table({
        head: ["ID", "Nama", "SKS", "Jurusan"],
        colWidths: [5, 20, 5, 20],
      });
      // console.log(rows);
      rows.forEach((row) => {
        // console.log(row);
        table.push([
          row.idMataKuliah,
          row.namaMataKuliah,
          row.sks,
          row.namaJurusan,
        ]);
      });
      console.log(table.toString());
      next();
    });
  }

  static cariDataMataKuliah(next) {
    rl.question("Masukkan ID Mata Kuliah: ", (idMataKuliah) => {
      ListMataKuliah.cari(idMataKuliah, (row) => {
        if (!row) {
          batas();
          console.log("Data mataKuliah tidak ditemukan");
        } else {
          batas();
          console.log("\n**Data Mata Kuliah");
          console.log(`ID: ${row.idMataKuliah}`);
          console.log(`Nama: ${row.namaMataKuliah}`);
          console.log(`SKS: ${row.sks}`);
          console.log(`Jurusan: ${row.namaJurusan}`);
        }

        next();
      });
    });
  }

  static tambahDataMataKuliah(next) {
    console.log("\n**Menambahkan data mata kuliah baru...");
    rl.question("Masukkan ID Mata Kuliah: ", (idMataKuliah) => {
      rl.question("Masukkan Nama: ", (namaMataKuliah) => {
        rl.question("Masukkan SKS: ", (sks) => {
          ListJurusan.daftar((rows) => {
            const table = new Table({
              head: ["ID Jurusan", "Nama Jurusan"],
              colWidths: [12, 20],
            });

            rows.forEach((row) => {
              table.push([row.idJurusan, row.namaJurusan]);
            });
            console.log(table.toString());

            rl.question("Masukkan ID Jurusan: ", (idJurusan) => {
              ListMataKuliah.tambah(
                idMataKuliah,
                namaMataKuliah,
                sks,
                idJurusan,
                () => {
                  next();
                }
              );
            });
          });
        });
      });
    });
  }

  static hapusDataMataKuliah(next) {
    console.log("\n**Menghapus Data Mata Kuliah...");
    rl.question(
      "Masukan ID Mata Kuliah yang ingin dihapus: ",
      (idMataKuliah) => {
        ListMataKuliah.hapus(idMataKuliah, (data) => {
          if (data.length > 0) {
            console.log("Data mata kuliah berhasil dihapus.");
            this.ambilDataMataKuliah(next);
          } else {
            console.log("Data mata kuliah tidak ditemukan.");
            console.log(`[*] Untuk kembali ke menu mata kuliah`);
            console.log("[a] untuk menginput nama mata kuliah kembali");
            rl.question("Input: ", (data) => {
              switch (data) {
                case "*":
                  next();
                  break;
                default:
                  this.hapusDataMataKuliah(next);
                  break;
              }
            });
          }
        });
      }
    );
  }
}
