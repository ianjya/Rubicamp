import Table from "cli-table";
import User from "./user.js";
import { rl, batas, bar, welcome } from "../views/util.js";

import ListMahasiswa from "../models/mahasiswa.js";
import ListJurusan from "../models/jurusan.js";

export default class Mahasiswa {
  static tampilkanMahasiswa() {
    rl.question(
      `${bar()}\n
    silahkan pilih opsi di bawah ini:\n[1] Daftar Mahasiswa\n[2] Cari Mahasiswa\n[3] Tambah Mahasiswa\n[4] Hapus Mahasiswa\n[5] Kembali
${bar()}
Pilih menu mahasiswa: `,
      (option) => {
        switch (option) {
          case "1":
            batas();
            console.log("\nDaftar Mahasiswa   ");
            Mahasiswa.ambilDataMahasiswa(() => {
              Mahasiswa.tampilkanMahasiswa();
            });
            break;
          case "2":
            batas();
            console.log("Cari Mahasiswa");
            Mahasiswa.cariDataMahasiswa(() => {
              Mahasiswa.tampilkanMahasiswa();
            });
            break;
          case "3":
            batas();
            console.log("Tambah Data Mahasiswa");
            Mahasiswa.tambahDataMahasiswa(() => {
              Mahasiswa.tampilkanMahasiswa();
            });
            break;
          case "4":
            batas();
            console.log("Hapus Mahasiswa");
            Mahasiswa.hapusDataMahasiswa(() => {
              Mahasiswa.tampilkanMahasiswa();
            });
            break;
          case "5":
            batas();
            console.log("Kembali ke menu");
            User.showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            Mahasiswa.tampilkanMahasiswa();
            break;
        }
      }
    );
  }

  static ambilDataMahasiswa(next) {
    ListMahasiswa.daftar((rows) => {
      const table = new Table({
        head: ["NIM", "Nama", "Alamat", "Usia", "ID Jurusan", "Nama Jurusan"],
        colWidths: [5, 20, 15, 8, 12, 20],
      });
      // console.log(rows);
      rows.forEach((row) => {
        table.push([
          row.nim,
          row.nama,
          row.alamat,
          row.usia,
          row.idJurusan,
          row.namaJurusan,
        ]);
      });
      console.log(table.toString());
      next();
    });
  }

  static cariDataMahasiswa(next) {
    rl.question("Masukkan NIM: ", (nim) => {
      ListMahasiswa.cari(nim, (row) => {
        if (!row) {
          batas();
          console.log("Data mahasiswa tidak ditemukan");
        } else {
          batas();
          console.log("\n**Data mahasiswa");
          console.log(`NIM: ${row.nim}`);
          console.log(`Nama: ${row.nama}`);
          console.log(`Alamat: ${row.alamat}`);
          console.log(`Kode Jurusan: ${row.idJurusan}`);
          console.log(`Nama Jurusan: ${row.namaJurusan}`);
          console.log(`Usia: ${row.usia}`);
        }

        next();
      });
    });
  }

  static tambahDataMahasiswa(next) {
    console.log("\n**Menambahkan data mahasiswa baru...");
    rl.question("Masukkan NIM: ", (nim) => {
      rl.question("Masukkan Nama: ", (nama) => {
        rl.question("Masukkan Alamat: ", (alamat) => {
          ListJurusan.daftar((rows) => {
            const table = new Table({
              head: ["ID Jurusan", "Nama Jurusan"],
              colWidths: [12, 20],
            });
            rows.forEach((row) => {
              table.push([row.idJurusan, row.namaJurusan]);
            });
            console.log(table.toString());
            rl.question("Masukkan IdJurusan: ", (jurusan) => {
              rl.question("Masukkan Usia: ", (usia) => {
                ListMahasiswa.tambah(nim, nama, alamat, jurusan, usia, () => {
                  next();
                });
              });
            });
          });
        });
      });
    });
  }

  static hapusDataMahasiswa(next) {
    console.log("\n**Menghapus Data Mahasiswa...");
    rl.question("Masukan NIM mahasiswa yang ingin dihapus: ", (nim) => {
      ListMahasiswa.hapus(nim, (data) => {
        if (data.length > 0) {
          console.log("Data mahasiswa berhasil dihapus.");
          next();
        } else {
          console.log("Data mahasiswa tidak ditemukan.");
          console.log(`[*] Untuk kembali ke menu mahasiswa`);
          console.log("[a] untuk menginput NIM kembali");
          rl.question("Input: ", (data) => {
            switch (data) {
              case "*":
                next();
                break;
              default:
                this.hapusDataMahasiswa(next);
                break;
            }
          });
        }
      });
    });
  }
}
