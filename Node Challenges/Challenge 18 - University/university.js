const sqlite3 = require('sqlite3').verbose();
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
const check = (query, object) => {
    db.run(query, err => {
        console.log(query);
        if (err) {
             console.log('Something has an error');
             crudMenus(object);
        }
        console.log('Success');
        crudMenus(object);
    });
}
const create = (object) => {
    let query;
    switch (object) {
        case 'Mahasiswa':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('NIM: ', nim => {
                rl.question('Nama: ', nama => {
                    rl.question('Jurusan: ', jurusan => {
                        rl.question('Alamat: ', alamat => {
                            query = `INSERT INTO mahasiswa(nim, nama, jurusan, alamat) VALUES('${nim}','${nama}','${jurusan}','${alamat}')`;
                            check(query, object);
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
                    check(query, object);
                });
            });
            break;
        case 'Dosen':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('NIP: ', nip => {
                rl.question('Nama: ', nama => {
                    query = `INSERT INTO dosen(nip, nama) VALUES('${nip}','${nama}')`;
                    check(query, object);
                });
            });
            break;
        case 'Mata Kuliah':
            console.log('====================================================');
            rl.question('Id: ', id => {
                rl.question('Nama: ', nama => {
                    rl.question('SKS: ', sks => {
                        query = `INSERT INTO matakuliah(id, nama, sks) VALUES('${id}','${nama}',${parseInt(sks)})`;
                        check(query, object);
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
                            check(query, object);
                        });
                    });
                });
            });
            break;
        default:
            console.log('gak ada');
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
                    console.log('Database closed')
                    process.exit(0);
                break;
            default:
                console.log('gak ada');
        }
    });
}

login();