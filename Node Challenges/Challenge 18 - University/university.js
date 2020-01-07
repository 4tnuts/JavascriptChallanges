
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
                list(object);
                break;
            default:
                console.log('gak ada');
        }
    });
}
const create = (object) => {
    let query;
    switch (object) {
        case 'Mahasiswa':
            console.log('====================================================');
            rl.question('Coba masukan data: ', nim => {
                console.log(typeof nim + ' ' +  nim);
                rl.question('Coba masukan data: ', nama => {
                    console.log(typeof nim + ' ' +  nama);
                    rl.question('Coba masukan data: ', jurusan => {
                        console.log(typeof nim + ' ' +  jurusan);
                        rl.question('Coba masukan data: ', alamat => {
                            console.log(typeof nim + ' ' +  alamat);
                          query = `INSERT INTO mahasiswa(nim, nama, jurusan, alamat) VALUES('${nim}','${nama}','${jurusan}','${alamat}')`;
                          db.run(query, err => {
                            if (err) {
                                return console.log('something wrong');
                            }
                            console.log('data success');
                            db.close(err => {
                                if (err) {
                                    return console.log('something just happened');
                                }
                            });
                        });
                        })
                    })
                })
            });
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
                login();
                break;
            default:
                console.log('gak ada');
        }
    });
}



login();