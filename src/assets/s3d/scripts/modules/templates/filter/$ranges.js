export default function $ranges(i18n) {
  return `
      <div class="s3d-filter__range-wrapper">
        <!--<div class="s3d-filter__param s3d-filter__range">
          <div class="s3d-filter__param-title">${i18n.t('Filter.range.floor')}</div>
          <div class="s3d-filter__range-list js-filter-range">
            <input class="js-s3d-filter__floor--input" data-type="floor" data-min="1" data-max="15" data-from="1" data-to="15">
          </div>
        </div>-->
        <div class="s3d-filter__param s3d-filter__range">
          <div class="s3d-filter__param-title">${i18n.t('Filter.range.area')}, ${i18n.t('Filter.range.area_unit')}</div>
          <div class="s3d-filter__range-list js-filter-range">
            <input class="js-s3d-filter__area--input" data-type="area" data-min="5" data-max="555" data-from="5" data-to="555">
          </div>
        </div>
      </div>
  `;
}
