import { db } from "./connect.js";

export default class ListMahasiswa {
  static daftar(next) {
    db.all(
      "SELECT * FROM mahasiswa JOIN jurusan using (idJurusan)",
      (err, rows) => {
        // console.log(rows);
        if (err) {
          return console.error("ambil data gagal");
        }

        next(rows);
      }
    );
  }

  static cari(nim, next) {
    db.get(
      "SELECT * FROM mahasiswa JOIN jurusan using (idJurusan) WHERE nim = ?",
      nim,
      (err, row) => {
        if (err) {
          console.error("Gagal mencari data mahasiswa");
        }
        next(row);
      }
    );
  }

  static tambah(nim, nama, alamat, jurusan, usia, next) {
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
  }

  static hapus(nim, next) {
    db.all(
      "DELETE FROM mahasiswa WHERE nim = ? returning *",
      nim,
      (err, data) => {
        if (err) {
          console.error("Terjadi kesalahan:", err);
        }
        next(data);
      }
    );
  }
}
