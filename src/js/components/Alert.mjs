class Alert{
   #alertContainer;
   #closeButton;
   #status;
   #massage;
   #alert;
   constructor(status,massage) {
      this.#status = status;
      this.#massage = massage;
      this.#alertContainer = document.querySelector('.alert-container');
      this.#init();
      this.#alert = this.#alertContainer?.querySelector('#alert');
      this.#closeButton = this.#alertContainer?.querySelector('#button-close-alert');
      this.#closeButton?.addEventListener('click', () => this.#hideAlert());
   }

   #init(){
      if(this.#alertContainer){
         this.#alertContainer.innerHTML = `
         <div class="alert-${this.#status}" id="alert">
         <i class="fa-solid fa-circle-exclamation"></i>
         <span class="alert-massage" id="alert-massage">${this.#massage}</span>
         <button type="button" id="button-close-alert"><i class="fa-solid fa-xmark"></i></button>
         </div>
         `;
      }
   }

   launch(){
      if (this.#alertContainer) {
         this.#alertContainer.classList.remove('hidden');
         this.#alert.classList.add('show');
         setTimeout(() =>{
            this.#alert.classList.add('hide');
            setTimeout(() => {
               this.#alertContainer.classList.add('hidden');
            },1000);
         },2000);
     }
   }

   #hideAlert(){
      if (this.#alertContainer) {
         this.#alert.classList.remove('show');
         this.#alert.classList.add('hide');
         setTimeout(() => {
            this.#alertContainer.classList.add('hidden');
         },1000);
      }
   }

}

export default Alert;