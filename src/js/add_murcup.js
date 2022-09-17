import createMurkup from './creat_murkup';

export default function addMurkup(div, elements) {
  const murkup = createMurkup(elements);
  div.insertAdjacentHTML('beforeend', murkup);
}
