

const translationNS = 'breadcrumbs';


export function $breadcrumbs() {
    
    return `
        <div class="s3d-breadcrumbs" data-s3d-breadcrumbs></div>
    `;
}


export const $breadCrumbsFlatItem = (data, i18next) => {
    return `
    <div class=" s3d-breadcrumbs__item">
        <button type="button" class="js-s3d-nav__btn s3d-breadcrumbs__item-button" data-type="${data.type}" data-id="${data.id}">${i18next.t(data.type, { id: data.id, ns: translationNS })}</button>
    </div>
    `
};

export function $breadcrumbsItem(data, i18next) {
    if (!data) return ``;
    return `
        <div class=" s3d-breadcrumbs__item">
            <button type="button" class="js-s3d-nav__btn s3d-breadcrumbs__item-button" data-type="${data.type}">${i18next.t(data.type, { ns: translationNS })}</button>
        </div>
    `
}
export function $breadcrumbsFlybyItem({side, flyby, type}, i18next) {
    return `
        <div class=" s3d-breadcrumbs__item">
            <button type="button" class="js-s3d-nav__btn s3d-breadcrumbs__item-button" data-side="${side}" data-flyby="${flyby}" data-type="${type}">${i18next.t([type, flyby, side].join('_'), { ns: translationNS })}</button>
        </div>
    `
}
export function $breadcrumbsDropdown(data) {
    return `
        <div class=" s3d-breadcrumbs__dropdown">
            <div class=" s3d-breadcrumbs__dropdown-title">Some</div>
            <div class="s3d-breadcrumbs__dropdown-content">
                ${data.map(el => $breadcrumbsItem(el)).join('')}
            </div>
        </div>
    
    `;
}