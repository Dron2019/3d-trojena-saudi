import { groupBy, isArray } from 'lodash';
import createFlatInfo from './$flatInfo';
import $addToFavourite from '../$addToFavourite';
import $goToFloor from './$goToFloor';

const createBtn3dTour = (i18n, path) => `
    <a data-href="${path}" target="_blank" class="s3d-flat__3d-tour js-s3d-flat__3d-tour">
      <span class="s3d-flat__3d-tour__text">${i18n.t('Flat.buttons.3dTour')}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00012 3.45451L2.00012 4.03147L2.00012 12.5454L7.50022 15.7121L8.00023 16L8.50022 15.7121L14.0001 12.5454L14.0001 4.03147L14.0001 3.45451L13.4991 3.16604L8.00023 -3.07799e-05L2.50116 3.16604L2.00012 3.45451ZM3.00012 4.60724L3.00012 11.9673L7.50019 14.5582L7.50002 7.19814L3.00012 4.60724ZM8.50002 7.19813L8.50019 14.5582L13.0001 11.9673L13.0001 4.60721L8.50002 7.19813ZM12.497 3.74298L8.00022 1.15387L3.50323 3.743L8.00002 6.33211L12.497 3.74298Z" fill="#EB5757"/>
      </svg>

    </a>
`;
const createBtnViewFromWindow = (i18n, path) => `
    <a href="${path}" target="_blank" class="s3d-flat__view-from-window">
      <span class="s3d-flat__view-from-window__text">${i18n.t('Flat.buttons.windowView')}</span>
    </a>
`;
const createGalleryBtn = (i18n, path) => `
    <button data-gallery-popup-call data-href="${path.join('~')}" class="s3d-flat__gallery-btn">${i18n.t('Flat.buttons.gallery_btn')}</button>
`;

function Flat(i18n, flat, favouritesIds$) {
  const infoFlat = createFlatInfo(i18n, flat);
  const isChecked = favouritesIds$.value.includes(flat.id) ? 'checked' : '';
  const btn3dTour = flat['3d_tour'] ? createBtn3dTour(i18n, flat['3d_tour']) : '';
  const btnViewFromWindow = flat['view_from_window'] ? createBtnViewFromWindow(i18n, flat['view_from_window']) : '';
  const galleryBtn = flat['gallery'] ? createGalleryBtn(i18n, flat['gallery']) : '';
  const specifiedFlybyByGroup = groupBy(flat.specifiedFlybys, (e) => {
    return `flyby_${e.flyby}_${e.side}`;
  });
  const $specifiedFlybysByGroup = Object.entries(specifiedFlybyByGroup).map(([groupName, flybyList]) => {
    return `
      <div class="dropup-content-group">
        <div class="dropup-content-group-title">${i18n.t(`ctr.nav.${groupName}`)}</div>
        ${flybyList.map(el => {
          return `<button
          data-show-flat-in-flyby
          data-side="${el.side}"
          data-control-point="${el.controlPoint}"
          data-flyby="${el.flyby}"
          data-type="flyby"
          change="true"
          data-flatid="${flat.id}"
        >
            ${i18n.t('Flat.buttons.view')} ${el.controlPointTitle}
          </button>`
        }).join('')}
      </div>`}).join('');
  const $specifiedFlybys = isArray(flat.specifiedFlybys) ? `
    <div class="dropup">
      <button class="dropbtn">
        <svg class="desktop" style="margin-right: 8px;" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M-1.51005e-07 3.45455L-1.51004e-07 4.0315L-1.51003e-07 12.5455L5.5001 15.7121L6.0001 16L6.5001 15.7121L12 12.5455L12 4.0315L12 3.45455L11.499 3.16607L6.0001 -2.62273e-07L0.50104 3.16607L-1.51005e-07 3.45455ZM1 4.60727L1 11.9673L5.50007 14.5582L5.4999 7.19817L1 4.60727ZM6.4999 7.19816L6.50007 14.5582L11 11.9673L11 4.60724L6.4999 7.19816ZM10.4969 3.74301L6.0001 1.1539L1.50311 3.74303L5.9999 6.33214L10.4969 3.74301Z"/>
        </svg>
        ${i18n.t('Flat.buttons.showIn3d')}
      </button>
      <div class="dropup-content">
        ${$specifiedFlybysByGroup}
      </div>
    </div>` : '';

  return `
  <div class="s3d-flat js-s3d-flat">
    <div class="s3d__title">${i18n.t(`rooms.${flat.rooms}`)}</div>
    ${infoFlat}
    <div class="s3d-flat__image-container">
      <div class="s3d-flat__image">
        <img onerror="this.onerror=null; this.setAttribute('src', '${defaultModulePath}/images/examples/no-image.png')" class="js-s3d-flat__image" src="" data-mfp-src="">
      </div>
    </div>
    <div class="s3d-flat__menu-container">
      ${$addToFavourite(i18n, flat, favouritesIds$)}
      <div class="s3d-flat__buttons-wrap js-s3d-flat__buttons-view">
        <div class="s3d-flat__buttons-view">
           <label data-type="2d" class="s3d-flat__radio js-s3d__radio-view" >
            <input type="radio" name="view" value="2d">
            <span>${i18n.t('Flat.buttons.with')}</span>
          </label>
          <label class="s3d-flat__select js-s3d__radio-view-change">
            <input type="checkbox">
            <i class="s3d-flat__select-circle"></i>
          </label>
          <label data-type="3d" class="s3d-flat__radio js-s3d__radio-view">
            <input type="radio" name="view" value="3d">
            <span>${i18n.t('Flat.buttons.without')}</span>
          </label>
         </div>
        <div class="s3d-flat__buttons js-s3d-flat__buttons-type"></div>
      </div>
      ${btnViewFromWindow}
       ${btn3dTour}
      <a style='display: none' href="#" class="s3d-flat__pdf js-s3d__create-pdf">${i18n.t('Flat.buttons.pdf')}</a>
      ${galleryBtn}
      ${$specifiedFlybys}
      <button class="s3d__callback js-s3d-nav__btn" data-type="flyby" data-side="outside" data-flyby="3">
        <span>
          ${i18n.t('Back to Masterplan')}
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99997 12C4.99997 11.7348 5.10533 11.4804 5.29286 11.2929L9.29286 7.29289C9.68339 6.90237 10.3166 6.90237 10.7071 7.29289C11.0976 7.68342 11.0976 8.31658 10.7071 8.70711L8.41418 11L18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13L8.41418 13L10.7071 15.2929C11.0976 15.6834 11.0976 16.3166 10.7071 16.7071C10.3166 17.0976 9.68339 17.0976 9.29286 16.7071L5.29286 12.7071C5.10533 12.5196 4.99997 12.2652 4.99997 12Z" fill="#EB5757"/>
        </svg>

      </button>
      <button class="s3d__callback js-popup-open " data-popup-type="callback" data-open-form>
        <span>
          ${i18n.t('Flat.buttons.callback--1')}
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.83174 4.52852L10.0381 7.57625L8.12095 9.39862L7.62612 9.86899L8.04804 10.4057C8.7241 11.2657 9.48676 12.1005 10.315 12.8879L10.3151 12.8879C11.2707 13.7963 12.2873 14.6173 13.3373 15.3278L13.837 15.6659L14.2743 15.2502L16.2205 13.4002L19.4264 16.4477L17.8508 17.9455C17.4672 18.3101 16.9942 18.5001 16.4021 18.5001C15.6506 18.5001 14.6613 18.1919 13.4389 17.4776C11.5099 16.35 9.66365 14.5991 9.03417 14.0005L9.03405 14.0003C8.29816 13.3008 6.65158 11.7319 5.56016 10.1014L5.56014 10.1013C4.88464 9.09227 4.56741 8.28068 4.51042 7.65433C4.45715 7.06882 4.62608 6.62516 5.01617 6.25434C5.01617 6.25434 5.01617 6.25433 5.01617 6.25433L6.83174 4.52852ZM19.5436 16.5591C19.5433 16.5588 19.543 16.5585 19.5427 16.5582ZM7.80456 3.3837C7.26345 2.86934 6.40017 2.86973 5.85918 3.38344L5.85889 3.38371L3.98272 5.16715L3.98271 5.16716C3.24508 5.86834 2.92372 6.76942 3.01659 7.79024C3.10575 8.77021 3.5711 9.82652 4.31363 10.9357C5.50449 12.7149 7.25882 14.3824 7.98845 15.076L8.00048 15.0874L8.0006 15.0875L8.00605 15.0927C8.63321 15.6891 10.5893 17.5493 12.6819 18.7726L12.682 18.7726C14.0142 19.5511 15.2736 20.0001 16.4021 20.0001C17.3557 20.0001 18.2055 19.6778 18.8843 19.0327L20.5756 17.4249C20.7071 17.2999 20.8113 17.1518 20.8833 16.9889L20.9973 16.9393V16.4477C20.9973 16.0745 20.844 15.7252 20.5762 15.4711M20.5753 15.4702L17.1933 12.2554C17.1933 12.2554 17.1933 12.2554 17.1933 12.2554C16.9278 12.003 16.5789 11.87 16.2205 11.87C15.8618 11.87 15.5135 12.0033 15.2482 12.2549L15.2476 12.2554L13.6847 13.7411C12.8793 13.1614 12.0953 12.5105 11.3485 11.8007C10.7425 11.2246 10.1758 10.6233 9.65757 10.0075L11.1873 8.55342C11.1873 8.55342 11.1873 8.55342 11.1873 8.55341C11.7499 8.01858 11.7495 7.13408 11.1876 6.59936L11.1873 6.59907L7.80458 3.38372C7.80457 3.38371 7.80457 3.38371 7.80456 3.3837" fill="#EB5757"/>
        </svg>
      </button>
    </div>
    ${$goToFloor(i18n, flat)}
  </div>
`;
}

export default Flat;
