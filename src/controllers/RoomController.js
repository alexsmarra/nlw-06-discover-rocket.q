// necessário para salvar no banco de dados
const Database = require('../db/config')

module.exports = {
   async create(req, res) {
      // necessário para salvar no banco de dados
      const db = await Database()
      // pegando o password digitado pelo usuário em create-pass.ejs
      const pass = req.body.password

      let roomId
      let isRoom = true
      // se  isRoom  for  true ..
      while(isRoom) {
         // gera o número da sala
         for (let i = 0; i < 6; i++) {
            // condição dentro do  for  para que o roomId seja um número com 6 algarismos
            i == 0
               ? (roomId = Math.floor(Math.random() * 10).toString())
               : (roomId += Math.floor(Math.random() * 10).toString())
         }
   
         // Verificar se esse número já existe na coluna de  id  que está em  rooms  . Para buscar no bd (banco de dados) precisamos usar o  all()  (para retornar coisas)
         const roomsExistIds = await db.all(`SELECT id FROM rooms`)
         // Usamos o  some  ao invés do  map  pq o  some  verifica e, se encontrar a condição pedida, ele já pára e retorna  true, para o objetivo de nosso algoritmo é o que necessita. O some deixará o código mais leve do que o map.
         isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
         // se  isRoom  for  false ..
         if(!isRoom) {
            // Inserindo dados na tabela 'rooms', INSERT INTO é inserir dentro (insere a sala no banco)
            // id e pass são as digamos 'chaves', propriedades, por isso colocamos primeiro, já no VALUES colocamos os valores de seus respectivos, ${roomId} para o 'id'  e  ${pass}  para o 'pass' (que é o password que o usuário irá digitar)
            await db.run(`INSERT INTO rooms (
               id,
               pass
            ) VALUES (
               "${parseInt(roomId)}",
               "${pass}"
            )`)
         }
      } 

      await db.close()

      res.redirect(`/room/${roomId}`);
   },

   open(req, res) {
      // essa requisição vai pegar o valor da variável  :room  que está na url (route.get('/room/:room', RoomController.open)) em route.js
      const roomId = req.params.room
      res.render("room", {roomId: roomId})
   }
};
