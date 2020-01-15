const bodyParser = require('body-parser');
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const app = express();
const port = 3000;

let db = new sqlite3.Database('./bread.db', err => {
    if(err){
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
    res.render('index');
})

app.get('/add', (req, res) => {
    res.render('add');
})

app.post('/add', (req, res) => {
    let input = req.body;
    let tambah = `INSERT INTO bread(teks,nomor,tanggal,pecahan,kondisi) VALUES ('${input.string}',${parseInt(input.integer)},'${input.date}',${parseFloat(input.float)},'${parseInt(input.boolean)}')`;
    db.run(tambah, err =>{
        if(err){
            return console.error(err);
        }
        console.log('sukses');
    })
})

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    res.render('edit');
})

app.post('/edit/:id', (req, res) => {
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`ini di port ${port}`);
})