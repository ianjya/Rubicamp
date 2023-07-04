import Table from "cli-table";

import { rl, batas, welcome } from "../views/util.js";

import User from "./user.js";
import ListKontrak from "../models/kontrak.js";
import ListMahasiswa from "../models/mahasiswa.js";
import ListMataKuliah from "../models/mataKuliah.js";
import ListDosen from "../models/dosen.js";

export default class Kontrak {
  static showKontrak() {
    batas();
    console.log("\nsilahkan pilih opsi dibawah ini:");
    console.log("[1] Daftar Kontrak");
    console.log("[2] Cari Kontrak");
    console.log("[3] Tambah Kontrak");
    console.log("[4] Hapus Kontrak");
    console.log("[5] Update Nilai");
    console.log("[6] Kembali");
    batas();

    rl.question("Masukan salah satu nomor dari opsi diatas: ", (opsi) => {
      Kontrak.nextKontrak(opsi);
    });
  }

  static nextKontrak(opsi) {
    switch (opsi) {
      case "1":
        batas();
        console.log("\nDaftar Mata Kuliah   ");
        Kontrak.ambilKontrak(() => {
          Kontrak.showKontrak();
        });
        break;
      case "2":
        batas();
        console.log("Cari Mata Kuliah");
        Kontrak.cariKontrak(() => {
          Kontrak.showKontrak();
        });
        break;
      case "3":
        batas();
        console.log("Tambah Data Mata Kuliah");
        Kontrak.tambahKontrak(() => {
          Kontrak.showKontrak();
        });
        break;
      case "4":
        batas();
        console.log("Hapus Mata Kuliah");
        Kontrak.hapusKontrak(() => {
          Kontrak.showKontrak();
        });
        break;
      case "5":
        batas();
        console.log("Update Nilai");
        Kontrak.updateNilai(() => {
          Kontrak.showKontrak();
        });
        break;
      case "6":
        batas();
        console.log("Kembali ke menu");
        User.showMenu();
        break;

      default:
        console.log("pilih angka yang ada");
        Kontrak.showKontrak();
        break;
    }
  }

  static ambilKontrak(next) {
    ListKontrak.daftar((rows) => {
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
    });
  }

  static cariKontrak(next) {
    ListMahasiswa.daftar((rows) => {
      const table = new Table({
        head: ["NIM", "Nama", "Alamat", "Usia", "ID Jurusan", "Nama Jurusan"],
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
        ListKontrak.cari(nim, (rows) => {
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
        });
      });
    });
  }

  static tambahKontrak(next) {
    ListMahasiswa.daftar((rows) => {
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
        ListMataKuliah.daftar((rows) => {
          const table = new Table({
            head: ["Kode", "Nama", "SKS"],
            colWidths: [12, 20, 5],
          });
          rows.forEach((row) => {
            table.push([row.idMataKuliah, row.namaMataKuliah, row.sks]);
          });
          console.log(table.toString());
          rl.question("Masukan Kode Mata Kuliah: ", (idMataKuliah) => {
            ListDosen.daftar((rows) => {
              const table = new Table({
                head: ["NIP", "Nama"],
                colWidths: [12, 20],
              });
              rows.forEach((row) => {
                table.push([row.nip, row.dosen]);
              });
              console.log(table.toString());
              rl.question("Masukan NIP dosen: ", (nip) => {
                ListKontrak.tambah(nim, idMataKuliah, nip, () => {
                  console.log("***KONTRAK BERHASIL DITAMBAHKAN");
                  ListKontrak.daftar((rows) => {
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
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  static hapusKontrak(next) {
    rl.question("Masukkan ID kontrak yang ingin dihapus :", (idKontrak) => {
      ListKontrak.hapus(idKontrak, () => {
        if (this.changes > 0) {
          console.log(`Kontrak dengan ID ${idKontrak} tidak ada!`);
          next();
        } else {
          console.log(`Kontrak dengan ID kontrak ${idKontrak} telah dihapus`);
          next();
        }
      });
    });
  }

  static updateNilai(next) {
    ListKontrak.daftar((rows) => {
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
        ListKontrak.cariLagi(nim, (rows) => {
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
          rl.question("Masukkan ID Kontrak: ", (idKontrak) => {
            rl.question("Masukkan Nilai: ", (nilai) => {
              ListKontrak.update(nilai, idKontrak, () => {
                ListKontrak.daftar((rows) => {
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
                });
              });
            });
          });
        });
      });
    });
  }
}
