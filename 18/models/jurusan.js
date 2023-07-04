import { db } from "./connect.js";

export default class ListJurusan {
  static daftar(next) {
    db.all("SELECT * FROM jurusan", (err, rows) => {
      if (err) {
        console.log("SALAH BROH");
      }
      next(rows);
    });
  }

  static cari(idJurusan, next) {
    db.get(
      "SELECT * FROM jurusan WHERE idJurusan = ?",
      idJurusan,
      (err, row) => {
        if (err) {
          console.error("Gagal mencari data mahasiswa");
        }
        return next(row);
      }
    );
  }

  static tambah(idJurusan, namaJurusan, next) {
    db.run(
      `INSERT INTO jurusan (idJurusan, namaJurusan) VALUES ('${idJurusan}', '${namaJurusan}')`,
      (err) => {
        if (err) {
          console.error("Terjadi kesalahan penambahan ");
        } else {
          console.log("**Data jurusan berhasil ditambahkan.");
        }
        next();
      }
    );
  }

  static hapus(idJurusan, next) {
    db.all(
      "DELETE FROM jurusan WHERE idJurusan = ? returning *",
      idJurusan,
      (err, data) => {
        if (err) {
          console.log("gagal hapus data ");
        }
        next(data);
      }
    );
  }
}
