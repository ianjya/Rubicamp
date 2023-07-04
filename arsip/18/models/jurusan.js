import { db } from "./connect.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class Jurusan {
  static ambilDataJurusan(next) {
    db.all("SELECT * FROM jurusan", (err, rows) => {
      if (err) {
        console.log("ambil data gagal");
      } else {
        const table = new Table({
          head: ["ID Jurusan", "Nama Jurusan"],
          colWidths: [12, 20],
        });

        rows.forEach((row) => {
          table.push([row.idJurusan, row.namaJurusan]);
        });
        console.log(table.toString());
        next();
      }
    });
  }

  static cariDataJurusan(next) {
    rl.question("Masukkan NIM: ", (idJurusan) => {
      db.get(
        "SELECT * FROM jurusan WHERE idJurusan = ?",
        idJurusan,
        (err, row) => {
          if (err) {
            console.error("Gagal mencari data mahasiswa");
            return next();
          }

          if (!row) {
            console.log(batas);
            console.log("Data jurusan tidak ditemukan");
          } else {
            console.log(batas);
            console.log("\n**Data Jurusan");
            console.log(`NIM: ${row.idJurusan}`);
            console.log(`Nama: ${row.namaJurusan}`);
          }

          next();
        }
      );
    });
  }

  static tambahDataJurusan(next) {
    console.log("\n**Menambahkan data jurusan baru...");
    console.log("Lengkapi data dibawah ini:");
    db.all("SELECT * FROM jurusan", (err, rows) => {
      if (err) {
        console.log("SALAH BROH");
      } else {
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
            db.run(
              `INSERT INTO jurusan (idJurusan, namaJurusan) VALUES ('${idJurusan}', '${namaJurusan}')`,
              (err) => {
                if (err) {
                  console.error("Terjadi kesalahan penambahan ");
                } else {
                  console.log("**Data mahasiswa berhasil ditambahkan.");
                }
                next();
              }
            );
          });
        });
      }
    });
  }

  static hapusDataJurusan(next) {
    console.log("\n**Menghapus Data Jurusan...");
    rl.question("Masukan ID Jurusan yang ingin dihapus: ", (idJurusan) => {
      db.all(
        "DELETE FROM jurusan WHERE idJurusan = ? returning *",
        idJurusan,
        (err, data) => {
          if (err) {
            console.log("gagal hapus data ");
          } else {
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
          }
        }
      );
    });
  }
}
