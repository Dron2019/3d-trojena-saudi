import $ from 'jquery';
import { has, size } from 'lodash';
import magnificPopup from 'magnific-popup';
import addAnimateBtnTabs from '../animation';
import EventEmitter from '../eventEmitter/EventEmitter';
import { preloader } from '../general/General';
import asyncRequest from '../async/async';
import CreateFlat from '../templates/flatPage/flat';
import createFloorSvg from '../templates/floorSvg';
import getFloor from '../getFloor';
import sendError from '../sendError';
import { htmlZoom } from '../../features/html-zoom';
import { isDesktop } from '../helpers/helpers';

const ErrorCallbackUpdateLocation = (i18n, hostname, keyMessage, type = '', newLocation) => err => {
  sendError(i18n, hostname, keyMessage, type, err);
  errorPopup.setType('withTranslate');
  errorPopup.open(keyMessage, () => {
    location.href = newLocation;
  });
};
const { origin, pathname, search } = location;

class FlatModel extends EventEmitter {
  constructor(config, i18n) {
    super();
    this.type = config.type;
    this.generalWrapId = config.generalWrapId;
    this.activeFlat = config.activeFlat;
    this.hoverData$ = config.hoverData$;
    this.getFavourites = config.getFavourites;
    this.updateFavourites = config.updateFavourites;
    this.getFlat = config.getFlat;
    this.updateFsm = config.updateFsm;
    this.floorList$ = config.floorList$;
    this.i18n = i18n;
    this.history = config.history;
    this.favouritesIds$ = config.favouritesIds$;
    this.createWrap();
    this.wrapper = document.querySelector(`.js-s3d__wrapper__${this.type}`);
    this.imagesType = '';
    this.imagesViewType = '';
    this.configProject = this.createConfigProject();
  }

  showFlatInFlyby(elem) {
    /**Если выбранно отображение этажей переключает на отображение квартир
     * при клике на "посмотреть на 3д модели"
     */
    document.querySelector('[data-choose-type="flat"]').click();
    this.updateFsm({
      ...elem.dataset,
      markedFlat: elem.dataset.flatid
    }, true, {
      controlPoint: elem.dataset.controlPoint,
      flatId: elem.dataset.flatid
    }, () => {
    });
  }

  createConfigProject() {
    const { build, section, floor } = this.getFlat(this.activeFlat);
    return {
      build,
      section,
      floor,
    };
  }

  init(config) {
    this.preloader = preloader;
  }

  createWrap() {
    // все 3 обертки нужны, без них на мобилке пропадает прокрутка и всё ломается
    const wrap1 = createMarkup('div', { class: `s3d__wrap js-s3d__wrapper__${this.type} s3d__wrapper__${this.type}` });// const wrap2 = createMarkup(conf.typeCreateBlock, { id: `js-s3d__${conf.id}` })
    $(this.generalWrapId).append(wrap1);

    console.log('CREATE WRAP', this.wrapper);
    
  }
  
  async update(id) {
    this.activeFlat = id;
    this.setPlaneInPage(this.activeFlat);
    this.emit('settimer', this.getFlat(this.activeFlat)['timer']);
    this.configProject = this.createConfigProject();
    // await this.updateFloor();
    if (this.zoom) {
      this.zoom.destroy();
      this.zoom = null;
    }
    if (isDesktop() &&  !this.zoom) {
      setTimeout(() => {
        const zoom = htmlZoom($('.s3d-flat__image-container'), '.s3d-flat__image', {
          width: document.querySelector('.s3d-flat__image').getBoundingClientRect().width,
          height: document.querySelector('.s3d-flat__image').getBoundingClientRect().height
        });
        this.zoom = zoom;
      }, 1000);
    }
    setTimeout(() => {
      const btn = document.querySelector('.js-s3d__select[data-type="flat"]');
      this.preloader.turnOff(btn);
      this.preloader.hide();
    }, 600);
  }

  async updateFloor() {
    const floorData = await getFloor(this.configProject);

    if (!floorData) {
      ErrorCallbackUpdateLocation(this.i18n, location.hostname, 'Error-popup.messages.not-find-data', 'high', `${origin}${pathname}${search}`)({
        requestData: this.configProject,
        response: floorData,
      });
    }
    if (!floorData.url || !floorData.flatsIds) {
      ErrorCallbackUpdateLocation(this.i18n, location.hostname, 'Error-popup.messages.not-all-required-data-received', 'medium', `${origin}${pathname}${search}`)({
        requestData: this.configProject,
        response: floorData,
      });
    }

    this.setFloorInPage(floorData);
    this.emit('updateActiveFlatInFloor', this.activeFlat);
  }

  preparationFlats(flatsIds) {
    return flatsIds.map(id => this.getFlat(id));
  }

  // вставляем разметку в DOM вешаем эвенты
  setPlaneInPage(flatId) {
    const flat = this.getFlat(+flatId);
    const html = CreateFlat(this.i18n, flat, this.favouritesIds$);

    this.emit('setFlat', html);
    this.checkPlaning();

    // $('.js-s3d-flat__image').magnificPopup({
    //   type: 'image',
    //   showCloseBtn: true,
    // });

    const is3dImageOfFlatAviable = flat.images && Object.keys(flat.images).length > 1;
    const $changeFlatImageView = document.querySelector('.js-s3d-flat__buttons-view');
    $changeFlatImageView.style.display = is3dImageOfFlatAviable
      ? 'flex'
      : 'none';

    addAnimateBtnTabs('.s3d-flat__button', '.js-s3d__btn-tab-svg');
  }

  radioTypeHandler(types) {
    const imgUrlObj = this.getFlat(this.activeFlat).images[types];
    this.imagesType = types;
    this.emit('changeClassShow', { element: '.js-s3d-flat__buttons-view', flag: false });
    const keys = Object.keys(imgUrlObj);
    if (keys.length > 1) {
      this.emit('changeClassShow', { element: '.js-s3d-flat__buttons-view', flag: true });
    }

    const radioView = document.querySelector(`.js-s3d__radio-view[data-type="${keys[0]}"]`);
    const input = radioView.querySelector('input');

    input.checked = true;
    this.radioViewHandler(keys[0]);
  }

  toFloorPlan() {
    const { build, floor, section } = this.getFlat(this.activeFlat);
    this.updateFsm({
      type: 'floor',
      build,
      floor,
      section,
    });
  }

  look3d() {
    this.updateFsm({ type: 'flyby', id: this.activeFlat });
  }

  checkPlaning() {
    this.emit('changeClassShow', { element: '.js-s3d-flat__buttons-view.show', flag: false });
    const flat = this.getFlat(this.activeFlat);
    const imagesCount = size(flat.images);
    if (imagesCount === 0) {
      this.emit('updateImg', '/assets/s3d/images/examples/no-image.png');
      return;
    }
    const keys = Object.keys(flat.images);

    this.imagesType = keys[0];
    this.imagesViewType = Object.keys(flat.images[keys[0]])[0];
    this.emit('clearRadioElement', '.js-s3d-flat__buttons-type');

    if (imagesCount > 1) {
      this.emit('createRadioSvg', '.js-s3d-flat__buttons-type');
      for (const imageKey in flat.images) {
        this.emit('createRadioElement', {
          wrap: '.js-s3d-flat__buttons-type',
          type: imageKey,
          name: 'type',
        });
      }

      const radioBtn = document.querySelector(`.js-s3d__radio-type[data-type=${this.imagesType}] input`);
      radioBtn.checked = true;
    }

    this.radioTypeHandler(this.imagesType);
  }

  radioViewHandler(viewType) {
    this.imagesViewType = viewType;
    const obj = this.getFlat(this.activeFlat).images;
    const image =  document.querySelector('.active[data-flat-image]') ? document.querySelector('.active[data-flat-image]').dataset.flatImage : obj[this.imagesType][viewType];
    const checked = document.querySelector('.js-s3d__radio-view-change input');
    const target = document.querySelector(`.js-s3d__radio-view[data-type="${viewType}"] input`);
    target.checked = true;
    if (viewType === '2d') {
      checked.checked = false;
    } else {
      checked.checked = true;
    }
    this.emit('updateImg', image);
  }

  radioCheckedHandler(value) {
    if (value) {
      document.querySelector('.js-s3d__radio-view[data-type="3d"]').click();
    } else {
      document.querySelector('.js-s3d__radio-view[data-type="2d"]').click();
    }
  }

  setFloorInPage(response) {
    const { url, flatsIds, size: sizeImage } = response;
    const preparedFlats = this.preparationFlats(flatsIds).map(flat => {
      if (!flat) return;
      const flatId = flat.id || undefined;
      if (flatId === undefined) return { ...flat };
      if (!response.cords) return { ...flat };
      return { ...flat, sortedFromServer: response.cords ? response.cords[flat.id] : flat.sorts };
    });
    const floorSvg = createFloorSvg(this.i18n, url, preparedFlats, sizeImage, this.activeFlat);
    this.emit('removeFloorSvg');
    this.emit('setFloor', floorSvg);
    this.emit('updateFlatIdChoose', this.activeFlat);

    this.checkChangeFloor();
  }

  checkChangeFloor() {
    const { build: currentBuild, section: currentSection, floor: currentFloor } = this.configProject;
    const listFloors = this.floorList$.value
        .filter(data => data.build === currentBuild && data.section === currentSection)
        .map(data => window.parseInt(data.floor));

    const index = listFloors.indexOf(currentFloor);
    const changeFloorData = {
      prev: listFloors[index - 1] ?? null,
      next: listFloors[index + 1] ?? null,
    };
    if (index === 0) {
      changeFloorData.prev = null;
    }
    if (index === listFloors.length - 1) {
      changeFloorData.next = null;
    }
    this.changeFloorData = changeFloorData;
    this.emit('renderCurrentFloor', this.configProject);
    this.emit('renderFloorChangeButtons', this.changeFloorData);
  }

  changeFloorHandler(direction) {
    const nextFloor = this.changeFloorData[direction];
    if (!nextFloor) return;

    this.configProject = {
      ...this.configProject,
      floor: nextFloor,
    };

    this.updateFloor();
  }

  getPdfLink() {

    dispatchTrigger('pdf-file-download', {
      url,
      objectId: this.activeFlat,
      href: window.location.href
    })
    asyncRequest({
      url: '/wp-admin/admin-ajax.php',
      method: 'post',
      data: {
        action: 'createPdf',
        id: this.activeFlat,
      },
    })
        .then(resp => resp)
        .then(url => {
          const pdfLink = document.querySelector('.initClickPdf');
          if (pdfLink) {
            pdfLink.remove();
          }
          document.body.insertAdjacentHTML('beforebegin', `<a class="initClickPdf" target="_blank" href="${url}"></a>`);
          document.querySelector('.initClickPdf').click();
        });
  }

  changeFlatImage(target) {
    this.emit('updateImg', target.dataset.flatImage);
    this.emit('updateActiveFlatImageButton', target);
    if (has(this.zoom, 'setDefault')) {
      this.zoom.setDefault();
    }
  }

}

export default FlatModel;
