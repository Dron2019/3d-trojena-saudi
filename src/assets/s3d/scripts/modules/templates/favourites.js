function Favourites(i18n, count) {
  return `
  <div class="js-s3d__wrapper__favourites s3d__wrap" id="js-s3d__favourites">
    <div class="s3d-fv js-s3d-fv">
      <div class="s3d-fv__amount-flat">${i18n.t('favourite--added')}<span class="js-s3d__fv-count"></span>${i18n.t('favourite--apartments')}</div>
      <div class="s3d-fv__container">
        <div class="s3d-fv__list js-s3d-fv__list"></div>
      </div>
    </div>
  </div>`;
}

export default Favourites;
