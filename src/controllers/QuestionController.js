const Database = require('../db/config')

module.exports = {
   index(req, res) {
      // pegando as variáveis (estão no main.js)
      const roomId = req.params.room
      const questionId = req.params.question
      const action = req.params.action
      // para pegar o password é um pouco diferente, usando req.body e o valor de name do input do formulário do modal, pegando assim o valor digitado nesse input
      const password = req.body.password
      
      // jogando no node
      console.log(`roomId: ${roomId}, questionId: ${questionId}, action: ${action}, password: ${password}`)
   },
   async create(req, res) {
      const db = await Database()
      // pegando a question do textarea através do name
      const question = req.body.question
      // pegando por params, o :room do endereço do post
      const roomId = req.params.room 

      // inserindo dados na tabela  questions, que foi criada em init.js. Valores strings precisam de aspas, exceto quando for número string.
      await db.run(`INSERT INTO questions(
         title, 
         room,
         read
      )VALUES(
         "${question}",
         ${roomId},
         0
      )`)

      res.redirect(`/room/${roomId}`)
   }
}