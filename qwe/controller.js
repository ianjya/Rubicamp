const readline = require("readline");
const University = require("./university");
const User = require("./user");
const sqlite3 = require("sqlite3").verbose();
const Table = require("cli-table");

class Controller {
  constructor() {
    this.university = new University(
      "Universitas Pendidikan Indonesia",
      "Jalan Setiabudhi No. 255"
    );
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    this.university.displayInfo();
    this.login();
  }

  login() {
    this.rl.question("Masukkan username: ", (username) => {
      this.rl.question("Masukkan password: ", (password) => {
        if (this.validateUser(username, password)) {
          const user = new User(username);
          this.home(user);
        } else {
          console.log("Username atau password tidak valid.");
          this.login(); // Tampilkan ulang form login
        }
      });
    });
  }

  validateUser(username, password) {
    // Periksa apakah username dan password cocok dengan data di database
    if (username === "admin" && password === "123") {
      return true; // Username dan password valid
    } else {
      return false; // Username atau password tidak valid
    }
  }

  home(user) {
    console.log(`============================================
Selamat datang, ${user.getUsername()}!
============================================`);
    this.rl.question(
      "\nPilih menu:\n[1] Mahasiswa\n[2] Jurusan\n[3] Dosen\n[4] Mata Kuliah\n[5] Kontrak\n[6] Keluar\n\n============================================\nPilihan: ",
      (option) => {
        switch (option) {
          case "1":
            this.showMahasiswa();
            break;
          case "2":
            this.showDosen();
            break;
          default:
            console.log("Pilihan tidak valid.");
            this.home(user);
            break;
        }
      }
    );
  }

  showMahasiswa() {
    this.rl.question(
      `============================================\n\nsilahkan pilih opsi dibawah ini\n[1] Tampilkan Mahasiswa\n[2] Cari Mahasiswa\n[3] Tambah Mahasiswa\n[4] Hapus Mahasiswa\n[5] Kembali\n
============================================
Pilihan: `,
      (option) => {
        switch (option) {
          case "1":
            this.tampilkanMahasiswa();
            break;
          case "2":
            this.cariMahasiswa();
            break;
          case "3":
            this.tambahMahasiswa();
            break;
          case "4":
            this.hapusMahasiswa();
            break;
          case "5":
            this.home(user); // Memanggil kembali() dengan parameter user
            break;
          default:
            console.log("Pilihan tidak valid.");
            this.showMahasiswa();
            break;
        }
      }
    );
  }

  tampilkanMahasiswa() {
    console.log("============================================");
    console.log("\n**Menampilkan data mahasiswa...");
    const db = new sqlite3.Database("univ.db");
    const query = "SELECT * FROM mahasiswa JOIN jurusan using (idJurusan)";

    db.all(query, (err, rows) => {
      if (err) {
        console.error("Terjadi kesalahan:", err);
      } else {
        if (rows.length > 0) {
          const table = new Table({
            head: [
              "NIM",
              "Nama",
              "Alamat",
              "Kode Jurusan",
              "Nama Jurusan",
              "Usia",
            ],
          });

          rows.forEach((row) => {
            table.push([
              row.nim,
              row.nama,
              row.alamat,
              row.idJurusan,
              row.namaJurusan,
              row.usia,
            ]);
          });

          console.log(table.toString());
        } else {
          console.log("Data mahasiswa tidak ditemukan.");
        }
      }

      // Setelah menampilkan data, tutup koneksi database
      db.close();
      this.showMahasiswa();
    });
  }

  cariMahasiswa() {
    this.rl.question("Masukkan NIM mahasiswa yang ingin Anda cari: ", (nim) => {
      const db = new sqlite3.Database("univ.db");
      const query = `SELECT * FROM mahasiswa join jurusan using (idJurusan) WHERE NIM = '${nim}'`;

      db.get(query, (err, row) => {
        if (err) {
          console.error("Terjadi kesalahan:", err);
        } else {
          if (row) {
            console.log("============================================");
            console.log("Data mahasiswa:");
            console.log(`NIM: ${row.nim}`);
            console.log(`Nama: ${row.nama}`);
            console.log(`Alamat: ${row.alamat}`);
            console.log(`Kode Jurusan: ${row.idJurusan}`);
            console.log(`Nama Jurusan: ${row.namaJurusan}`);
            console.log(`Usia: ${row.usia}`);
          } else {
            console.log(`Data mahasiswa dengan NIM ${nim}, tidak terdaftar`);
          }
        }

        db.close();
        this.showMahasiswa();
      });
    });
  }

  tambahMahasiswa() {
    console.log("\n**Menambahkan data mahasiswa baru...");
    this.rl.question("Masukkan NIM: ", (nim) => {
      this.rl.question("Masukkan Nama: ", (nama) => {
        this.rl.question("Masukkan Alamat: ", (alamat) => {
          this.rl.question("Masukkan IdJurusan: ", (jurusan) => {
            this.rl.question("Masukkan Usia: ", (usia) => {
              const db = new sqlite3.Database("univ.db");
              const query = `INSERT INTO mahasiswa (NIM, nama, alamat, idJurusan, usia) VALUES ('${nim}', '${nama}', '${alamat}', '${jurusan}', ${usia})`;

              db.run(query, (err) => {
                if (err) {
                  console.error("Terjadi kesalahan:", err);
                } else {
                  console.log("**Data mahasiswa berhasil ditambahkan.");
                }
                db.close();
                this.showMahasiswa();
              });
            });
          });
        });
      });
    });
  }

  hapusMahasiswa() {
    console.log("\n**Menghapus data mahasiswa...");
    this.rl.question("Masukkan NIM mahasiswa yang ingin dihapus: ", (nim) => {
      const db = new sqlite3.Database("univ.db");
      const query = `DELETE FROM mahasiswa WHERE NIM = '${nim}'`;

      db.run(query, (err) => {
        if (err) {
          console.error("Terjadi kesalahan:", err);
        } else {
          if (this.changes > 0) {
            console.log("Data mahasiswa berhasil dihapus.");
          } else {
            console.log("Data mahasiswa tidak ditemukan.");
          }
        }
        db.close();
        this.showMahasiswa();
      });
    });
  }

  kembali(user) {
    console.log("back");
    this.home(user);
  }

  showDosen() {
    // Tampilkan data dosen dari database
    const db = new sqlite3.Database("univ.db");
    // Gunakan perintah SQL SELECT untuk mengambil data dari tabel dosen
    const query = "SELECT * FROM dosen";

    // Tampilkan hasilnya ke console
    console.log("Menampilkan data dosen...");
    db.all(query, (err, rows) => {
      if (err) {
        console.error("Terjadi kesalahan:", err);
      } else {
        // Menampilkan hasil query
        console.log("Data dosen:");
        rows.forEach((row) => {
          console.log(`NIP: ${row.nip}`);
          console.log(`Nama: ${row.nama}`);
          console.log(`Jurusan: ${row.jurusan}`);
          console.log("---");
        });
      }
      db.close(); // Tutup koneksi database setelah selesai
      this.home(); // Kembali ke menu utama
    });
  }
}

module.exports = Controller;
