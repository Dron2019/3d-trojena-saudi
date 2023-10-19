function infoFloor(i18n, floor) {
  return `
     <div class="s3d-flat__info-container">
        <p class="s3d-info__title">${i18n.t('information')}</p>
        <table class="s3d-info__table">
          <tbody>
            <tr class="s3d-info__row" data-text="${floor.floor}">
                <th class="s3d-info__name">${i18n.t('Floor.information.floor')}:</th>
                <th class="s3d-info__value">${floor.floor}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${floor.count}">
              <th class="s3d-info__name">${i18n.t('Floor.information.all-flats')}:</th>
              <th class="s3d-info__value">${floor.count}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${floor.free}">
              <th class="s3d-info__name">${i18n.t('Floor.information.free-flats')}:</th>
              <th class="s3d-info__value">${floor.free}</th>
            </tr>
          </tbody>
        </table>
     </div>`;
}

export default infoFloor;
