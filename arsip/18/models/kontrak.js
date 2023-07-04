import { db } from "./connect.js";
import Table from "cli-table"; // Mengimport modul 'cli-table'
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class Kontrak {
  static ambilKontrak(next) {
    db.all(
      `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.dosen as nama_dosen, kontrak.nilai
        FROM kontrak 
        JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        JOIN dosen ON kontrak.nip = dosen.nip
        JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah`,
      (err, rows) => {
        if (err) {
          console.log("error 862 BROH");
        } else {
          const table = new Table({
            head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
            colWidths: [5, 5, 15, 15, 15, 7],
          });
          rows.forEach((row) => {
            table.push([
              row.idKontrak,
              row.nim,
              row.nama_mahasiswa,
              row.nama_mataKuliah,
              row.nama_dosen,
              row.nilai || "",
            ]);
          });
          console.log(table.toString());
          next();
        }
      }
    );
  }

  static cariKontrak(next) {
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
            // console.log(row);
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
          rl.question("Masukan NIM yang akan dicari: ", (nim) => {
            if (err) {
              console.log("ERROR PAK");
            } else {
              db.all(
                "SELECT idKontrak, mahasiswa.nim, mataKuliah.namaMataKuliah, dosen.nip, nilai FROM kontrak JOIN mahasiswa USING (nim) JOIN mataKuliah USING (idJurusan) JOIN dosen USING (nip) WHERE nim = ?",
                nim,
                (err, rows) => {
                  if (err) {
                    console.log("ERRRORR PAK****");
                    next();
                  } else {
                    const table = new Table({
                      head: ["ID", "NIM", "Mata Kuliah", "NIP", "Nilai"],
                      colWidths: [5, 5, 15, 5, 7],
                    });
                    rows.forEach((row) => {
                      table.push([
                        row.idKontrak,
                        row.nim,
                        row.namaMataKuliah,
                        row.nip,
                        row.nilai || "",
                      ]);
                    });
                    console.log(table.toString());
                    next();
                  }
                }
              );
            }
          });
        }
      }
    );
  }

  static tambahKontrak(next) {
    db.all("SELECT * FROM mahasiswa", (err, rows) => {
      // console.log(rows);
      if (err) {
        console.error("ambil data gagal");
      } else {
        const table = new Table({
          head: ["NIM", "Nama", "Alamat", "Usia", "ID"],
          colWidths: [5, 20, 15, 8, 6],
        });
        // console.log(rows);
        rows.forEach((row) => {
          // console.log(row);
          table.push([row.nim, row.nama, row.alamat, row.usia, row.idJurusan]);
        });
        console.log(table.toString());
        rl.question("Masukan NIM: ", (nim) => {
          if (err) {
            console.log("ERROR PAK");
          } else {
            db.all("SELECT * FROM mataKuliah", (err, rows) => {
              if (err) {
                console.log("SALAH BROH");
              } else {
                const table = new Table({
                  head: ["Kode", "Nama", "SKS"],
                  colWidths: [12, 20, 5],
                });
                rows.forEach((row) => {
                  table.push([row.idMataKuliah, row.namaMataKuliah, row.sks]);
                });
                console.log(table.toString());
                rl.question("Masukan Kode Mata Kuliah: ", (idMataKuliah) => {
                  db.all("SELECT * FROM dosen;", (err, rows) => {
                    if (err) {
                      console.log(err);
                    } else {
                      const table = new Table({
                        head: ["NIP", "Nama"],
                        colWidths: [12, 20],
                      });
                      rows.forEach((row) => {
                        table.push([row.nip, row.dosen]);
                      });
                      console.log(table.toString());
                      rl.question("Masukan NIP dosen: ", (nip) => {
                        db.run(
                          `INSERT INTO kontrak (nim, idMataKuliah, nip) VALUES ('${nim}', '${idMataKuliah}', '${nip}')`,
                          (err) => {
                            if (err) {
                              console.log("***KESALAHAN SAAT MENAMBAHKAN");
                            } else {
                              console.log("***KONTRAK BERHASIL DITAMBAHKAN");
                              db.all(
                                `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.dosen as nama_dosen, kontrak.nilai
                                FROM kontrak 
                                JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
                                JOIN dosen ON kontrak.nip = dosen.nip
                                JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah`,
                                (err, rows) => {
                                  if (err) {
                                    console.log("error 862 BROH");
                                  } else {
                                    const table = new Table({
                                      head: [
                                        "ID",
                                        "NIM",
                                        "Nama",
                                        "Mata Kuliah",
                                        "Dosen",
                                        "Nilai",
                                      ],
                                      colWidths: [5, 5, 15, 15, 15, 7],
                                    });
                                    rows.forEach((row) => {
                                      table.push([
                                        row.idKontrak,
                                        row.nim,
                                        row.nama_mahasiswa,
                                        row.nama_mataKuliah,
                                        row.nama_dosen,
                                        row.nilai || "",
                                      ]);
                                    });
                                    console.log(table.toString());
                                    next();
                                  }
                                }
                              );
                            }
                          }
                        );
                      });
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  }

  static hapusKontrak(next) {
    rl.question("Masukkan ID kontrak yang ingin dihapus :", (idKontrak) => {
      db.run(
        "delete from kontrak where idKontrak = ?",
        [idKontrak],
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          if (this.changes > 0) {
            console.log(`Kontrak dengan ID kontrak ${idKontrak} telah dihapus`);
            next();
          } else {
            console.log(`Kontrak dengan ID ${idKontrak} tidak ada!`);
            next();
          }
        }
      );
    });
  }

  static updateNilai(next) {
    db.all(
      `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.dosen as nama_dosen, kontrak.nilai
        FROM kontrak 
        JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        JOIN dosen ON kontrak.nip = dosen.nip
        JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah`,
      (err, rows) => {
        if (err) {
          console.log("error 862 BROH");
          next();
        } else {
          const table = new Table({
            head: ["ID", "NIM", "Nama", "Mata Kuliah", "Dosen", "Nilai"],
            colWidths: [5, 5, 15, 15, 15, 7],
          });
          rows.forEach((row) => {
            table.push([
              row.idKontrak,
              row.nim,
              row.nama_mahasiswa,
              row.nama_mataKuliah,
              row.nama_dosen,
              row.nilai || "",
            ]);
          });
          console.log(table.toString());
          rl.question("Masukkan NIM mahasiswa: ", (nim) => {
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
                  console.log("ERRRORR PAK****");
                  next();
                } else {
                  const table = new Table({
                    head: [
                      "ID",
                      "NIM",
                      "Nama",
                      "Mata Kuliah",
                      "Dosen",
                      "Nilai",
                    ],
                    colWidths: [5, 5, 15, 15, 15, 7],
                  });
                  rows.forEach((row) => {
                    table.push([
                      row.idKontrak,
                      row.nim,
                      row.nama_mahasiswa,
                      row.nama_mataKuliah,
                      row.nama_dosen,
                      row.nilai || "",
                    ]);
                  });
                  console.log(table.toString());
                  rl.question("Masukkan ID Kontrak: ", (idKontrak) => {
                    rl.question("Masukkan Nilai: ", (nilai) => {
                      db.run(
                        "UPDATE kontrak SET nilai = ? WHERE idKontrak = ?",
                        [nilai, idKontrak],
                        (err) => {
                          if (err) {
                            console.log("KESALAHAN SAAT MEMPERBARUI NILAI");
                          } else {
                            console.log("Nilai telah diperbarui");
                            db.all(
                              `SELECT kontrak.idKontrak, mahasiswa.nim as nim, mahasiswa.nama AS nama_mahasiswa, mataKuliah.namaMataKuliah AS nama_mataKuliah, dosen.dosen as nama_dosen, kontrak.nilai
                                FROM kontrak 
                                JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
                                JOIN dosen ON kontrak.nip = dosen.nip
                                JOIN mataKuliah ON kontrak.idMataKuliah = mataKuliah.idMataKuliah`,
                              (err, rows) => {
                                if (err) {
                                  console.log("error 862 BROH");
                                } else {
                                  const table = new Table({
                                    head: [
                                      "ID",
                                      "NIM",
                                      "Nama",
                                      "Mata Kuliah",
                                      "Dosen",
                                      "Nilai",
                                    ],
                                    colWidths: [5, 5, 15, 15, 15, 7],
                                  });
                                  rows.forEach((row) => {
                                    table.push([
                                      row.idKontrak,
                                      row.nim,
                                      row.nama_mahasiswa,
                                      row.nama_mataKuliah,
                                      row.nama_dosen,
                                      row.nilai || "",
                                    ]);
                                  });
                                  console.log(table.toString());
                                }
                                next();
                              }
                            );
                          }
                        }
                      );
                    });
                  });
                }
              }
            );
          });
        }
      }
    );
  }
}
