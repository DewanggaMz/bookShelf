import RenderBook from "./RenderBook.mjs";

class Search {
	static valueSearch = document.getElementById("search");
	static buttonSearch = document.getElementById("submit-search");

	static inputChangeEvent() {
		this.valueSearch?.addEventListener("input", () =>
			RenderBook.searchFilter(this.valueSearch.value)
		);
	}
}

export default Search;
