import $ from 'jquery';
import { Power1, TimelineMax } from 'gsap';
import EventEmitter from '../eventEmitter/EventEmitter';
import { delegateHandler } from '../general/General';
import dispatchTrigger from '../helpers/triggers';

class FilterView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;
    this.filterTopHeight = document.querySelector('.s3d-filter__top').offsetHeight;

    $('[data-reset-filter]').on('click', () => {
      this.emit('resetFilter');
    });
    $('#resetFilter-mobile').on('click', () => {
      this.emit('resetFilter');
    });
    $('.js-s3d-filter__close').on('click', () => {
      this.hidden();
    });
    $('.js-s3d-filter').on('click', '.js-s3d-filter__button--apply', () => {
      this.hidden();
    });
    $('.js-s3d-filter').on('change', 'input[type="text"]', () => {
      console.log('CHANGE');
      this.emit('changeFilterHandler');
    });
    $('.js-s3d-filter__checkboxes').on('click', 'input', () => {
      this.emit('changeFilterHandler');
    });
    $('#hideFilter').on('click', () => {
      this.emit('reduceFilterHandler');
    });
    $('.js-s3d-ctr__filter').on('click', event => {
      event.preventDefault();
      this.emit('reduceFilterHandler', false);
      this.toggle();
    });
    $('.js-s3d-pln__filter').on('click', event => {
      event.preventDefault();
      this.emit('reduceFilterHandler', false);
      this.showMob();
    });
    $('.s3d-planning-filter-wrap .js-s3d-filter__close').on('click', event => {
      event.preventDefault();
      this.emit('reduceFilterHandler', false);
      this.hideMob();
    });

    model.on('hideFilter', () => { this.hidden(); });
    model.on('setAmountAllFlat', data => { this.setAmountAllFlat(data); });
    model.on('setAmountSelectFlat', data => { this.setAmountSelectFlat(data); });
    // model.on('updateHeightFilter', () => { this.updateHeightFilter(); });
    model.on('reduceFilter', state => { this.changeHeightFilterBlock(state); });
    this._model.$wrapper.addEventListener('click', (evt) => {
      const target = delegateHandler('[data-switch-filter-view-type]', evt);
      if (!target) return;
      document.querySelectorAll('.active[data-switch-filter-view-type]').forEach(el => el.classList.remove('active'));
      target.classList.add('active');
      dispatchTrigger('filter-view-type-change', {
        url: window.location.href,
        type: target.dataset.switchFilterViewType,
      })
      this.emit('changeResultsViewType', target.dataset.switchFilterViewType);
    })
    model.on('changeViewType', viewType => {
      const activeButton = document.querySelector(`[data-switch-filter-view-type="${viewType}"]`);
      if (activeButton === null) return;
      activeButton.classList.add('active');
    });
    model.on('initCardClickHandler', (updateFunction = () => {}) => {
      this._model.$wrapper.addEventListener('click', (evt) => {
        const target = delegateHandler('.js-s3d-card', evt);
        if (!target) return;
        updateFunction({
          type: 'flat',
          id: target.dataset.id
        });
        this.emit('hideFilter');
      })
    })
  }

  updateHeightFilter() {
    const filterTopContainer = document.querySelector('.s3d-filter__top');
    filterTopContainer.style.height = 'auto';
    this.filterTopHeight = filterTopContainer.offsetHeight;
    filterTopContainer.style.height = `${this.filterTopHeight}px`;
  }

  show() {
    $('.js-s3d-filter').addClass('s3d-open-filter');
  }

  hidden() {
    $('.js-s3d-filter').removeClass('s3d-open-filter');
  }

  // перемикач фільтра
  toggle() {
    $('.js-s3d-filter').toggleClass('s3d-open-filter');
    if (document.querySelector('.js-s3d-filter').classList.contains('s3d-open-filter')) {
      dispatchTrigger('open-filter', {
        url: window.location.href
      });
      if (!this._model.modalManager.open) return;
      this._model.modalManager.open(this._model.id);
    }
  }

  // перемикач фільтра на сторінці планування
  showMob() {
    $('.js-s3d-filter').addClass('s3d-open-filter');
    if (document.querySelector('.js-s3d-filter').classList.contains('s3d-open-filter')) {
      dispatchTrigger('open-filter', {
        url: window.location.href
      });
    }
  }

  hideMob() {
    $('.js-s3d-planning-filter').removeClass('s3d-open-filter');
  }

  setAmountAllFlat(value) {
    $('.js-s3d__amount-flat__num-all').html(value);
  }

  // установить кол-во найденных квартир
  setAmountSelectFlat(amount) {
    $('.js-s3d__amount-flat__num').html(amount);
  }

  changeHeightFilterBlock(state) {
    const elements = {
      filter: document.querySelector('.js-s3d-filter'),
      filterTop: document.querySelector('.s3d-filter__top'),
      btn: document.querySelector('#hideFilter'),
    };
    const filterScrollHandler = state ? 'filterScrollActive' : 'filterScrollUnActive';
    this[filterScrollHandler](elements);
  }

  filterScrollActive(elements) {
    const {
      btn,
      filter,
      filterTop,
    } = elements;
    const tl = new TimelineMax();
    const paddingBottom = getComputedStyle(filterTop).getPropertyValue('--filter-offset-ver');
    btn.innerText = btn.dataset.showText;
    filter.classList.add('s3d-filter__scroll-active');
    tl.to(filterTop, {
      height: 0,
      paddingBottom,
      duration: 0.3,
      ease: Power1.easeIn,
    }).eventCallback('onComplete', () => {
      this.emit('changeListScrollBlocked', false);
    });
  }

  filterScrollUnActive(elements) {
    const {
      btn,
      filter,
      filterTop,
    } = elements;
    const tl = new TimelineMax();
    btn.innerText = btn.dataset.hideText;
    filter.classList.remove('s3d-filter__scroll-active');
    const paddingBottom = getComputedStyle(filterTop).getPropertyValue('--filter-offset-ver');
    tl.to(filterTop, {
      height: this.filterTopHeight,
      paddingBottom,
      duration: 0.3,
      ease: Power1.easeIn,
    }).eventCallback('onComplete', () => {
      setTimeout(() => {
        this.emit('changeListScrollBlocked', false);
      }, 400);
    });
  }
}

export default FilterView;
