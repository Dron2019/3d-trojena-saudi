import infoFloor from './$floorInfo';
import $floorFilter from './$floorFilter';
import $floorNav from './$floorNav';

function Floor(i18n, floor) {

  let floorTitle = `${floor.build} ${i18n.t('Floor.information.build')}`;
  if (i18n.exists(`Filter.builds.${floor.build}`)) {
    floorTitle = i18n.t(`Filter.builds.${floor.build}`);
  }
  return `
  <div class="s3d-floor js-s3d-floor">
    <div class="s3d__title"> ${floorTitle}  ${i18n.t('Floor.title-1')}  ${i18n.t('Floor.title-2')} ${floor.floor}</div>
    ${infoFloor(i18n, floor)}
    <div class="s3d-flat__menu-container">
      ${$floorNav(floor)}
      ${$floorFilter(i18n)}
    </div>
  </div>
`;
}

export default Floor;
