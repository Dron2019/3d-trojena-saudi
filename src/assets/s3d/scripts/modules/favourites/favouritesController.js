class FavouritesController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('clickFavouriteOpen', () => {
      model.openFavouritesHandler();
    });

    view.on('clickFavouriteHandler', element => {
      model.changeFavouritesHandler(element, true);
    });

    view.on('removeElement', close => {
      const card = close.closest('.js-s3d-card');
      // eslint-disable-next-line radix
      const id = parseInt(card.getAttribute('data-id'));
      if (!id) return;
      model.changeFavouritesHandler(card, false);
      model.removeElement(id);
    });

    view.on('clickElementHandler', card => {
      // eslint-disable-next-line radix
      const id = parseInt(card.getAttribute('data-id'));
      model.selectElementHandler(id);
    });
  }
}

export default FavouritesController;
