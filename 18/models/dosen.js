import { db } from "./connect.js";

export default class ListDosen {
  static daftar(next) {
    db.all("SELECT * FROM dosen", (err, rows) => {
      if (err) {
        console.log("ambil data gagal");
      }
      next(rows);
    });
  }

  static cari(nip, next) {
    db.get("SELECT * FROM dosen WHERE nip = ?", nip, (err, row) => {
      if (err) {
        console.error("Gagal mencari data dosen");
      }
      next(row);
    });
  }

  static tambah(nip, dosen, next) {
    db.run(
      `INSERT INTO dosen (nip, dosen) VALUES ('${nip}', '${dosen}')`,
      (err) => {
        if (err) {
          console.error("Terjadi kesalahan penambahan ");
        } else {
          console.log("Data dosen berhasil ditambahkan.");
        }
        next();
      }
    );
  }

  static hapus(nip, next) {
    db.all("DELETE FROM dosen WHERE nip = ? returning *", nip, (err, data) => {
      if (err) {
        console.log("gagal hapus data ");
      }
      next(data);
    });
  }
}
