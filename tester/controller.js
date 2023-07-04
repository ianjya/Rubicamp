// controller.js
import { displayTable, getInput } from "./views.js";
import { getMahasiswaList, findMahasiswaByNim } from "./model.js";

export async function handleMahasiswaMenu() {
  let choice = "";
  while (choice !== "5") {
    console.log("\n[1] Daftar Mahasiswa");
    console.log("[2] Cari Mahasiswa");
    console.log("[3] Tambah Mahasiswa");
    console.log("[4] Hapus Mahasiswa");
    console.log("[5] Kembali\n");

    choice = await getInput("Pilih menu: ");

    switch (choice) {
      case "1":
        displayDaftarMahasiswa();
        break;
      case "2":
        const nim = await getInput("Masukkan NIM: ");
        cariMahasiswa(nim);
        break;
      case "3":
        // Tambahkan kode untuk tambah mahasiswa
        break;
      case "4":
        // Tambahkan kode untuk hapus mahasiswa
        break;
      case "5":
        console.log("Kembali ke menu utama.");
        break;
      default:
        console.log("Pilihan tidak valid.");
        break;
    }
  }
}

function displayDaftarMahasiswa() {
  getMahasiswaList((rows) => {
    const headers = ["NIM", "Nama", "Jurusan"];
    const tableRows = rows.map((row) => [
      row.nim,
      row.nama,
      row.idJurusan,
      row.usia,
    ]);
    displayTable(headers, tableRows);
  });
}

function cariMahasiswa(nim) {
  findMahasiswaByNim(nim, (row) => {
    if (row) {
      const headers = ["NIM", "Nama", "Jurusan"];
      const rowData = [row.nim, row.nama, row.jurusan];
      displayTable(headers, [rowData]);
    } else {
      console.log("Mahasiswa tidak ditemukan.");
    }
  });
}

export { displayDaftarMahasiswa, cariMahasiswa };
