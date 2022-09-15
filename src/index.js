import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form#search-form'),
  inputEl: document.querySelector('input[type="text"]'),
  btnEl: document.querySelector('button[type="submit"]'),
  murkupEl: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', onFormEl);
let page = 1;

function onFormEl(evt) {
  evt.preventDefault();
  const searchedFoto = refs.formEl.elements.searchQuery.value;

  fetchInfo(searchedFoto)
    .then(data => {
      if (!data.hits.length) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      page += 1;
      console.log(data);
      return addMurkup(refs.murkupEl, data.hits);
    })
    .catch(err => console.log(err));
}

function fetchInfo(element) {
  const API_KEY = `29948734-f0f2c73b982a8559ced5d44b7`;

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: element,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;

  return fetch(url).then(res => {
    if (res.status === 400) {
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    return res.json();
  });
}

function createMurkup(elements) {
  const murkup = elements
    .map(element => {
      return `<div class="photo-card">
  <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${element.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${element.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${element.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${element.downloads}
    </p>
  </div>
</div> `;
    })
    .join('');
  return murkup;
}

function addMurkup(div, elements) {
  div.innerHTML = createMurkup(elements);
}
