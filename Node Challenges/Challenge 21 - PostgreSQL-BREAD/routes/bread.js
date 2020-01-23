const bodyParser = require('body-parser')
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

module.exports = (pool) => {
  router.get('/', (req, res, next) => {
    let resultQuery = 'SELECT count(*) FROM bread';
    const limit = 3;
    const currentPage = req.query.page || 1;
    const offset = (currentPage - 1) * limit;
    let queries = [];
    if(req.query.idCheck && req.query.id){
      queries.push(`id = ${req.query.id}`);
    }
    if(req.query.stringCheck && req.query.string){
      queries.push(`teks LIKE '%${req.query.string}%'`);
    }
    if(req.query.integerCheck && req.query.integer){
      queries.push(`nomor = ${req.query.integer}`);
    }
    if(req.query.floatCheck && req.query.float){
      queries.push(`pecahan = ${req.query.float}`);
    }
    if(req.query.dateCheck && req.query.dateStart && req.query.dateEnd){
      queries.push(`tanggal BETWEEN ${req.query.dateStart} AND ${req.query.dateEnd}`);
    }
    if(req.query.booleanCheck && req.query.boolean){
      queries.push(`kondisi = ${req.query.boolean}`);
    }
    if(queries.length > 0){
      resultQuery += ` WHERE ${queries.join(' AND ')}`;
    }

    pool.query(resultQuery, (err, data) => {
      if (err) return console.error(err);
      const totalPage = Math.ceil(data.rows / limit);
      const url = req.url == '/' ? '?page=1' : req.url;
      resultQuery = `SELECT * FROM bread`;
      if(queries.length > 0){
        resultQuery += ` WHERE ${queries.join(' AND ')}`;
      }
      resultQuery+=` LIMIT ${limit} OFFSET ${offset}`;
      pool.query(resultQuery, (err, data)=>{
        res.status(200).json({
          data: data.rows,
          url,
          totalPage,
          currentPage : parseInt(currentPage),
          query : req.query
        });
      })
    });
    // let finalData = data.rows.map(item => {
    //   item.tanggal = moment(item.tanggal).format('YYYY-MMM-DD');
    //   return item;
    // })
  });

  router.post('/', (req, res, next) => {
    let create = 'INSERT INTO bread (teks, nomor, pecahan, tanggal, kondisi) VALUES($1,$2,$3,$4,$5)';
    console.log(req.body);
    let body = [req.body.teks, req.body.nomor, req.body.pecahan, req.body.tanggal, req.body.kondisi];
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

  router.get('/:id', (req,res,next) => {
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

  router.put('/:id', (req, res, next) => {
    let update = 'UPDATE bread SET teks = $2, nomor = $3, pecahan = $4, tanggal = $5, kondisi = $6  WHERE id = $1';
    let body = [req.params.id, req.body.teks, req.body.nomor, req.body.pecahan, req.body.tanggal, req.body.kondisi];
    console.log(body);
    pool.query(update, body, (err, data) => {
      if (err) return console.error(err);
      res.status(201).json(data.rows = {
        id      : req.params.id,
        teks    : body[0],
        nomor   : body[1],
        pecahan : body[2],
        tanggal : body[3],
        kondisi : body[4]
      });
    })
  })

  router.delete('/:id', (req, res, next) => {
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
