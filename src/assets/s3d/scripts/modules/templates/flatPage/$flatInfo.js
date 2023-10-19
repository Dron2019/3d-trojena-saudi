import { has } from "lodash";

//RF second floor 1F first floor GF ground floor BF basement floor
function flatInfo(i18n, flats) {

  const flatExteriorImage = has(flats, 'img_big') ? 
  `
    <tr class="s3d-info__row" >
      <th colspan="2">
        <button class="s3d__callback" data-flat-image="${flats['img_big']}">
          <span>
            ${i18n.t('Exterior')}
          </span>
        </button>
      </th>
    </tr>
  ` : 
  ``;
  const flatBasementImage = has(flats, 'images.without.3d') ? 
  `
    <tr class="s3d-info__row" >
      <th colspan="2">
        <button class="s3d__callback  active" data-flat-image="${flats['images']['without']['3d']}">
          <span>
            ${i18n.t('Basement')}
          </span>
        </button>
      </th>
    </tr>
  ` : 
  ``;
  const flatFirstFloorImage = has(flats, 'images.with.3d') ? 
  `
    <tr class="s3d-info__row" >
      <th colspan="2">
        <button class="s3d__callback" data-flat-image="${flats['images']['with']['3d']}">
          <span>
            ${i18n.t('First floor')}
          </span>
        </button>
      </th>
    </tr>
  ` : 
  ``;
  const flatGroundFloorButton = has(flats, 'images.without.2d') ? 
  `
    <tr class="s3d-info__row" >
      <th colspan="2">
        <button class="s3d__callback " data-flat-image="${flats['images']['without']['2d']}">
          <span>
            ${i18n.t('Ground floor')}
          </span>
        </button>
      </th>
    </tr>
  ` : 
  ``;
  const secondFloorButton = has(flats, 'images.with.2d') ? 
  `
    <tr class="s3d-info__row" >
      <th colspan="2">
        <button class="s3d__callback" data-flat-image="${flats['images']['with']['2d']}">
          <span>
            ${i18n.t('Second Floor')}
          </span>
        </button>
      </th>
    </tr>
  ` : 
  ``;

  return `
     <div class="s3d-flat__info-container">
        <!--<p class="s3d-info__title">${i18n.t('Flat.information.title')}</p>-->
        <table class="s3d-info__table">
          <tbody>
            ${flatExteriorImage}
            ${flatBasementImage}
            ${flatGroundFloorButton}
            ${flatFirstFloorImage}
            ${secondFloorButton}
            <tr class="s3d-info__row" data-text="${flats.sale}">
              <th colspan="2" class="s3d-info__value" data-sale=${flats.sale}>${i18n.t(`sales.${flats.sale}`)}</th>
            </tr>
            <!--<tr class="s3d-info__row" data-text="${flats.build}">
              <th class="s3d-info__name">${i18n.t('Flat.information.tower')}:</th>
              <th class="s3d-info__value">${i18n.t('Flat.builds.'+flats.build)}</th>
            </tr>-->
            <tr class="s3d-info__row" data-text="${flats.number}">
              <th class="s3d-info__name">${i18n.t('Flat.information.number')}:</th>
              <th class="s3d-info__value">${flats.number}</th>
            </tr>
            <!--<tr class="s3d-info__row" data-text="${flats.floor}">
              <th class="s3d-info__name">${i18n.t('Flat.information.floor')}:</th>
              <th class="s3d-info__value">${flats.floor}</th>
            </tr>-->
            <tr class="s3d-info__row" data-text="${flats.area}">
              <th class="s3d-info__name">${i18n.t('Flat.information.allArea')}:</th>
              <th class="s3d-info__value" >${flats.area} ${i18n.t('Flat.information.area_unit')}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${flats.rooms}">
              <th class="s3d-info__name">${i18n.t('Flat.information.type')}:</th>
              <th class="s3d-info__value">${i18n.t(`rooms-abbreviation.${flats.rooms}`)} ${flats.type}</th>
            </tr>
            <tr class="s3d-info__row">
              <th colspan="2">
              <button class="s3d__callback js-popup-open " data-popup-type="callback" data-open-form>
                <span>
                  ${i18n.t('Flat.buttons.callback--1')}
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.83174 4.52852L10.0381 7.57625L8.12095 9.39862L7.62612 9.86899L8.04804 10.4057C8.7241 11.2657 9.48676 12.1005 10.315 12.8879L10.3151 12.8879C11.2707 13.7963 12.2873 14.6173 13.3373 15.3278L13.837 15.6659L14.2743 15.2502L16.2205 13.4002L19.4264 16.4477L17.8508 17.9455C17.4672 18.3101 16.9942 18.5001 16.4021 18.5001C15.6506 18.5001 14.6613 18.1919 13.4389 17.4776C11.5099 16.35 9.66365 14.5991 9.03417 14.0005L9.03405 14.0003C8.29816 13.3008 6.65158 11.7319 5.56016 10.1014L5.56014 10.1013C4.88464 9.09227 4.56741 8.28068 4.51042 7.65433C4.45715 7.06882 4.62608 6.62516 5.01617 6.25434C5.01617 6.25434 5.01617 6.25433 5.01617 6.25433L6.83174 4.52852ZM19.5436 16.5591C19.5433 16.5588 19.543 16.5585 19.5427 16.5582ZM7.80456 3.3837C7.26345 2.86934 6.40017 2.86973 5.85918 3.38344L5.85889 3.38371L3.98272 5.16715L3.98271 5.16716C3.24508 5.86834 2.92372 6.76942 3.01659 7.79024C3.10575 8.77021 3.5711 9.82652 4.31363 10.9357C5.50449 12.7149 7.25882 14.3824 7.98845 15.076L8.00048 15.0874L8.0006 15.0875L8.00605 15.0927C8.63321 15.6891 10.5893 17.5493 12.6819 18.7726L12.682 18.7726C14.0142 19.5511 15.2736 20.0001 16.4021 20.0001C17.3557 20.0001 18.2055 19.6778 18.8843 19.0327L20.5756 17.4249C20.7071 17.2999 20.8113 17.1518 20.8833 16.9889L20.9973 16.9393V16.4477C20.9973 16.0745 20.844 15.7252 20.5762 15.4711M20.5753 15.4702L17.1933 12.2554C17.1933 12.2554 17.1933 12.2554 17.1933 12.2554C16.9278 12.003 16.5789 11.87 16.2205 11.87C15.8618 11.87 15.5135 12.0033 15.2482 12.2549L15.2476 12.2554L13.6847 13.7411C12.8793 13.1614 12.0953 12.5105 11.3485 11.8007C10.7425 11.2246 10.1758 10.6233 9.65757 10.0075L11.1873 8.55342C11.1873 8.55342 11.1873 8.55342 11.1873 8.55341C11.7499 8.01858 11.7495 7.13408 11.1876 6.59936L11.1873 6.59907L7.80458 3.38372C7.80457 3.38371 7.80457 3.38371 7.80456 3.3837" fill="#EB5757"/>
                </svg>
              </button>
              </th>
            </tr>
          </tbody>
        </table>
     </div>`;
}

export default flatInfo;
