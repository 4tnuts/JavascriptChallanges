const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

const dataJSON = JSON.parse(fs.readFileSync('data.json'));
const dataSave = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
}
app.get('/', (req, res) => {
    res.render('index', {dataJSON});
})

app.get('/add', (req,res) =>{
    res.render('add');
})

app.post('/add', (req, res) => {
    dataJSON.push({
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    })
    dataSave(dataJSON);
    res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    res.render('edit', {
        data : {...dataJSON[id]}
    ,id});
})

app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    dataJSON[id] = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    }
    dataSave(dataJSON);
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    dataJSON.splice(id, 1);
    dataSave(dataJSON);
    res.redirect('/');
  })

app.listen(port, () => {
    console.log(`ini di port ${port}`);
})