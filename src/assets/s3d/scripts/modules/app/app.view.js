import gsap from 'gsap';
import EventEmitter from '../eventEmitter/EventEmitter';
import { delegateHandler } from '../general/General';
import { addAnimateBtnTabsInit } from '../animation';
import Popup from '../popup/PopupView';
import { isDesktop } from '../helpers/helpers';
import Hammer from 'hammerjs';



class AppView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;
    this.$horizontalCompass = document.querySelector('[data-controller-compass]');

    this.mapFlybyLinksHandler = this.mapFlybyLinksHandler.bind(this);

    document.body.addEventListener('click', event => {
      const target = delegateHandler('.js-s3d-nav__btn', event);
      const parent = event.target.closest('.s3d-earth__mob-link');
      if (!event.target.closest('.js-s3d-flat') && !parent) return;
      if (event.target.closest('.js-s3d__wrapper__map')) return;
      if (!target) {
        return;
      }

      if (target.classList.contains('active') || target.hasAttribute('disabled')) {
        return;
      }
      
      this.emit('chooseSlider', target);
    });
    document.body.addEventListener('click', event => {
      const target = delegateHandler('.js-s3d-nav__btn', event);
      if (!event.target.closest('.js-s3d-flat')) return;
      if (event.target.closest('.js-s3d__wrapper__map')) return;
      if (!target) {
        return;
      }

      if (target.classList.contains('active') || target.hasAttribute('disabled')) {
        return;
      }
      
      this.emit('chooseSlider', target);
    });
    

    const $mapWrapper = document.querySelector('.js-s3d__wrapper__map');
    $mapWrapper.addEventListener('click', this.mapFlybyLinksHandler);
    // if (!isDesktop()) {
    //   this.handleMapTouchAction($mapWrapper);
    // } else {
    //   $mapWrapper.addEventListener('click', this.mapFlybyLinksHandler);
    // }

    document.querySelector('.s3d-header').addEventListener('click', event => {
      const target = delegateHandler('.js-s3d-nav__btn', event);
      if (!target) {
        return;
      }

      if (target.classList.contains('active') || target.hasAttribute('disabled')) {
        return;
      }
      
      this.emit('chooseSlider', target);
    });
    document.getElementById('js-s3d-ctr__elem').addEventListener('click', event => {
      const target = delegateHandler('.js-s3d-nav__btn', event);
      if (!target) {
        return;
      }

      if (target.classList.contains('active') || target.hasAttribute('disabled')) {
        return;
      }
      
      this.emit('chooseSlider', target);
    });

    document.querySelector('.js-s3d__choose--flat').addEventListener('click', event => {
      const target = delegateHandler('[data-choose-type]', event);
      if (!target) {
        return;
      }
      const type = target.dataset.chooseType;
      this.emit('chooseHandler', type);
      this.chooseRender(type);
    });

    window.addEventListener('resize', () => {
      this.emit('resize');
    });

    this.chooseRender(this._model.typeSelectedFlyby$.value);
    model.on('createWrapper', a => { this.createWrap(a); });
    model.on('changeBlockActive', name => {
      this.changeBlockIndex(name);
      this.changeActiveButton(name);
      this.changeTitle(name);
    });
    model.on('changeClass', a => { this.changeClass(a); });
    model.on('updateCompassRotate', e => { this.updateCompass(e); });
    model.on('updateHorizontalCompass', e => { this.updateHorizontalCompass(e); });
    model.on('translatePreloaderPercent', i18n => {
      if (document.querySelector('.fs-preloader-precent') === null) {
        return;
      }
      // document.querySelector('.fs-preloader-precent').textContent = i18n.t('loading');
    });
    model.on('updateFsm', data => {
      document.body.setAttribute('data-type', data.type || model.getParamDefault().type);
      setTimeout(() => {
        addAnimateBtnTabsInit('[data-choose-type]', '.js-s3d__choose--flat--button-svg');
      }, 500);
      if (data.type !== 'floor') return;
      this.updateLastVisitedFloor(data);
    });
    model.on('updateFloor', (data) => {
      this.updateLastVisitedFloor(data);
    })

  }

  handleMapTouchAction(wrapper) {
    var manager = new Hammer.Manager(wrapper);
    var DoubleTap = new Hammer.Tap({
      event: 'doubletap',
      taps: 2
    });
    manager.add(DoubleTap);
    manager.on('doubletap', this.mapFlybyLinksHandler);
  }

  mapFlybyLinksHandler(e) {
    const target = delegateHandler('.js-s3d-nav__btn', e);
    if (!target) {
      return;
    }

    if (target.classList.contains('active') || target.hasAttribute('disabled')) {
      return;
    }
    this.emit('chooseSlider', target);
  }


  chooseRender(type) {
    document.querySelectorAll('[data-choose-type]')
        .forEach(button => {
          if (button.dataset.selectedType === type) {
            button.classList.add('active');
            return;
          }
          button.classList.remove('active');
        });
  }

  createWrap(conf) {
    // все 3 обертки нужны, без них на мобилке пропадает прокрутка и всё ломается
    const wrap1 = createMarkup('div', { class: `s3d__wrap js-s3d__wrapper__${conf.id} s3d__wrapper__${conf.type}` });
    const wrap2 = createMarkup('div', { class: 'js-s3d__wrapper__canvas', style: 'position:relative;' });
    const wrap3 = createMarkup(conf.typeCreateBlock, { id: `js-s3d__${conf.id}` });
    const wrap4 = createMarkup('img', { id: `js-s3d__svg-${conf.id}` });
    wrap4.setAttributeNS(null, 'viewBox', '0 0 1920 1080');
    wrap3.style.cssText = `opacity: 0`;
    wrap4.style.cssText = `    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
    top: 0;
    z-index: 2;`;
    document.querySelector(conf.generalWrapId).append(wrap1);
    wrap1.append(wrap2);
    wrap2.append(wrap3);
    wrap2.append(wrap4);
  }

  changeBlockIndex(name) {
    document.querySelectorAll('.s3d__wrap').forEach(wrap => {
      // eslint-disable-next-line no-param-reassign
      // wrap.style.zIndex = '';
      // wrap.style.display = 'none';
      if (wrap.parentElement.classList.contains('pinch-zoom-container')) {
        /**on mobile additional layout for zooming */
        wrap.parentElement.style.display = 'none';
      }
    });

    console.log(name);
    gsap.timeline()
      .to(`.s3d__wrap:not(.js-s3d__wrapper__${name})`, { autoAlpha: 0, ease: 'power4.in', duration: 0.5 })
      .set(`.js-s3d__wrapper__${name}`, { zIndex: 100, display: '' },'<')
      .fromTo(`.js-s3d__wrapper__${name}`, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        ease: 'power4.out',
        duration: 0.5
      },'<')
      .set(`.s3d__wrap:not(.js-s3d__wrapper__${name})`, { zIndex: 5, display: 'none' })
    // document.querySelector(`.js-s3d__wrapper__${name}`).style.zIndex = '100';
    // document.querySelector(`.js-s3d__wrapper__${name}`).style.display = '';
    
     /**on mobile additional layout for zooming */
     if (document.querySelector(`.js-s3d__wrapper__${name}`).parentElement.classList.contains('pinch-zoom-container')) {
      document.querySelector(`.js-s3d__wrapper__${name}`).parentElement.style.display = '';
    }
    document.querySelector('.js-s3d-ctr').dataset.type = name;
    const filter = document.querySelector('.js-s3d-filter');
    filter.setAttribute('data-type', name);
    filter.classList.remove('s3d-filter__scroll-active');
  }

  changeActiveButton(name) {
    const optionBtn = document.querySelector('.s3d-ctr__option');
    const activeBtn = document.querySelectorAll('#js-s3d-ctr__elem .active');

    if (activeBtn) {
      activeBtn.forEach(elem => elem.classList.remove('active'));
    }
    const { type, flyby, side } = this._model.fsm.settings;
    const btn = (type && flyby && side)
        ? document.querySelectorAll(`.js-s3d-nav__btn[data-type="${type}"][data-flyby="${flyby}"][data-side="${side}"]`)
        : document.querySelectorAll(`.js-s3d-nav__btn[data-type="${name}"]`);
    if (btn) {
      btn.forEach(el => {
        if (el.closest('[data-dont-make-me-active]')) {
          el.classList.remove('active');
        } else {
          el.classList.add('active');
        }
      });
      
    }

    if (name.includes('flyby')) {
      optionBtn.classList.add('active');
    }
  }

  changeTitle(name) {
    const headerTitle = document.querySelector('.js-s3d-ctr__option__text');
    const text = this._model.i18n.t(`title.${name}`);

    !name.includes('genplan') ? headerTitle.innerHTML = text : headerTitle.innerHTML = this._model.i18n.t('title.genplan');
    name === 'flat' || name === 'floor' ? headerTitle.classList.add('not-active') : headerTitle.classList.remove('not-active');
  }

  changeClass(conf) {
    const status = conf.flag ? 'add' : 'remove';
    const elem = document.querySelector(conf.target);
    if (elem) {
      elem.classList[status](conf.changeClass);
    }
  }

  updateHorizontalCompass(xValue) {
    this.$horizontalCompass.style.transform = `translate3d(${xValue}px, 0, 0)`;
  }

  updateCompass(deg) {
    // document.querySelectorAll('.js-s3d__compass svg').forEach(el => {
    //   el.style.transform = `rotate(${deg}deg)`;
    // });
  }

  updateLastVisitedFloor(data) {
    document.querySelectorAll('.js-s3d-nav__btn[data-type="floor"]').forEach(el => {
      if (el.closest('[data-dont-make-me-active]')) return;
      Object.entries(data).forEach(configPoint => {
        el.dataset[configPoint[0]] = configPoint[1];
      })
    })
  }

}

export default AppView;
