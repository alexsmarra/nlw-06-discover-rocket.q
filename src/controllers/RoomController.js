const Database = require('../db/config')

module.exports = {
   async create(req, res) {
      const db = await Database()
      const pass = req.body.password
      let isRoom = true 
      let roomId

   // Enquanto  isRoom  for true, ele vai criar o número da sala, vai rodar esse trecho do código, quando for  false , ele inseri no bd.
      while(isRoom) {
         // criando número de 6 algarismo, fizemos uma condição para concatenação (gerando o número da sala)
         for(var i = 0; i < 6; i++) {
            i == 0 
               ? roomId = Math.floor(Math.random() * 10).toString() 
               : roomId += Math.floor(Math.random() * 10).toString()
         }

      // verificar se esse número já existe (tem que ser diferentes). O db.all é para quando queremos retornar dados, e o cmd  SELECT  é para selecionar um dado no bd.
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
      // o  some  é melhor que o  map  nesse caso pq o  some  verifica, se encontrar (se der true), ele pára, já o  map  iria buscar até o final do bd, vamos supor que é um  bd  bem grande, a aplicação gastaria energia sem necessidade, talvez deixando o sistema mais pesado.
      isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId)

         // se for  false  , ou seja, se não tiver um número igual ao do  roomId, rodaremos os dados para o bd, caso contrário..
         if(!isRoom) {
            // Colocando dados no bd, o  roomId  transformamos em number para o bd. O  VALUES  um é para o valor de  id, o outro é para o valor de  pass
            await db.run(`INSERT INTO rooms (
               id,
               pass
            )VALUES(
               ${parseInt(roomId)},
               "${pass}"
            )`)
         }
      }
      // redirecionando o endereço 
      res.redirect(`/room/${roomId}`)
   },
   
   open(req, res) {
      const roomId = req.params.room
      res.render('room', {roomId: roomId})
   }
}