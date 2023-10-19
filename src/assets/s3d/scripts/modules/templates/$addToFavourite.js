function $addToFavourite(i18n, flat, favouritesIds$) {
  const { id } = flat;
  const isFavourite = favouritesIds$.value.includes(id);
  return `
      <label aria-label="button" aria-role="button" data-id="${id}" data-key="id" class="s3d__add-to-favourite js-s3d-add__favourite">
         <input type="checkbox" data-key="checked" ${isFavourite ? 'checked' : ''}/>
         <svg><use xlink:href="#icon-favourites"></use></svg>
      </label>
  `;
}

export default $addToFavourite;
