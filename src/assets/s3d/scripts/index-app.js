import $ from 'jquery';
import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import ScrollTrigger from 'gsap/ScrollTrigger';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import device from "current-device";
import language from '../../../static/language/index';
import { isDevice } from './modules/checkDevice';
import CreateMarkup from './modules/markup';
import AppController from './modules/app/app.controller';
import AppModel from './modules/app/app.model';
import AppView from './modules/app/app.view';
import Controller from './modules/templates/controller/controller';
import Plannings from './modules/templates/planningsPage/plannings';
import Favourites from './modules/templates/favourites';
import Filter from './modules/templates/filter/filter';
import Config from '../../../static/settings.json';
import Catcher from './modules/catchers';
import {
  AppContentError,
  AppError,
  AppFloorContentError,
  AppNetworkError,
  AppUrlError,
  NetworkError,
} from './modules/errors';
import ErrorPopup from './modules/errorPopup';
import sendError from './modules/sendError';
import { themeFactory } from './modules/templates/controller/$theme';
import percentLoader from './modules/templates/loaders/percentLoader';
import loader from './modules/templates/loaders/loader';
import './modules/templates/loaders/loader-animation';
import header from './modules/templates/header/header';
import menu from './modules/templates/header/menu';
import './modules/templates/header/header-animation';
import dispatchTrigger from './modules/helpers/triggers';
import { deviceType, primaryInput } from 'detect-it';
import { detect } from 'detect-browser';
import $map from './modules/templates/map/$map';
import $earth from './modules/templates/earth/$earth';

const browser = detect();


document.documentElement.classList.add(deviceType);


{
  if (window.screen.height === 1366 && window.screen.width === 1024 && /Macintosh/.test(window.navigator.userAgent)) {
    document.documentElement.classList.add('tablet');
    document.documentElement.classList.remove('desktop');
  }
  if (window.screen.width === 1366 && window.screen.height === 1024 && /Macintosh/.test(window.navigator.userAgent)) {
    document.documentElement.classList.add('tablet');
    document.documentElement.classList.remove('desktop');
  }
}
{
  const ipadProDetectExpression = /OS X|OSX/i;
  const biggerSide = Math.max.apply(null, [window.innerWidth, window.innerHeight]);
  if (
    biggerSide < 1380 &&
    biggerSide > 1024 &&
    document.documentElement.classList.contains('desktop') &&
    deviceType !== 'mouseOnly' &&
    window.navigator.userAgent.match(ipadProDetectExpression)
  ) {
    document.documentElement.classList.remove('desktop');
    document.documentElement.classList.add('tablet');
  }
}

Object.values(browser).forEach(el => document.documentElement.classList.add(el.replace(/ /g, '')));

document.addEventListener('DOMContentLoaded', global => {
  init();
});

window.nameProject = '3d';

window.defaultProjectPath = `/wp-content/themes/${window.nameProject}`;
window.defaultModulePath = `/wp-content/themes/${window.nameProject}/assets/s3d`;
window.defaultStaticPath = `/wp-content/themes/${window.nameProject}/static`;
window.status = location.hostname.match(/localhost/) || document.documentElement.dataset.mode === 'local' ? 'local' : 'dev';

document.documentElement.classList.add(`deviceType_${deviceType}`);
document.documentElement.classList.add(`primaryInput_${primaryInput}`);

global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
global.axios = axios;


const createHtml = i18n => {
  const controllerNode = Controller(i18n, Config);
  const planningsNode = Plannings(i18n);
  const favouritesNode = Favourites(i18n, 0);
  const mapNode = $map(i18n);
  const filterNode = Filter(i18n, Config.filter.checkboxes);
  const moduleContainer = document.querySelector('.js-s3d__slideModule');
  moduleContainer.insertAdjacentHTML('afterbegin', [
    controllerNode,
    planningsNode,
    favouritesNode,
    filterNode,
    mapNode,
    $earth({})
  ].join(''));
  document.body.insertAdjacentHTML('beforeend', loader());
  document.body.insertAdjacentHTML('beforeend', percentLoader(i18n));
  document.body.insertAdjacentHTML('beforeend', header(i18n, Config));
  document.body.insertAdjacentHTML('beforeend', menu(i18n));
  if (document.documentElement.classList.contains('mobile')) {
    document.querySelectorAll('[filter]').forEach(el => el.removeAttribute('filter'));
  }
};


async function init() {
  const i18Instance = i18next.createInstance({interpolation: true});
  window.createMarkup = CreateMarkup;

  const lang = document.querySelector('html').lang || 'en';
  window.errorPopup = ErrorPopup(i18Instance);
  const callback = (i18n, hostname, keyMessage, type = '') => err => {
    sendError(i18n, hostname, keyMessage, type, err);
    errorPopup.setType('withoutTranslate');
    errorPopup.open(keyMessage);
  };
  const lowErrorCallback = (i18n, hostname, keyMessage, type = '') => err => {
    sendError(i18n, hostname, keyMessage, type, err);
    errorPopup.setType('withTranslate');
    errorPopup.open(keyMessage, location.reload);
  };
  const ErrorCallbackUpdateLocation = (i18n, hostname, keyMessage, type = '', newLocation) => err => {
    sendError(i18n, hostname, keyMessage, type, err);
    errorPopup.setType('withTranslate');
    errorPopup.open(keyMessage, () => {
      location.href = newLocation;
    });
  };
  const { host, pathname, search } = location;
  const catcherHandlers = [
    {
      instance: AppContentError,
      callback: callback(i18Instance, location.hostname, 'Error-popup.messages.not-find-data', 'high'),
    }, {
      instance: AppFloorContentError,
      callback: ErrorCallbackUpdateLocation(i18Instance, location.hostname, 'Error-popup.messages.not-all-required-data-received', 'medium', `${host}/${pathname}${search}`),
    }, {
      instance: AppUrlError,
      callback: ErrorCallbackUpdateLocation(i18Instance, location.hostname, 'Error-popup.messages.invalid-url', 'low', `${host}/${pathname}`),
    }, {
      instance: AppNetworkError,
      callback: callback(i18Instance, location.hostname, 'Error-popup.messages.failed-request', 'high'),
    }, {
      instance: NetworkError,
      callback: lowErrorCallback(i18Instance, location.hostname, 'Error-popup.messages.network-error', 'low'),
    }, {
      instance: AppError,
      callback: callback(i18Instance, location.hostname, 'Error-popup.messages.application-error', 'middle'),
    }, {
      instance: Error,
      callback: callback(i18Instance, location.hostname, 'Error-popup.messages.unknown-error', 'middle'),
    },
  ];
  const catcher = Catcher(catcherHandlers);
  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  });
  try {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    if (isDevice('mobile') || document.documentElement.offsetWidth <= 768) {
      document.querySelector('.js-s3d__slideModule').classList.add('s3d-mobile');
    }
    await i18Instance
      .use(intervalPlural)
      .init({
        lng: lang,
        debug: true,
        resources: language,
      });
    createHtml(i18Instance);

    const app = new AppModel(Config, i18Instance);
    const appView = new AppView(app, {
      wrapper: $('.js-s3d__slideModule'),
    });
    const appController = new AppController(app, appView);
    await app.init();
  } catch (error) {
    catcher(error);
    console.log(error);
    dispatchTrigger('module-error', {
      error,
      date: new Date().toLocaleString(),
      ...browser,
      orientation: device.orientation,
      type: device.type,
    });
  }
}

window.checkValue = val => !val || val === null || val === undefined || (typeof val === 'number' && isNaN(val));

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

function fullScreen() {
  const btn = document.querySelector('[data-screen]');
  document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-screen]');
    if (!target) return;
    toggleFullScreen()
  });
}

window.addEventListener('DOMContentLoaded', fullScreen);