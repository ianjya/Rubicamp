// -- CHALLENNGE 15 

-- 1. Tampilkan seluruh data mahasiswa beserta nama jurusan nya
sqlite> select * FROM mahasiswa join jurusan using (idJurusan);

-- 2. Tampilkan mahasiswa yang memiliki umur dibawah 20
sqlite> ALTER TABLE mahasiswa ADD COLUMN usia INTEGER;
sqlite> INSERT INTO mahasiswa (nim, nama, alamat, idJurusan, usia) VALUES ('M06', 'pebrian', 'bandung','DK4', '17');
sqlite> UPDATE mahasiswa SET usia = 20 WHERE nama IN ('udin', 'beti');
**sqlite> select nama, usia FROM mahasiswa WHERE usia < 20;

-- 3. Tampilkan mahasiswa yang memiliki nilai 'B' keatas
sqlite> UPDATE kontrak SET nilai = 'C' WHERE nim IN ('M01', 'M05');
!!-- cek data input nilai --!!
sqlite> select nim, nama, idMataKuliah, namaMataKuliah, nilai FROM kontrak JOIN mahasiswa using (nim) JOIN mataKuliah using (idMataKuliah);
**sqlite> SELECT nama, namaMataKuliah, nilai FROM kontrak JOIN mahasiswa USING (nim) JOIN mataKuliah USING (idMataKuliah) WHERE nilai <= 'B';

-- 4. Tampilkan mahasiswa yang memiliki jumlah SKS lebih dari 10
sqlite> UPDATE mataKuliah SET sks = '13' WHERE idMataKuliah IN ('OP1,'IL1','FL4','TE4')
sqlite> UPDATE mataKuliah SET sks = '11' WHERE idMataKuliah IN ('OP2', 'FL2', 'TE3','IL2');
sqlite> UPDATE mataKuliah SET sks = '19' WHERE idMataKuliah IN ('OP3', 'FL1', 'TE2','IL3');
sqlite> UPDATE mataKuliah SET sks = '9' WHERE idMataKuliah IN ('OP4', 'FL3', 'TE1');
sqlite> UPDATE mataKuliah SET sks = '13' WHERE idMataKuliah IN ('IL4');
sqlite> SELECT * FROM mataKuliah;
**sqlite> SELECT mahasiswa.nama AS nama_mahasiswa, SUM(mataKuliah.sks) AS total_sks, nilai FROM kontrak JOIN mahasiswa USING (nim) JOIN mataKuliah USING (idMataKuliah) GROUP BY mahasiswa.nama HAVING SUM(mataKuliah.sks) > 10;

-- 5. Tampilkan mahasiswa yang mengontrak kuliah 'data mining'
sqlite> SELECT nama, namaMataKuliah FROM kontrak JOIN mahasiswa USING (nim) JOIN mataKuliah using (idMataKuliah) WHERE idMataKuliah = 'DM1';

-- 6. Tampilkan mahasiswa untuk setiap dosen
sqlite> SELECT dosen.nama AS nama_dosen, COUNT(DISTINCT kontrak.nim) AS jumlah_mahasiswa FROM kontrak JOIN dosen ON kontrak.nip = dosen.nip GROUP BY dosen.nama;
-- 7. Urutkan umur mahasiswa sesuai usia
sqlite> SELECT * FROM mahasiswa ORDER BY usia ASC;

-- 8. Tampilkan kontrak mataKuliah yang harus diulang (nilai D/E), serta tampilkan data mahasiswa, jurusan, dosen secara lengkap 
sqlite> SELECT nim, mahasiswa.nama, idMataKuliah, nip, dosen.nama, nilai FROM kontrak JOIN mahasiswa USING (nim) JOIN dosen USING (nip) WHERE nilai > 'C';
