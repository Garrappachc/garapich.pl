import ImageEntry from './image-entry';

export default class Album {
  constructor(element) {
    this.element = element;
    this.images = [];

    this.observer = new IntersectionObserver((entries) => {
      entries
        .filter(entry => entry.intersectionRatio > 0)
        .forEach((entry) => {
          this.observer.unobserve(entry.target);
          const { imageId } = entry.target.dataset;

          setTimeout(async () => {
            const image = this.images[imageId];
            await image.loadThumbnail();
          }, 0);
        });
    });
  }

  addImage(data) {
    const image = new ImageEntry(data);
    const id = this.images.push(image) - 1;
    image.element.dataset.imageId = id;
    this.observer.observe(image.element);
    this.element.appendChild(image.element);
  }
}
