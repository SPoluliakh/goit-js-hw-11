export default function createMurkup(elements) {
  const murkup = elements
    .map(element => {
      return `
<div class="photo-card">
  <a href="${element.largeImageURL}"
    ><img
      class="photo"
      src="${element.webformatURL}"
      alt="${element.tags}"
      title="${element.tags}"
      loading="lazy"
  /></a>

  <div class="info">
    <p class="info-item"><b>Likes</b><span> ${element.likes
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span></p>
    <p class="info-item"><b>Views</b><span> ${element.views
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span></p>
    <p class="info-item"><b>Comments</b><span> ${element.comments
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span></p>
    <p class="info-item"><b>Downloads</b><span> ${element.downloads
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span></p>
  </div>
</div>
`;
    })
    .join('');
  return murkup;
}
