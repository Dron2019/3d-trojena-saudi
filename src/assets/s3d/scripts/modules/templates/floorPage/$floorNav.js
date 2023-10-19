export default function $floorNav(floor) {
  return `
      <article class="s3d-floor__nav">
        <button data-floor_btn data-floor_direction="prev" >
           <svg class="s3d-floor__nav-prev"><use xlink:href="#icon-arrow"></use></svg>
        </button>
        <div data-swiper-floor-list-wrapper></div>
        <p data-current-floor=${floor.floor}>${floor.floor}</p>
        <button data-floor_btn data-floor_direction="next">
           <svg class="s3d-floor__nav-next"><use xlink:href="#icon-arrow"></use></svg>
         </button>
      </article>
  `;
}
