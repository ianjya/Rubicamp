import { db } from "./connect.js";
import readline from "readline";

export default class Mahasiswa {
  static ambilDataMahasiswa(next) {
    db.all(
      "SELECT * FROM mahasiswa JOIN jurusan using (idJurusan)",
      (err, rows) => {
        // console.log(rows);
        if (err) {
          console.error("ambil data gagal");
        } else {
          const table = new Table({
            head: [
              "NIM",
              "Nama",
              "Alamat",
              "Usia",
              "ID Jurusan",
              "Nama Jurusan",
            ],
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
        }
      }
    );
  }

  static cariDataMahasiswa(next) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Masukkan NIM: ", (nim) => {
      db.get(
        "SELECT * FROM mahasiswa JOIN jurusan using (idJurusan) WHERE nim = ?",
        nim,
        (err, row) => {
          if (err) {
            console.error("Gagal mencari data mahasiswa");
            return next();
          }

          if (!row) {
            console.log(batas);
            console.log("Data mahasiswa tidak ditemukan");
          } else {
            console.log(batas);
            console.log("\n**Data mahasiswa");
            console.log(`NIM: ${row.nim}`);
            console.log(`Nama: ${row.nama}`);
            console.log(`Alamat: ${row.alamat}`);
            console.log(`Kode Jurusan: ${row.idJurusan}`);
            console.log(`Nama Jurusan: ${row.namaJurusan}`);
            console.log(`Usia: ${row.usia}`);
          }

          next();
        }
      );
    });
  }

  static tambahDataMahasiswa(next) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n**Menambahkan data mahasiswa baru...");
    rl.question("Masukkan NIM: ", (nim) => {
      rl.question("Masukkan Nama: ", (nama) => {
        rl.question("Masukkan Alamat: ", (alamat) => {
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
              rl.question("Masukkan IdJurusan: ", (jurusan) => {
                rl.question("Masukkan Usia: ", (usia) => {
                  db.run(
                    `INSERT INTO mahasiswa (NIM, nama, alamat, idJurusan, usia) VALUES ('${nim}', '${nama}', '${alamat}', '${jurusan}', ${usia})`,
                    (err) => {
                      if (err) {
                        console.log("Terjadi kesalahan penambahan ");
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
        });
      });
    });
  }

  static hapusDataMahasiswa(next) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n**Menghapus Data Mahasiswa...");
    rl.question("Masukan NIM mahasiswa yang ingin dihapus: ", (nim) => {
      db.all(
        "DELETE FROM mahasiswa WHERE nim = ? returning *",
        nim,
        (err, data) => {
          if (err) {
            console.error("Terjadi kesalahan:", err);
          } else {
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
          }
        }
      );
    });
  }
}
