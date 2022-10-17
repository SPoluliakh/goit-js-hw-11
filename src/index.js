import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs.js';
import addMurkup from './js/add_murcup.js';
import Fetch from './js/fech_info.js';

const fetchInfo = new Fetch();
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');
const { formEl, inputEl, btnEl, murkupEl } = refs;

formEl.addEventListener('submit', onFormEl);
btnEl.addEventListener('click', onBtnEl);
inputEl.addEventListener('input', evt => {
  fetchInfo.searchedData = evt.target.value;
});

async function onFormEl(evt) {
  evt.preventDefault();
  CleanMurkup();

  try {
    const data = await fetchInfo.fetchInfo(fetchInfo.searchedData);

    if (!data.data.hits.length) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
    btnEl.classList.remove('is-hidden');
    if (data.data.totalHits <= 40) {
      btnEl.classList.add('is-hidden');
    }

    fetchInfo.pageDicriment();
    addMurkup(murkupEl, data.data.hits);
    const { height: cardHeight } = document
      .querySelector('.gallery a')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1,
      behavior: 'smooth',
    });
    gallerySimpleLightbox.refresh();
  } catch (err) {
    console.log(err.message);
  }
}

async function onBtnEl() {
  try {
    const data = await fetchInfo.fetchInfo(fetchInfo.searchedData);
    btnEl.classList.remove('is-hidden');
    fetchInfo.pageDicriment();
    addMurkup(murkupEl, data.data.hits);
    const { height: cardHeight } = document
      .querySelector('.gallery a')
      .firstElementChild.getBoundingClientRect();
    if (fetchInfo.page + 1 === Math.ceil(data.data.totalHits / 40)) {
      btnEl.classList.add('is-hidden');
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    window.scrollBy({
      top: cardHeight * 1,
      behavior: 'smooth',
    });
    gallerySimpleLightbox.refresh();
  } catch (err) {
    console.log(err);
  }
}

function CleanMurkup() {
  murkupEl.innerHTML = '';
  fetchInfo.pageToStartPosition();
  btnEl.classList.add('is-hidden');
}
