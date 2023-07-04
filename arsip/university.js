const readline = require("readline");
const { batas } = require("./views/util");
const sqlite3 = require("sqlite3").verbose();
var Table = require("cli-table");

const db = new sqlite3.Database("university.db");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startLoginSystem() {
  console.log(batas);
  console.log(`Universitas Pendidikan Indonesia\nJalan Setiabudhi No. 255`);
  console.log(batas);

  function login() {
    rl.question("Username: ", (username) => {
      rl.question("Password: ", (password) => {
        checkLogin(username, password);
      });
    });
  }

  function checkLogin(username, password) {
    if (username === "asd" && password === "qwe") {
      console.log(batas);
      console.log("Login successful!");
      showMenu();
    } else {
      console.log("Invalid username or password.");
      login();
    }
  }

  function showMenu() {
    console.log(batas);
    console.log("\nsilahkan pilih opsi dibawah ini:");
    console.log("[1] Mahasiswa");
    console.log("[2] Jurusan");
    console.log("[3] Dosen");
    console.log("[4] Mata Kuliah");
    console.log("[5] Kontrak");
    console.log("[6] Keluar");
    console.log(batas);

    rl.question("Masukan salah satu nomor dari opsi diatas: ", (menu) => {
      handleMenu(menu);
    });
  }

  function handleMenu(menu) {
    switch (menu) {
      case "1":
        tampilkanMahasiswa();
        break;
      case "2":
        console.log("Tampilkan data jurusan");
        tampilkanJurusan();
        break;
      case "3":
        console.log("Tampilkan data dosen");
        tampilkanDosen();
        break;
      case "4":
        console.log("Tampilkan data Mata Kuliah");
        tampilkanMataKuliah();
        break;
      case "5":
        console.log("Tampilkan data Kontrak");
        showKontrak();
        break;
      case "6":
        console.log("Bye bye");
        rl.close();
        break;
      default:
        console.log("Menu tidak valid.");
        showMenu();
        break;
    }
  }

  function tampilkanMahasiswa() {
    rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Mahasiswa\n[2] Cari Mahasiswa\n[3] Tambah Mahasiswa\n[4] Hapus Mahasiswa\n[5] Kembali
${batas}
Pilih menu mahasiswa: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Mahasiswa   ");
            mahasiswa.ambilDataMahasiswa(() => {
              tampilkanMahasiswa();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Mahasiswa");
            mahasiswa.cariDataMahasiswa(() => {
              tampilkanMahasiswa();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Mahasiswa");
            mahasiswa.tambahDataMahasiswa(() => {
              tampilkanMahasiswa();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Mahasiswa");
            mahasiswa.hapusDataMahasiswa(() => {
              tampilkanMahasiswa();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            tampilkanMahasiswa();
            break;
        }
      }
    );
  }

  function tampilkanJurusan() {
    rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Jurusan\n[2] Cari Jurusan\n[3] Tambah Jurusan\n[4] Hapus Jurusan\n[5] Kembali
${batas}
Pilih menu jurusan: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Jurusan   ");
            jurusan.ambilDataJurusan(() => {
              tampilkanJurusan();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Jurusan");
            jurusan.cariDataJurusan(() => {
              tampilkanJurusan();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Jurusan");
            jurusan.tambahDataJurusan(() => {
              tampilkanJurusan();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Jurusan");
            jurusan.hapusDataJurusan(() => {
              tampilkanJurusan();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            tampilkanJurusan();
            break;
        }
      }
    );
  }

  function tampilkanDosen() {
    rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Dosen\n[2] Cari Dosen\n[3] Tambah Dosen\n[4] Hapus Dosen\n[5] Kembali
${batas}
Pilih menu dosen: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Dosen   ");
            dosen.ambilDataDosen(() => {
              tampilkanDosen();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Dosen");
            dosen.cariDataDosen(() => {
              tampilkanDosen();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Dosen");
            dosen.tambahDataDosen(() => {
              tampilkanDosen();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Dosen");
            dosen.hapusDataDosen(() => {
              tampilkanDosen();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            tampilkanDosen();
            break;
        }
      }
    );
  }

  function tampilkanMataKuliah() {
    rl.question(
      `${batas}\n
silahkan pilih opsi di bawah ini:\n[1] Daftar Mata Kuliah\n[2] Cari Mata Kuliah\n[3] Tambah Mata Kuliah\n[4] Hapus Mata Kuliah\n[5] Kembali
${batas}
Pilih menu mata kuliah: `,
      (option) => {
        switch (option) {
          case "1":
            console.log(batas);
            console.log("\nDaftar Mata Kuliah   ");
            mataKuliah.ambilDataMataKuliah(() => {
              tampilkanMataKuliah();
            });
            break;
          case "2":
            console.log(batas);
            console.log("Cari Mata Kuliah");
            mataKuliah.cariDataMataKuliah(() => {
              tampilkanMataKuliah();
            });
            break;
          case "3":
            console.log(batas);
            console.log("Tambah Data Mata Kuliah");
            mataKuliah.tambahDataMataKuliah(() => {
              tampilkanMataKuliah();
            });
            break;
          case "4":
            console.log(batas);
            console.log("Hapus Mata Kuliah");
            mataKuliah.hapusDataMataKuliah(() => {
              tampilkanMataKuliah();
            });
            break;
          case "5":
            console.log(batas);
            console.log("Kembali ke menu");
            showMenu();
            break;
          default:
            console.log("pilih angka yang ada");
            tampilkanMataKuliah();
            break;
        }
      }
    );
  }

  function showKontrak() {
    console.log(batas);
    console.log("\nsilahkan pilih opsi dibawah ini:");
    console.log("[1] Daftar Kontrak");
    console.log("[2] Cari Kontrak");
    console.log("[3] Tambah Kontrak");
    console.log("[4] Hapus Kontrak");
    console.log("[5] Update Nilai");
    console.log("[6] Kembali");
    console.log(batas);

    rl.question("Masukan salah satu nomor dari opsi diatas: ", (opsi) => {
      nextKontrak(opsi);
    });
  }

  function nextKontrak(opsi) {
    switch (opsi) {
      case "1":
        console.log(batas);
        console.log("\nDaftar Mata Kuliah   ");
        kontrak.ambilKontrak(() => {
          showKontrak();
        });
        break;
      case "2":
        console.log(batas);
        console.log("Cari Mata Kuliah");
        kontrak.cariKontrak(() => {
          showKontrak();
        });
        break;
      case "3":
        console.log(batas);
        console.log("Tambah Data Mata Kuliah");
        kontrak.tambahKontrak(() => {
          showKontrak();
        });
        break;
      case "4":
        console.log(batas);
        console.log("Hapus Mata Kuliah");
        kontrak.hapusKontrak(() => {
          showKontrak();
        });
        break;
      case "5":
        console.log(batas);
        console.log("Update Nilai");
        kontrak.updateNilai(() => {
          showKontrak();
        });
        break;
      case "6":
        console.log(batas);
        console.log("Kembali ke menu");
        showMenu();
        break;

      default:
        console.log("pilih angka yang ada");
        showKontrak();
        break;
    }
  }

  login(); // Panggil fungsi login untuk memulai proses login
}

class mahasiswa {
  // Menampilkan daftar mahasiswa
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

class jurusan {
  static ambilDataJurusan(next) {
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
        next();
      }
    });
  }

  static cariDataJurusan(next) {
    rl.question("Masukkan NIM: ", (idJurusan) => {
      db.get(
        "SELECT * FROM jurusan WHERE idJurusan = ?",
        idJurusan,
        (err, row) => {
          if (err) {
            console.error("Gagal mencari data mahasiswa");
            return next();
          }

          if (!row) {
            console.log(batas);
            console.log("Data jurusan tidak ditemukan");
          } else {
            console.log(batas);
            console.log("\n**Data Jurusan");
            console.log(`NIM: ${row.idJurusan}`);
            console.log(`Nama: ${row.namaJurusan}`);
          }

          next();
        }
      );
    });
  }

  static tambahDataJurusan(next) {
    console.log("\n**Menambahkan data jurusan baru...");
    console.log("Lengkapi data dibawah ini:");
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
        rl.question("Masukkan idJurusan: ", (idJurusan) => {
          rl.question("Masukkan Nama Jurusan: ", (namaJurusan) => {
            db.run(
              `INSERT INTO jurusan (idJurusan, namaJurusan) VALUES ('${idJurusan}', '${namaJurusan}')`,
              (err) => {
                if (err) {
                  console.error("Terjadi kesalahan penambahan ");
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
  }

  static hapusDataJurusan(next) {
    console.log("\n**Menghapus Data Jurusan...");
    rl.question("Masukan ID Jurusan yang ingin dihapus: ", (idJurusan) => {
      db.all(
        "DELETE FROM jurusan WHERE idJurusan = ? returning *",
        idJurusan,
        (err, data) => {
          if (err) {
            console.log("gagal hapus data ");
          } else {
            if (data.length > 0) {
              console.log("Data jurusan berhasil dihapus.");
              next();
            } else {
              console.log("Data jurusan tidak ditemukan.");
              console.log(`[*] Untuk kembali ke menu jurusan`);
              console.log("[a] untuk menginput NIM kembali");
              rl.question("Input: ", (data) => {
                switch (data) {
                  case "*":
                    next();
                    break;
                  default:
                    this.hapusDataJurusan(next);
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

class dosen {
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
    rl.question("Masukkan NIM: ", (nip) => {
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
          console.log(`NIM: ${row.nip}`);
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

class mataKuliah {
  // Menampilkan daftar mahasiswa
  static ambilDataMataKuliah(next) {
    db.all(
      "SELECT * FROM mataKuliah JOIN jurusan using (idJurusan)",
      (err, rows) => {
        // console.log(rows);
        if (err) {
          console.error("ambil data gagal");
        } else {
          const table = new Table({
            head: ["ID", "Nama", "SKS", "Jurusan"],
            colWidths: [5, 20, 5, 20],
          });
          // console.log(rows);
          rows.forEach((row) => {
            // console.log(row);
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

class kontrak {
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

startLoginSystem();
