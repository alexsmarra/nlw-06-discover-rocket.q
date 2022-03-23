import Modal from './modal.js'

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const modal = Modal()

// pegar todos os botões com a class .check
const checkButtons = document.querySelectorAll(".actions a.check") 

// pegar quando o "Marcar como lida" for clicado
checkButtons.forEach(button => {
   // adicionar a escuta
   button.addEventListener("click", handleClick)
})

// pegar todos os botões .delete (Excluir)
const deleteButtons = document.querySelectorAll(".actions a.delete") 

deleteButtons.forEach( button => {
   // precisa usar uma rrow function para usar o Event nesse caso do  check ser false. Não precisamos colocar  check = false , para não dar erro, o false já é para o chek.
   button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
   // para as tags quando clicadas não se comportarem como um link (sem deixar um  #  na barra de endereços do navegador)
   event.preventDefault()

   // pegando o número que está no elemento #room-id
   const roomId = document.querySelector('#room-id').dataset.id
   const questionId = event.target.dataset.id
   const slug = check ? 'check' : 'delete'

   const form = document.querySelector('.modal form')
   form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

   modalTitle.innerHTML = check ? 'Marcar como lida esta pergunta' : 'Excluir esta pergunta'
   modalDescription.innerHTML = check ? 'Tem certeza que deseja marcar como lida essa pergunta?' : 'Tem certeza que deseja excluir essa pergunta?'
   modalButton.innerHTML = check ? 'Sim, marcar como lida' : 'Sim, excluir'
   
   check ? modalButton.classList.remove('color-red') 
         : modalButton.classList.add('color-red')

   modal.open()
}





