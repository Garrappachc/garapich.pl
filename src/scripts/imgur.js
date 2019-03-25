const ImgurEndpoint = 'https://api.imgur.com/3';
const ImgurClientId = '77f74666e292304';

const ImgurOptions = {
  headers: {
    Authorization: `Client-ID ${ImgurClientId}`,
  },
};

export default async function fetchAlbum(albumId) {
  const response = await fetch(`${ImgurEndpoint}/album/${albumId}`, ImgurOptions);
  return response.json();
}
