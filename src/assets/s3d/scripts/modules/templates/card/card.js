import $addToFavourite from '../$addToFavourite';
import closeCard from './$closeCard';

function Card(i18n, flat, favouritesIds$) {
  const imageDefault = `${window.defaultModulePath}/images/examples/no-image.png`;
  const {
    area,
    rooms,
    rooms_unit,
    floor,
    number,
    build,
    type,
    price,
    sale,
    img_big: src,
    id,
  } = flat;

  const $price = (i18n, flat) => {
    return `
       <div class="s3d-card__price s3d-card__image-info">
          ${price} ${i18n.t('Flat.information.priceText')}
        </div>
    `;
  };

  const $status = (i18n, flat) => {
    return `
       <div class="s3d-card__status s3d-card__image-info" data-sale='${sale}'>
          ${i18n.t(`sales.${sale}`)}
        </div>
    `;
  };

  const $number = (i18n, flat) => {
    return `
       <div class="s3d-card__rooms-count s3d-card__image-info">
          ${number}
       </div>
    `;
  };

  const isFavourite = favouritesIds$.value.includes(id);

  return `
    <div class="s3d-card js-s3d-card" data-id="${id}" data-key="id" data-sale="${sale}">
      ${closeCard()}
      <div class="s3d-card__image">
        <img src="${src || imageDefault}" data-key="src">
         ${$status(i18n, flat)}
         ${$number(i18n, flat)}
         ${$price(i18n, flat)}
      </div>
      <div class="s3d-card__info-wrapper">
        <div class="s3d-card__title">
            <span data-key="rooms">${i18n.t(`rooms-abbreviation.${rooms}`)} - <span data-key="type">${type}
        </div>
        <div class="s3d-card__table">
          <div class="s3d-card__row">
            <div class="s3d-card__name">${i18n.t('Flat.information.area')}:</div>
            <div class="s3d-card__value" data-key="floor">${area} ${i18n.t('Flat.information.area_unit')}</div>
          </div>
        </div>
        <div class="s3d-card__buttons">
            <button type="button" class="s3d-card__link js-s3d-card__link">
              <span class="s3d-card__link-text">${i18n.t('Flat.goToFlat')}</span>
            </button>
            ${$addToFavourite(i18n, flat, favouritesIds$)}
        </div>
      </div>
   </div>`;
}

export default Card;
