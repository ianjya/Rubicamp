// model.js
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("univ.db");

export function getMahasiswaList(callback) {
  db.all("SELECT * FROM mahasiswa", (err, rows) => {
    if (err) {
      console.log("Error:", err.message);
    } else {
      callback(rows);
    }
  });
}

export function findMahasiswaByNim(nim, callback) {
  db.get("SELECT * FROM mahasiswa WHERE nim = ?", nim, (err, row) => {
    if (err) {
      console.log("Error:", err.message);
    } else {
      callback(row);
    }
  });
}
