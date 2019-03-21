const ImgurEndpoint = 'https://api.imgur.com/3';
const ImgurClientId = '77f74666e292304';

const ImgurOptions = {
  headers: {
    'Authorization': `Client-ID ${ImgurClientId}`,
  }
};

export function fetchAlbum(albumId) {
  return fetch(`${ImgurEndpoint}/album/${albumId}`, ImgurOptions).then(response => response.json());
}

