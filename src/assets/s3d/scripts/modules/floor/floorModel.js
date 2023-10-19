import {
  find,
  pick,
} from 'lodash';

import createFloor from '../templates/floorPage/floor';
import createFloorSvg from '../templates/floorSvg';
import EventEmitter from '../eventEmitter/EventEmitter';
import {
  preloader
} from '../general/General';
import getFloor from '../getFloor';
import sendError from '../sendError';


const ErrorCallbackUpdateLocation = (i18n, hostname, keyMessage, type = '', newLocation) => err => {
  sendError(i18n, hostname, keyMessage, type, err);
  errorPopup.setType('withTranslate');
  errorPopup.open(keyMessage, () => {
    location.href = newLocation;
  });
};
const { origin, pathname, search } = location;

class Floor extends EventEmitter {
  constructor(data, i18n) {
    super();
    this.type = data.type;
    this.getFlat = data.getFlat;
    this.generalWrapId = data.generalWrapId;
    this.createWrap();
    this.wrapper = document.querySelector(`.js-s3d__wrapper__${this.type}`);
    this.history = data.history;
    this.updateFsm = data.updateFsm;
    this.configProject = data.settings;
    this.preloader = preloader;
    this.floorList$ = data.floorList$;
    this.i18n = i18n;
    this.changeFloorData = {
      prev: data.settings.floor,
      next: data.settings.floor,
    };
    this.updateLastVisitedFloor = data.updateLastVisitedFloor;
  }

  init() {
    this.update();
  }

  async update(config) {
    this.configProject = config ?? this.configProject;
    const floorData = await getFloor(this.configProject);

    if (!floorData) {
      ErrorCallbackUpdateLocation(this.i18n, location.hostname, 'Error-popup.messages.not-find-data', 'high', `${origin}${pathname}`)({
        requestData: this.configProject,
        response: floorData,
      });
    }
    if (!floorData.url || !floorData.flatsIds) {
      ErrorCallbackUpdateLocation(this.i18n, location.hostname, 'Error-popup.messages.not-all-required-data-received', 'medium', `${origin}${pathname}`)({
        requestData: 'test',
        response: floorData,
      });
    }

    this.setPlaneInPage(floorData);

    this.updateLastVisitedFloor(this.configProject);
    const floorsOfThisBuild = this.floorList$.value.filter(floor => {
      return floor.build === this.configProject.build && floor.section === this.configProject.section;
    }).sort(function(a, b) {
      return a.floor - b.floor;
    });

    this.emit('renderFloorList', {
      data: floorsOfThisBuild,
      active: this.configProject.floor
    })

    setTimeout(() => {
      this.preloader.turnOff(document.querySelector('.js-s3d__select[data-type="floor"]'));
      this.preloader.hide();
    }, 600);

    this.emit('flatRoomsFilter', this.configProject);
  }

  createWrap() {
    const wrap = createMarkup('div', { class: `s3d__wrap js-s3d__wrapper__${this.type}` });
    document.querySelector(this.generalWrapId).insertAdjacentElement('beforeend', wrap);
  }

  selectFlat(id) {
    this.updateFsm({
      type: 'flat',
      id,
    });
  }

  checkChangeFloor() {
    const { build: currentBuild, section: currentSection, floor: currentFloor } = this.configProject;
    const listFloors = this.floorList$.value
      .filter(data => data.build === currentBuild && data.section === currentSection)
      .map(data => window.parseInt(data.floor)).sort(function(a, b) {
        return a - b;
      });

    const index = listFloors.indexOf(currentFloor);
    console.log(listFloors);
    console.log(index);
    console.log(currentFloor);
    const changeFloorData = {
      prev: listFloors[index - 1],
      next: listFloors[index + 1],
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
    this.configProject = {
      ...this.configProject,
      floor: nextFloor,
    };
    this.update();
  }

  preparationFlats(flatsIds) {
    return flatsIds.map(id => this.getFlat(id));
  }

  preparationFloor() {
    const floors = this.floorList$.value;
    const { floor, build, section } = this.configProject;
    return find(floors, { floor, build, section });
  }

  setPlaneInPage(response) {
    const { url, flatsIds, size: sizeImage } = response;

    const preparedFlats = this.preparationFlats(flatsIds).map(flat => {
      if (!flat) return;
      const flatId = flat.id || undefined;
      if (flatId === undefined) return { ...flat };
      if (!response.cords) return { ...flat };
      return { ...flat, sortedFromServer: response.cords ? response.cords[flat.id] : flat.sorts };
    });
    const preparedFloor = this.preparationFloor();
    const floorHtml = createFloor(this.i18n, preparedFloor);
    const floorSvgHtml = createFloorSvg(this.i18n, url, preparedFlats, sizeImage);
    this.emit('setFloor', floorHtml);
    this.emit('removeFloorSvg');
    this.emit('setFloorSvg', floorSvgHtml);

    this.checkChangeFloor();
  }

  updateHoverDataFlat(elem) {
    this.emit('updateHoverDataFlat');
  }

  bedroomsFilter(elem) {
    this.emit('bedroomsFilter');
  }
}
export default Floor;
