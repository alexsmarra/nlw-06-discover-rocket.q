const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

// na const route, temos agora todas as funcionalidades de rotas que o express possui.
const route = express.Router()

// response para renderizar o index.ejs, ou seja, o que virá após o localhost:3000/ 
// Podemos criar variáveis tbm, o  page  é uma, usaremos ele para simplificar o código html
route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))

route.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}))
route.get('/room/:room', (req, res) => res.render('room'))

// para o post do form do modal
route.post('/question/:room/:question/:action', QuestionController.index)

// para o post do /create-pass do input 'Crie sua própria sala'
route.post('/create-room', RoomController.create)

// exportando a const route
module.exports = route