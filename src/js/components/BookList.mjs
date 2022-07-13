import Event from './Event.mjs';
import RenderBook from './RenderBook.mjs';

class BookList {
	#containerBook;
   #book;
	constructor(book) {
		this.#book = book;
		this.#containerBook = document.getElementById("book-container");
	}

	render() {
		if (this.#containerBook) {
			if (this.#book.length > 0) {
				this.#containerBook.classList.remove("hidden");
            let listBook = this.#book.map(book => {
               return `
               <div class="book" book-id="${book.id}" id="book-list">
               <h2>${book.title}</h2>
               <p>Penulis : ${book.author}</p>
               <p>Tahun : ${book.year}</p>
               <div class="button-card">
                  <button class="button-edit" id="button-edit"><abbr title="Edit Buku"><i class="fa-solid fa-pen-to-square"></i></abbr></button>
                  <button class="button-delete" id="button-delete"><abbr title="Hapus Buku"><i class="fa-solid fa-trash-can"></i></abbr></button>
                  <button class="button-chek" id="button-chek"><abbr title="Pindahkan buku"><i class="fa-solid fa-circle-check"></i></abbr></button>
               </div>        
            </div>`
            }).join('');
            this.#containerBook.innerHTML = listBook;
            this.#ActionEvent();
			}else{
            this.#containerBook.classList.remove("hidden");
            this.#containerBook.innerHTML = `
            <p class="message">Tidak ada buku</p>
            ` ;
         }
		}
	}


   #ActionEvent(){
      const books = document.querySelectorAll('#book-list');
      if(books){
         for(const book of books){
            const bookId = Number(book.getAttribute('book-id'));
            const buttonEdit = book.querySelector('#button-edit');
            const buttonDelete = book.querySelector('#button-delete');
            const buttonChek = book.querySelector('#button-chek');

            buttonEdit.addEventListener('click', () =>{
               const editBook = new Event('EditBook',bookId);
               editBook.launch();
            });

            buttonDelete.addEventListener('click',() =>{
               const title = RenderBook.findTitleBook(bookId);
               const notif = `Apakah anda yakin ingin menghapus buku ${title} dari list?`;
               const deleteBook = new Event('DeleteBook',bookId,notif);
               deleteBook.launchDelete();
            });

            buttonChek.addEventListener('click', () =>{
               const title = RenderBook.findTitleBook(bookId);
               const notif = `Apakah anda yakin ingin memindahkan buku ${title} kedalam list sudah di baca?`;
               const chekBook = new Event('ChekBook',bookId,notif);
               chekBook.launchChek();
            })
         }
      }
   }
}

export default BookList;
