const albumEl = document.querySelector('.album-grid');

const imgurThumbnailOptions = {
  suffix: 'l',
  width: 640,
  height: 640,
};

const createSpinner = () => {
  const spinnerEl = document.createElement('div');
  spinnerEl.classList.add('spinner');
  return spinnerEl;
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);

      setTimeout(async () => {
        const spinnerEl = createSpinner();
        entry.target.appendChild(spinnerEl);

        const thumbnailSrc = entry.target.dataset.thumbnailSrc;
        const image = await loadImage(thumbnailSrc);

        entry.target.removeChild(spinnerEl);
        entry.target.appendChild(image);
      }, 0);
    }
  });
});

function calculateThumbnailRatio(srcWidth, srcHeight) {
  const ratio = Math.min(imgurThumbnailOptions.width / srcWidth, imgurThumbnailOptions.height / srcHeight);
  return [ srcWidth * ratio, srcHeight * ratio ];
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };

    image.src = src;
  });
}

export async function appendImage(imageData) {
  const imageWrapperEl = document.createElement('div');
  imageWrapperEl.classList.add('image-wrapper');

  const [ thumbWidth, thumbHeight ] = calculateThumbnailRatio(imageData.width, imageData.height);
  imageWrapperEl.style.minWidth = `${thumbWidth}px`;
  imageWrapperEl.style.minHeight = `${thumbHeight}px`;

  const thumbnailSrc = `https://i.imgur.com/${imageData.id}${imgurThumbnailOptions.suffix}.png`;
  imageWrapperEl.dataset.thumbnailSrc = thumbnailSrc;

  const overlayEl = document.createElement('div');
  overlayEl.classList.add('overlay');

  if (imageData.description) {
    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add('description');
    descriptionEl.innerText = imageData.description;
    overlayEl.appendChild(descriptionEl);
  }
  imageWrapperEl.appendChild(overlayEl);

  albumEl.appendChild(imageWrapperEl);
  observer.observe(imageWrapperEl);
}

