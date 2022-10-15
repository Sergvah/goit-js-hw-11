export class UnsplashAPI {
  //   API_KEY = '30566822-5dd8c7f8088312f63e039c329';
  #page = 1;
  #searchQuery = '';
  #totalPages = 0;
  #perPage = 40;
  getPhotos() {
    URL = `https://pixabay.com/api/?key=30566822-5dd8c7f8088312f63e039c329`;

    return fetch(
      `${URL}&q=${
        this.#searchQuery
      }&image_type=photo&orientation=horizontal&safesearch=true&per_page=${
        this.#perPage
      }&page=${this.#page}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  set searchQuery(newQuery) {
    this.#searchQuery = newQuery;
  }
  get searchQuery() {
    return this.#searchQuery;
  }

  incrementPage() {
    this.#page += 1;
  }
  resetPage() {
    this.#page = 1;
  }
  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }
  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
