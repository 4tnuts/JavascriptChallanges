const bodyParser = require('body-parser');
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const app = express();
const port = 3000;

let db = new sqlite3.Database('./bread.db', err => {
    if (err) {
        return console.error(err);
    }
    console.log('sukses');
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    const currentPage = req.query.page || 1;
    const limit = 3;
    const offset = (currentPage - 1) * limit;
    let params = [];

    if (req.query.idCheck && req.query.id) {
        params.push(`id = ${req.query.id}`)
    }
    if (req.query.stringCheck && req.query.string) {
        params.push(`teks LIKE '%${req.query.string}%'`)
    }
    if (req.query.numberCheck && req.query.number) {
        params.push(`nomor = ${req.query.number}`)
    }
    if (req.query.floatCheck && req.query.float) {
        params.push(`pecahan = ${req.query.float}`)
    }
    if (req.query.dateCheck && req.query.dateStart && req.query.dateEnd) {
        params.push(`tanggal BETWEEN '${req.query.dateStart}' AND '${req.query.dateEnd}'`)
    }
    if (req.query.dateCheck && req.query.boolean) {
        params.push(`kondisi  = '${req.query.boolean}'`)
    }

    let query = `SELECT * FROM bread`;
    if (params.length > 0) {
        query += ` WHERE ${params.join(' AND ')}`
    }
    
    console.log(query);

    db.all(query, (err, rows) => {
        if (err) {
            return console.error(err);
        }
        console.log(rows.length);   
        const totalPages = Math.ceil(rows.length / limit);
        const url = req.url == '/' ? '/?page=1' : req.url;
        console.log(url)
        if('/?page' in req.query){
            delete url['/?page']
        }
        console.log(req.url)
        console.log(url)
        console.log(query);
        console.log(req.query);
        console.log(totalPages);
        query += ` LIMIT ${limit} OFFSET ${offset}`
        db.all(query, (err, rows)=>{
        res.render('index', {
            rows,
            query: req.query,
            totalPages,
            currentPage : parseInt(currentPage),
            url
        });
    });
    })
})

app.get('/add', (req, res) => {
    res.render('add');
})

app.post('/add', (req, res) => {
    let input = req.body;
    let tambah = `INSERT INTO bread(teks,nomor,tanggal,pecahan,kondisi) VALUES (${input.string ? `'${input.string}'` : null},${input.integer ? input.integer : null},${input.date ? `'${input.date}'` : null},${input.float ? input.float : null},${input.boolean ? `'${input.boolean}'` : null})`;
    db.run(tambah, err => {
        if (err) {
            return console.error(err);
        }
        console.log('Data berhasil ditambahkan');
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    let getData = `SELECT * FROM bread WHERE id = ${id}`;
    db.get(getData, (err, row) => {
        if (err) {
            return console.error(err);
        }
        console.log(row);
        res.render('edit', {
            row
        });
    });
});

app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    let input = req.body;
    let perbarui = `UPDATE bread SET teks = '${input.string}', nomor = ${input.integer}, 
    tanggal = '${input.date}', pecahan = ${input.float}, kondisi= '${input.boolean}' WHERE id = ${id}`
    db.run(perbarui, err => {
        if (err) {
            return console.error(err);
        }
        console.log('Data di update ditambahkan');
    })
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    let hapus = `DELETE FROM bread WHERE id = ${id}`
    db.run(hapus, err => {
        if (err) {
            return console.error(err);
        }
        console.log('Data berhasil di hapus');
    })
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`ini di port ${port}`);
});