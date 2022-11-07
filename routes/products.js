const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/get-product/:id' ,(req, res)=>{
    
    try {
        const {id} = req.params

        const db = fs.readFileSync('./db/products.json', 'utf-8')
        const dbJS = JSON.parse(db)
        const product = dbJS.filter(e => e.id === parseInt(id))


        if (product.length === 0) {
            return res.send({errors:'Product not exist'})
        }


        res.send(product)
        
    } catch (err) {
        console.log(err);
    }


})








  


module.exports = router
