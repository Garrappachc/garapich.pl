// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import fetchAlbum from './imgur';
import appendImage from './album';

const headerEl = document.querySelector('.header');

const main = async () => {
  const album = await fetchAlbum('mILeSP9');
  const { title, images } = album.data;
  headerEl.innerHTML = title;
  document.title = title;

  images.reverse().forEach(async image => appendImage(image));
};

main();
