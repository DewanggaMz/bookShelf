class Metod {
	static getAll() {
		const currentBooks = localStorage.getItem("books");
		return currentBooks == null ? [] : JSON.parse(currentBooks);
	}

	static newBook(title, author, year) {
		const newBook = {
			title: title.value,
			author: author.value,
			year: year.value,
			id: +new Date(),
			isComplete: false,
		};
		return newBook;
	}

	static addBook(newBook) {
		const currentBooks = this.getAll();
		if (
			currentBooks.findIndex(
				(currentBook) =>
					currentBook.author === newBook.author &&
					currentBook.title === newBook.title &&
					currentBook.year === newBook.year
			) !== -1
		) {
			throw Error(`Buku ${newBook.title} sudah ada pada list anda`);
		} else {
			localStorage.setItem("books", JSON.stringify([...currentBooks, newBook]));
			return `Berhasil menambahkan buku`;
		}
	}

	static spliceIndex(indexBook, title, author, year) {
		const currenAllData = this.getAll();
		currenAllData[indexBook].title = title.value;
		currenAllData[indexBook].author = author.value;
		currenAllData[indexBook].year = year.value;

		localStorage.setItem("books", JSON.stringify(currenAllData));
		const lastAllData = this.getAll();
		return lastAllData;
	}

	static deleteBook(indexBook) {
		const currenAllData = this.getAll();
		currenAllData.splice(indexBook, 1);
		localStorage.setItem("books", JSON.stringify(currenAllData));
		const lastAllData = this.getAll();
		return lastAllData;
	}

	static chekBook(indexBook) {
		const currenAllData = this.getAll();
		if (currenAllData[indexBook].isComplete == false) {
			currenAllData[indexBook].isComplete = true;
		} else {
			currenAllData[indexBook].isComplete = false;
		}
		localStorage.setItem("books", JSON.stringify(currenAllData));
		const lastAllData = this.getAll();
		return lastAllData;
	}

	static filterUnfinished(books) {
		return books.filter((book) => book.isComplete === false);
	}
	static filterFinished(books) {
		return books.filter((book) => book.isComplete === true);
	}
}

export default Metod;
