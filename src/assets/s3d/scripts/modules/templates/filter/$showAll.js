export function $showAll(i18n) {
    return `
    <button class="s3d-filter__reset s3d-filter__reset-desktop" type="button" id="resetFilter" data-reset-filter>
        <span>${i18n.t('Filter.show_all')}</span>
    </button>
    `;
}