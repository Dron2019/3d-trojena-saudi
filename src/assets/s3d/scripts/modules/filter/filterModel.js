import ionRangeSlider from 'ion-rangeslider';
import $ from 'jquery';
import {
  size,
  has,
  set,
  includes,
  toNumber,
  forIn,
  cloneDeep,
} from 'lodash';
import EventEmitter from '../eventEmitter/EventEmitter';
import { debounce} from '../general/General';
import dispatchTrigger from '../helpers/triggers';
import Hammer from 'hammerjs';
import { isMobile } from '../helpers/helpers';

class FilterModel extends EventEmitter {
  constructor(config) {
    super();

    const checkboxesDataFromSettings = config.config.checkboxes.reduce((acc,el) => {
      acc[el.paramaterByWhatWillBeFilter] = 'checkbox';
      return acc;
    }, {})

    this.types = {
      area: 'range',
      // floor: 'range',
      rooms: 'checkbox',
      option: 'option',
      price: 'option',
      action_price: 'option',
      sale: 'option',
      compas: 'option',
      number: 'text',
      ...checkboxesDataFromSettings
    };
    this.configProject = {};
    this.currentFilteredFlatIds$ = config.currentFilteredFlatIds$;
    this.currentFilteredFloorsData$ = config.currentFilteredFloorsData$;
    this.typeSelectedFlyby$ = config.typeSelectedFlyby$;
    this.flats = config.flats;
    this.uiMiniFilter = false;
    this.isListScrollBlocked = false;
    this.$wrapper = document.querySelector('.js-s3d-filter');
    this.viewType = config.config.viewType || list;
    this.updateFsm = config.updateFsm;
    this.id = 's3d-flats-filter';
    this.modalManager = config.modalManager;
    this.changeResultsViewType(this.viewType);
  }


  changeResultsViewType(value) {
    this.viewType = value;
    this.filterFlatStart();
    this.$wrapper.dataset.viewType = value;
  }

  init() {
    this.configProject = this.createFilterParam(this.flats);
    this.reduceFilter = this.reduceFilter.bind(this);
    this.emit('setAmountAllFlat', size(this.flats));
    this.filterFlatStart();
    this.emit('updateHeightFilter');
    this.emit('changeViewType', this.viewType);
    this.emit('initCardClickHandler', this.updateFsm);

    if (this.modalManager.push) {
      this.modalManager.push({
        id: this.id,
        close: () => {
          this.hideFilter()
        }
      })


    }


    if (isMobile()) {
      this.mobileFilterTouchActionsHandler();
    }
    this.deb = debounce(this.resize.bind(this), 500);
  }

  mobileFilterTouchActionsHandler() {

    this.mobMenuHandle();
    // const mc = new Hammer(this.$wrapper, {
    //   direction: Hammer.DIRECTION_ALL
    // });
    // mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
    // mc.on('swipe', (e) => {
    //   console.log(e);
    // })
    // mc.on('swipedown', () => {
    //   this.mobileClosingAnimation();
    // })
  }

  mobileClosingAnimation(cb = () => {}) {
    gsap.timeline()
        .to(this.$wrapper, {
          y: this.$wrapper.getBoundingClientRect().height,
          clearProps: 'all'
        })
        .add(() => {
          this.emit('hideFilter');
          cb();
        })
  }

  mobMenuHandle(){
    const menu = this.$wrapper;
    const moveCords = {
      y: 0,
      swipeDistance: 0,
      locked: true,
      percentForClosing: 37.5, 
    }
  
    
    document.body.addEventListener('touchstart', (e) => {
      if (!menu.classList.contains('s3d-open-filter')) return;
      moveCords.y = e.changedTouches[0].clientY;
      moveCords.locked = false;
      menu.style.transition = 'none';
    });
    document.body.addEventListener('touchmove', (e) => {
      if (moveCords.locked === false && e.changedTouches[0].clientY > moveCords.y && menu.classList.contains('s3d-open-filter'))  {
        moveCords.swipeDistance = (moveCords.y - e.changedTouches[0].clientY) * -1;
        menu.style.transform = `translateY(${(moveCords.y - e.changedTouches[0].clientY) * -1}px)`;
        // menu.style.opacity =  gsap.utils.mapRange(0, menu.getBoundingClientRect().height, 1, 0, moveCords.swipeDistance) ;
      }
    });
    document.body.addEventListener('touchend', (e) => {
      if (!menu.classList.contains('s3d-open-filter')) return;
      if (moveCords.swipeDistance > menu.getBoundingClientRect().height * (moveCords.percentForClosing / 100)) {
        this.mobileClosingAnimation(() => {
          menu.style.transform = '';
          moveCords.swipeDistance = 0;
          moveCords.y = 0;
          moveCords.locked = true;
          menu.style.transition = '';
        });
      } else {
        gsap.to(
          this.$wrapper, {
            y: 0,
            opacity: 1,
            clearProps: 'all'
          }
        )
      }
 
    });
  }
  // запускает фильтр квартир
  filterFlatStart() {
    const filterSettings = this.getFilterParam(this.configProject);
    this.updateAllParamFilter(filterSettings);
    const { flats, floors } = this.startFilter(this.flats, filterSettings);
    this.emit('setAmountSelectFlat', flats.length);
    this.currentFilteredFlatIds$.next(flats);
    this.currentFilteredFloorsData$.next(floors);
  }

  createFilterParam(flats) {
    let filterParams = {};
    for (const type in this.types) {
      const typeNames = this.types[type];
      let param = {};
      let rangeParam;
      switch (typeNames) {
          case 'range':
            rangeParam = this.createParam(flats, type, this.createRangeParam.bind(this));
            forIn(rangeParam, (setting, key) => {
              param[key] = {
                type: 'range',
                skin: 'round',
                elem: this.createRange(setting),
              };
            });
            break;
          case 'checkbox':
            param = this.createParam(flats, type, this.createCheckedParam);
            break;
          case 'option':
            param = this.createParam(flats, type, this.createOptionParam);
            break;
          case 'text': 
            param = this.createParam(flats, type, this.createTextParam);
            break
          default:
            param = {};
            break;
      }
      filterParams = {
        ...filterParams,
        ...param,
      };
    }
    return filterParams;
  }

  createParam(flats, keyFilter, callback) {
    const data = Object.keys(flats);
    const configProject = data.reduce((acc, key) => {
      const flat = flats[key];
      return { ...acc, ...callback(flat, keyFilter, acc) };
    }, {});
    return configProject;
  }

  // нужно переписать #change
  createRangeParam(flat, name, acc) {
    if (!has(flat, name)) {
      return acc;
    }
    const setting = acc;
    if (!setting[name]) {
      setting[name] = { min: flat[name], max: flat[name] };
      return setting;
    }
    if (flat[name] < setting[name].min) {
      setting[name].min = flat[name];
    }
    if (flat[name] > setting[name].max) {
      setting[name].max = flat[name];
    }
    setting[name].type = name;
    return setting;
  }

  createCheckedParam(flat, name, acc) {
    if (!has(flat, name)) {
      return acc;
    }
    const elements = document.querySelectorAll(`.js-s3d-filter__checkboxes [data-type = ${name}]`);
    const value = [];
    elements.forEach(element => {
      value.push(element.dataset[name]);
    });
    const params = {
      type: 'checkbox',
      elem: elements,
      value,
    };
    return { [name]: params };
  }

  createOptionParam(flat, name) {
    const elements = document.querySelectorAll(`.js-s3d-filter__checkboxes [data-type= ${name}]`);
    const value = [];
    elements.forEach(element => {
      value.push(element.dataset[name]);
    });
    const params = {
      type: 'option',
      elem: elements,
      value,
    };
    return { [name]: params };
  }
  createTextParam(flat, name) {
    const elements = document.querySelector(`[data-type= ${name}]`);
    const self = this;
    elements.addEventListener('change', (evt) => {
      const value = evt.target.value;
    })
    const value = '';
    const params = {
      type: 'text',
      elem: elements,
      value,
    };
    return { [name]: params };
  }

  

  // создает range slider (ползунки), подписывает на события
  createRange(config) {
    if (config.type !== undefined) {
      const self = this;
      const { min, max } = config;
      const $min = $(`.js-filter-range [data-type=${config.type}][data-border="min"]`);
      const $max = $(`.js-filter-range [data-type=${config.type}][data-border="max"]`);
      const rangeSlider = $(`.js-filter-range [data-type=${config.type}]`);
      rangeSlider.ionRangeSlider({
        type: 'double',
        grid: false,
        min,
        max,
        from: min || 0,
        to: max || 0,
        step: config.step || 1,
        onStart: (e) => {
         
          updateInputs(e);
          setTimeout(() => {
            const { from, min, to, max } = e;
            if (1 - (min/from) > 0.1 || min < 100) {
              e.slider[0].querySelector('.irs-from').classList.remove('on-edge');
            } else {
              e.slider[0].querySelector('.irs-from').classList.add('on-edge');
            }
          }, 1500);
        },
        onChange: updateInputs,
        onFinish(e) {
          updateInputs(e);
          const { from, min, to, max } = e;

          if (1 - (min/from) > 0.1 || min < 100) {
            e.slider[0].querySelector('.irs-from').classList.remove('on-edge');
          } else {
            e.slider[0].querySelector('.irs-from').classList.add('on-edge');
          }

          self.filterFlatStart({ min: e.from, max: e.to, ...{ type: config.type } });
        },
        onUpdate: updateInputs,
      });
      const instance = rangeSlider.data('ionRangeSlider');
      instance.update({
        min,
        max,
        from: min,
        to: max,
      });

      function updateInputs(data) {
        $min.prop('value', data.from);
        $max.prop('value', data.to);
      }

      $min.on('change', function () { changeInput.call(this, 'from'); });
      $max.on('change', function () { changeInput.call(this, 'to'); });

      function changeInput(key) {
        let val = $(this).prop('value');
        if (key === 'from') {
          if (val < min) val = min;
          else if (val > instance.result.to) val = instance.result.to;
        } else if (key === 'to') {
          if (val < instance.result.from) val = instance.result.from;
          else if (val > max) val = max;
        }

        instance.update(key === 'from' ? { from: val } : { to: val });
        $(this).prop('value', val);
        self.filterFlatStart({ min: instance.result.from, max: instance.result.to, ...{ type: config.type } });
      }
      return instance;
    }
    return null;
  }

  // сбросить значения фильтра
  resetFilter() {
    // this.emit('filteredPolygonRemoveClass');

    const mapping = {
      range: param => param.elem.update({ from: param.elem.result.min, to: param.elem.result.max }),
      checkbox: param => param.elem.forEach(el => { el.checked = el.checked ? false : ''; }),
      option: param => param.elem.forEach(el => { el.checked = el.checked ? false : ''; }),
      text: param => param.elem.value = ''
    };
    const keysConfiguration = Object.keys(this.configProject);
    keysConfiguration.forEach(key => {
      const params = this.configProject[key];
      if (mapping[params.type]) {
        mapping[params.type](params);
      }
    });
    this.filterFlatStart();
    // const flatsKeys = Object.keys(this.flats);
    // this.updateCurrentFilterFlatsId(flatsKeys);
    // this.emit('setAmountSelectFlat', flatsKeys.length);
  }

  updateAllParamFilter(filterSettings) {
    for (const key in filterSettings) {
      const select = filterSettings[key];
      const typeFilterParam = this.getTypeFilterParam(key)
      let { value } = cloneDeep(select);
      switch (typeFilterParam) {
          case 'text':
            break;
          case 'checkbox':
            if (Array.isArray(value) && value.length === 0) {
              this.configProject[key].value.forEach(i => value.push(i));
            }
            value = value.join(', ');
            this.emit('updateMiniInfo', {
              type: key, value, key: 'amount',
            });
            break;
          case 'range':
            this.emit('updateMiniInfo', {
              type: key, value: select.min, key: 'min',
            });
            this.emit('updateMiniInfo', {
              type: key, value: select.max, key: 'max',
            });
            break;
          default:
            break;
      }
    }
  }

  getTypeFilterParam(name) {
    for (const type in this.types) {
      if (type.includes(name)) return this.types[type];
    }
    return null;
  }

  // поиск квартир по параметрам фильтра
  startFilter(flatList, settings) {
    const flats = Object.values(flatList);
    const settingColl = Object.entries(settings);
    const tempSelectedData = {};
    const floorsSelected = [];

    const filteredFlatsIds = flats.reduce((acc, flat) => {
      const isActive = settingColl.every(([name, value]) => {
        const hasKey = has(flat, [name]);
        if (!hasKey) {
          throw new Error(`flat is not include key: "${name}"`);
        }
        switch (value.type) {
            case 'text':
              return this.checkTextParam(flat, name, value);
            case 'range':
              return this.checkRangeParam(flat, name, value);
            case 'checkbox':
              return this.checkСheckboxParam(flat, name, value);
            case 'option':
              return this.checkOptionParam(flat, name, value);
            default:
              break;
        }
        return false;
      });
      if (!isActive) return acc;

      const {
        build, section, floor,
      } = flat;
      if (!has(tempSelectedData, [build, section, floor])) {
        if (!tempSelectedData[build]) {
          tempSelectedData[build] = {};
        }
        if (!tempSelectedData[build][section]) {
          tempSelectedData[build][section] = {};
        }
        if (!tempSelectedData[build][section][floor]) {
          tempSelectedData[build][section][floor] = true;
        }
        floorsSelected.push({
          build, section, floor,
        });
      }

      return [...acc, flat.id];
    }, []);
    if (filteredFlatsIds.length === 0) {
      dispatchTrigger('filter-flats-not-found', {
        url: window.location.href,
        data: {
          ...settings
        }
      })
    }
    return { flats: filteredFlatsIds, floors: floorsSelected };
  }

  checkTextParam(flat, key, value) {
    return new RegExp(value.value, 'gi').test(flat[key]);
  }
  checkRangeParam(flat, key, value) {
    return (has(flat, key)
      && flat[key] >= value.min
      && flat[key] <= value.max);
  }

  checkСheckboxParam(flat, key, value) {
    return (includes(value.value, flat[key]) || size(value.value) === 0);
  }

  checkOptionParam(flat, key, value) {
    if (value.value.length === 0) return true;
    return value.value.some(name => flat[key][name]);
  }

  // добавить возможные варианты и/или границы (min, max) в список созданых фильтров
  getFilterParam(filter) {
    const settings = {};
    for (const key in filter) {
      const { type } = filter[key];
      switch (type) {
          case 'text':
            settings[key] = {};
            settings[key]['value'] = filter[key].elem.value;
            break;
          case 'checkbox':
            settings[key] = {};
            settings[key]['value'] = [];
            filter[key].elem.forEach(el => {
              if (el.checked) {
                settings[key].value.push(el.dataset[key]);
              }
            });
            break;
          case 'range':
            settings[key] = {};
            settings[key]['min'] = filter[key].elem.result.from;
            settings[key]['max'] = filter[key].elem.result.to;
            break;
          case 'option':
            settings[key] = {};
            settings[key]['value'] = [];
            filter[key].elem.forEach(el => {
              if (el.checked) {
                settings[key].value.push(el.dataset[key]);
              }
            });
            break;
          default:
            break;
      }
      settings[key].type = type;
    }
    return settings;
  }

  reduceFilter(isShow) {
    if (isShow === this.uiMiniFilter) return;
    this.uiMiniFilter = isShow ?? !this.uiMiniFilter;
    this.changeListScrollBlocked(true);
    this.emit('reduceFilter', this.uiMiniFilter);

  }

  changeListScrollBlocked(value) {
    this.isListScrollBlocked = value;
  }

  hideFilter() {
    this.emit('hideFilter');

  }

  resize() {
    this.hideFilter();
  }
}

export default FilterModel;
