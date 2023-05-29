const Database = require('../db/config')

module.exports = {
   // para gerar número de id da sala, pegar ele, o password (código digitado pelo usuário) e enviar para o banco de dados
   async create(req, res) {
      const db = await Database()
      // pegando o password (código da sala) digitado pelo usuário
      const pass = req.body.password
      let isRoom = true 
      let roomId

   // Enquanto  isRoom  for true, ele vai criar o número da sala, vai rodar esse trecho do código, quando for  false , ele inseri no bd, se der true, ele recomeça (não pode ter número de id's iguais)
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
            ) VALUES (
               ${parseInt(roomId)},
               "${pass}"
            )`)
         }
      }

      await db.close()
      // redirecionando o endereço 
      res.redirect(`/room/${roomId}`)
   },
   
   async open(req, res) {
      const db = await Database()
      // pegando o parâmetro gerado dentro da própria url de /room/:room (o  :room)
      const roomId = req.params.room
      
      // Buscando na tabela  questions  apenas as questões (não lidas, read = 0) da sala que queremos, do  roomId  do momento. Na sintaxe para banco de dados, o sinal de "=" não significa "recebe", mas "igual" mesmo
      const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)

      // buscando as perguntas como acima, mas apenas as já lidas (read = 1). 
      const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

      // forma de dar nome à variáveis que terá como valor um tipo boolean (isRoom, isBlack, isWhite..)
      let isNoQuestions
      // condição para ver se não tem questões na sala
      if(questions.length == 0) {
         if(questionsRead.length == 0) {
            isNoQuestions = true
         }
      }
      
      // entre chaves é a forma de enviar as variáveis criadas acima para o room.ejs (faremos um if antes de começar o forEach das questões)
      res.render('room', {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})

   },
   // para quando o usuário digitar o código da sala no formulário da página inicial, fazendo com que ele entre em uma sala já existente.
   enter(req, res) {
      // pegando o número digitado pelo usuário 
      const roomId = req.body.roomId

      res.redirect(`/room/${roomId}`)
   }
}