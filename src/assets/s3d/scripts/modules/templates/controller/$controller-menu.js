function ControllerMenu(i18n, data) {
  /**Выводит ссылки на облеты, которые указаны в settings.json */

  const $mapButton = (i18n) => {
    return `
      <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" data-type="map">${i18n.t('ctr.nav.map')}</button>
    `;
  };

  const $genplanButton = (i18n) => {
    return `
      <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" data-type="genplan">${i18n.t('ctr.nav.genplan')}</button>
    `;
  };

  //кнопка для випадків, коли 3д має лише один обліт з квартирами та поверхами
  const $flybyButton = (i18n) => {
    return `
      <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" data-type="flyby" data-flyby="1" data-side="outside" >${i18n.t('ctr.nav.flyby_1_outside')}</button>
    `;
  };


  //кнопка для випадків, коли 3д має окрім генплана декілька обльотів
  const innerFlybys = [];
  Object.values(data.flyby).forEach(flyby => {
    Object.values(flyby).forEach(side => {
      if (side['id']) {
        innerFlybys.push({
          ...side,
          side: side['id'].split('_')[2],
          flyby: side['id'].split('_')[1]
        })
      }
    })
  });

  const $innerFlybyButtons = innerFlybys.map(el => `
    <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" data-type="flyby" data-flyby="${el.flyby}" data-side="${el.side}">${i18n.t('ctr.nav.'+el.id)}</button>
  `).join('');

  const $optionFlybyButtons = (i18n) => {
    return `
       <div class="js-ctr-btn s3d-nav__btn s3d-ctr__option">
        <div class="s3d-ctr__option__title ">${i18n.t('ctr.nav.flyby')}</div>
        <div class="s3d-ctr__option__buttons">
           ${$innerFlybyButtons}
         </div>
      </div>
    `;
  };
  const $option2FlybyButtons = (i18n) => {
    return `
       <div class="js-ctr-btn s3d-nav__btn s3d-ctr__option">
        <div class="s3d-ctr__option__title ">${i18n.t('ctr.nav.phases')}</div>
        <div class="s3d-ctr__option__buttons">
          <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" data-type="flyby" data-flyby="3" data-side="outside">${i18n.t('ctr.nav.flyby_3_outside')}</button>
          <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" data-type="flyby" data-flyby="3" data-side="inside">${i18n.t('ctr.nav.flyby_3_inside')}</button>
         </div>
      </div>
    `;
  };

  const $planningsButton = (i18n) => {
    return ``;
    return `
       <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" type="button" data-type="plannings">${i18n.t('ctr.nav.plannings')}</button>
    `;
  };

  const $flatButton = (i18n) => {
    return `
       <button class="s3d-nav__btn js-s3d-nav__btn" type="button" data-type="flat" disabled>${i18n.t('ctr.nav.flat')}</button>
    `;
  };

  const $floorButton = (i18n) => {
    return `
       <button style="display: none" class="s3d-nav__btn js-s3d-nav__btn" type="button" data-type="floor" disabled>${i18n.t('ctr.nav.floor')}</button>
    `;
  };
  const $floorList = (i18n) => {
    const attributeForThisContainer = 'data-floor-list-dropdown';
    window.addEventListener('floor-list-init', ({ detail }) => {
      if (!Array.isArray(detail)) return;

      const floorsOfEverySection = detail.reverse().reduce((acc,el) => {
        acc[el.build+'_'+el.section] = { ...el };
        return acc;
      }, {});

      document.querySelector(`[${attributeForThisContainer}]`).innerHTML = Object.values(floorsOfEverySection).map(({build,section,floor}) => {
        return `
          <button 
            class="s3d-nav__btn js-s3d-nav__btn" 
            type="button" 
            data-type="floor" 
            data-build="${build}" 
            data-floor="${floor}" 
            data-section="${section}"
          >
          ${i18n.exists(`Filter.builds.${build}`) ? i18n.t(`Filter.builds.${build}`) :  i18n.t('floor_list.build', { build: build })}
          </button>
        `;
      }).join('');
    })

    return `
      <div class="js-ctr-btn s3d-nav__btn s3d-ctr__option">
          <div class="s3d-ctr__option__title ">${i18n.t('ctr.nav.floor_plans')}</div>
          <div class="s3d-ctr__option__buttons s3d-ctr__option__buttons--floors" ${attributeForThisContainer} data-dont-make-me-active style="">
          </div>
        </div>
    `;
  }

  return `
    <div class="s3d-ctr__nav" id="js-s3d-ctr__elem">
      <div class="s3d-ctr__nav__title">${i18n.t('ctr.nav.title')}</div>
      <button class="js-ctr-btn s3d-nav__btn js-s3d-nav__btn" data-type="earth">${i18n.t('ctr.nav.earth')}</button>
      ${$mapButton(i18n)}
      ${$genplanButton(i18n)}
      <!--${$flybyButton(i18n)}-->
      <!--${$option2FlybyButtons(i18n)}-->
      ${$optionFlybyButtons(i18n)}
      ${$planningsButton(i18n)}
      <!--${$floorButton(i18n)}-->
      <!--${$flatButton(i18n)}-->
      <!--${$floorList(i18n)}-->
    </div>`;
}

export default ControllerMenu;
