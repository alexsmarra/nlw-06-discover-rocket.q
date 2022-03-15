const express = require('express')

// na const route, temos agora todas as funcionalidades de rotas que o express possui.
const route = express.Router()

// response para renderizar o index.ejs, ou seja, o que virá após o localhost:3000/ 
route.get('/', (req, res) => res.render("index"))

// exportando a const route
module.exports = route