CREATE TABLE jurusan(
    idjurusan integer PRIMARY KEY,
    namajurusan varchar(50) NOT NULL
);

CREATE TABLE mahasiswa(
    nim varchar(10) PRIMARY KEY NOT NULL,
    namamahasiswa varchar(50) NOT NULL,
    alamatmahasiswa text NOT NULL,
    idjurusan integer NOT NULL,
    FOREIGN KEY (idjurusan) REFERENCES jurusan (idjurusan)
);

CREATE TABLE dosen(
    nip varchar(10) PRIMARY KEY NOT NULL,
    namadosen varchar(50) NOT NULL
);

CREATE TABLE matakuliah(
    idmatakuliah integer PRIMARY KEY NOT NULL,
    namamatakuliah varchar(50) NOT NULL
);

CREATE TABLE kontrak(
    idkontrak integer PRIMARY KEY NOT NULL,
    nilai integer NOT NULL,
    nim varchar(10) NOT NULL,
    nip varchar(10) NOT NULL,
    idmatakuliah integer NOT NULL,
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
    FOREIGN KEY (nip) REFERENCES dosen(nip),
    FOREIGN KEY (idmatakuliah) REFERENCES matakuliah(idmatakuliah)
);

INSERT INTO
    jurusan (idjurusan, namajurusan)
VALUES
    (001, 'Matematika');

INSERT INTO
    matakuliah(idmatakuliah, namamatakuliah)
VALUES
    (1, 'Aljabar');

INSERT INTO
    dosen(nip, namadosen)
VALUES
    ('001', 'boom');

INSERT INTO
    mahasiswa(nim, namamahasiswa, alamatmahasiswa, idjurusan)
VALUES
    (2, 'Anjay bin Mabar', 'kalan asique', 1);

INSERT INTO
    kontrak(idkontrak, nilai, nim, nip, idmatakuliah)
VALUES
    (1, 100, '001', '001', 1);

SELECT
    idkontrak,
    nilai,
    mahasiswa.namamahasiswa
FROM kontrak 
INNER JOIN mahasiswa ON mahasiswa.nim = kontrak.nim;

SELECT
    mahasiswa.namamahasiswa,
    kontrak.idkontrak,
    kontrak.nilai
FROM kontrak
INNER JOIN mahasiswa ON mahasiswa.nim = kontrak.nim;
