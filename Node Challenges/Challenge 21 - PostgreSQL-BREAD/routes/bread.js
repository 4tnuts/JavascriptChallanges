const bodyParser = require('body-parser')
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

module.exports = (pool) => {
  router.get('/', (req, res, next) => {
    let read = 'SELECT * FROM bread';
    pool.query(read, (err, data) => {
      if (err) return console.error(err);
      let finalData = data.rows.map(item => {
        item.tanggal = moment(item.tanggal).format('YYYY-MMM-DD');
        return item;
      })
      res.status(200).json(finalData)
    });
  });

  router.post('/add', (req, res, next) => {
    let create = 'INSERT INTO bread (teks, nomor, pecahan, tanggal, kondisi) VALUES($1,$2,$3,$4,$5)';
    let body = [req.body.string, req.body.number, req.body.float, req.body.date, req.body.boolean];
    pool.query(create, body, (err, data) => {
      if (err) return console.error(err);
      res.status(201).json(data.rows = {
        teks     : body[0],
        nomor    : body[1],
        pecahan  : body[2],
        tanggal  : body[3],
        kondisi  : body[4]
      });
    });
  });

  router.get('/edit/:id', (req,res,next) => {
    let getData = `SELECT * FROM bread WHERE id = $1`;
    let id = [req.params.id];
    pool.query(getData, id, (err, data) => {
      if(err) return console.error(err);
      let finalData = data.rows.map(item => {
        item.tanggal = moment(item.tanggal).format('YYYY-MM-DD');
        return item;
      })
      res.status(200).json(finalData);
    });
  });

  router.put('/edit/:id', (req, res, next) => {
    let update = 'UPDATE bread SET teks = $2, nomor = $3, pecahan = $4, tanggal = $5, kondisi = $6  WHERE id = $1';
    let body = [req.params.id, req.body.string, req.body.number, req.body.float, req.body.date, req.body.boolean];
    console.log(body);
    pool.query(update, body, (err, data) => {
      if (err) return console.error(err);
      res.status(201).json(data.rows = {
        id: req.params.id,
        teks    : body[0],
        nomor   : body[1],
        pecahan : body[2],
        tanggal : body[3],
        kondisi : body[4]
      });
    })
  })

  router.delete('/delete/:id', (req, res, next) => {
    let remove = 'DELETE FROM bread WHERE id = $1';
    let id = [req.params.id]
    pool.query(remove, id, (err) => {
      if (err) return console.error(err);
      res.status(200).json({
        id
      });
    });
  });
  return router;
}
