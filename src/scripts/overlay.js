export default class Overlay {
  constructor(element) {
    this.visible = false;

    if (!element) {
      const overlayEl = document.createElement('div');
      overlayEl.classList.add('overlay');
      document.body.appendChild(overlayEl);
      this.element = overlayEl;
    } else {
      this.element = element;
    }

    document.addEventListener('keyup', (event) => {
      if ('key' in event && event.key === 'Escape') {
        this.hide();
      }
    });
  }

  show() {
    if (!this.visible) {
      this.element.style.visibility = 'visible';
      this.element.style.opacity = '1';
    }

    this.visible = true;
  }

  hide() {
    if (this.visible) {
      this.element.style.visibility = 'hidden';
      this.element.style.opacity = '0';
    }

    this.visible = false;
  }

  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }
}
