module.exports = {
   index(req, res) {
      // pegando as requisições da linha 'route.post('/room/:room/:question/:action', QuestionController.index)' do  route.js, ou seja, pegando os valores de cada variável (valores de :room, :questionId e :action) 
      const roomId = req.params.room
      const questionId = req.params.question
      const action = req.params.action
      // para pegar o password, é um pouco diferente o comando, e precisaremos de middlewares pelo fato da rota estat recebendo dados
      const password = req.body.password

      console.log(`roomId: ${roomId}, questionId: ${questionId}, action: ${action}, password: ${password}`)
   }
}