const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
let db = new sqlite3.Database('./university.db', err => {
    if (err) {
        return console.log('Database error');
    }
});

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const intro = () => {
    console.log('====================================================');
    console.log('Welcome to Universitas Pendidikan Indonesia');
    console.log('Jl Setiabudhi No. 255');
    console.log('====================================================');
}


const login = () => {
    intro();
    rl.question('Username:', username => {
        rl.question('Password:', password => {
            if (username === 'rama' && password === 'navami') {
                menu();
            } else {
                console.log('====================================================');
                console.log('Username atau Password anda salah');
                login();
            }
        });
    });
}
const list = (object) => {
    let query;
    switch (object) {
        case 'Mahasiswa':
            console.log('====================================================');
            console.log('Mahasiswa');
            crudMenus('Mahasiswa');
            break;
        case 'Jurusan':
            console.log('====================================================');
            console.log('Jurusan');
            crudMenus('Jurusan');
            break;
        case 'Dosen':
            console.log('====================================================');
            console.log('Dosen');
            crudMenus('Dosen');
            break;
        case 'Matakuliah':
            console.log('====================================================');
            console.log('Mata Kuliah');
            crudMenus('Mata Kuliah');
            break;
        case 'Kontrak':
            console.log('====================================================');
            console.log('Kontrak');
            crudMenus('Kontrak');
            break;
        default:
            console.log('gak ada');
    }
}

const crudMenus = (object) => {
    console.log('====================================================');
    console.log('silahkan pilih opsi di bawah ini');
    console.log(`[1] daftar ${object}`);
    console.log(`[2] cari ${object}`);
    console.log(`[3] tambah ${object}`);
    console.log(`[4] hapus ${object}`);
    console.log(`[5] kembali`);
    console.log('====================================================');
    rl.question('Masukan salah satu no. dari opsi diatas ', number => {
        switch (number) {
            case '1':
                list(object);
                break;
            case '2':
                list(object);
                break;
            case '3':
                create(object);
                break;
            case '4':
                list(object);
                break;
            case '5':
                menu();
                break;
            default:
                console.log('gak ada');
        }
    });
}
const read = (query, object,cb) => {
    await db.each(query, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        switch (object) {
            case 'Mahasiswa':
                console.log(row.nim);
                break;
            case 'Jurusan':
                console.log(row.id);
                break;
            case 'Dosen':
                console.log(row.nip);
                break;
            case 'Mata Kuliah':
                console.log(row.id);
                break;
            case 'Kontrak':
                console.log(row.id);
                break;
            default:
                console.log('Wrong command');
        }
    });
    cb();
}

const check = (query, object) => {
    db.run(query, err => {
        if (err) {
            console.log('Something has an error');
            crudMenus(object);
        }
        console.log('Success');
        crudMenus(object);
    });
}


const create = (object) => {
    let createQuery;
    let readQuery;
    switch (object) {
        case 'Mahasiswa':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('NIM: ', nim => {
                rl.question('Nama: ', nama => {
                    rl.question('Jurusan: ', jurusan => {
                        rl.question('Alamat: ', alamat => {
                            createQuery = `INSERT INTO mahasiswa(nim, nama, jurusan, alamat) VALUES('${nim}','${nama}','${jurusan}','${alamat}')`;
                            readQuery = `SELECT * FROM mahasiswa`;
                            read(readQuery, object, ()=>{
                                check(createQuery, object);
                            });
                        });
                    });
                });
            });
            break;
        case 'Jurusan':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('Id: ', id => {
                rl.question('Nama: ', nama => {
                    query = `INSERT INTO jurusan(id, nama) VALUES('${id}','${nama}')`;
                    readQuery = `SELECT * FROM jurusan`;
                    read(readQuery, object);
                    check(createQuery, object);
                });
            });
            break;
        case 'Dosen':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('NIP: ', nip => {
                rl.question('Nama: ', nama => {
                    query = `INSERT INTO dosen(nip, nama) VALUES('${nip}','${nama}')`;
                    readQuery = `SELECT * FROM dosen`;
                    read(readQuery, object);
                    check(createQuery, object);
                });
            });
            break;
        case 'Mata Kuliah':
            console.log('====================================================');
            rl.question('Id: ', id => {
                rl.question('Nama: ', nama => {
                    rl.question('SKS: ', sks => {
                        query = `INSERT INTO matakuliah(id, nama, sks) VALUES('${id}','${nama}',${parseInt(sks)})`;
                        readQuery = `SELECT * FROM matakuliah`;
                        read(readQuery, object);
                        check(createQuery, object);
                    });
                });
            });
            break;
        case 'Kontrak':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('Nilai: ', nilai => {
                rl.question('Nim: ', nim => {
                    rl.question('Nip: ', nip => {
                        rl.question('Id matkul: ', idmatkul => {
                            query = `INSERT INTO kontrak(nilai, nim, nip, idmatkul) VALUES('${nilai}','${nim}','${nip}','${idmatkul}')`;
                            readQuery = `SELECT * FROM kontrak`;
                            read(readQuery, object);
                            check(createQuery, object);
                        });
                    });
                });
            });
            break;
        default:
            console.log('Wrong command');
    }
};

const menu = () => {
    console.log('====================================================');
    console.log('Welcome, rama. Your access level is: ADMIN');
    console.log('====================================================');
    console.log('silahkan pilih opsi di bawah ini');
    console.log('[1] Mahasiswa');
    console.log('[2] Jurusan');
    console.log('[3] Dosen');
    console.log('[4] Mata Kuliah');
    console.log('[5] Kontrak');
    console.log('[6] Keluar');
    console.log('====================================================');
    rl.question('Masukan salah satu no. dari opsi diatas ', number => {
        switch (number) {
            case '1':
                crudMenus('Mahasiswa');
                break;
            case '2':
                crudMenus('Jurusan');
                break;
            case '3':
                crudMenus('Dosen');
                break;
            case '4':
                crudMenus('Mata Kuliah');
                break;
            case '5':
                crudMenus('Kontrak');
                break;
            case '6':
                console.log('Kamu telah keluar');
                db.close(err => {
                    if (err) {
                        console.log(err.message);
                    }
                });
                process.exit(0);
            default:
                console.log('Wrong command');
        }
    });
}

login();