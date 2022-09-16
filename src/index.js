import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './js/refs.js';

const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let page = 1;
let searchedData = '';

refs.formEl.addEventListener('submit', onFormEl);
refs.btnEl.addEventListener('click', onBtnEl);

refs.inputEl.addEventListener('input', evt => {
  searchedData = evt.target.value;
});

function onFormEl(evt) {
  evt.preventDefault();
  refs.murkupEl.innerHTML = '';
  refs.btnEl.classList.add('is-hidden');
  fetchInfo(searchedData)
    .then(data => {
      if (!data.hits.length) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      refs.btnEl.classList.remove('is-hidden');
      page += 1;

      addMurkup(refs.murkupEl, data.hits);
      gallerySimpleLightbox.refresh();
    })
    .catch(err => console.log(err));
}

function onBtnEl() {
  fetchInfo(searchedData)
    .then(data => {
      if (!data.hits.length) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      refs.btnEl.classList.remove('is-hidden');
      page += 1;
      console.log(data);
      addMurkup(refs.murkupEl, data.hits);
      gallerySimpleLightbox.refresh();
    })
    .catch(err => console.log(err));
}

function fetchInfo(element) {
  const API_KEY = `29948734-f0f2c73b982a8559ced5d44b7`;

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: ` ${element}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;

  return fetch(url).then(res => {
    if (res.status === 400) {
      refs.btnEl.classList.add('is-hidden');
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else if (res.status === 404) {
      return [];
    }
    return res.json();
  });
}

function createMurkup(elements) {
  console.log(elements, 'images');
  const murkup = elements
    .map(element => {
      console.log(element, 'im');
      return `<div class="photo-card">
  
   <a href="${element.largeImageURL}"><img class="photo" src="${element.webformatURL}" alt="${element.tags}" title="${element.tags}" loading="lazy"/></a>
  
   <div class="info">
    <p class="info-item">
      <b>Likes</b><span> ${element.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span> ${element.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span> ${element.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span> ${element.downloads}</span>
    </p>
    
  </div>
</div>`;
    })
    .join('');

  return murkup;
}

function addMurkup(div, elements) {
  const murkup = createMurkup(elements);
  div.insertAdjacentHTML('beforeend', murkup);
}
