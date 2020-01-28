const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId
module.exports = (db) => {
    const collection = db.collection('bread')

    router.get('/', (req, res, next)=>{
        collection.find().toArray((err, result) => {
            if(err) return console.error(err);
            res.status(302).json(result);
        })
    })

    router.get('/:id', (req, res, next)=>{
        collection.find({_id : ObjectId(req.params.id)}).toArray((err, result) => {
            if(err) return console.error(err);
            res.status(302).json(result);
        })
    })

    router.post('/', (req, res, next)=>{
        const data = {
            string  : req.body.string,
            number  : parseInt(req.body.number),
            float   : parseFloat(req.body.float),
            date    : new Date(req.body.date),
            boolean : req.body.boolean
        }
        collection.save(data, (err, result) => {
            if(err) return console.error(err);
            res.status(201).json(result);
        })
    })

    router.put('/', (req,res,next) => {
        collection.findOneAndUpdate({_id : ObjectId(req.body.id)},{
            $set : {
                string  : req.body.string,
                number  : parseInt(req.body.number),
                float   : parseFloat(req.body.float),
                date    : new Date(req.body.date),
                boolean : req.body.boolean
            }
        },
        (err,result)=>{
            if(err) return console.error(err);
            res.status(200).json(result);
        })
    })

    router.delete('/:id', (req,res,next) => {
        collection.findOneAndDelete({_id : ObjectId(req.params.id)}, (err,result)=>{
            if(err) return console.error(err);
            res.status(200).json(result);
        })
    })
    return router;
}
