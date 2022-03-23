// o sqlite é uma versão mais simples do sql, uma versão mais light, mas que atenderá muito bem ao objetivo proposto nesse projeto 
const sqlite3 = require('sqlite3')
// como no sqlite normal precisaremos apenas do  open , variável dentro do sqlite, o javascript irá procurar o  open  dentro do sqlite para usarmos, assim não precisaremos dar um require em todo o sqlite. Isso é referente apenas a esse, o sqlite3 de cima precisaremos de mais coisas.
const { open } = require('sqlite')

module.exports = () =>
   // o  open  é como se fosse para abrir o banco de dados, como se fosse uma caixinha (para entender melhor )
   open({
      // configurando o nome do nosso banco de dados
      filename: './src/db/rocketq.sqlite',
      driver: sqlite3.Database,
   })

