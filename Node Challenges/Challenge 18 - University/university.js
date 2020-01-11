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
                menu();
        }
    });
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
                showTable(object);
                break;
            case '2':
                find(object);
                break;
            case '3':
                create(object);
                break;
            case '4':
                remove(object);
                break;
            case '5':
                menu();
                break;
            default:
                console.log('gak ada');
        }
    });
}

const remove = (object) => {
    let deleteQuery;
    switch (object) {
        case 'Mahasiswa':
            rl.question('Masukan NIM mahasiswa yang akan di hapus: ', nim => {
                deleteQuery = `DELETE FROM mahasiswa WHERE nim = '${nim}'`;
                check(deleteQuery, object, () => {
                    showTable(object)
                });
            });
            break;
        case 'Jurusan':
            rl.question('Masukan Id jurusan yang akan di hapus: ', id => {
                deleteQuery = `DELETE FROM jurusan WHERE id = '${id}'`;
                check(deleteQuery, object, () => {
                    showTable(object)
                });
            });
            break;
        case 'Dosen':
            rl.question('Masukan NIP dosen yang akan di hapus: ', nip => {
                deleteQuery = `DELETE FROM dosen WHERE nip = '${nip}'`;
                check(deleteQuery, object, () => {
                    showTable(object)
                });
            });
            break;
        case 'Mata Kuliah':
            rl.question('Masukan Id matakuliah yang akan di hapus: ', id => {
                deleteQuery = `DELETE FROM matakuliah WHERE id = '${id}'`;
                check(deleteQuery, object, () => {
                    showTable(object)
                });
            });
            break;
        case 'Kontrak':
            rl.question('Masukan Id Kontrak yang akan di hapus: ', id => {
                deleteQuery = `DELETE FROM kontrak WHERE id = '${id}'`;
                check(deleteQuery, object, () => {
                    showTable(object)
                });
            });
            break;
        default:
            console.log('command not found');
    }
}

const showTable = (object) => {
    let readQuery;
    switch (object) {
        case 'Mahasiswa':
            readQuery = `SELECT * FROM mahasiswa`;
            break;
        case 'Jurusan':
            readQuery = `SELECT * FROM jurusan`;
            break;
        case 'Dosen':
            readQuery = `SELECT * FROM dosen`;
            break;
        case 'Mata Kuliah':
            readQuery = `SELECT * FROM matakuliah`;
            break;
        case 'Kontrak':
            readQuery = `SELECT * FROM kontrak`;
            break;
        default:
            console.log('Wrong command');
    }

    let table = new Table({
        head: [],
        colWidths: []
    });

    db.all(readQuery, (err, rows) => {
        if (err) {
            return console.error(err.message);
        }

        rows.forEach(row => {
            switch (object) {
                case 'Mahasiswa':
                    table.options['head'] = ['NIM', 'Nama', 'Jurusan', 'Alamat'];
                    table.options['colWidths'] = [10, 20, 10, 20];
                    table.push([`${row.nim}`, `${row.nama}`, `${row.jurusan}`, `${row.alamat}`]);

                    break;
                case 'Jurusan':
                    table.options['head'] = ['Id', 'Nama'];
                    table.options['colWidths'] = [10, 20];
                    table.push([`${row.id}`, `${row.nama}`]);
                    break;
                case 'Dosen':
                    table.options['head'] = ['NIP', 'Nama'];
                    table.options['colWidths'] = [10, 20];
                    table.push([`${row.nip}`, `${row.nama}`]);
                    break;
                case 'Mata Kuliah':
                    table.options['head'] = ['Id', 'Nama', 'SKS'];
                    table.options['colWidths'] = [10, 20, 10];
                    table.push([`${row.nip}`, `${row.nama}`, `${row.sks}`]);
                    break;
                case 'Kontrak':
                    table.options['head'] = ['Id', 'Nilai', 'NIM', 'NIP', 'Id Matakuliah'];
                    table.options['colWidths'] = [10, 10, 10, 10, 20];
                    table.push([`${row.id}`, `${row.nilai}`, `${row.nim}`, `${row.nip}`, `${row.idmatkul}`]);
                    break;
                default:
                    console.log('Wrong command');
            }
        });
        console.log(table.toString());
        crudMenus(object);
    });
}

const showData = (findQuery, primaryKeys, object) => {
    db.serialize(() => {
        db.get(findQuery, [primaryKeys], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                switch (object) {
                    case 'Mahasiswa':
                        console.log(`====================================================`);
                        console.log(`Id          : ${row.nim}`);
                        console.log(`Nama        : ${row.nama}`);
                        console.log(`Alamat      : ${row.alamat}`);
                        console.log(`Jurusan     : ${row.jurusan}`);
                        crudMenus(object);
                        break;
                    case 'Jurusan':
                        console.log(`====================================================`);
                        console.log(`Id          : ${row.id}`);
                        console.log(`Nama        : ${row.nama}`);
                        crudMenus(object);
                        break;
                    case 'Dosen':
                        console.log(`====================================================`);
                        console.log(`NIP         : ${row.nip}`);
                        console.log(`Nama        : ${row.nama}`);
                        crudMenus(object);
                        break;
                    case 'Mata Kuliah':
                        console.log(`====================================================`);
                        console.log(`Id          : ${row.id}`);
                        console.log(`Nama        : ${row.nama}`);
                        console.log(`SKS         : ${row.sks}`);
                        crudMenus(object);
                        break;
                    case 'Kontrak':
                        console.log(`====================================================`);
                        console.log(`Id          : ${row.id}`);
                        console.log(`Nilai       : ${row.nilai}`);
                        console.log(`NIM         : ${row.nim}`);
                        console.log(`NIP         : ${row.nip}`);
                        console.log(`Id Matkul   : ${row.idmatkul}`);
                        crudMenus(object);
                        break;
                    default:
                        console.log('command not found');
                }
            } else {
                switch (object) {
                    case 'Mahasiswa':
                        console.log(`Mahasiswa dengan NIM ${number} tidak terdaftar`);
                        crudMenus(object);
                        break;
                    case 'Jurusan':
                        console.log(`Jurusan dengan Id ${number} tidak terdaftar`);
                        crudMenus(object);
                        break;
                    case 'Dosen':
                        console.log(`Dosen dengan NIP ${number} tidak terdaftar`);
                        crudMenus(object);
                        break;
                    case 'Mata Kuliah':
                        console.log(`Matakuliah dengan Id ${number} tidak terdaftar`);
                        crudMenus(object);
                        break;
                    case 'Kontrak':
                        console.log(`Kontrak dengan Id ${number} tidak terdaftar`);
                        crudMenus(object);
                        break;
                    default:
                        console.log('wrong command');
                }
            }
        });
    });
}

const find = (object) => {
    switch (object) {
        case 'Mahasiswa':
            console.log(`====================================================`);
            rl.question('Masukan NIM Mahasiswa: ', nim => {
                let findQuery = 'SELECT * FROM mahasiswa WHERE nim = ?';
                showData(findQuery, nim, object);
            });
            break;
        case 'Jurusan':
            console.log(`====================================================`);
            rl.question('Masukan Id Jurusan : ', id => {
                let findQuery = 'SELECT * FROM jurusan WHERE id = ?';
                showData(findQuery, id, object);
            });
            break;
        case 'Dosen':
            console.log(`============================================f========`);
            rl.question('Masukan NIP Dosen: ', nip => {
                let findQuery = 'SELECT * FROM dosen WHERE nip = ?';
                showData(findQuery, nip, object);
            });
            break;
        case 'Mata Kuliah':
            console.log(`====================================================`);
            rl.question('Masukan Id Mata Kuliah: ', id => {
                findQuery = 'SELECT * FROM matakuliah WHERE id = ?'
                showData(findQuery, id, object);
            });
            break;
        case 'Kontrak':
            console.log(`====================================================`);
            rl.question('Masukan Id Kontrak: ', id => {
                findQuery = 'SELECT * FROM kontrak WHERE id = ?';
                showData(findQuery, id, object);
            });
            break;
        default:
            console.log('Wrong command');
    }
}

const check = (query, object, showTable) => {
    db.serialize(() => {
        db.run(query, err => {
            if (err) {
                console.log('Something has an error');
                crudMenus(object);
            }
        });
        showTable();
    });
}

const create = (object) => {
    let createQuery;
    switch (object) {
        case 'Mahasiswa':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('NIM: ', nim => {
                rl.question('Nama: ', nama => {
                    rl.question('Jurusan: ', jurusan => {
                        rl.question('Alamat: ', alamat => {
                            createQuery = `INSERT INTO mahasiswa(nim, nama, jurusan, alamat) VALUES('${nim}','${nama}','${jurusan}','${alamat}')`;
                            check(createQuery, object, () => {
                                showTable(object)
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
                    createQuery = `INSERT INTO jurusan(id, nama) VALUES('${id}','${nama}')`;
                    check(createQuery, object, () => {
                        showTable(object);
                    });
                });
            });
            break;
        case 'Dosen':
            console.log('====================================================');
            console.log('Tolong lengkapi data di bawah ini');
            rl.question('NIP: ', nip => {
                rl.question('Nama: ', nama => {
                    createQuery = `INSERT INTO dosen(nip, nama) VALUES('${nip}','${nama}')`;
                    check(createQuery, object, () => {
                        showTable(object);
                    });
                });
            });
            break;
        case 'Mata Kuliah':
            console.log('====================================================');
            rl.question('Id: ', id => {
                rl.question('Nama: ', nama => {
                    rl.question('SKS: ', sks => {
                        createQuery = `INSERT INTO matakuliah(id, nama, sks) VALUES('${id}','${nama}',${parseInt(sks)})`;
                        check(createQuery, object, () => {
                            showTable(object);
                        });
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
                            createQuery = `INSERT INTO kontrak(nilai, nim, nip, idmatkul) VALUES('${nilai}','${nim}','${nip}','${idmatkul}')`;
                            check(createQuery, object, () => {
                                showTable(object)
                            });
                        });
                    });
                });
            });
            break;
        default:
            console.log('Wrong command');
    }
};

login();