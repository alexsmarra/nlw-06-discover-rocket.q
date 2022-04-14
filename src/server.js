// importando o express
const express = require('express')
// o  server.js  não reconhece a existência do  route.js, por isso a linha abaixo é necessária para importar o arquivo route.js
const route = require('./route')
// importando o módulo  path, para o  server.set('views, path.join..)  mais abaixo
const path = require('path')

const server = express()

// dizendo para o express que a nossa view engine será ejs
server.set('view engine', 'ejs')

// para a pasta  public, que fará renderizar todo o css que colocamos dentro dela.
server.use(express.static('public'))

// O  path  é o caminho em nosso pc até o projeto rocketq (/Users/alexandremarra/Programacao/Rocketseat/Discover/NLW6/rocketQ), o  __dirname  será sempre da pasta mais próxima aonde estamos (server.js), que no caso é  src/  (pois ele está dentro de  src/)  , o  join  irá juntar o  src/  com a pasta  views    
server.set('views', path.join(__dirname, 'views'))

// middleware para renderizar os posts (funcionalidades dos nossos posts, que fará a intermediação entre a rota e o  QuestionController.js  por exemplo)
server.use(express.urlencoded({extended: true}))

// dizendo para o node utilizar a arquivo  route.js
server.use(route)

// o listen é uma função que está no  express, para configurar a porta. Para rodar no node, basta pelo terminal o cmd  node src/server.js
server.listen(3000, () => console.log('rodando'))


