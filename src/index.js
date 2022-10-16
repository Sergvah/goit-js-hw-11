'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { UnsplashAPI } from './UnsplashAPI';

const unsplash = new UnsplashAPI();

const photoGallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadmoreBtn = document.querySelector('.load-more');

const onSearchForm = async event => {
  //Чтобы не перезагружалась страница
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  //   console.log(searchQuery);
  const searchQueryData = searchQuery.value.trim().toLowerCase();
  if (!searchQueryData) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  unsplash.searchQuery = searchQueryData;
  clearPage();

  try {
    const { hits, total } = await unsplash.getPhotos();
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const dataOfPhotos = hits
      .map(photo => {
        return `<div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" class="img-gallery" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b class="b-item">Likes</b> ${photo.likes}
    </p>
    <p class="info-item">
      <b class="b-item">Views</b> ${photo.views}
    </p>
    <p class="info-item">
      <b class="b-item">Comments</b> ${photo.comments}
    </p>
    <p class="info-item">
      <b class="b-item">Downloads</b> ${photo.downloads}
    </p>
  </div>
</div>`;
      })
      .join('');
    photoGallery.insertAdjacentHTML('beforeend', dataOfPhotos);
    unsplash.calculateTotalPages(total);
    Notify.success(`Hooray! We found ${total} images.`);
    console.log(unsplash);
    if (unsplash.isShowLoadMore) {
      loadmoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    Notify.failure(error.message, 'ERROR');
    clearPage();
  }
};
const onLoadMore = async () => {
  unsplash.incrementPage();
  try {
    const { hits } = await unsplash.getPhotos();
    if (!unsplash.isShowLoadMore) {
      loadmoreBtn.classList.add('is-hidden');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
    const dataOfPhotos = hits
      .map(photo => {
        return `<div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" class="img-gallery" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b class="b-item">Likes ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b class="b-item">Views ${photo.views}</b>
    </p>
    <p class="info-item">
      <b class="b-item">Comments ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b class="b-item">Downloads ${photo.downloads}</b>
    </p>
  </div>
</div>`;
      })
      .join('');
    photoGallery.insertAdjacentHTML('beforeend', dataOfPhotos);
  } catch (error) {
    Notify.failure(error.message, 'ERROR');
    clearPage();
  }
};

function clearPage() {
  unsplash.resetPage();
  photoGallery.innerHTML = '';
  loadmoreBtn.classList.add('is-hidden');
}
loadmoreBtn.addEventListener('click', onLoadMore);
searchForm.addEventListener('submit', onSearchForm);

// function filteredList(allPhotos) {
//   const filter = searchForm.value;
//   console.log(searchForm.value);
//   //Фильтрация по имени страны
//   const filteredName = allPhotos.filter(photo =>
//     photo.tags.toLowerCase().includes(filter)
//   );
//   return filteredName;
// }
