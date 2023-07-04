import { db } from "./connect.js";
import Table from "cli-table"; // Pastikan Anda telah menginstal paket 'cli-table' melalui npm atau yarn

import Kontrak from "./kontrak.js";

Kontrak.ambilKontrak(() => {});

Kontrak.cariKontrak(() => {});

Kontrak.tambahKontrak(() => {});

Kontrak.hapusKontrak(() => {});

Kontrak.updateNilai(() => {});

export default class MataKuliah {
  static ambilDataMataKuliah(next) {
    db.all(
      "SELECT * FROM mataKuliah JOIN jurusan using (idJurusan)",
      (err, rows) => {
        if (err) {
          console.error("ambil data gagal");
        } else {
          const table = new Table({
            head: ["ID", "Nama", "SKS", "Jurusan"],
            colWidths: [5, 20, 5, 20],
          });

          rows.forEach((row) => {
            table.push([
              row.idMataKuliah,
              row.namaMataKuliah,
              row.sks,
              row.namaJurusan,
            ]);
          });
          console.log(table.toString());
          next();
        }
      }
    );
  }

  static cariDataMataKuliah(next) {
    rl.question("Masukkan ID Mata Kuliah: ", (idMataKuliah) => {
      db.get(
        "SELECT * FROM mataKuliah JOIN jurusan using (idJurusan) WHERE idMataKuliah = ?",
        idMataKuliah,
        (err, row) => {
          if (err) {
            console.error("Gagal mencari data mataKuliah");
            return next();
          }

          if (!row) {
            console.log(batas);
            console.log("Data mataKuliah tidak ditemukan");
          } else {
            console.log(batas);
            console.log("\n**Data Mata Kuliah");
            console.log(`ID: ${row.idMataKuliah}`);
            console.log(`Nama: ${row.namaMataKuliah}`);
            console.log(`SKS: ${row.sks}`);
            console.log(`Jurusan: ${row.namaJurusan}`);
          }

          next();
        }
      );
    });
  }

  static tambahDataMataKuliah(next) {
    console.log("\n**Menambahkan data mata kuliah baru...");
    rl.question("Masukkan ID Mata Kuliah: ", (idMataKuliah) => {
      rl.question("Masukkan Nama: ", (namaMataKuliah) => {
        rl.question("Masukkan SKS: ", (sks) => {
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

              rl.question("Masukkan ID Jurusan: ", (idJurusan) => {
                db.run(
                  `INSERT INTO mataKuliah (idMatakuliah, namaMataKuliah, sks, idJurusan) VALUES ('${idMataKuliah}', '${namaMataKuliah}', '${sks}', '${idJurusan}')`,
                  (err) => {
                    if (err) {
                      console.error("Terjadi kesalahan penambahan ");
                    } else {
                      console.log("**Data mata kuliah berhasil ditambahkan.");
                    }
                    next();
                  }
                );
              });
            }
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
        db.all(
          "DELETE FROM mataKuliah WHERE idMataKuliah = ? returning *",
          idMataKuliah,
          (err, data) => {
            if (err) {
              console.error("Terjadi kesalahan:", err);
            } else {
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
            }
          }
        );
      }
    );
  }
}
