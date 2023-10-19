import { delegateHandler } from '../general/General';
import EventEmitter from '../eventEmitter/EventEmitter';
import tippy from 'tippy.js';
import $floorList from '../templates/floorPage/$floorList';
import { $slideFloorListWrapper, $sliderFloorList } from '../templates/floorPage/$sliderFloorList';
import Swiper from 'swiper';

class FloorView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;
    this.i18n = this._model.i18n;

    model.wrapper.addEventListener('click', event => {
      event.preventDefault();
      const polygon = delegateHandler('.s3d-flat__polygon', event);
      const floorBtn = delegateHandler('[data-floor_btn]', event);
      const floorSingleButton = delegateHandler('button[data-type="floor"]', event);
      switch (true) {
        case _.isObject(floorSingleButton):
          this.emit('changeFloorHandlerByDirectClick', floorSingleButton);
          break;
        case _.isObject(polygon):
          this.emit('clickFloorHandler', polygon);
          break;
        case _.isObject(floorBtn):
          this.emit('changeFloorHandler', floorBtn);
          break;
        default:
          break;
      }
    });

    model.wrapper.addEventListener('mouseout', event => {
      const elem = delegateHandler('.s3d-flat__polygon', event);
      if (!elem) return;
      this.emit('updateHoverDataFlat');
    });

    model.wrapper.addEventListener('mouseover', event => {
      const elem = delegateHandler('.s3d-flat__polygon', event);
      const sold = !(elem?.dataset['sold'] === 'false');
      if (sold) return;
      this.emit('updateHoverDataFlat', elem);
    });

    model.on('setFloor', html => { this.setFloor(html); });
    model.on('setFloorSvg', html => { this.setFloorSvg(html); });
    model.on('removeFloorSvg', () => { this.removeFloorSvg(); });
    model.on('removeElement', tag => { this.removeElement(tag); });
    model.on('changeClassShow', elem => { this.changeClassShow(elem); });
    model.on('updateImg', data => { this.setNewImage(data); });
    model.on('clearDataFlats', () => { this.clearHoverFlats(); });
    model.on('updateHoverDataFlat', html => { this.updateHoverDataFlat(html); });
    model.on('renderFloorChangeButtons', data => { this.renderFloorChangeButtons(data); });
    model.on('renderCurrentFloor', data => { this.renderCurrentFloor(data); });
    model.on('renderFloorList', data => { this.renderFloorList(data); });
    model.on('flatRoomsFilter', data => { this.flatRoomsFilter(data); });
  }

  flatRoomsFilter({data}) {
    const list = document.querySelectorAll('.s3d-floor.js-s3d-floor .s3d-flat__polygon.js-s3d-flat__polygon ');
    const btn = document.querySelectorAll('[data-rooms]');
    btn.forEach(el => el.addEventListener('click', (event) => {
      if (event.target.tagName != 'BUTTON') return false;
      const target = event.target.dataset.rooms;
      btn.forEach(button => {
        button.classList.remove('active');
      });
      el.classList.add('active');
      list.forEach((elem) => {
        elem.classList.add('not-active');
        if (elem.classList.contains(target) || target == 'all') {
          elem.classList.remove('not-active');
        }
      });
    }));
  }

  renderFloorList({ data, active }) {
    this._model.wrapper.querySelector('.s3d-floor__nav [data-swiper-floor-list-wrapper]').innerHTML = $slideFloorListWrapper();
    this._model.wrapper.querySelector('[data-swiper-floor-list] .swiper-wrapper').innerHTML = $sliderFloorList(data, active);
    this._model.wrapper.querySelector('.s3d-floor__nav [data-floor_direction="next"]').insertAdjacentHTML('beforeend', $floorList(data, active, this.i18n));
    this._model.wrapper.querySelector('.s3d-floor__nav [data-floor_direction="prev"]').insertAdjacentHTML('beforeend', $floorList(data, active, this.i18n));

    if (!this.sliderFloorList) {
      this.sliderFloorList = new Swiper('[data-swiper-floor-list]', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        centeredSlides: true,
        initialSlide: data.findIndex(el => el.floor == active),
      })
      return;
    }

    if (this.sliderFloorList) {
      this.sliderFloorList.destroy(true);
      this.sliderFloorList = new Swiper('[data-swiper-floor-list]', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        centeredSlides: true,
        initialSlide: data.findIndex(el => el.floor == active),
      })
      return;
    }
  }

  setFloor(content) {
    this._model.wrapper.innerHTML = content;
  }

  setFloorSvg(content) {
    const node = document.querySelector('.js-s3d-floor');
    node.insertAdjacentHTML('afterbegin', content);
  }

  removeFloorSvg() {
    this.removeElement('.s3d-floor__svg');
  }

  removeElement(tag) {
    const element = document.querySelector(tag);
    if (element) element.remove();
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
      el.disabled = data.prev === null;
    });
    document.querySelectorAll('[data-floor_direction="next"]').forEach(el => {
      el.disabled = data.next === null;
    });;
  }

  setNewImage(url) {
    const imgContainer = document.querySelector('.js-s3d-flat__image');
    imgContainer.setAttribute('src', defaultProjectPath + url);
    imgContainer.setAttribute('data-mfpSrc', defaultProjectPath + url);
  }

  updateHoverDataFlat(html) {
    if (document.documentElement.clientWidth > 1024) {
      if (this.tippy && this.tippy.destroy) this.tippy.destroy();
      this.tippy = tippy('[data-tippy-element]', {
        arrow: false,
        trigger: 'mouseenter',
        placement: 'right',
        delay: 300,
        content: elem => {
          const container = document.createElement('div');
          container.classList = 's3d-floor__miniInfo';
          container.innerHTML = `<div class="s3d-infoBox__flat">
            <div class="s3d-infoBox__image">
              <img onerror="this.onerror=null; this.setAttribute('src', '${defaultModulePath}/images/examples/no-image.png')" src="${elem.dataset.img}"/>
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

  clearHoverFlats() {
  }
}

export default FloorView;
