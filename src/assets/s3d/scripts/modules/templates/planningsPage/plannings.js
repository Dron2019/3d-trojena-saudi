import planningFilterMobBtn from '../filter/$planningFilterMobBtn';

function Plannings(i18n) {
  return `
  <div class="js-s3d__wrapper__plannings s3d__wrap s3d__wrapper__plannings" id="js-s3d__plannings">
    <div class="s3d-pl">
      <div class="s3d-pl__amount-flat">${i18n.t('Plannings.found')}<span class="s3d-pl__amount-flat__num js-s3d__amount-flat__num"></span>${i18n.t('Plannings.found--from')}<span class="s3d-pl__amount-flat__num js-s3d__amount-flat__num-all"></span>${i18n.t('Plannings.found-flats')}</div>
      <div class="s3d-pl__container">
        <div class="s3d-pl__not-found js-s3d-pl__not-found">${i18n.t('Plannings.notFound')}</div>
        <div class="s3d-pl__list js-s3d-pl__list"></div>
      </div>
     ${planningFilterMobBtn(i18n)}
    </div>
  </div>`;
}

export default Plannings;
