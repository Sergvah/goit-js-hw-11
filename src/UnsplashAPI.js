import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30566822-5dd8c7f8088312f63e039c329';
const params = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40
`;

export class UnsplashAPI {
  //   API_KEY = '30566822-5dd8c7f8088312f63e039c329';
  #page = 1;
  #searchQuery = '';
  #totalPages = 0;
  #perPage = 40;
  async getPhotos() {
    const response = await axios.get(
      `${params}&q=${this.#searchQuery}&page=${this.#page}`
    );
    return response.data;
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
    return this.#page <= this.#totalPages;
  }
}
