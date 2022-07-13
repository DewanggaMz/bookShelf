import EventMetod from './components/Event.mjs';
import RenderBook from './components/RenderBook.mjs';
import Search from './components/Search.mjs';

window.addEventListener('DOMContentLoaded', () => {
   RenderBook.filterItem();
   Search.inputChangeEvent();


   const Selectors = document.querySelectorAll('[name=shelf-selector]');
   for (const Selector of Selectors) {
      Selector.addEventListener('change', () =>   RenderBook.filterItem());
   }

   const buttonAddBook = document.getElementById('button-add-book');
   buttonAddBook.addEventListener('click',() => {
   const addbook = new EventMetod('AddBook');
   addbook.launch();
   });
});


















   // #initAddBook(){
   //    this.#bookContainer.innerHTML += `
   //    <div class="book">
   //             <h2>Harray potter</h2>
   //             <p>Penulis : Dewangga</p>
   //             <p>Tahun : 2022</p>
   //             <div class="button-card">
   //                <button class="button-edit" id="button-edit"><abbr title="Edit Buku"><i class="fa-solid fa-pen-to-square"></i></abbr></button>
   //                <button class="button-delete" id="button-delete"><abbr title="Hapus Buku"><i class="fa-solid fa-trash-can"></i></abbr></button>
   //                <button class="button-chek" id="button-chek"><abbr title="Selesai Membaca Buku"><i class="fa-solid fa-circle-check"></i></abbr></button>
   //             </div>        
   //          </div>
   //    `
   // }
