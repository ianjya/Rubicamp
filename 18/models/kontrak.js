import { db } from "./connect.js";

export default class ListKontrak {
  static daftar(next) {
    db.all(
      `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.dosen as nama_dosen, kontrak.nilai
        FROM kontrak 
        JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        JOIN dosen ON kontrak.nip = dosen.nip
        JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah`,
      (err, rows) => {
        if (err) {
          console.log("error 862 BROH");
        }
        next(rows);
      }
    );
  }

  static cari(nim, next) {
    db.all(
      `SELECT idKontrak, mahasiswa.nim, mataKuliah.namaMataKuliah, dosen.nip, nilai FROM kontrak JOIN mahasiswa USING (nim) JOIN mataKuliah USING (idJurusan) JOIN dosen USING (nip) WHERE nim = ?`,
      nim,
      (err, rows) => {
        if (err) {
          console.log("ERRRORR PAK****");
        }
        next(rows);
      }
    );
  }

  static tambah(nim, idMataKuliah, nip, next) {
    db.run(
      `INSERT INTO kontrak (nim, idMataKuliah, nip) VALUES ('${nim}', '${idMataKuliah}', '${nip}')`,
      (err) => {
        if (err) {
          console.log("***KESALAHAN SAAT MENAMBAHKAN");
        } else {
          console.log("***KONTRAK BERHASIL DITAMBAHKAN");
        }
        next();
      }
    );
  }

  static hapus(idKontrak, next) {
    db.run(
      "delete from kontrak where idKontrak = ?",
      [idKontrak],
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        next();
      }
    );
  }

  static cariLagi(nim, next) {
    db.all(
      `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.dosen as nama_dosen, kontrak.nilai
        FROM kontrak 
        JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        JOIN dosen ON kontrak.nip = dosen.nip
        JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah
        WHERE mahasiswa.nim = ?`,
      nim,
      (err, rows) => {
        if (err) {
          console.log("ERROR PAK****");
        }
        next(rows);
      }
    );
  }

  static update(nilai, idKontrak, next) {
    db.run(
      "UPDATE kontrak SET nilai = ? WHERE idKontrak = ?",
      [nilai, idKontrak],
      (err, rows) => {
        if (err) {
          console.log("KESALAHAN SAAT MEMPERBARUI NILAI");
        } else {
          console.log("Nilai telah diperbarui");
        }
        next(rows);
      }
    );
  }
}
