import { db } from "./connect.js";

export default class ListMataKuliah {
  static daftar(next) {
    db.all(
      "SELECT * FROM mataKuliah JOIN jurusan using (idJurusan)",
      (err, rows) => {
        // console.log(rows);
        if (err) {
          console.error("ambil data gagal");
        }
        next(rows);
      }
    );
  }

  static cari(idMataKuliah, next) {
    db.get(
      "SELECT * FROM mataKuliah JOIN jurusan using (idJurusan) WHERE idMataKuliah = ?",
      idMataKuliah,
      (err, row) => {
        if (err) {
          console.error("Gagal mencari data mataKuliah");
          return next();
        }
        next(row);
      }
    );
  }

  static tambah(idMataKuliah, namaMataKuliah, sks, idJurusan, next) {
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
  }

  static hapus(idMataKuliah, next) {
    db.all(
      "DELETE FROM mataKuliah WHERE idMataKuliah = ? returning *",
      idMataKuliah,
      (err, data) => {
        if (err) {
          console.error("Terjadi kesalahan:", err);
        }
        next(data);
      }
    );
  }
}
