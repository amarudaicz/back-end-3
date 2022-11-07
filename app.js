const express = require('express')
const bodyParser = require('body-parser')
const checkUrl = require('./middlewares/chekUrl')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/login', require('./routes/login'))
app.use('/products', require('./routes/products'))
app.use(checkUrl)






app.listen(3080, ( )=>{
    console.log('app on');
})