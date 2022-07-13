import Metod from './Metod.mjs';
import BookList from './BookList.mjs';

class RenderBook{
   static get getIdSelector(){
      return document.querySelector('[name=shelf-selector]:checked')?.id;
   }

   static filterItem(){
      const allBookType = (() => {
         switch(this.getIdSelector){
            case 'unfinished-read':
               return Metod.filterUnfinished(Metod.getAll());
            case 'finished-read':
               return Metod.filterFinished(Metod.getAll());
         }
      })();
      if(allBookType.length <= 0){
         const books = new BookList(allBookType);
         books.render();
      }else{
         const books = new BookList(allBookType);
         books.render();
      }
   }

   static searchFilter(valueSearch){
      const allBooktype = (() => {
         switch(this.getIdSelector){
            case 'unfinished-read':
               return Metod.filterUnfinished(Metod.getAll());
            case 'finished-read':
               return Metod.filterFinished(Metod.getAll());
         }
      })();
      let bookSearch = allBooktype.filter(book => {
         return book.title.match(new RegExp(valueSearch,'gi'));
      });
      if(bookSearch.length <= 0){
         const books = new BookList(bookSearch);
         books.render();
      }else{
         const books = new BookList(bookSearch);
         books.render();
      }
   }
   static findIndexBook(idBook){
      const allBooktype = Metod.getAll();

      const data = allBooktype.findIndex(book => book.id === idBook);
      if(data >= 0){
         return data;
      }else{
         throw Error('Data book id tidak ditemukan');
      }
   }

   static findTitleBook(idBook){
      const allBook = Metod.getAll();
      const book = allBook.filter(book => book.id === idBook);
      return book[0].title;
   }
}

export default RenderBook