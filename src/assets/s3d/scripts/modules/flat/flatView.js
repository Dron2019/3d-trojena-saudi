import tippy from 'tippy.js';
import EventEmitter from '../eventEmitter/EventEmitter';
import { delegateHandler } from '../general/General';
import dispatchTrigger from '../helpers/triggers';
import FlatGalleryPopup from '../templates/flatPage/flatGalleryPopup';

class FlatView extends EventEmitter {
  constructor(model, elements, i18n) {
    super();
    this._model = model;
    this._elements = elements;
    this.i18n = i18n;

    this.mappingClickEvents = {
      polygon: elem => this.emit('clickFlatHandler', elem),
      floorBtn: elem => this.emit('changeFloorHandler', elem),
      toFloorBtn: elem => {
        dispatchTrigger('visit-floor-page-from-flat-page', {
          href: window.location.href,

        })
        this.emit('toFloorPlan', elem)
      },
      pdf: elem => this.emit('clickPdfHandler', elem),
      show3d: elem => this.emit('look3d', elem),
      radioView: elem => {
        if (elem.localName !== 'input') return;
        this.emit('changeRadioChecked', elem);
      },
      galleryPopup: elem => {
        console.log('fwefwfwf');
        new FlatGalleryPopup(elem.dataset.href).render();
      },
      showFlatInFlyby: elem => {
        this.emit('showFlatInFlyby', elem);
      }
    };

    model.wrapper.addEventListener('click', event => {
      // event.preventDefault();
      const delegateElements = {
        polygon: delegateHandler('.js-s3d-flat__polygon', event),
        floorBtn: delegateHandler('[data-floor_btn]', event),
        toFloorBtn: delegateHandler('#s3d-to-floor', event),
        pdf: delegateHandler('.js-s3d__create-pdf', event),
        show3d: delegateHandler('#js-s3d__show-3d', event),
        radioView: delegateHandler('.js-s3d__radio-view-change', event),
        galleryPopup: delegateHandler('[data-gallery-popup-call]', event),
        showFlatInFlyby: delegateHandler('[data-show-flat-in-flyby]', event),
      };

      const entries = Object.entries(delegateElements);
      entries.map(([key, value]) => _.isObject(value) && this.mappingClickEvents[key](value));
    });

    model.wrapper.addEventListener('click', elem => {
      const target = delegateHandler('.js-s3d__radio-type', elem);
      if (!_.isObject(target)) return;
      this.emit('changeRadioType', target);
    });

    model.wrapper.addEventListener('click', elem => {
      const target = delegateHandler('.js-s3d__radio-view', elem);
      if (!_.isObject(target)) return;
      this.emit('changeRadioView', target);
    });
    model.wrapper.addEventListener('click', elem => {
      const target = delegateHandler('[data-flat-image]', elem);
      if (!_.isObject(target)) return;
      this.emit('changeFlatImage', target);
    });

    model.on('setFlat', html => { this.setFlat(html); });
    model.on('setFloor', html => { this.setFloor(html); });
    model.on('removeFloorSvg', () => { this.removeFloorSvg(); });
    model.on('removeElement', tag => { this.removeElement(tag); });
    model.on('changeClassShow', elem => { this.changeClassShow(elem); });
    model.on('updateImg', data => { this.setNewImage(data); });
    model.on('createRadioElement', data => { this.createRadio(data); });
    model.on('createRadioSvg', data => { this.createRadioSvg(data); });
    model.on('clearRadioElement', wrap => { this.clearRadio(wrap); });
    model.on('updateActiveFlatInFloor', id => { this.updateActiveFlatInFloor(id); });
    model.on('updateFlatIdChoose', id => { this.updateFlatIdChoose(id); });
    model.on('updateActiveFlatImageButton', target => { this.updateActiveFlatImageButton(target); });

    model.on('renderFloorChangeButtons', data => { this.renderFloorChangeButtons(data); });
    model.on('renderCurrentFloor', data => { this.renderCurrentFloor(data); });
    // model.on('settimer', data => {
    //   document.querySelector('.s3d-flat-price-timer').style.display = data ? '' : 'none';
    //   document.querySelector('.js-action-price').style.display = data ? '' : 'none';
    //   document.querySelector('.js-old-price').style.display = data ? '' : 'none';
    //
    //   document.querySelector('.js-price').style.display = data ? 'none' : '';
    //   this.setTimer(data);
    // });
  }

  setTimer(dateOfFinish) {
    const deadline = new Date(dateOfFinish);
    let timerId = null;
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $days.textContent = days < 10 ? '0' + days : days;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);
  }

  setFlat(content) {
    this._model.wrapper.innerHTML = content;
    const points = this._model.wrapper.querySelectorAll('[data-peculiarity-content]');
    if (points.length === 0) return;
    tippy(points, {
      arrow: false,
      trigger: 'mouseenter click',
      placement: 'bottom',
      content: elem => {
        const container = document.createElement('div');
        container.innerHTML = `${elem.dataset.peculiarityContent}`;
        return container;
      },
    });
  }

  renderCurrentFloor(data) {
    const { floor } = data;
    document.querySelectorAll('[data-current-floor]').forEach( el => {
      el.setAttribute('data-value', floor);
      el.innerHTML = floor;
    })
  }

  renderFloorChangeButtons(data) {
    document.querySelectorAll('[data-floor_direction="prev"]').forEach(el => {
      el.disabled = !data.prev;
    });
    document.querySelectorAll('[data-floor_direction="next"]').forEach(el => {
      el.disabled = !data.next;
    });
  }

  updateActiveFlatInFloor(id) {
    const currentActiveFlat = document.querySelector('.js-s3d-flat__polygon.polygon__active-flat');
    if (currentActiveFlat) currentActiveFlat.classList.remove('polygon__active-flat');
    const nextActiveFlat = document.querySelector(`.js-s3d-flat__polygon[data-id="${id}"]`);
    if (nextActiveFlat) nextActiveFlat.classList.add('polygon__active-flat');
  }

  updateFlatIdChoose(id) {
    if (!id) return;
    document.querySelector('.s3d-nav__btn[data-type="flat"]').setAttribute('data-id', id);
  }

  setFloor(html) {
    const node = document.querySelector('.s3d-flat__floor-info');
    node.insertAdjacentHTML('afterbegin', html);
    if (document.documentElement.clientWidth > 1024) {
      tippy('[data-tippy-element]', {
        arrow: false,
        trigger: 'mouseenter',
        placement: 'bottom',
        content: elem => {
          const container = document.createElement('div');
          container.classList = 's3d-floor__miniInfo';
          container.innerHTML = `
          <div class="s3d-infoBox__flat">
            <div class="s3d-infoBox__image">
              <img  onerror="this.onerror=null; this.setAttribute('src', '${defaultModulePath}/images/examples/no-image.png')" src="${elem.dataset.img}"/>
            </div>
            <div class="s3d-infoBox__info">
              <div class="s3d-infoBox__title">
                <span data-s3d-event="update" data-s3d-update="rooms">${this.i18n.t(`rooms.${elem.dataset.rooms}`)}</span>
              </div>
              <table class="s3d-infoBox__table">
                <tbody>
                  <tr class="s3d-infoBox__row">
                    <td class="s3d-infoBox__name">${this.i18n.t('Flat.information.sale')}</td>
                    <td class="s3d-infoBox__value" data-sale="${elem.dataset.sale}">
                      <span data-s3d-event="update" data-s3d-update="sale">${this.i18n.t(`sales.${elem.dataset.sale}`)}</span>
                    </td>
                  </tr>
                  <tr class="s3d-infoBox__row">
                    <td class="s3d-infoBox__name">${this.i18n.t('Flat.information.floor')}</td>
                    <td class="s3d-infoBox__value">
                      <span data-s3d-event="update" data-s3d-update="floor">${elem.dataset.floor}</span>
                    </td>
                  </tr>
                  <tr class="s3d-infoBox__row">
                    <td class="s3d-infoBox__name">${this.i18n.t('Flat.information.area')}</td>
                    <td class="s3d-infoBox__value">
                      <span data-s3d-event="update" data-s3d-update="area">${elem.dataset.area} ${this.i18n.t('Flat.information.area_unit')}</span>
                    </td>
                  </tr>
                  <tr class="s3d-infoBox__row">
                    <td class="s3d-infoBox__name">${this.i18n.t('Flat.information.type')}</td>
                    <td class="s3d-infoBox__value">
                      <span data-s3d-event="update" data-s3d-update="rooms">${this.i18n.t(`rooms-abbreviation.${elem.dataset.rooms}`)} ${elem.dataset.type}</span>
                    </td>
                  </tr>
                  <tr class="s3d-infoBox__row">
                    <td class="s3d-infoBox__name">${this.i18n.t('Flat.information.number')}</td>
                    <td class="s3d-infoBox__value">
                      <span data-s3d-event="update" data-s3d-update="number">${elem.dataset.number}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`;
          return container;
        },
      });
    }
  }

  changeClassShow(config) {
    const { element, flag } = config;
    const container = document.querySelector(element);
    if (!_.isObjectLike(container)) return;
    const method = flag ? 'add' : 'remove';
    container.classList[method]('show');
  }

  removeFloorSvg() {
    this.removeElement('.s3d-floor__svg');
  }

  removeElement(tag) {
    const element = document.querySelector(tag);
    if (element) element.remove();
  }

  createRadio(data) {
    const {
      wrap, type, name,
    } = data;
    document.querySelector(wrap).insertAdjacentHTML('beforeend', `<label class="s3d-flat__button js-s3d__radio-${name}" data-type=${type} >
      <input type="radio" name=${name} class="s3d-flat__button-input" value=${type} />
    <span>${this.i18n.t(`Flat.buttons.${type}`)}</span></label>`);
  }

  createRadioSvg(wrap) {
    document.querySelector(wrap).insertAdjacentHTML('beforeend', `<div class="s3d-flat__buttons-bg js-s3d__btn-tab-svg"><svg width="50" height="36" viewBox="0 0 50 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="36" rx="0"/></svg></div>`);
  }

  clearRadio(wrap) {
    document.querySelector(wrap).innerHTML = '';
  }

  setNewImage(imgPath) {
    const imgContainer = document.querySelector('.js-s3d-flat__image');
    const url = imgPath.match(/http/) ? imgPath : `${defaultProjectPath}${imgPath}`;
    imgContainer.setAttribute('src', url);
    imgContainer.setAttribute('data-mfp-src', url);
  }
  updateActiveFlatImageButton(target) {
    this._model.wrapper.querySelectorAll('[data-flat-image]').forEach(button => {
      if (button === target) return button.classList.add('active');
      return button.classList.remove('active');
    })
  }
}

export default FlatView;
