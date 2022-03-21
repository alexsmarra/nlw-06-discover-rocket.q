const express = require('express')

// na const route, temos agora todas as funcionalidades de rotas que o express possui.
const route = express.Router()

// response para renderizar o index.ejs, ou seja, o que virá após o localhost:3000/ 
route.get('/', (req, res) => res.render("index"))
// responses para renderizar as demais páginas
route.get('/create-pass', (req, res) => res.render("create-pass"))
route.get('/room', (req, res) => res.render("room"))

// Formato que o formulário de dentro da modal tem que passar a informação
// route.post('/room/:room/:question/:action')

// exportando a const route
module.exports = route




