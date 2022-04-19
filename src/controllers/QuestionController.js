const Database = require('../db/config')

module.exports = {
   async index(req, res) {
      const db = await Database()
      // pegando as variáveis do post da url /question/:room/:question/:action  que está associada ao  main.js (funcionalidade que será renderizada quando o usuário entra no clica em "marcar como lida" ou "excluir" e entra dentro do modal, digitando a senha de confirmação para marcar como lida ou excluir) 
      // número da sala
      const roomId = req.params.room
      // número da questão
      const questionId = req.params.question
      // se é check ou delete (marcar como lida ou excluir)
      const action = req.params.action
      // para pegar o password é um pouco diferente, usando req.body e o valor de name do input do formulário do modal, pegando assim o valor digitado nesse input
      const password = req.body.password

      // verificar se a senha está correta
      // o  db.all  pega todos os dados que ele encontrar, o  db.get  pega apenas um dado
      // procurando no banco de dados na entities  rooms  o  id  que for igual ao  roomId (que é o número da sala atual)
      const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
      // a partir do resultado de cima, conseguimos pegar o pass (que está associado ao id lá no banco, na entitie  rooms), se ele for igual ao  password  digitado pelo usuário dentro do modal..
      if(verifyRoom.pass == password) {
         // se o clique for em  Excluir (em  /room)..
         if(action == 'delete') {
            // deletaremos a questão..
            await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

         // se o clique for em  Marcar como lida (em  /room)..
         } else if(action == 'check') {
            // atualizaremos o  read  da questão (0 é não lida, 1 é lida)
            await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
         }
         // redirecionando o endereço caso o password digitado pelo usuário seja igual o verifyRoom.pass (password dentro do banco)
         res.redirect(`/room/${roomId}`)
         // se o password digitado pelo usuário não bater.. renderizaremos novamente para a página que estava mas com um  alert (o  alert  não funciona aqui, pois estamos lidando com o backend, ele funciona apenas no frontend, por isso vamos criar uma 'nova' página, mas que na verdade será a mesma que o usuário estava, porém, iniciando com esse  alert  de que não deu certo o password )
      } else {
         res.render('passincorrect', {roomId: roomId})
      } 

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