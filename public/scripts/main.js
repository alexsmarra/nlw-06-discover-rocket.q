import Modal from './modal.js'

const modal = Modal()

// para o h2 do modal (muda o texto de acordo com o clique do usuário na room, que pode ser em marcar como lida ou excluir)
const modalTitle = document.querySelector('.modal h2')
// para o p do modal (mesma coisa do h2 de cima)
const modalDescription = document.querySelector('.modal p')
// para o button do modal (mesma coisa dos de cima), mudando tb a cor do botão caso necessário
const modalButton = document.querySelector('.modal button')

// pegar todos os botões que existem com a classe  check (em room, antes de abrir o modal), quando esse botão for clicado, abriremos a modal
const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
   // adicionar a escuta 
   button.addEventListener('click', handleClick)
})

// pegar todos os botões que existem com a classe  delete, quando esse botão for clicado, abriremos a modal
const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach(button => {
   // adicionar a escuta, convenção para usar o  event , nesse caso precisa de uma arrow function (nessa function alteramos o valor padrão de check)
   button.addEventListener('click', (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
   // para não se comportar como link (quando clicamos, por ser uma tag a, no endereço url é adicionado uma cerquilha '#', com o event.preventDefault() retiramos esse comportamento padrão)
   event.preventDefault()

   // pega o número que está em data-id do elemento com id  roomId, para sabermos o número da sala (n entendi direito, mas é dessa forma)
   const roomId = document.querySelector('#room-id').dataset.id
   // pegando o valor do data-id de cada question (o número da questão), o target está associado ao event (o event abrange todos os elementos dentro da tag  a  clicada, sendo possível manipulá-los)
   const questionId = event.target.dataset.id
   // valor de check padrão é  true (abaixo uma condição, se  check for  true, slug  será  check, se for  false, slug  será  delete), será alterado no  deleteButtons acima para  false (para sabermos se na área de  room.ejs  o usuário clicou em  "Marcar como lida"  ou em  "Excluir")
   const slug = check ? 'check' : 'delete'

   const form = document.querySelector('.modal form')
   // setando o action do form do modal e colocando as variáveis no endereço do action do form
   form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

   // se a variável check for true, o modalTitle será 'Marcar como lida', se não for true, o modalTitle será 'Excluir essa pergunta'
   modalTitle.innerHTML = check ? 'Marcar como lida essa pergunta' 
                                : 'Excluir essa pergunta'
   modalDescription.innerHTML = check ? 'Tem certeza que deseja marcar como lida essa pergunta?'
                                      : 'Tem certeza que deseja excluir essa pergunta?'
   modalButton.innerHTML = check ? 'Marcar como lida'
                                 : 'Sim, excluir'                    
   // alterando a cor do modalButton de acordo com o boolean check 
   check ? modalButton.classList.remove('color-red')
         : modalButton.classList.add('color-red')

   modal.open()
}
