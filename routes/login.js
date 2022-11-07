const express = require('express')
const router = express.Router()
const fs = require('fs')
const {validatorRegisterUser,validatorLoginUser} = require('../validators/validatorRegister.js')
const bcrypt = require('bcrypt')

router.post('/register',validatorRegisterUser, (req, res)=>{
    
    try {
        const newUser = req.body
        newUser.password = bcrypt.hashSync(newUser.password, 10)
        const db = fs.readFileSync('./db/users.json', 'utf-8')
        const dbJS = JSON.parse(db)
        dbJS.push(newUser)

        fs.writeFileSync('./db/users.json', JSON.stringify(dbJS, null, 2))

    

        res.send(newUser)
        
    } catch (err) {
        console.log(err);
    }


})



router.post('/initialize-session',validatorLoginUser, (req, res)=>{
    
    try {
        const {email, password} = req.body

        console.log(req.body);

        const db = fs.readFileSync('./db/users.json', 'utf-8')
        const dbJS = JSON.parse(db)
        const user = dbJS.filter(e => e.email === email)

        const checkPassword = bcrypt.compareSync(password, user[0].password)

        if (!checkPassword) {
            return res.json({error:'password invalid'})
        }

        res.cookie('user', user[0], {maxAge:300000})

        res.json('has sido redirijido a home')

        
    } catch (err) {
        console.log(err);
    }


})






  


module.exports = router
