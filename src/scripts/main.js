// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import fetchAlbum from './imgur';
import Album from './album';

const headerEl = document.querySelector('.header');
const album = new Album(document.querySelector('.album-grid'));

const main = async () => {
  const imgurAlbum = await fetchAlbum('mILeSP9');
  const { title, images } = imgurAlbum.data;
  headerEl.innerHTML = title;
  document.title = title;

  images.reverse().forEach(async image => album.addImage(image));
};

main();
