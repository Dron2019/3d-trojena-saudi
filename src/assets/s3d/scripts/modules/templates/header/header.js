import $favourite from './$favourite';
import $compass from './$compass';
import $headerMenuIcon from './$header-menu-icon';
import { $breadcrumbs } from './$breadcrumbs';
import $infrastructureFilter from '../infrastructureFilter/$infrastructureFilter';
import { $betweenFlybyCustomLinks } from '../../../miniFeatures/betweenFlybyCustomLinks';
import { icon360 } from '../../../assets/icons';
import { $backButton } from '../../../features/backButton';


const $callback = () => {
  return `
  <div class="s3d__menu " data-popup-type="callback" data-open-form="" data-title="Callback">
    <div class="s3d__menu-elem-wrapper">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7215 20.1796H15.613V15.9333L11.8586 13.9515L8.97028 16.7157C8.06354 16.0966 7.26631 15.336 6.6219 14.4683L9.51026 11.704L7.43951 8.11098H3V8.96414C3 15.1508 8.25711 20.182 14.7215 20.182M12.1694 16.0673L13.8301 16.9424V18.4367C12.6737 18.3367 11.5734 18.0491 10.5647 17.603L12.1694 16.0673ZM4.82114 9.81486H6.38248L7.29687 11.4042L5.69223 12.9399C5.22612 11.9746 4.92302 10.9215 4.82114 9.81486Z" fill="#F7FCFF"></path>
        <path d="M21 7.14813H13.4378V9.09821H21V7.14813Z" fill="#F7FCFF"></path>
        <path d="M16.4612 12.3987L11.9987 8.12561L16.4994 3.81836L17.941 5.19804L14.8794 8.12561L17.9028 11.019L16.4612 12.3987Z" fill="#F7FCFF"></path>
      </svg>
    </div>
  </div>

  `;
}
const $tutorial = () => {
  return `
  <div class="s3d__menu js-s3d-ctr__helper" data-title="Tutorial">
    <div class="s3d__menu-elem-wrapper">
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5002 20.1794C7.98926 20.1794 4.31836 16.5085 4.31836 11.9976C4.31836 7.48669 7.98926 3.81836 12.5002 3.81836C17.0111 3.81836 20.682 7.48926 20.682 12.0002C20.682 16.5111 17.0111 20.182 12.5002 20.182V20.1794ZM12.5002 5.61656C8.98084 5.61656 6.11656 8.48084 6.11656 12.0002C6.11656 15.5195 8.98084 18.3838 12.5002 18.3838C16.0195 18.3838 18.8838 15.5195 18.8838 12.0002C18.8838 8.48084 16.0195 5.61656 12.5002 5.61656Z" fill="#F7FCFF"></path>
        <path d="M13.3993 16.5368H11.6011V11.0754H9.77976V9.27976H13.3993V16.5368Z" fill="#F7FCFF"></path>
        <path d="M13.3993 6.53621H11.6011V8.35753H13.3993V6.53621Z" fill="#F7FCFF"></path>
        <path d="M15.218 15.6505H9.77976V17.4487H15.218V15.6505Z" fill="#F7FCFF"></path>
      </svg>
    </div>
  </div>

  `;
}
const $share = () => {
  return `
  <div class="s3d__menu" data-s3d-share data-title="Share">
    <div class="s3d__menu-elem-wrapper">
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.682 15.364C20.682 17.5731 18.8911 19.364 16.682 19.364H8.31836C6.10922 19.364 4.31836 17.5731 4.31836 15.364V11.1759C4.31836 10.6171 4.7714 10.1641 5.33024 10.1641V10.1641C5.88909 10.1641 6.34213 10.6171 6.34213 11.1759V13.7527C6.34213 15.7347 7.94882 17.3414 9.93078 17.3414H15.0695C17.0515 17.3414 18.6582 15.7347 18.6582 13.7527V11.176C18.6582 10.6171 19.1112 10.1641 19.6701 10.1641V10.1641C20.229 10.1641 20.682 10.6171 20.682 11.176V15.364Z" fill="#F7FCFF"/>
        <path d="M13.5121 8.10467C13.5121 7.54582 13.059 7.09277 12.5002 7.09277V7.09277C11.9413 7.09277 11.4883 7.54582 11.4883 8.10467V13.2466C11.4883 13.8054 11.9413 14.2585 12.5002 14.2585V14.2585C13.059 14.2585 13.5121 13.8054 13.5121 13.2466V8.10467Z" fill="#F7FCFF"/>
        <path d="M15.572 9.13991C15.1768 9.53483 14.5363 9.53463 14.1414 9.13946L13.6787 8.67646C13.028 8.02531 11.9725 8.0253 11.3218 8.67643L10.859 9.13949C10.4641 9.53464 9.82363 9.53483 9.42849 9.13991V9.13991C9.0333 8.74494 9.03318 8.10438 9.42823 7.70926L10.6066 6.53068C11.6524 5.48473 13.3481 5.48473 14.3939 6.53069L15.5722 7.70925C15.9673 8.10437 15.9671 8.74494 15.572 9.13991V9.13991Z" fill="#F7FCFF"/>
      </svg>
    </div>
  </div>

  `;
}
const $screenshot = () => {
  return `
  <div class="s3d__menu" data-s3d-screenshot data-title="Screenshot">
    <div class="s3d__menu-elem-wrapper">
      <svg  width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.30641 19.1821C9.30641 19.7343 8.85869 20.1821 8.30641 20.1821H5.31836C4.76607 20.1821 4.31836 19.7343 4.31836 19.1821V16.189C4.31836 15.6367 4.76607 15.189 5.31836 15.189H5.34294C5.89523 15.189 6.34294 15.6367 6.34294 16.189V17.1575C6.34294 17.7097 6.79065 18.1575 7.34294 18.1575H8.30641C8.85869 18.1575 9.30641 18.6052 9.30641 19.1575V19.1821Z" fill="#F7FCFF"/>
        <path d="M20.6818 19.1541C20.6818 19.7064 20.234 20.1541 19.6818 20.1541H16.7266C16.1743 20.1541 15.7266 19.7064 15.7266 19.1541V19.1295C15.7266 18.5773 16.1743 18.1295 16.7266 18.1295H17.6572C18.2094 18.1295 18.6572 17.6818 18.6572 17.1295V16.1938C18.6572 15.6416 19.1049 15.1938 19.6572 15.1938H19.6818C20.234 15.1938 20.6818 15.6416 20.6818 16.1938V19.1541Z" fill="#F7FCFF"/>
        <path d="M20.6816 7.8017C20.6816 8.36078 20.2284 8.814 19.6693 8.814V8.814C19.1102 8.814 18.657 8.36078 18.657 7.8017V7.32719C18.657 6.50746 17.9925 5.84294 17.1727 5.84294H16.7008C16.1417 5.84294 15.6885 5.38972 15.6885 4.83065V4.83065C15.6885 4.27158 16.1417 3.81836 16.7008 3.81836H18.185C19.5638 3.81836 20.6816 4.9361 20.6816 6.31491V7.8017Z" fill="#F7FCFF"/>
        <path d="M6.34294 7.82195C6.34294 8.38102 5.88972 8.83424 5.33065 8.83424V8.83424C4.77158 8.83424 4.31836 8.38102 4.31836 7.82195V6.33642C4.31836 4.9611 5.43327 3.84619 6.80859 3.84619H8.28653C8.8456 3.84619 9.29882 4.29941 9.29882 4.85848V4.85848C9.29882 5.41755 8.8456 5.87076 8.28653 5.87076H7.82088C7.00464 5.87076 6.34294 6.53246 6.34294 7.3487V7.82195Z" fill="#F7FCFF"/>
        <path d="M12.4905 16.4414C10.0154 16.4414 8.00098 14.4269 8.00098 11.9519C8.00098 9.47685 10.0154 7.4624 12.4905 7.4624C14.9655 7.4624 16.98 9.47685 16.98 11.9519C16.98 14.4269 14.9655 16.4414 12.4905 16.4414ZM12.4905 9.48697C11.1315 9.48697 10.0255 10.5929 10.0255 11.9519C10.0255 13.3109 11.1315 14.4168 12.4905 14.4168C13.8495 14.4168 14.9554 13.3109 14.9554 11.9519C14.9554 10.5929 13.8495 9.48697 12.4905 9.48697Z" fill="#F7FCFF"/>
      </svg>
    </div>
  </div>

  `;
}


const $pins360 = () => {
  return `
    <div class="s3d__menu" data-s3d-vr-pins data-title="Views">
      <div class="s3d__menu-elem-wrapper">
        ${icon360()}
      </div>
    </div>
  `;
}

function mobileOpener() {
  if (document.documentElement.classList.contains('desktop')) return ``;
  const id = 'mobileheader';

  window.addEventListener('visit-page', (evt) => {
    if (document.querySelector(`#${id}`).checked) {
      document.querySelector(`[for="${id}"]`).click();
    }
  })

  return `
  <input type="checkbox" id="${id}">
  <label for="${id}" class="s3d-header__menu-call"></label>
  `
}

function $downloadBrochure(link) {
  return `
    <a target="_blank" download href="${link}" class="s3d__menu" data-title="Brochure">
      <div class="s3d__menu-elem-wrapper">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.682 19H4.31836V9.80017H6.34213V16.9774H18.6582V9.80017H20.682V19Z" fill="#F7FCFF"></path>
          <path d="M11.4884 12.1657L13.5121 12.1657V5L11.4884 5L11.4884 12.1657Z" fill="#F7FCFF"></path>
          <path d="M10.144 9.40345L12.5003 11.7612L14.8565 9.40345L16.2876 10.8337L12.5003 14.6217L8.71291 10.8337L10.144 9.40345Z" fill="#F7FCFF"></path>
        </svg>
      </div>
    </a>
  `;
}
function $amenities() {
  const id = 's3d-map-call-mobile';
  window.addEventListener('change',function(evt){
    if (evt.target.getAttribute('id') === id) {
      document.querySelectorAll('[data-amenities]').forEach(el => {
        evt.target.checked ? 
          el.classList.add('active') :
          el.classList.remove('active') ;
      });
    }
  });
  return `
    <label class="s3d__menu" data-title="Amenities" data-amenities for="${id}">
      <div class="s3d__menu-elem-wrapper">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.736 21H3.5V13.764H10.736V21ZM5.58654 18.9135H8.6495V15.8505H5.58654V18.9135Z" fill="#F7FCFF"></path>
          <path d="M10.736 11.7326H3.5V4.49661H10.736V11.7326ZM5.58654 9.64611H8.6495V6.58314H5.58654V9.64611Z" fill="#F7FCFF"></path>
          <path d="M16.3854 13.2293L11.2707 8.11463L16.3854 3L21.5 8.11463L16.3854 13.2293ZM14.2204 8.11463L16.3854 10.2796L18.5504 8.11463L16.3854 5.94963L14.2204 8.11463Z" fill="#F7FCFF"></path>
          <path d="M20.0034 21H12.7674V13.764H20.0034V21ZM14.8539 18.9135H17.9169V15.8505H14.8539V18.9135Z" fill="#F7FCFF"></path>
        </svg>
      </div>
    </label>
  `;
}

function header(i18n, config) {
  return `
    <header class="s3d-header">
      ${$favourite()}
      ${$backButton()}
      ${$breadcrumbs()}
      ${$compass()}
      <div class="s3d__title js-s3d-ctr__option__text"></div>
      ${mobileOpener()}
      ${$betweenFlybyCustomLinks()}
      ${$downloadBrochure(config['project_brochure'])}
      ${$amenities()}
      ${$callback()}
      ${$share()}
      ${$screenshot()}
      ${$headerMenuIcon()}
      <!--${$tutorial()}-->
    </header>
    ${$infrastructureFilter()}
  `;
}

export default header;
