const albumEl = document.querySelector('.album-grid');

const imgurThumbnailOptions = {
  suffix: 'l',
  width: 640,
  height: 640,
};

function createSpinner() {
  const spinnerEl = document.createElement('div');
  spinnerEl.classList.add('spinner');
  return spinnerEl;
}

async function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };

    image.src = src;
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);

      setTimeout(async () => {
        const spinnerEl = createSpinner();
        entry.target.appendChild(spinnerEl);

        const { thumbnailSrc } = entry.target.dataset;
        const image = await loadImage(thumbnailSrc);

        entry.target.removeChild(spinnerEl);
        entry.target.appendChild(image);
        entry.target.classList.remove('ghost');
      }, 0);
    }
  });
});

function calculateThumbnailRatio(srcWidth, srcHeight) {
  const ratio = Math.min(imgurThumbnailOptions.width / srcWidth,
    imgurThumbnailOptions.height / srcHeight);
  return [srcWidth * ratio, srcHeight * ratio];
}

export default async function appendImage(imageData) {
  const imageWrapperEl = document.createElement('a');
  imageWrapperEl.classList.add('image-wrapper', 'ghost');
  imageWrapperEl.href = imageData.link;

  if (imageData.title) {
    imageWrapperEl.title = imageData.title;
  }

  const [thumbWidth, thumbHeight] = calculateThumbnailRatio(imageData.width, imageData.height);
  imageWrapperEl.style.minWidth = `${thumbWidth}px`;
  imageWrapperEl.style.minHeight = `${thumbHeight}px`;

  const thumbnailSrc = `https://i.imgur.com/${imageData.id}${imgurThumbnailOptions.suffix}.png`;
  imageWrapperEl.dataset.thumbnailSrc = thumbnailSrc;

  albumEl.appendChild(imageWrapperEl);
  observer.observe(imageWrapperEl);
}
