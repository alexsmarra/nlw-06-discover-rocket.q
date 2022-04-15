const sqlite3 = require('sqlite3')
// do  sqlite normal precisamos apenas de uma function chamada  open, para abrir nosso bd, para isso, deixamos ativa apenas ela dessa forma abaixo
const { open }  = require('sqlite')

// configuração para o bd
module.exports = () => 
   open({
      // para o nome do arquivo do nosso banco de dados
      filename: './src/db/rocketq.sqlite',
      driver: sqlite3.Database
   }) 
