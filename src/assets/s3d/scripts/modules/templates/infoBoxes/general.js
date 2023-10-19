import $closeBtn from './$closeBtn';

function general(i18n, data) {
  const {
    type,
    flyby,
    side,
  } = data;
  if (!type) {
    return '';
  }
  return `
    <div class="s3d-infoBox__general">
        ${$closeBtn()}
        <span class="s3d-infoBox__title">
          ${i18n.t(`infoBox.${type}--${flyby}--${side}`)}
        </span>
        <button class="s3d-infoBox__link" data-s3d-event="transform" ${type && `data-type="${type}"`} ${flyby ? `data-flyby="${flyby}"` : ''} ${side ? `data-side="${side}"` : ''}>
            ${i18n.t('infoBox.review')}
        </button>
    </div>`;
}

export default general;
