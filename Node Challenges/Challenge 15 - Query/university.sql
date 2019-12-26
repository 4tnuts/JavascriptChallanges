CREATE TABLE dosen(
    nip VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(50)
);

INSERT INTO dosen(nip, nama) VALUES('001', 'Santika');
INSERT INTO dosen(nip, nama) VALUES('002', 'Sandika');
INSERT INTO dosen(nip, nama) VALUES('003', 'Hilman');
INSERT INTO dosen(nip, nama) VALUES('004', 'Ramadhan');


CREATE TABLE matakuliah(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama VARCHAR(50),
    sks INTEGER
);

INSERT INTO matakuliah(nama, sks) VALUES('pancasila',3);
INSERT INTO matakuliah(nama, sks) VALUES('Undang-undang',4);
INSERT INTO matakuliah(nama, sks) VALUES('matematika diskrit',3);
INSERT INTO matakuliah(nama, sks) VALUES('aljabar',2);
INSERT INTO matakuliah(nama, sks) VALUES('ilmu pengetahuan Gigi',2);
INSERT INTO matakuliah(nama, sks) VALUES('ilmu Pengetahuan Otak',4);
INSERT INTO matakuliah(nama, sks) VALUES('data mining',4);
INSERT INTO matakuliah(nama, sks) VALUES('machine learning',4);


CREATE TABLE jurusan(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama VARCHAR(50)
);

INSERT INTO jurusan(nama) VALUES('hukum');
INSERT INTO jurusan(nama) VALUES('matematika');
INSERT INTO jurusan(nama) VALUES('kedokteran');
INSERT INTO jurusan(nama) VALUES('Manajemen Informatika');

CREATE TABLE mahasiswa(
    nim VARCHAR(10) PRIMARY KEY NOT NULL,
    nama VARCHAR(50),
    alamat TEXT,
    jurusan INTEGER,
    FOREIGN KEY (jurusan) REFERENCES jurusan(id)
);

ALTER TABLE mahasiswa ADD umur integer;
INSERT INTO mahasiswa(nim, nama, alamat, jurusan, umur) VALUES('001','erick andre','jln. LET ME IN',01,18);
INSERT INTO mahasiswa(nim, nama, alamat, jurusan, umur) VALUES('002','caroline konstnar','jln. creativity',02,16);
INSERT INTO mahasiswa(nim, nama, alamat, jurusan, umur) VALUES('003','David Blaine','jln. using motor',03,20);
INSERT INTO mahasiswa(nim, nama, alamat, jurusan, umur) VALUES('004','Ricardo','jln. yayowi',04,25);

CREATE TABLE kontrak(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nilai VARCHAR(1),
    nim VARCHAR(10),
    nip VARCHAR(10),
    idmatkul INTEGER,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (nip) REFERENCES dosen(nip),
    FOREIGN KEY (idmatkul) REFERENCES matakuliah(id)
);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('C','001','001',2);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('B','001','001',1);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('A','002','002',3);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('D','002','002',4);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('E','003','003',5);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('D','003','003',6);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('B','004','004',7);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('A','004','004',8);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('C','002','004',7);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('D','004','002',3);

INSERT INTO kontrak(nilai, nim, nip, idmatkul) 
            VALUES('B','004','002',4);

/*task 1*/
SELECT nim, mahasiswa.nama as nama, alamat, umur, jurusan.nama as namajurusan FROM mahasiswa JOIN jurusan ON jurusan.id = mahasiswa.jurusan;

/*task 2*/
SELECT * FROM mahasiswa WHERE umur < 20;

/*task 3*/
SELECT mahasiswa.nim, nama, alamat, jurusan, umur, nilai, sks FROM kontrak JOIN mahasiswa ON mahasiswa.nim = kontrak.nim WHERE nilai = 'A' OR nilai = 'B' ORDER BY nilai; 

/*task 4*/
SELECT mahasiswa.nim, mahasiswa.nama, alamat, jurusan, umur, SUM(sks) as jumlahsks FROM kontrak JOIN mahasiswa ON mahasiswa.nim = kontrak.nim JOIN matakuliah ON matakuliah.id = kontrak.idmatkul GROUP BY kontrak.nim HAVING jumlahsks > 10;

/*task 5*/
SELECT mahasiswa.nim, mahasiswa.nama as nama, alamat, umur, matakuliah.nama as namamatakuliah FROM kontrak JOIN mahasiswa on mahasiswa.nim = kontrak.nim JOIN matakuliah ON matakuliah.id = kontrak.idmatkul WHERE matakuliah.nama = 'data mining';

/*task 6*/
SELECT dosen.nama, COUNT(kontrak.nim) AS jumlahmahasiswa FROM kontrak JOIN mahasiswa on mahasiswa.nim = kontrak.nim JOIN dosen on dosen.nip = kontrak.nip GROUP BY kontrak.nip HAVING COUNT(kontrak.nim);

/*task 7*/
SELECT * FROM mahasiswa ORDER BY umur ASC;

/*task 8*/
SELECT mahasiswa.nim,  mahasiswa.nama as namamahasiswa, mahasiswa.alamat, mahasiswa.umur, jurusan.id as idjurusan, jurusan.nama as namajurusan , dosen.nip, dosen.nama as namadosen, nilai FROM kontrak JOIN mahasiswa ON kontrak.nim = mahasiswa.nim JOIN jurusan ON jurusan.id = mahasiswa.jurusan JOIN dosen ON kontrak.nip = dosen.nip WHERE nilai = 'D' OR nilai = 'E';
