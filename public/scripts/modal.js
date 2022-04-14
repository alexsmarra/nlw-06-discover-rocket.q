export default function Modal() {
   const cancelButton = document.querySelector('.button.cancel')
   // fechar o modal no clique do botão cancelar dentro do próprio modal
   cancelButton.addEventListener('click', close)

   // fucionalidade de adicionar a classe active no modal
   function open() {
      document.querySelector('.modal-wrapper')
         .classList.add('active')
   }
   // fucionalidade para remover a classe active do modal
   function close() {
      document.querySelector('.modal-wrapper')
         .classList.remove('active')
   }

   return {
      open,
      close
   }
}