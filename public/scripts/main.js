import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

// pegar todos os botões que existem com a classe check, quando esse botão for clicado, abriremos a modal
const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
   // adicionar a escuta 
   button.addEventListener('click', handleClick)
})

// pegar todos os botões que existem com a classe delete, quando esse botão for clicado, abriremos a modal
const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach(button => {
   // convenção para usar o event nesse caso, precisa de uma arrow function
   button.addEventListener('click', (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
   // para não se comportar como link (quando clicamos, por ser uma tag a, no endereço url é adicionado uma cerquilha '#', com o event.preventDefault() retiramos esse comportamento padrão)
   event.preventDefault()

   // pega o número que está em data-id do elemento roomId, para sabermos o número da sala
   const roomId = document.querySelector('#room-id').dataset.id
   // pegando o valor do data-id de cada question, o target está associado ao event
   const questionId = event.target.dataset.id
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
