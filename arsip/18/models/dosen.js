import { db } from "./connect.js";
import Table from "cli-table"; // Pastikan Anda telah menginstal paket 'cli-table' melalui npm atau yarn

export default class Dosen {
  static ambilDataDosen(next) {
    db.all("SELECT * FROM dosen", (err, rows) => {
      if (err) {
        console.log("ambil data gagal");
      } else {
        const table = new Table({
          head: ["NIP", "Nama Dosen"],
          colWidths: [12, 20],
        });

        rows.forEach((row) => {
          table.push([row.nip, row.dosen]);
        });
        console.log(table.toString());
        next();
      }
    });
  }

  static cariDataDosen(next) {
    rl.question("Masukkan NIP: ", (nip) => {
      db.get("SELECT * FROM dosen WHERE nip = ?", nip, (err, row) => {
        if (err) {
          console.error("Gagal mencari data dosen");
          return next();
        }

        if (!row) {
          console.log(batas);
          console.log("Data dosen tidak ditemukan");
        } else {
          console.log(batas);
          console.log("\n**Data Dosen");
          console.log(`NIP: ${row.nip}`);
          console.log(`Nama: ${row.dosen}`);
        }

        next();
      });
    });
  }

  static tambahDataDosen(next) {
    console.log("\n**Menambahkan data dosen baru...");
    console.log("Lengkapi data dibawah ini:");
    db.all("SELECT * FROM dosen", (err, rows) => {
      if (err) {
        console.log("SALAH BROH");
      } else {
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
            db.run(
              `INSERT INTO dosen (nip, nama) VALUES ('${nip}', '${dosen}')`,
              (err) => {
                if (err) {
                  console.error("Terjadi kesalahan penambahan ");
                } else {
                  console.log("**Data dosen berhasil ditambahkan.");
                  this.ambilDataDosen(next);
                }
              }
            );
          });
        });
      }
    });
  }

  static hapusDataDosen(next) {
    console.log("\n**Menghapus Data Dosen...");
    rl.question("Masukan NIP Dosen yang ingin dihapus: ", (nip) => {
      db.all(
        "DELETE FROM dosen WHERE nip = ? returning *",
        nip,
        (err, data) => {
          if (err) {
            console.log("gagal hapus data ");
          } else {
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
          }
        }
      );
    });
  }
}
