function calculateThumbnailRatio(srcWidth, srcHeight) {
  const ratio = Math.min(640 / srcWidth, 640 / srcHeight);
  return [srcWidth * ratio, srcHeight * ratio];
}

function createWrapperElement(data) {
  const imageWrapperEl = document.createElement('a');
  imageWrapperEl.classList.add('image-wrapper', 'ghost');
  imageWrapperEl.href = data.link;

  if (data.title) {
    imageWrapperEl.title = data.title;
  }

  const [thumbWidth, thumbHeight] = calculateThumbnailRatio(data.width, data.height);
  imageWrapperEl.style.minWidth = `${thumbWidth}px`;
  imageWrapperEl.style.minHeight = `${thumbHeight}px`;

  return imageWrapperEl;
}

function createSpinner() {
  const spinnerEl = document.createElement('div');
  spinnerEl.classList.add('spinner');
  return spinnerEl;
}

async function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);

    image.src = src;
  });
}

export default class ImageEntry {
  /**
   * @param data The Image data.
   * @param data.title The title of the image.
   * @param data.link The image anchor.
   * @param data.width The original image width.
   * @param data.height The original image height.
   */
  constructor(data) {
    this.data = data;
    this.element = createWrapperElement(this.data);
  }

  get thumbnailSrc() {
    return `https://i.imgur.com/${this.data.id}l.png`;
  }

  async loadThumbnail() {
    const spinnerEl = createSpinner();
    this.element.appendChild(spinnerEl);

    const image = await loadImage(this.thumbnailSrc);

    this.element.removeChild(spinnerEl);
    this.element.appendChild(image);
    this.element.classList.remove('ghost');
  }
}
