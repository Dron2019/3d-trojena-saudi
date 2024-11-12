import { isDevice } from '../checkDevice';
import device from 'current-device';
import { deviceType, primaryInput } from 'detect-it';

class SliderController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    if (primaryInput !== 'mouse') {
      view.on('touchPolygon', event => { model.touchPolygonMobileHandler(event); });
    } else {
      view.on('mouseKeyDown', event => model.sliderRotateStart(event));
      view.on('mouseMove', event => model.mouseMoveHandler(event));
      view.on('mouseKeyUp', event => model.sliderRotateEnd(event));
      view.on('touchPolygon', event => { model.touchPolygonHandler(event); });
    }
    view.on('keyPress', event => model.keyPressHandler(event));
  }
}

export default SliderController;
