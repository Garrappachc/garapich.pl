import 'babel-polyfill';
import { fetchAlbum } from './imgur';
import { appendImage } from './album';

const headerEl = document.querySelector('.header');

const main = async () => {
  const album = await fetchAlbum('mILeSP9');
  const title = album.data.title;
  headerEl.innerHTML = title;
  document.title = title;

  const images = album.data.images;

  for (const image of images.reverse()) {
    await appendImage(image);
  }
};

main();

