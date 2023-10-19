const attr = 'data-between-flyby-custom-links';

export function betweenFlybyCustomLinks(data, config) {
  const links = config.betweenFlybyCustomLinks;
  const { type, flyby, side } = data;
  const containerSelector = `[${attr}]`;
  const $container = document.querySelector(containerSelector);

  if (!links) return console.warn(`Data for betweenFlybyCustomLinks not found in 'settings.json'`);

  const connectedLinkWithCurrentFlyby = links[`${type}_${flyby}_${side}`];

  if (!connectedLinkWithCurrentFlyby) return $container.innerHTML = '';


  const renderLink = connectedLinkWithCurrentFlyby.split('_');
  $container.innerHTML = `
    <div class="s3d__menu js-s3d-nav__btn" data-type="${renderLink[0]}" data-flyby="${renderLink[1]}" data-side="${renderLink[2]}" data-title="Change View">
      <div class="s3d__menu-elem-wrapper">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.4774 19.9798H4.52246V4.02148H20.4774V19.9764V19.9798ZM6.88528 17.6136H18.1112V6.38768H6.88528V17.6136Z" fill="#F7FCFF"></path>
        </svg>
      </div>
    </div>
  `;
}

export function $betweenFlybyCustomLinks() {
  return `
    <div style="margin-right: 12px" ${attr}></div>
  `;
}