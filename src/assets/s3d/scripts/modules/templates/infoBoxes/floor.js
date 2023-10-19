import $closeBtn from './$closeBtn';

function Floor(i18n, data) {
  const {
    floor,
    count,
    free,
    build,
    section,
  } = data;

  return `
      <div class="s3d-infoBox__floor">
        ${$closeBtn()}
        <div class="s3d-infoBox__info">
          <span class="s3d-infoBox__title">
            <span data-s3d-event="update" data-s3d-update="floor">${floor}</span>
            ${i18n.t('Floor.information.floor')}
          </span>
          <table class="s3d-infoBox__table">
            <tbody>
              <tr class="s3d-infoBox__row">
                <td class="s3d-infoBox__name">${i18n.t('Floor.information.all-flats')}:</td>
                <td class="s3d-infoBox__value" data-s3d-event="update" data-s3d-update="rooms">${count}</td>
              </tr>
              <tr class="s3d-infoBox__row">
                <td class="s3d-infoBox__name">${i18n.t('Floor.information.free-flats')}:</td>
                <td class="s3d-infoBox__value" data-s3d-event="update" data-s3d-update="free">${free}</td>
              </tr>
            </tbody>
          </table>
          <button class="s3d-infoBox__link" data-s3d-event="transform" data-type="floor" data-section="${section}" data-build="${build}" data-floor="${floor}">
            <span>${i18n.t('infoBox.review')}</span>
          </button>
         </div>
      </div>`;
}

export default Floor;
