import Metod from './Metod.mjs';
import RenderBook from './RenderBook.mjs';
import Alert from './Alert.mjs';


class EventMetod{
   #popupContainer = document.querySelector('.popup-container');
   #cancelButton;
   #buttonYakin;
   #form;
   #idBook;
   #popupNotif;
   #titleBook;
   #authorBook;
   #yearBook;
   constructor(metod,idBook,notif){
      this.#popupNotif = notif;
      this.#idBook = idBook;
      this.metod = metod;
      this.#init();
      this.#cancelButton = this.#popupContainer.querySelector('#button-batal');
      this.#buttonYakin = this.#popupContainer.querySelector('#button-confirmation-yakin');

      this.#form = this.#popupContainer.querySelector("form");
      this.#titleBook = this.#popupContainer.querySelector('#title-book');
      this.#authorBook = this.#popupContainer.querySelector('#author');
      this.#yearBook = this.#popupContainer.querySelector('#year');

   }

   #init(){
      switch(this.metod){
         case "AddBook":
				this.#statAddBook();
				break;
         case "EditBook":
            this.#statEditBook();
            break;
         case "DeleteBook":
            this.#statPopupBook();
            break;
         case "ChekBook":
            this.#statPopupBook();
            break;
      }
   }

   launch(){
      this.#popupContainer.classList.remove('hidden');
      this.#hideEvent();
      this.#submitEvent();
   }

   launchDelete(){
      this.#popupContainer.classList.remove('hidden');
      this.#buttonYakin.addEventListener('click', () => this.#hide());
      this.#hideEvent();
      this.#confirmationDelete();
   }

   launchChek(){
      this.#popupContainer.classList.remove('hidden');
      this.#buttonYakin.addEventListener('click', () => this.#hide());
      this.#hideEvent();
      this.#confirmationChek();
   }

   #confirmationChek(){
      this.#buttonYakin?.addEventListener('click', () => {
         try {
            const indexBook = RenderBook.findIndexBook(this.#idBook);
            const bookUpdated = Metod.chekBook(indexBook);
            if(bookUpdated){
               RenderBook.filterItem(bookUpdated);
               const alert = new Alert('succesAdd', "Berhasil memindahkan buku");
               alert.launch();
            }else{
               throw Error('gagal dalam memindahkan buku');
            }
         } catch (error) {
            if (error instanceof Error) {
               const errorAlert = error.message;
               alert(errorAlert);
            }
         }
      })
   }

   #confirmationDelete(){
      this.#buttonYakin?.addEventListener('click',() =>{
         try {
            const indexBook = RenderBook.findIndexBook(this.#idBook);
            const bookUpdated = Metod.deleteBook(indexBook);
            if(bookUpdated){
               RenderBook.filterItem(bookUpdated);
               const alert = new Alert('succesDelete', "Berhasil menghapus buku");
               alert.launch();
            }else{
               throw Error(`gagal menghapus buku silahkan cek lagi`);
            }
         } catch (error) {
            if (error instanceof Error) {
               const errorAlert = error.message;
               alert(errorAlert);
            }
         }
      });
   }

   #submitEvent(){
      this.#form?.addEventListener("submit", (e) => {
         switch(this.metod){
            case "AddBook":
               this.#initAddBook();
               break;
            case "EditBook":
               this.#initEditbook();
         }

         e.preventDefault();
         RenderBook.filterItem();
         this.#hide();
      });
   }

   #hideEvent() {
		this.#popupContainer?.addEventListener("click", (e) => {
			if (e.target === this.#popupContainer) this.#hide();
		});
		document.body.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.#hide();
			}
		});
		this.#cancelButton.addEventListener("click", () => this.#hide());
	}

   #hide(){
      this.#popupContainer.classList.add('hidden');
      this.#popupContainer.innerHTML = '';
   }
   
   #statAddBook(){
      this.#popupContainer.innerHTML = `
      <div class="popup-add-book" id="popup-add-book">
         <h3>Tambah Buku</h3>
         <form action="">
            <label for="title-book">Judul</label>
            <input type="text" id="title-book" placeholder="Masukkan judul buku">
            <label for="author">Penulis</label>
            <input type="text" id="author" placeholder="Masukkan penulis buku">
            <label for="year">Tahun Terbit</label>
            <input type="number" id="year" minlength="4" min="0" max="9999" placeholder="Masukkan tahun terbit buku">
            <button id="button-add-book-simpan" class="button-simpan" type="submit">Simpan</button>
            <button id="button-batal" type="button">Batal</button>
         </form>
      </div>
      `;
   }
   #statEditBook(){
      this.#popupContainer.innerHTML = `
      <div class="popup-add-book" id="popup-add-book">
         <h3>Edit Book</h3>
         <form action="">
            <label for="title-book">Judul</label>
            <input type="text" id="title-book" placeholder="Masukkan judul buku">
            <label for="author">Penulis</label>
            <input type="text" id="author" placeholder="Masukkan penulis buku">
            <label for="year">Tahun Terbit</label>
            <input type="number" id="year" minlength="4" min="0" max="9999" placeholder="Masukkan tahun terbit buku">
            <button id="button-add-book-simpan" class="button-simpan" type="submit">Simpan</button>
            <button id="button-batal" type="button">Batal</button>
         </form>
      </div>
      `;
   }
   #statPopupBook(){
      this.#popupContainer.innerHTML = `
      <div class="popup-confirmation">
         <h3>Confirmasi</h3>
         <div class="content">
            <p>${this.#popupNotif}</p>
         </div>
         <div class="button-confirmation">
            <button id="button-batal" type="button">Batal</button>
            <button id="button-confirmation-yakin" class="button-yakin" type="button">Yakin</button>
         </div>
      </div>
      `;
   }


   #initAddBook(){
      try {
         const newBook = Metod.newBook(this.#titleBook, this.#authorBook, this.#yearBook);
         const massage = Metod.addBook(newBook);
         const alert = new Alert('succesAdd', massage);
         alert.launch();
      } catch (error) {
         if (error instanceof Error) {
				const errorAlert = error.message;
            alert(errorAlert);
			}
      }
   }

   #initEditbook(){
      try {
         const indexBook = RenderBook.findIndexBook(this.#idBook);
         const callback = Metod.spliceIndex(indexBook, this.#titleBook, this.#authorBook, this.#yearBook);
         if(callback){
            const alert = new Alert('succesAdd', "Berhasil update book");
            alert.launch();
            RenderBook.filterItem(callback);
         }else{
            throw Error(`gagal edit book cek again!!`);
         }
      } catch (error) {
         if (error instanceof Error) {
				const errorAlert = error.message;
            alert(errorAlert);
			}
      }
   }
}

export default EventMetod;