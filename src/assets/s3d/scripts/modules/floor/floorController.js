class FloorController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('changeFloorHandler', event => {
      const direction = event.getAttribute('data-floor_direction');
      this._model.changeFloorHandler(direction);
      this._model.history.update({ type: 'floor', ...this._model.configProject });
    });
    view.on('changeFloorHandlerByDirectClick', button => {
      const transferClickDataToNumbers = Object.entries({ ...button.dataset }).reduce(( acc, el ) => {
        acc[el[0]] =  Number.isNaN(+el[1]) ? el[1] : +el[1];
        return acc;
      }, {})
      this._model.history.update(transferClickDataToNumbers);
      this._model.update(transferClickDataToNumbers);
    });
    view.on('clickFloorHandler', polygon => {
      const id = polygon.getAttribute('data-id');
      const sold = (polygon.getAttribute('data-sold') === 'true');

      if (!id || sold) return;
      this._model.selectFlat(id);
    });

    view.on('updateHoverDataFlat', event => {
      this._model.updateHoverDataFlat(event);
    });

    view.on('bedroomsFilter', event => {
      this._model.bedroomsFilter(event);
    });
  }
}

export default FloorController;
