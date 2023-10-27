import $ from 'jquery';
import { has } from 'lodash';
import SliderModel from './slider/sliderModel';
import SliderView from './slider/sliderView';
import SliderController from './slider/sliderController';
import Plannings from './plannings';
import FlatModel from './flat/flatModel';
import FlatController from './flat/flatController';
import FlatView from './flat/flatView';
import FloorModel from './floor/floorModel';
import FloorController from './floor/floorController';
import FloorView from './floor/floorView';
import MapModel from './map/mapModel';

function fsmConfig() {
  return {
    earth: {
      desktop: {
        isFilterShow: false,
        isFilterTransition: false,
        controllerFilter: false,
        controllerTitle: true,
        controllerPhone: true,
        controllerCompass: false,
        controllerTabs: true,
        controllerMenu: false,
        controllerMenuBottom: false,
        controllerHelper: false,
        controllerInfoBox: false,
        controllerFavourite: true,
        controllerInfrastructure: false,
        controllerChoose: false,
        preloaderMini: true,
        themeChoose: false,
        infrastructureFilter: false
      },
      mobile: {
        isFilterShow: false,
        isFilterTransition: false,
        controllerFilter: false,
        controllerTitle: true,
        controllerPhone: true,
        controllerCompass: false,
        controllerTabs: true,
        controllerMenu: false,
        controllerMenuBottom: false,
        controllerHelper: false,
        controllerInfoBox: true,
        controllerFavourite: true,
        controllerInfrastructure: false,
        controllerChoose: false,
        preloaderMini: true,
        themeChoose: false,
        infrastructureFilter: false
      },
    },
    map: {
      desktop: {
        isFilterShow: false,
        isFilterTransition: false,
        controllerFilter: false,
        controllerTitle: true,
        controllerPhone: true,
        controllerCompass: false,
        controllerTabs: true,
        controllerMenu: false,
        controllerMenuBottom: false,
        controllerHelper: false,
        controllerInfoBox: false,
        controllerFavourite: true,
        controllerInfrastructure: false,
        controllerChoose: false,
        preloaderMini: true,
        themeChoose: false,
        infrastructureFilter: false
      },
      mobile: {
        isFilterShow: false,
        isFilterTransition: false,
        controllerFilter: false,
        controllerTitle: true,
        controllerPhone: true,
        controllerCompass: false,
        controllerTabs: true,
        controllerMenu: false,
        controllerMenuBottom: false,
        controllerHelper: false,
        controllerInfoBox: true,
        controllerFavourite: true,
        controllerInfrastructure: false,
        controllerChoose: false,
        preloaderMini: true,
        themeChoose: false,
        infrastructureFilter: false
      },
    },
    genplan: {
      desktop: {
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: true,
        controllerCompass: false,
        controllerMenu: true,
        controllerMenuButtons: true,
        controllerTabs: true,
        controllerFilter: true,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: true,
        infrastructureFilter: true
      },
      mobile: {
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: true,
        controllerCompass: false,
        controllerMenu: true,
        controllerMenuButtons: true,
        controllerTabs: true,
        controllerFilter: true,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: true,
        infrastructureFilter: true
      },
    },
    flyby: {
      desktop: {
        filterShow: true,
        planningFilterShow: false,
        controllerInfoBox: true,
        controllerCompass: false,
        controllerMenu: true,
        controllerMenuButtons: true,
        controllerTabs: true,
        controllerFilter: true,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: true,
        infrastructureFilter: true
      },
      mobile: {
        filterShow: true,
        planningFilterShow: false,
        controllerInfoBox: true,
        controllerCompass: false,
        controllerMenu: true,
        controllerMenuButtons: true,
        controllerTabs: true,
        controllerFilter: true,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: true,
        infrastructureFilter: true
      },
    },
    plannings: {
      desktop: {
        wrap: 'plannings',
        filterShow: true,
        planningFilterShow: true,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
      mobile: {
        wrap: 'plannings',
        filterShow: true,
        planningFilterShow: true,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
    },
    floor: {
      desktop: {
        wrap: 'floor',
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
      mobile: {
        wrap: 'floor',
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
    },
    flat: {
      desktop: {
        wrap: 'flat',
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
      mobile: {
        wrap: 'flat',
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
    },
    favourites: {
      desktop: {
        wrap: 'favourites',
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
      mobile: {
        wrap: 'favourites',
        filterShow: false,
        planningFilterShow: false,
        controllerInfoBox: false,
        controllerCompass: false,
        controllerMenu: false,
        controllerMenuButtons: false,
        controllerTabs: true,
        controllerFilter: false,
        controllerHelper: false,
        controllerInfrastructure: false,
        controllerChoose: false,
        controllerThemeChoose: false,
        preloaderMini: false,
        infrastructureFilter: false
      },
    },
  };
}

function fsm() {
  return {
    firstLoad: true,
    state: '',
    settings: {},
    transitions: {
      earth(config, i18n, change) {
        if (this.filter) {
          this.filter.reduceFilter(false);
        }
        this.changeViewBlock(this.fsm.state);
        this.iteratingConfig();
      },
      map(config, i18n, change) {
        if (!this.map) {

          this.map = new MapModel(config, i18n);
          // this.preloaderWithoutPercent.show();
          // this.plannings = new Plannings(config, i18n);
          // this.plannings.init();
        } else {
          // this.preloaderWithoutPercent.show();
          // this.preloaderWithoutPercent.hide();
        }
        this.changeViewBlock(this.fsm.state);
        this.iteratingConfig();
      },
      genplan(config, i18n, change, sliderData, cb) {
        if (!this[config.id]) {
          config['typeCreateBlock'] = 'canvas';
          this.emit('createWrapper', config);
          config['wrapper'] = $(`.js-s3d__wrapper__${config.id}`);
          config['wrapperSvg'] = document.querySelector(`#js-s3d__svg-${config.id}`);
          const sliderDataWithHistory = {  flatId: config.history.history.markedFlat, ...sliderData};
          const courtyardModel = new SliderModel({ ...config, sliderDataWithHistory, cbOnInit: cb}, i18n);
          const courtyardView = new SliderView(courtyardModel, {
            wrapper: config['wrapper'],
            wrapperSvg: config['wrapperSvg'] ,
            wrapperEvent: '.js-s3d__svgWrap',
          });
          const complexController = new SliderController(courtyardModel, courtyardView);
          this[config.id] = courtyardModel;
          courtyardModel.init();
          if (has(this, 'helper')) {
            this.helper.init();
          }
        } else if (change) {
          this[config.id].toSlideNum(config.flatId, config.settings.slides);
        } else {
          this[config.id].showDifferentPointWithoutRotate(config.settings.slides, config.flatId);
        }
        this.changeViewBlock(config.id);
        this.iteratingConfig();
      },
      flyby(config, i18n, change, sliderData, cb) {
        if (!this[config.id]) {
          config['typeCreateBlock'] = 'canvas';
          this.emit('createWrapper', config);
          config['wrapper'] = $(`.js-s3d__wrapper__${config.id}`);
          config['wrapperSvg'] = document.querySelector(`#js-s3d__svg-${config.id}`);
          const sliderDataWithHistory = {  flatId: config.history.history.markedFlat, ...sliderData};
          const complexModel = new SliderModel({ ...config, sliderDataWithHistory, cbOnInit: cb}, i18n);
          const complexView = new SliderView(complexModel, {
            wrapper: config['wrapper'],
            wrapperEvent: '.js-s3d__svgWrap',
            wrapperSvg: config['wrapperSvg']
          });
          const complexController = new SliderController(complexModel, complexView);
          complexModel.init(config.flatId, config.settings.slides);
          this[config.id] = complexModel;
          if (has(this, 'helper')) {
            this.helper.init();
          }
        } else if (sliderData) {
          if (sliderData.showLoader) {
          }
          const sliderDataWithHistory = {  flatId: config.history.history.markedFlat, ...sliderData};
          this[config.id].toControlPoint(sliderData.flatId, sliderDataWithHistory.controlPoint, config.history.history.markedFlat);
        } else if (change) {
          this[config.id].toSlideNum(config.flatId, config.settings.slides, config.history.history.markedFlat);
        } else {
          this[config.id].showDifferentPointWithoutRotate(config.settings.slides, config.flatId, config.history.history.markedFlat);
        }
        this.changeViewBlock(config.id);
        this.iteratingConfig();
      },
      plannings(config, i18n) {
        if (!this.plannings) {
          this.plannings = new Plannings(config, i18n);
          this.plannings.init();
        }
        if (this.filter) {
          this.filter.reduceFilter(false);
        }
        this.changeViewBlock(this.fsm.state);
        this.iteratingConfig();
      },
      flat(config, i18n) {
        if (!this.flat) {
          config['typeCreateBlock'] = 'div';
          const flatModel = new FlatModel(config, i18n);
          const flatView = new FlatView(flatModel, {}, i18n);
          const flatController = new FlatController(flatModel, flatView);
          this.flat = flatModel;
          flatModel.init(config);
          const flatBtn = $('.s3d-nav__btn[data-type="flat"]');
          this.preloader.turnOff(flatBtn);
        }
        this.changeViewBlock(this.fsm.state);
        this.compass(this.flat.currentCompassDeg);
        this.iteratingConfig();
        this.flat.update(config.flatId);
        // if (this.filter) {
        //   this.filter.emit('hideFilter');
        // }
      },
      floor(config, i18n) {
        if (!this.floor) {
          config['typeCreateBlock'] = 'div';
          const floorModel = new FloorModel(config, i18n);
          const floorView = new FloorView(floorModel, {});
          const flatController = new FloorController(floorModel, floorView);
          this.floor = floorModel;
          floorModel.init(config);
          const flatBtn = $('.s3d-nav__btn[data-type="floor"]');
          this.preloader.turnOff(flatBtn);
        } else {
          this.floor.update(config.settings);
        }
        this.changeViewBlock(this.fsm.state);
        this.iteratingConfig();
      },
      favourites() {
        // if (this.fsm.firstLoad) {
        //   this.fsm.firstLoad = false;
        // }
        this.favourites.update();
        this.iteratingConfig();
        this.changeViewBlock(this.fsm.state);
        // const statePreloader = this.preloader.checkState();
        // if (statePreloader.showing) {
        //   setTimeout(() => {
        //     this.preloader.hide();
        //   }, 500);
        //   return;
        // }
      },
    },
    dispatch(settings, self, payload, i18n, sliderData, cb) {
      if (settings.type !== this.state || +settings.flyby !== this.settings.flyby || settings.side !== this.settings.side) {
        this.state = settings.type;
        this.settings = settings;
      }
      const action = this.transitions[this.state];
      if (!action) return;
      const config = { ...payload };
      config['settings'] = settings;
      config['type'] = this.state;
      action.call(self, config, i18n, settings.change, sliderData, cb);
    },
  };
}

export { fsm, fsmConfig };