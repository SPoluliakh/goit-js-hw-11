import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/refs.js';
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

function onFormEl(evt) {
  evt.preventDefault();
  CleanMurkup();
  fetchInfo.fetchInfo(fetchInfo.searchedData).then(data => {
    if (!data.data.hits.length) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
    btnEl.classList.remove('is-hidden');

    fetchInfo.pageDicriment();
    addMurkup(murkupEl, data.data.hits);
    gallerySimpleLightbox.refresh();
  });
}

function onBtnEl() {
  fetchInfo
    .fetchInfo(fetchInfo.searchedData)
    .then(data => {
      if (!data.data.hits.length) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      btnEl.classList.remove('is-hidden');

      fetchInfo.pageDicriment();

      addMurkup(murkupEl, data.data.hits);
      gallerySimpleLightbox.refresh();
    })
    .catch(err => console.log(err));
}

function CleanMurkup() {
  murkupEl.innerHTML = '';
  fetchInfo.pageToStartPosition();
  btnEl.classList.add('is-hidden');
}
