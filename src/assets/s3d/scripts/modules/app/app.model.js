import { BehaviorSubject } from 'rxjs';
import $ from 'jquery';
import {
  transform,
  isNaN,
  has,
  cloneDeep,
  size,
  isObject,
  isArray,
  find,
  filter,
} from 'lodash';
import { fsm, fsmConfig } from '../fsm';
import addAnimateBtnTabs from '../animation';
import { preloader } from '../general/General';
import asyncRequest from '../async/async';
import EventEmitter from '../eventEmitter/EventEmitter';
import History from '../history';
import Helper from '../helper';
import InfoBox from '../infoBox';
import FilterModel from '../filter/filterModel';
import FilterView from '../filter/filterView';
import FilterController from '../filter/filterController';
import FlatsList from '../flatsList';
import PopupChangeFlyby from '../popupChangeFlyby';
import FavouritesModel from '../favourites/favouritesModel';
import FavouritesController from '../favourites/favouritesController';
import FavouritesView from '../favourites/favouritesView';
import { AppContentCustomError, AppUrlCustomError } from '../errors';
import sendError from '../sendError';
import ErrorPopup from '../errorPopup';
import FormView from '../form/form/formView';
import Popup from '../popup/PopupView';
import dispatchTrigger from '../helpers/triggers';
import { deviceType } from 'detect-it';
import MapModel from '../map/mapModel';
import Earth from '../earth/earthModel';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { screenshot } from '../../features/screenshot';
import { share } from '../../features/share';
import infrastructureFilter from '../infrastructureFilter/infrastructureFilter';
import { betweenFlybyCustomLinks } from '../../miniFeatures/betweenFlybyCustomLinks';
import Toastify from 'toastify-js'
import VrPinsList from '../vrPinsList/vrPinsList';
import modalManager from '../../managers/modalManager';
import { backButton } from '../../features/backButton';



class AppModel extends EventEmitter {
  constructor(data, i18n) {
    super();
    this.config = data;
    this.i18n = i18n;
    this.preloader = preloader;
    this.defaultFlybySettings = {};
    this.getFlat = this.getFlat.bind(this);
    this.getFloor = this.getFloor.bind(this);
    this.updateFsm = this.updateFsm.bind(this);
    this.checkNextFlyby = this.checkNextFlyby.bind(this);
    this.changePopupFlyby = this.changePopupFlyby.bind(this);

    this.browser = data.browser;
    this.typeSelectedFlyby$ = new BehaviorSubject('flat'); // flat, floor
    this.compass = this.compass.bind(this);
    this.horizontalCompass = this.horizontalCompass.bind(this);

    this.currentFilteredFlatIds$ = new BehaviorSubject([]);
    this.currentFilteredFloorsData$ = new BehaviorSubject([]);
    this.hoverData$ = new BehaviorSubject({});
    this.flatList = {};
    this.floorList$ = new BehaviorSubject({});
    this.favouritesIds$ = new BehaviorSubject([]);
    this.fsmConfig = fsmConfig();
    this.fsm = fsm();
    this.pin = data.pin;
    this.pinsInfo = data.pinsInfo;
    this.sliderPopup = data.sliderPopup;
    this.modalManager = modalManager;


    this.infrastructureFilter = infrastructureFilter(this.modalManager);

    this.onUpdateFsmModules = [
      betweenFlybyCustomLinks,
      backButton
    ];

    this.on('updateFsm', (flyby) => {
      this.onUpdateFsmModules.forEach(el => el(flyby, data, this.history));
    })

    this.floorList$.subscribe(val => {
      dispatchTrigger('floor-list-init', val);
    })

    document.body.addEventListener('click', elem => {
      if (elem.target.closest('.js-click-infra-pin') === null) return;
      const target =elem.target.closest('.js-click-infra-pin');
      dispatchTrigger('click-infrastructure-pin', {
        src: window.location.href,
        ...target.dataset
      })
    });

    document.body.addEventListener('click', elem => {
      if (elem.target.closest('.js-s3d-flat__3d-tour') === null) return;
      const target = elem.target.closest('.js-s3d-flat__3d-tour');
      elem.preventDefault();

      // if ((deviceType === 'hybrid' || deviceType === 'touchOnly') && target.tagName.match(/g|rect|polygon/i)) {
      if (target.tagName.match(/g|rect|polygon/i)) {
        /**opening handler in touch devices will be sliderModel.js and infobox*/
        return;
      }
      // if ()
      new Popup(elem.target.closest('.js-s3d-flat__3d-tour').getAttribute('data-href')).render();
      
      dispatchTrigger('vr-popup-open', {
        href: elem.target.closest('.js-s3d-flat__3d-tour').getAttribute('data-href'),
        url: window.location.href
      })
    });

    this.earthModel = new Earth({
      i18n,
      ...data,
      model: this
    });

    document.body.addEventListener('click', (evt) => {
      const target = evt.target.closest('[data-s3d-screenshot]');
      if (!target) return;
      screenshot(target);
    })
    document.body.addEventListener('click', (evt) => {
      const target = evt.target.closest('[data-s3d-share]');
      if (!target) return;
      share(target);
      Toastify({
        text: 'Link copied',
        duration: 1500
      }).showToast();
    })
    
  }

  ErrorCallbackUpdateLocation(i18n, hostname, keyMessage, type = '', newLocation) {
    return err => {
      errorPopup.setType('withTranslate');
      sendError(i18n, hostname, keyMessage, type, err);
      errorPopup.open(keyMessage, () => {
        location.href = newLocation;
      }, 15);
    };
  }

  // todo replace get/set normal
  set activeFlat(value) {
    this._activeFlat = window.parseInt(value);
  }

  get activeFlat() {
    return this._activeFlat;
  }

  // todo mb remove it function
  convertType(value) {
    try {
      return (new Function(`return ${value} ;`))();
    } catch(e) {
      return value;
    }
  }

  selectSlideHandler(target) {
    const {
      type,
      flyby,
      side,
      id,
    } = target.dataset;
    if (type === 'floor' && target.dataset.build &&  target.dataset.floor && target.dataset.section) {
      this.updateFsm({
        type,
        build: target.dataset.build,
        floor: target.dataset.floor,
        section: target.dataset.section
      })
      return;
    }
    if (type && (type !== this.fsm.state || flyby !== this.fsm.settings.flyby || side !== this.fsm.settings.side)) {
      this.updateFsm({
        type, flyby, side, id,
      });
    }
  }

  getFlat(val) {
    return val ? this.flatList[val] : this.flatList;
  }

  getFloor(data) {
    const values = this.floorList$.value;
    const { floor, build } = data;
    if (floor && build) {
      return values.find(value => (value.floor === +floor && value.build === +build));
    }
    return values;
  }

  // setFloor(val) {
  //   this.floorList$.next({ ...this.floorList$.value, [val.id]: val });
  // }

  async init() {
    this.history = new History({ updateFsm: this.updateFsm });
    this.breadcrumbs = new Breadcrumbs({
      i18n: this.i18n,
      history: this.history,
      config: filter(this.config, (el) => el.id),
      trigger: (cb) => {
        this.on('updateFsm', (data) => {
          cb(data);
        })
      },
      model: this
    });
    // this.initVrPinList();
    this.emit('translatePreloaderPercent', this.i18n);
    this.preloader.show();

    this.infoBox = new InfoBox({
      activeFlat: this.activeFlat,
      updateFsm: this.updateFsm,
      getFlat: this.getFlat,
      getFloor: this.getFloor,
      hoverData$: this.hoverData$,
      typeSelectedFlyby$: this.typeSelectedFlyby$,
      i18n: this.i18n,
    });
    const flats = await this.requestGetFlats();
    this.setDefaultConfigFlyby(this.config);
    this.helper = new Helper(this.i18n);
    await this.flatJsonIsLoaded(flats);


    
  }

  setDefaultConfigFlyby(config) {
    if (config['earth']) {
      this.defaultFlybySettings = this.getParamEarth();
    } else {
      const configFlyby = config.flyby;
      const type = 'flyby';
      const flyby = Object.keys(configFlyby)[0];
      const side = Object.keys(configFlyby[flyby])[0];
      this.defaultFlybySettings = {
        type,
        flyby,
        side,
      };
    }
  }

  async getDataFlybys() {
    const url = (status === 'prod' || status === 'dev')
        ? '/wp-admin/admin-ajax.php'
        : `${defaultStaticPath}/structureFlats.json`;
    const response = await asyncRequest({
      url,
      method: 'post',
      data: {
        action: 'getStructureSvg',
      },
    });

    return response;
  }

  getParamDefault() {
    return this.defaultFlybySettings;
  }

  getParamFlyby(searchParams) {
    const conf = {
      type: searchParams.type ?? 'flyby',
      flyby: searchParams.flyby ?? '1',
      side: searchParams.side ?? 'outside',
    };
    if (this.history.history.markedFlat) {
      conf.markedFlat = this.history.history.markedFlat;
    }
    const flatId = searchParams.id;
    /**Старый вариант перехода для подсветки квартиры (пока не удалять) */
    // const updated = this.checkNextFlyby(conf, flatId);
    const id = (flatId && this.getFlat(flatId)) ? { id: flatId } : {};

    dispatchTrigger('visit-flyby-page', {
      src: window.location.href,
      ...conf
    })
    return { ...conf, /* ...updated, */ ...id };
  }

  getParamMap() {
    dispatchTrigger('visit-map-page', {
      src: window.location.href,
      type: 'map',
    })
    return {
      type: 'map',
    };
  }
  getParamEarth() {
    dispatchTrigger('visit-map-page', {
      src: window.location.href,
      type: 'earth',
    })
    return {
      type: 'earth',
    };
  }
  getParamGenplan() {
    dispatchTrigger('visit-flyby-page', {
      src: window.location.href,
      type: 'genplan',
    })
    return {
      type: 'genplan',
    };
  }

  getParamFloor(searchParams) {
    const config = this.floorList$.value;
    const { type } = searchParams;
    const build = this.convertType(searchParams.build) || config[0].build;
    let floor = this.convertType(searchParams.floor) || config[0].floor;
    if (searchParams.floor === 0 || searchParams.floor === '0') {
      floor = 0;
    }
    const section = this.convertType(searchParams.section) || config[0].section;

    dispatchTrigger('visit-floor-page', {
      src: window.location.href,
      build,
      section,
      floor
    })

    return {
      type,
      build,
      floor,
      section,
    };
  }

  getParamFlat(searchParams) {
    if (!searchParams.id) {
      return this.getParamDefault(searchParams);
    }
    dispatchTrigger('visit-appartment-page', {
      src: window.location.href
    })
    return {
      type: 'flat',
      id: searchParams.id,
    };
  }

  getParamFavourites(searchParams) {
    dispatchTrigger('visit-favourites-page', {
      src: window.location.href
    })
    return {
      type: 'favourites',
    };
  }

  getParamPlannings() {
    dispatchTrigger('visit-plannings-page', {
      src: window.location.href
    })
    return {
      type: 'plannings',
    };
  }

  getParams(searchParams) {
    const config = {
      genplan: 'getParamGenplan',
      flyby: 'getParamFlyby',
      plannings: 'getParamPlannings',
      floor: 'getParamFloor',
      map: 'getParamMap',
      flat: 'getParamFlat',
      earth: 'getParamEarth',
      favourites: 'getParamFavourites',
    };

    let getParam = config[searchParams['type']];

    if (!getParam && searchParams['type']) {
      const { host, pathname, hostname } = location;
      this.ErrorCallbackUpdateLocation(this.i18n, hostname, 'Error-popup.messages.invalid-url', 'low', `${host}/${pathname}`)({
        data: {
          urlData: searchParams,
        },
      });
      getParam = 'getParamDefault';
    } else if (!getParam) {
      getParam = 'getParamDefault';
    }
    return this[getParam](searchParams);
  }

  checkFlatInSVG(flyby, id) { // получает id квартиры, отдает объект с ключами где есть квартиры
    const result = {};
    for (const num in flyby) {
      for (const side in flyby[num]) {
        const type = flyby[num][side];
        for (const slide in type) {
          for (const list in type[slide]) {
            const hasId = type[slide][list].includes(id.toString());
            if (hasId && !has(result, [num])) {
              result[num] = {};
            }
            if (hasId && !has(result, [num, side])) {
              result[num][side] = [];
            }
            if (hasId) {
              result[num][side].push(+slide);
            }
          }
        }
      }
    }
    return result;
  }

  prepareFlats(flats) {
    const currentFilterFlatsId = flats.reduce((previous, current) => {
      const flat = transform(current, (acc, value, key) => {
        const newValue = +value;
        const params = acc;
        if (!isNaN(newValue) && key !== 'sorts') {
          params[key] = newValue;
        } else {
          params[key] = value;
        }
        return params;
      });
      const key = flat.id;
      return { ...previous, [key]: flat };
    }, {});
    return currentFilterFlatsId;
  }

  async flatJsonIsLoaded(data) {
    this.flatList = this.prepareFlats(data);
    this.floorList$.next(this.createFloorsData(data));
    const currentFilterFlatsId = Object.keys(this.flatList);
    this.currentFilteredFlatIds$.next(currentFilterFlatsId);

    const generalConfig = {
      getFlat: this.getFlat,
      updateFsm: this.updateFsm,
      fsm: this.fsm,
      typeSelectedFlyby$: this.typeSelectedFlyby$,
      currentFilteredFlatIds$: this.currentFilteredFlatIds$,
      currentFilteredFloorsData$: this.currentFilteredFloorsData$,
      activeFlat: this.activeFlat,
      favouritesIds$: this.favouritesIds$,
      history: this.history,
    };

    dispatchTrigger('flats-loaded', this.flatList);

    const filterModel = new FilterModel({
      flats: this.getFlat(),
      currentFilteredFlatIds$: this.currentFilteredFlatIds$,
      currentFilteredFloorsData$: this.currentFilteredFloorsData$,
      typeSelectedFlyby$: this.typeSelectedFlyby$,
      config: this.config.filter,
      modalManager: this.modalManager,
      updateFsm: this.updateFsm,
    }, this.i18n);
    const filterView = new FilterView(filterModel, {});
    const filterController = new FilterController(filterModel, filterView);
    this.filter = filterModel;
    filterModel.init();

    const listFlat = new FlatsList(this, this.filter);

    this.popupChangeFlyby = new PopupChangeFlyby(this, this.i18n);

    const searchParams = this.history.parseSearchUrl(window.location);
    const favouritesIds = searchParams?.favourites && searchParams.favourites.split(',').map(id => +id) || [];

    const fvModel = new FavouritesModel(generalConfig, this.i18n);
    const fvView = new FavouritesView(fvModel, {}, this.i18n);
    const fvController = new FavouritesController(fvModel, fvView);
    this.favourites = fvModel;
    this.favourites.init(favouritesIds);
    const { structure: structureFlats, linksSvg } = await this.getDataFlybys();

    this.structureFlats = structureFlats;
    this.linksSvg = linksSvg;
    this.determineFlybysWhereFlatIsSpecified();
    this.determineFlybysWhereFloorWithFlatIsSpecified();

    // якщо форма з сайту - закоментувати
    const form = new FormView({
      modalManager: this.modalManager
    });

    this.updateFsm(searchParams);
    setTimeout(() => {
      addAnimateBtnTabs('[data-choose-type]', '.js-s3d__choose--flat--button-svg');
      document.querySelector('.js-s3d__choose--flat label').classList.add('active');
    }, 500);
  }

  determineFlybysWhereFlatIsSpecified() {
    if (!isObject(this.structureFlats)) return;
    Object.entries(this.structureFlats).forEach(([ flyby, flybyValue ]) => {
      if (!isObject(flybyValue)) return;
      Object.entries(flybyValue).forEach(([ side, sideValue ]) => {
        if (!isObject(sideValue)) return;
        Object.entries(sideValue).forEach(([ controlPoint, value ], index) => {
          if (!isArray(value['flat'])) return;
          value['flat'].forEach(flatId => {
            const flat = this.flatList[flatId];
            if (!flat) return;
            if (isArray(flat.specifiedFlybys)) {
              flat.specifiedFlybys.push({
                flyby, side, controlPoint, controlPointTitle: index+1
              })
            } else {
              flat.specifiedFlybys = [{ flyby, side, controlPoint, controlPointTitle: index+1 }]
            }
          })
        })
      })
    })
  }

  determineFlybysWhereFloorWithFlatIsSpecified() {
    if (!isObject(this.structureFlats)) return;
    Object.entries(this.structureFlats).forEach(([ flyby, flybyValue ]) => {
      if (!isObject(flybyValue)) return;
      Object.entries(flybyValue).forEach(([ side, sideValue ]) => {
        if (!isObject(sideValue)) return;
        Object.entries(sideValue).forEach(([ controlPoint, value ], index) => {
          if (!isArray(value['floor'])) return;
          value['floor'].forEach(flatId => {
            const flat = this.flatList[flatId];
            if (!flat) return;
            if (isArray(flat.specifiedFloorFlybys)) {
              flat.specifiedFlybys.push({
                flyby, side, controlPoint, controlPointTitle: index+1
              })
            } else {
              flat.specifiedFloorFlybys = [{ flyby, side, controlPoint, controlPointTitle: index+1 }]
            }
          })
        })
      })
    })
  }

  createStructureSvg() {
    const types = ['floor', 'flat'];
    const flyby = {}
    const conf = this.config.flyby
    for (const num in conf) {
      flyby[num] = {}
      for (const side in conf[num]) {
        const type = conf[num][side]
        flyby[num][side] = {}
        type.controlPoint.forEach(slide => {
          flyby[num][side][slide] = {};
          types.forEach(typeSvg => {
            flyby[num][side][slide][typeSvg] = []
            $.ajax(`./assets/s3d/images/svg/${typeSvg}/flyby/${num}/${side}/${slide}.svg`).then(responsive => {
              const list = [...responsive.querySelectorAll('polygon')];
              const ids = list.map(el => +el.dataset.id).filter(el => el);
              flyby[num][side][slide][typeSvg] = ids;
            });
          });
        });
      }
    }
    setTimeout(() => {
      console.log(JSON.stringify(flyby));
    }, 10000);
  }

  changePopupFlyby(config, id) {
    this.popupChangeFlyby.updateContent(id);
    this.popupChangeFlyby.openPopup(config);
  }

  compass(deg) {
    this.emit('updateCompassRotate', deg);
  }

  horizontalCompass(translateX, activeFlyby) {
    if (this.fsm.settings.type == activeFlyby.type && this.fsm.settings.flyby == activeFlyby.flyby && this.fsm.settings.side == activeFlyby.side) {
      this.emit('updateHorizontalCompass', translateX);
    }
  }

  updateLastVisitedFloor(data) {
    document.querySelectorAll('.js-s3d-nav__btn[data-type="floor"]').forEach(el => {
      if (el.closest('[data-dont-make-me-active]')) return;
      Object.entries(data).forEach(configPoint => {
        el.dataset[configPoint[0]] = configPoint[1];
      })
    })
  }

  nextHistory(name) {
    if (this['history'] && this['history'].next) {
      this.history.next(name);
      return true;
    }
    return false;
  }

  changeViewBlock(name, delay = 400) {
    const self = this;
    setTimeout(() => {
      self.emit('changeBlockActive', name);
    }, delay);
  }

  async requestGetFlats() {
    const url = (status === 'prod' || status === 'dev')
        ? '/wp-admin/admin-ajax.php'
        : `${defaultStaticPath}/grand-burge-flats.json`;

    const method = (status === 'prod' || status === 'dev') ? 'post' : 'get';
    const data = await asyncRequest({
      url,
      method,
      data: { action: 'getFlats' },
    });
    if (!data) {
      throw AppContentCustomError({
        requestData: {
          url,
          method,
          data: { action: 'getFlats' },
        },
        response: data,
      });
    }
    return data;
  }

  createFloorsData(flats) {
    const data = flats.reduce((acc, flat) => {
      const isIndexFloor = acc.findIndex(cur => (+cur.floor === +flat.floor
          && +cur.build === +flat.build
          && +cur.section === +flat.section));

      if (flat.level == '2' && isIndexFloor >= 0) {
        const { free } = acc[isIndexFloor];
        const currentFloor = cloneDeep(acc[isIndexFloor]);
        currentFloor.count += 1;
        currentFloor.free = (flat.sale === '1' ? free + 1 : free);
        currentFloor.flatsIds.push(+flat.id);
        acc[isIndexFloor] = currentFloor;
        const filteredFlatsForSecondLevel = flats.filter(flat1 => flat1.level === '2' && +flat1.floor === +flat.floor && +flat1.section === +flat.section && +flat1.build === +flat.build);
        // return acc;
        if (acc.some(el => {
          return el.floor == +flat.floor+1 && el.build == +flat.build && el.section == +flat.section;
        })) {
          return [
            ...acc
          ]
        }
        return [
          ...acc,
          {
            floor: +flat.floor+1,
            build: +flat.build,
            section: +flat.section,
            count: filteredFlatsForSecondLevel.map(el => el.id).length,
            flatsIds: filteredFlatsForSecondLevel.map(el => el.id),
            free: filteredFlatsForSecondLevel.map(el => el.id).length,
          },
        ]
      }
      if (isIndexFloor >= 0) {
        const { free } = acc[isIndexFloor];
        const currentFloor = cloneDeep(acc[isIndexFloor]);
        currentFloor.count += 1;
        currentFloor.free = (flat.sale === '1' ? free + 1 : free);
        currentFloor.flatsIds.push(+flat.id);
        acc[isIndexFloor] = currentFloor;
        return acc;
      }
      return [
        ...acc,
        {
          floor: +flat.floor,
          build: +flat.build,
          section: +flat.section,
          count: 1,
          flatsIds: [+flat.id],
          free: +(flat.sale === '1'),
        },
      ];
    }, []);
    return data;
  }

  changeChooseActive(type) {
    this.typeSelectedFlyby$.next(type);
  }
  /**
   *
   * @param {*} data
   * @param {*} nextHistory
   * @param {*} sliderData - Обьект с параметрами (controlPoint - ключевой кадр куда перейдет модель, id - квартира, которая подсветится)
   * @param {*} cb - функция которая срабатывает при первой загрузке SliderModel когда изображения для облета загружены
   * @returns
   */
  updateFsm(data, nextHistory = true, sliderData, cb) {
    const settings = this.getParams(data);
    dispatchTrigger('visit-page', {
      page: settings['type'],
      url: window.location.href
    })
    const {
      type,
      flyby,
      side,
      id,
    } = settings;
    const config = has(this.config, [type, flyby, side]) ? this.config[type][flyby][side] : this.config[type];
    if (type === this.fsm.state && this.fsm.state !== 'flyby' && this.fsm.state !== 'floor') return;
    if (id) {
      this.activeFlat = +id;
      config.flatId = +id;
    }
    // prepare settings params before use
    if (nextHistory) {
      const favourites = this.favouritesIds$.value.length > 0
          ? { favourites: this.favouritesIds$.value }
          : {};
      const urlParams = {
        ...settings,
        ...favourites,
      };
      if (data.markedFlat) {
        urlParams.markedFlat = data.markedFlat;
      }
      this.nextHistory(urlParams);
      this.emit('updateFsm', data);
    }

    config.type = data.type;
    config.activeFlat = this.activeFlat;
    config.hoverData$ = this.hoverData$;
    config.compass = this.compass; // ?
    config.horizontalCompass = this.horizontalCompass; // ?
    config.updateFsm = this.updateFsm;
    config.linksSvg = this.linksSvg;
    config.pin = this.pin;
    config.pinsInfo = this.pinsInfo;
    config.sliderPopup = this.sliderPopup;
    config.structureFlats = this.structureFlats;
    config.history = this.history;
    config.getFlat = this.getFlat;
    config.typeSelectedFlyby$ = this.typeSelectedFlyby$;
    config.currentFilteredFlatIds$ = this.currentFilteredFlatIds$;
    config.currentFilteredFloorsData$ = this.currentFilteredFloorsData$;
    config.infoBox = this.infoBox;
    config.floorList$ = this.floorList$;
    config.browser = this.browser;
    config.favouritesIds$ = this.favouritesIds$;
    config.updateLastVisitedFloor = this.updateLastVisitedFloor;
    config.infrastructureFilter = this.infrastructureFilter;
    config.onSliderInit = () => {
      this.infrastructureFilter.next(this.infrastructureFilter.value);
    }

    this.fsm.dispatch(settings, this, config, this.i18n, sliderData, cb);
  }

  mappingConfiguration = {
    filterShow: flag => this.emit('changeClass', { target: '.js-s3d-filter', flag, changeClass: 's3d-show' }),
    planningFilterShow: flag => this.emit('changeClass', { target: '.js-s3d-filter', flag, changeClass: 's3d-planning-filter-wrap' }),
    controllerInfoBox: flag => this.emit('changeClass', { target: '.js-s3d-infoBox', flag, changeClass: 's3d-show' }),

    controllerCompass: flag => this.emit('changeClass', { target: '.js-s3d__compass', flag, changeClass: 's3d-display' }),

    controllerTabs: flag => this.emit('changeClass', { target: '#js-s3d-ctr__elem', flag, changeClass: 's3d-display' }),

    controllerMenu: flag => this.emit('changeClass', { target: '.js-s3d-ctr__menu-3d', flag, changeClass: 's3d-show' }),
    controllerMenuButtons: flag => this.emit('changeClass', { target: '.js-s3d-ctr__menu-3d-buttons', flag, changeClass: 's3d-display' }),

    controllerFilter: flag => this.emit('changeClass', { target: '.js-s3d-ctr__filter', flag, changeClass: 's3d-display' }),
    controllerHelper: flag => this.emit('changeClass', { target: '.js-s3d-ctr__helper', flag, changeClass: 's3d-display' }),
    controllerInfrastructure: flag => this.emit('changeClass', { target: '.js-s3d-ctr__infra-button', flag, changeClass: 's3d-display' }),
    controllerChoose: flag => this.emit('changeClass', { target: '.js-s3d__choose--flat', flag, changeClass: 's3d-display' }),
    controllerThemeChoose: flag => this.emit('changeClass', { target: '.js-s3d-ctr__theme', flag, changeClass: 's3d-display' }),

    preloaderMini: flag => this.emit('changeClass', { target: '.js-fs-preloader-before', flag, changeClass: 's3d-show' }),
    infrastructureFilter: flag => this.emit('changeClass', { target: '.js-s3d-infrastructure-filter', flag, changeClass: 's3d-show' }),
    mapFilter: flag => this.emit('changeClass', { target: '.js-s3d-map-filter', flag, changeClass: 's3d-show' }),
  };

  iteratingConfig(delay = 400) {
    const width = document.documentElement.offsetWidth;
    const typeDevice = width > 992 ? 'desktop' : 'mobile';
    if (!this.fsm.state) return;
    const state = this.fsmConfig[this.fsm.state][typeDevice];
    const settings = Object.keys(state);
    const updatedSettings = () => settings.forEach(name => {
      if (this.mappingConfiguration[name]) {
        this.mappingConfiguration[name](state[name]);
      }
    });
    setTimeout(updatedSettings, delay);
  }

  checkNextFlyby(data, id) {
    if (id === undefined) {
      return null;
    }
    // :todo  пересмотреть нужна ли эта функция
    const includes = this.checkFlatInSVG(this.structureFlats, id);
    const setting = this.fsm.settings;

    if (size(includes) === 0) {
      console.warn('flat are not found in svg  id №:', id)
      return null;
    }

    if (has(includes, [data.flyby, data.side])) {
      return {
        type: 'flyby',
        flyby: data.flyby,
        side: data.side,
        slides: includes[data.flyby][data.side],
        change: false,
      };
    }

    if (_.has(includes, [setting.flyby, setting.side])) {
      return {
        type: 'flyby',
        flyby: setting.flyby,
        side: setting.side,
        method: 'search',
        slide: includes[setting.flyby][setting.side],
        change: false,
      };
    }

    const key1 = Object.keys(includes);
    const key2 = Object.keys(includes[key1[0]]);
    const slides = includes[key1[0]][key2[0]];
    let change = false;
    if (setting.type !== 'flyby' || setting.flyby !== key1 || setting.side !== key2) {
      change = true;
    }

    return {
      type: 'flyby',
      flyby: key1[0],
      side: key2[0],
      slides,
      change,
    };
  }
  initVrPinList() {

    const self = this;
    new VrPinsList({
      on: self.on.bind(self),
      i18n: this.i18n,
      modalManager: self.modalManager,
    });
  }
}

export default AppModel;
