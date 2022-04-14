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
   }
}