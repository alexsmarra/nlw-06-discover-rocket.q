const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

// na const route, temos agora todas as funcionalidades de rotas que o express possui.
const route = express.Router()

// response para renderizar o index.ejs, ou seja, o que virá após o localhost:3000/ 
// O page é uma variável para usarmos no index.ejs, para montar o html de forma mais eficiente (com menos código) e para aproveitar as partes em comum.
route.get('/', (req, res) => res.render("index", { page: 'enter-room' }))
route.get('/create-pass', (req, res) => res.render("index", { page: 'create-pass' }))

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)

route.post('/question/create/:room', QuestionController.create)
// Formato que o formulário de dentro da modal tem que passar a informação. As palavras após o : como o :room e o :question por exemplo, é a forma de colocarmos variáveis, é no lugar delas que entrarão os dados que pegamos dos elementos através do  main.js
route.post('/question/:room/:question/:action', QuestionController.index)


// exportando a const route
module.exports = route




