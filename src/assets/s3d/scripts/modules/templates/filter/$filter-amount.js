export default function $amountFlat(i18n) {
  return `
     <div class="s3d-filter__amount-flat">
     <div class="s3d-filter__amount-flat__group">
       <span class="s3d-filter__amount-flat__num js-s3d__amount-flat__num">25</span>
       ${i18n.t('Filter.Available')}
     </div>
     <div class="s3d-filter__amount-flat__group">
       <span class="s3d-filter__amount-flat__num js-s3d__amount-flat__num-all">456</span>
       ${i18n.t('Filter.Total')}
     </div>
    </div>
  `;
}
