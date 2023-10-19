import $closeBtn from './$closeBtn';




const $3dTourLink = (link) => {
  if (!link) return '';
  return `
    <button class="s3d-infoBox__link js-s3d-flat__3d-tour" data-href="${link}">
        <span>Explore VR Tour</span>
    </button>
  `
}


function Flat(i18n, data) {
  const imageDefault = `${window.defaultModulePath}/images/examples/no-image.png`;
  const {
    rooms,
    rooms_unit,
    floor,
    price,
    build,
    type,
    number,
    area,
    sale,
    id,
    img_small: srcImage,
  } = data;

  const img = srcImage ? srcImage : imageDefault;
  return `
    <div class="s3d-infoBox__flat">
      ${$closeBtn()}
      <div class="s3d-infoBox__image">
        <img src="${img}"/>
      </div>
      <div class="s3d-infoBox__info">
        <div class="s3d-infoBox__title">
          <span data-s3d-event="update" data-s3d-update="type">${type}</span>
        </div>
        <table class="s3d-infoBox__table">
          <tbody>
            <tr class="s3d-infoBox__row">
              <td class="s3d-infoBox__name">${i18n.t('Flat.information.sale')}</td>
              <td class="s3d-infoBox__value" data-sale="${sale}">
                <span data-s3d-event="update" data-s3d-update="sale">${i18n.t(`sales.${sale}`)}</span>
              </td>
            </tr>
            <tr class="s3d-infoBox__row">
              <td class="s3d-infoBox__name">${i18n.t('Flat.information.area')}</td>
              <td class="s3d-infoBox__value">
                <span data-s3d-event="update" data-s3d-update="area">${area} ${i18n.t('Flat.information.area_unit')}</span>
              </td>
            </tr>
            <tr class="s3d-infoBox__row">
              <td class="s3d-infoBox__name">${i18n.t('Flat.information.type')}</td>
              <td class="s3d-infoBox__value">
                <span data-s3d-event="update" data-s3d-update="type">${type}</span>
              </td>
            </tr>
            <tr class="s3d-infoBox__row">
              <td class="s3d-infoBox__name">${i18n.t('Flat.information.number')}</td>
              <td class="s3d-infoBox__value">
                <span data-s3d-event="update" data-s3d-update="number">${number}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="s3d-infoBox__link" data-s3d-event="transform" data-type="flat" data-id="${id}">
          <span>${i18n.t('infoBox.review_flat')}</span>
        </button>
        ${$3dTourLink(data['3d_tour'])}
      </div>
    </div>`;
};

export default Flat;
