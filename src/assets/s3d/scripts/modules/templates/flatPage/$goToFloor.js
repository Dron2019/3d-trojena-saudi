import $timer from './$timer';

function $goToFlat(i18n, flat) {
  return `
    <div class="s3d-flat__floor">
      <div class="s3d-flat__floor-info">
        <article class="s3d-floor__nav">
          <button data-floor_btn data-floor_direction="prev" >
             <svg class="s3d-floor__nav-prev"><use xlink:href="#icon-arrow"></use></svg>
          </button>
          <p data-current-floor="${flat.floor}">${flat.floor}</p>
          <button data-floor_btn data-floor_direction="next">
             <svg class="s3d-floor__nav-next"><use xlink:href="#icon-arrow"></use></svg>
           </button>
        </article>
        <button class="s3d-flat__to--floor" id="s3d-to-floor">
          <span>${i18n.t('Flat.goToFloor')}</span>
        </button>
      </div>
    </div>
`;
}

export default $goToFlat;
