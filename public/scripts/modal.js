export default function Modal() {
   // para o botão cancelar (fechar modal)
   const modalCancelButton = document.querySelector(
      ".modal form .buttons .cancel"
   );

   modalCancelButton.addEventListener("click", close);

   const modalWrapper = document.querySelector(".modal-wrapper");

   function open() {
      // funcionalidade de atribuir a classe .active para a modal
      modalWrapper.classList.add("active");
   }
   function close() {
      // funcionalidade para retirar a classe .active para a modal
      modalWrapper.classList.remove("active");
   }

   return {
      open,
      close,
   };
}
