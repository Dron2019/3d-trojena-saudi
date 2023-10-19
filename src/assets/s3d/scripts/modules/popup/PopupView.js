import EventEmitter from '../eventEmitter/EventEmitter';

export default class Popup extends EventEmitter {
  constructor(href) {
    super();
    this.href = href;
    this.containerClassName = 'vr-popup';
  }

  render() {
    const layout = `
      <div class="${this.containerClassName}">
        <div class="${this.containerClassName}__content">
          <iframe src="${this.href}" allowfullscreen="true"></iframe>
        </div>
        <svg class="vr-popup__close" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30" fill="white"/>
          <path d="M37.826 37.826L22.1738 22.1738M22.1738 37.826L37.826 22.1738L22.1738 37.826Z" stroke="#555568"/>
        </svg>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', layout);
    document.querySelector(`.${this.containerClassName} .${this.containerClassName}__close`)
      .addEventListener('click', () => {
        document.querySelector(`.${this.containerClassName}`).remove();
      }, { once: true });
  }
}