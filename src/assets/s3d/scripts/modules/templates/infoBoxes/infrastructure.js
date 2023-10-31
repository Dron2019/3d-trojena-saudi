import { deviceType } from 'detect-it';
import $closeBtn from './$closeBtn';

function infrastructure(i18n, data) {
  // const $button = data.href && deviceType === 'hybrid' || deviceType === 'touchOnly' ? `<button data-href="${data.href}" class="s3d-infoBox__link js-s3d-flat__3d-tour">
  //   <span>Review</span>
  // </button>` :  ' ';
  const $button = data.href && data.href !== 'undefined' ? `<button data-href="${data.href}" class="s3d-infoBox__link js-s3d-flat__3d-tour">
    <span>Review</span>
  </button>` :  ' ';
  const $title = data.title ? `<span class="s3d-infoBox__infrastructure-title">
    ${data.title}
  </span>` : '';

  const $description = data.text ? `<span class="s3d-infoBox__infrastructure-description">
    ${data.text}
  </span>` : '';

  const $img = data.img ? `<div class="s3d-infoBox__infrastructure-img">
    <img src="${data.img}" onerror="this.remove()">
  </div>` : '';
  return `
    <div class="s3d-infoBox__infrastructure" ${!data.img ? 'data-no-image': ''}>
      ${$closeBtn()}
      ${$img}
      ${$title}
      ${$description}
      ${$button}
      <!--<style data-infrastructure-clicked-style>
        polygon[data-id*="${data.id}"] {
          opacity: 1;
        }
      </style>-->
    </div>`;
}

export default infrastructure;
