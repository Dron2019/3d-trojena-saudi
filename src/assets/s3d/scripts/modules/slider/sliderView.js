import $ from 'jquery';
import { deviceType, primaryInput } from 'detect-it';
import EventEmitter from '../eventEmitter/EventEmitter';
// import Svg from '../Svg';

class SliderView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;

    this.wrapper = $(elements.wrapper);

    // attach model listeners
    model.on('hideActiveSvg', () => { this.hideActiveSvg(); });
    model.on('showActiveSvg', () => { this.showActiveSvg(); });
    model.on('showSelectedFlats', flats => { this.showSelectedFlats(flats); });
    model.on('showSelectedFloors', floors => { this.showSelectedFloors(floors); });
    model.on('showSelectPolygon', element => { this.showSelectPolygon(element); });
    model.on('filteredPolygonRemoveClass', (typeToRemove) => { this.filteredPolygonRemoveClass(typeToRemove); });
    model.on('changeSvgActive', svg => { this.updateSvgActive(svg); });
    model.on('changeFlatActive', svg => { this.updateFlatActive(svg); });
    model.on('removeActiveFlatNewMethod', () => { this.removeFlatActive() });
    model.on('removeSvgActivePolygons', () => { this.removeSvgActivePolygons(); });
    model.on('updateLoaderProgress', amount => { this.updatePreloaderPercent(amount); });
    model.on('progressBarHide', () => { this.progressBarHide(); });
    model.on('createArrow', () => { this.createArrow(); });
    model.on('changeContainerCursor', cursor => { this.changeContainerCursor(cursor); });

    // attach listeners to HTML controls
    this.wrapper.on('mouseleave', () => {
      if (deviceType !== 'hybrid' && deviceType !== 'touchOnly' && primaryInput === 'mouse') {
        this.emit('disableInfoBox');
      }
      // if (window.matchMedia('(max-width: 1024px)').matches) return;
    })
    this.wrapper.on('mousedown', event => {
      this.emit('mouseKeyDown', event);
    });
    this.wrapper.on('mousemove', elements.wrapperEvent, event => {
      this.emit('mouseMove', event);
    });
    this.wrapper.on('mouseup mouseleave', event => {
      this.emit('mouseKeyUp', event);
    });
    this.wrapper.on('click touch', 'polygon, circle, g', event => {
      this.emit('touchPolygon', event);

    });
    window.addEventListener('keydown', event => {
      this.emit('keyPress', event);
    });
  }

  changeContainerCursor(cursor) {
    if (!cursor) return;
    const container = document.querySelector(`.js-s3d__svg-container__${this._model.type}`);
    if (!container) return;
    container.style.cursor = cursor;
  }

  hideActiveSvg() {
    this._model.getSvgActive().css({ opacity: 0, /*pointerEvents: 'none', display: 'none'*/ });
  }

  showActiveSvg() {
    this._model.getSvgActive().css({ opacity: 1, /*pointerEvents: 'all', display: ''*/ });
  }

  showSelectPolygon(elem) {
    $('.js-s3d__svgWrap .polygon__selected').removeClass('polygon__selected');
    $(`.polygon__flat-svg`).removeClass('polygon__flat-svg');
    elem.classList.add('polygon__selected');
  }

  updateSvgActive(svg) {
    this._model.wrapper.find('.s3d__svg__active').removeClass('s3d__svg__active');
    svg.addClass('s3d__svg__active');
  }

  removeFlatActive() {
    document.querySelectorAll('polygon.active[data-type="flat"], polygon.active[data-type="floor"]').forEach(el => {
      el.classList.remove('active');
    })
  }

  updateFlatActive(data) {
    if (typeof data === 'string' || typeof data === 'number') {
      if (document.querySelectorAll(`polygon[data-type="flat"][data-id="${data}"]`).length > 0) {
        this.removeFlatActive();
        document.querySelectorAll(`polygon[data-type="flat"][data-id="${data}"]`).forEach(el => {
          el.classList.add('active');
        });
      }
    }
    if (typeof data === 'string' || typeof data === 'number') {
      if (document.querySelectorAll(`polygon[data-type="floor"][data-flat_ids*="${data}"]`).length === 0) return;
      this.removeFlatActive();
      document.querySelectorAll(`polygon[data-type="floor"][data-flat_ids*="${data}"]`).forEach(el => {
        el.classList.add('active');
      })
      return;
    }
    // const { id, build, floor } = data;
    // this.removeSvgActivePolygons();
    // if (id) {
    //   $(`.js-s3d__svgWrap [data-id=${id}]`).addClass('polygon__flat-svg');
    // } else {
    //   $(`.js-s3d__svgWrap [data-build=${build}][data-floor=${floor}]`).addClass('polygon__flat-svg');
    // }
  }

  filteredPolygonRemoveClass(typeToRemove) {
    // $('.js-s3d__svgWrap .polygon__filter-select').removeClass('polygon__filter-select');
    document.querySelectorAll(`.js-s3d__svgWrap .polygon__filter-select[data-type="${typeToRemove}"]`).forEach(el => {
      el.classList.remove('polygon__filter-select');
    })
  }

  // подсвечивает квартиры на svg облёта
  showSelectedFlats(flats) {
    const allPolygons = document.querySelectorAll('#js-s3d__wrapper polygon[data-type="flat"][data-id]');
    allPolygons.forEach(poly => {
      poly.style.pointerEvents = 'none';
      poly.classList.remove('polygon__filter-select');
    });
    flats.forEach(id => {
      const floorPolygon = document.querySelectorAll(`#js-s3d__wrapper polygon[data-id="${id}"]`);
      floorPolygon.forEach(poly => {
        poly.style.pointerEvents = '';
        poly.classList.add('polygon__filter-select');
      });
    });
  }

  showSelectedFloors(floors) {
    const allPolygons = document.querySelectorAll('#js-s3d__wrapper polygon[data-type="floor"]');
    allPolygons.forEach(poly => {
      // poly.style.pointerEvents = 'none';
      poly.classList.add('polygon__filter-select');
    });
    floors.forEach(floorData => {
      const { build, section, floor } = floorData;
      const floorPolygon = document.querySelectorAll(`#js-s3d__wrapper polygon[data-type="floor"][data-build="${build}"][data-section="${section}"][data-floor="${floor}"]`);
      floorPolygon.forEach(poly => {
        poly.style.pointerEvents = '';
        poly.classList.add('polygon__filter-select');
      });
    });
  }

  removeSvgActivePolygons() {
    $('.js-s3d__svgWrap .polygon__flat-svg').removeClass('polygon__flat-svg');
  }

  updatePreloaderPercent(percent) {
    $('.fs-preloader-amount').html(percent);
  }

  progressBarHide() {
    $('.js-fs-preloader-before').removeClass('preloader-active');
  }

  createArrow() {
    window.addEventListener('click', (evt) => {
      if (evt.target.closest('[class*="js-s3d__button"]') === null) return;
      const target = evt.target.closest('[class*="js-s3d__button"]');
      this._model.checkDirectionRotate(target.dataset.type);
    });
  }
}

export default SliderView;
