const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

// na const route, temos agora todas as funcionalidades de rotas que o express possui.
const route = express.Router()

// response para renderizar o index.ejs, ou seja, o que virá após o localhost:3000/ 
// Podemos criar variáveis tbm, o  page  é uma, usaremos ele para simplificar o código html
route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
// para quando o usuário digitar o código da sala no formulário da página inicial, fazendo com que ele entre em uma sala já existente.
route.post('/enterroom', RoomController.enter)

route.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}))
// o :room é a forma de receber variáveis, sempre que tiver :algumacoisa é uma forma de receber variáveis para encaixar na url
// para o post do /create-pass do input 'Crie sua própria sala'
route.post('/create-room', RoomController.create)

route.get('/room/:room', RoomController.open)

route.post('/question/create/:room', QuestionController.create)
// para o post do form do modal
route.post('/question/:room/:question/:action', QuestionController.index)

// exportando a const route
module.exports = route