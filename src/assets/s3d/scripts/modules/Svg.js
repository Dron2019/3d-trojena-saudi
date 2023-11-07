import axios from 'axios';
import center from 'svg-polygon-center';
import { AppContentCustomError } from './errors';
import { isObject } from 'lodash';


class Svg {
  constructor(data) {
    this.activeSlide = data.activeElem;
    this.type = data.type;
    this.setting = data.settings;
    this.wrapper = data.wrapper[0];
    this.controlPoint = data.controlPoint;
    this.hoverData$ = data.hoverData$;
    this.typeSelectedFlyby$ = data.typeSelectedFlyby$;
    this.linksSvg = data.linksSvg;
    this.pin = data.pin;
    this.pinsInfo = data.pinsInfo;
    
    this.sliderPopup = data.sliderPopup;
    this.i18n = data.i18n;
    this.floorList$ = data.floorList$;
    this.fillCategories = {
      default: 'url(#image)',
      vr360: 'url(#vr360)',

    };
    this.pinWidth = 30;
    this.pinHeight = 30;
    this.getFlat = data.getFlat;
  }

  async init() {
    const container = this.wrapper.querySelector('.s3d__svg-container');
    if (container) container.remove();
    await this.createSvg(this.controlPoint, this.type, this.typeSelectedFlyby$);
  }

  // получает
  async createSvg(config, name, typeSelectedFlyby$) {
    const svgContainer = createMarkup('div', { class: `s3d__svg-container js-s3d__svg-container__${name}` });
    this.wrapper.querySelector('.js-s3d__wrapper__canvas').insertAdjacentElement('beforeend', svgContainer);
    const promiseList = config.map(key => new Promise(resolve => {
      const svgWrap = document.createElement('div');
      if (+key === +this.activeSlide) {
        svgWrap.classList = `s3d__svgWrap js-s3d__svgWrap ${this.type}__${key} ${this.type}__${this.setting.flyby}__${this.setting.side}__${key} s3d__svg__active`;
      } else {
        svgWrap.classList = `s3d__svgWrap js-s3d__svgWrap ${this.type}__${key} ${this.type}__${this.setting.flyby}__${this.setting.side}__${key}`;
      }
      svgWrap.dataset.id = key;
      svgContainer.insertAdjacentElement('beforeend', svgWrap);
      // $(svgContainer).append(svgWrap);

      let path = '';

      const defaultPath = `${defaultModulePath}/images/svg/default.svg`;


      if (this.setting.type && this.setting.flyby && this.setting.side) {
        path = this.linksSvg[this.setting.type][this.setting.flyby][this.setting.side][typeSelectedFlyby$.value][key] ?? defaultPath;
        // path = `${defaultModulePath}/images/svg/${typeSelectedFlyby$.value}/${this.setting.type}/${this.setting.flyby}/${this.setting.side}/${key}.svg`;
      } else {
        path = this.linksSvg[this.setting.type][key] ?? defaultPath;
        // path = `${defaultModulePath}/images/svg/${this.setting.type}/${key}.svg`;
      }

      axios.get(path)
        .then(({ data }) => {
          if (typeSelectedFlyby$.value === 'floor') {
            svgWrap.insertAdjacentHTML('beforeend', this.putFlatIdInFloorPolygon(svgWrap, this.assignFlatPolygonsWithFlatData(data)));
            resolve();
            return;
          }
          if (this.setting.type === 'genplan' || this.setting.type === 'flyby') {
            this.mutateGenplanInfrastructure(svgWrap, this.assignFlatPolygonsWithFlatData(data));
            resolve();
            return;
          }
          svgWrap.insertAdjacentHTML('beforeend', this.assignFlatPolygonsWithFlatData(data));
          resolve();
        })
        .catch(() => {
          axios.get(defaultPath)
            .then(({ data }) => {
              svgWrap.insertAdjacentHTML('beforeend', this.assignFlatPolygonsWithFlatData(data));
              resolve();
            })
            .catch(() => {
              throw new AppContentCustomError({
                description: `неудалась загрузка svg (${path} и ${defaultPath})`,
              });
            });
        });
    }));

    return Promise.all(promiseList);
  }
  putFlatIdInFloorPolygon(svgWrap, data) {
    const parser = new DOMParser();
    const $svg = parser.parseFromString(data, 'text/html');
    const $floors = $svg.querySelectorAll('[data-type="floor"]');
    $floors.forEach(floorPolygon => {
      const { build, section, floor } = floorPolygon.dataset;
      const floorDataOfPolygon = this.floorList$.value.find(floorData => {
        return floorData.floor == floor && floorData.build == build && floorData.section == section;
      }) || {};
      floorPolygon.dataset.flat_ids = floorDataOfPolygon['flatsIds'] ? floorDataOfPolygon['flatsIds'].join(',') : '';
    });
    return $svg.querySelector('svg').outerHTML;
  }

  mutateGenplanInfrastructure(wrap, data) {
    const parser = new DOMParser();
    let $svg = parser.parseFromString(data, 'text/html');
    

    
    $svg = this.addInfrastructurePins($svg);


    // $svg.querySelector('svg').insertAdjacentHTML('beforeend',this.addTitlesNearFlybyPolygons($svg));

    this.addRectFillBackgrounds();
    wrap.insertAdjacentHTML('beforeend', $svg.querySelector('svg').outerHTML);

    this.handleMoveSvgPinsOnTop(wrap);

    /**this method must be in the end */
    this.addBackgroundForInsertedTextTitles(wrap);
  }

  definePinInfo(el) {
    const points = this.normalizepolygonPoints(el.getAttribute('points'));
      let { x, y } = center(points);
      const id = el.dataset.id;
      const { 
        iframe,
        type,
        title_i18n,
        img,
        description_i18n,
        filter_type,
        position
      } = this.pinsInfo[id];

      const { leftmost, top, bottommost, rightmost } = findTopLeftBounds(points);

      switch (position) {
        case 'top_left':
          x = leftmost;
          y = top;
          break;
        case 'bottom_left':
          x = leftmost;
          y = bottommost;
          break;
        case 'bottom_right':
          x = rightmost;
          y = bottommost;
          break;
        case 'top_right':
          x = rightmost;
          y = top;
          break;
        default:
          break;
      }
      
      const pinFill = this.fillCategories[filter_type] || this.fillCategories.default;
      let className = '';

      if (iframe) className+= ' js-s3d-flat__3d-tour';

      if (img !== undefined) el.dataset.img = img;
      if (this.i18n.exists(description_i18n)) {
        el.dataset.text = this.i18n.t(description_i18n)
      }
      if (type === 'zone') {
        el.classList.value += ' zone';
        className += ' zone';
      }

      const dataHref = iframe ? `data-href="${iframe}"` : '';

      const pinGroup = `
        <g data-pinType="${type}" data-title="${this.i18n.t(title_i18n)}" data-infra-filter="${filter_type}" ${dataHref} class="${className}" ${img ? `data-img="${img}"` : ''}   data-id="${id}" data-type="infrastructure">
          ${type !== 'zone' ? '' : el.outerHTML}
          <rect ${img ? `data-img="${img}"` : ''} data-id="${id}" data-type="infrastructure" data-title="${this.i18n.t(title_i18n)}" x="${x}" y="${y}" width="${this.pinWidth}" height="${this.pinHeight}" fill="${pinFill}" data-href="${iframe}" class="${className}"></rect>
          <text style="pointer-events: none;" x="${x + this.pinWidth + 8}" y="${y + this.pinHeight / 1.65}">${this.i18n.t(title_i18n)}</text>
          <!--<text x="${x}" y="${y}" fill="#1A1E21">
          ${this.i18n.t(title_i18n)}
          </text>-->
        </g>
      `;
      return pinGroup;
    // pinsInfo
  }

  addInfrastructurePins($svg) {
    const { type } = this.setting;
    const pinsHref = this.pin[type] ?? {};
    $svg.querySelectorAll('polygon[data-type="infrastructure"]').forEach((el,index) => {
      const points = this.normalizepolygonPoints(el.getAttribute('points'));
      const { x, y } = center(points);
      
      const pinCategory = el.dataset.id.split('_')[0];

      const pinType = el.dataset.id.split('_')[1];


      const pinFill = this.fillCategories[pinType] || this.fillCategories.default;

      const pinID = el.dataset.id;

      if (this.pin.images[pinID]) {
        el.dataset.img = window.defaultModulePath+'/'+this.pin.images[pinID];
      } 
      el.dataset.title = this.i18n.t('pins.' + (pinID || 'pin'));
      let $hrefAttribute  = ''; 
      if (pinsHref[el.dataset.id]) {
        $hrefAttribute = `data-id="${el.dataset.id}" data-href="${pinsHref[el.dataset.id]}" class="js-s3d-flat__3d-tour js-click-infra-pin"`;
        el.dataset.href = pinsHref[el.dataset.id];
      }

      const isThisPinAreZone = pinCategory === 'zone';

      const attrs = el.getAttributeNames().reduce((acc, name) => {
        if (name === 'class') return acc;
        acc.push(`${name}="${el.getAttribute(name)}"`);
        return acc;

        // return {...acc, [name]: element.getAttribute(name)};
      }, []);

      const pinGroup = `
        <g data-type="pin" ${$hrefAttribute} ${attrs.join(' ')} class="${pinsHref[el.dataset.id] ? 'js-s3d-flat__3d-tour' : ''}"  data-href="${pinsHref[el.dataset.id] ? pinsHref[el.dataset.id] : ''}">
          ${(el.getAttribute('points').split(',').length <= 6) ? '' : el.outerHTML}
          <rect x="${x}" y="${y}" width="${this.pinWidth}" height="${this.pinHeight}" fill="${pinFill}" class="${pinsHref[el.dataset.id] ? 'js-s3d-flat__3d-tour' : ''}"  data-href="${pinsHref[el.dataset.id] ? pinsHref[el.dataset.id] : ''}"></rect>
          <!--<text x="${x}" y="${y}" fill="#1A1E21">
          ${this.i18n.t('pins.' + (pinID || 'pin'))}
          </text>-->
        </g>
      `;
      $svg.querySelector('svg').insertAdjacentHTML('beforeend', isObject(this.pinsInfo[pinID]) ? this.definePinInfo(el) : pinGroup);
      el.remove();
    });

    $svg.querySelectorAll('polygon[data-type="flyby"]').forEach(el => {
      const points = this.normalizepolygonPoints(el.getAttribute('points'));
      const { x, y } = center(points);
      const pinGroup = `
        <rect x="${x}" y="${y}" width="${this.pinWidth}" height="${this.pinHeight}" fill="${this.fillCategories.default}"></rect>
      `;

      $svg.querySelector('svg').insertAdjacentHTML('beforeend', pinGroup);
      
    })

    return $svg;
  }

  handleMoveSvgPinsOnTop(wrap) {
    wrap.querySelectorAll('g[data-type="pin"]').forEach(el => {
      el.addEventListener('mouseenter',function(evt){
        el.parentElement.appendChild(el);
      });
    });
  }

  addBackgroundForInsertedTextTitles(wrapper) {
    wrapper.querySelectorAll('text').forEach(el => {
      const paddingHor = 8,
      paddingVer = 2;
      const { width, height, x, y } = el.getBBox();
      
      const bgRect = `
        <rect style="pointer-events: none;" class="text-background" x="${x - paddingHor}" y="${y - paddingVer}" width="${width + (paddingHor * 2)}" height="${height + (paddingVer * 2)}" rx="6" ry="6" fill="var(--color-bg-darkblue-color)"></rect>
      `;
      el.insertAdjacentHTML('beforebegin', bgRect)
    })
  }

  addTitlesNearFlybyPolygons($svg) {
    const array = [];
    $svg.querySelectorAll('polygon[data-type="flyby"]').forEach((el,index) => {
      const points = this.normalizepolygonPoints(el.getAttribute('points'));
      const { x, y } = center(points);
      const { leftmost, top } = findTopLeftBounds(points);
      const svgWidth = +el.closest('svg').getAttribute('viewBox').split(' ')[2];
      const isMacOs = document.documentElement.classList.contains('macos');
      const transformPin = isMacOs ? '': '';
      const pinGroup = isMacOs && svgWidth < 1920 
        ? `
        <g ${transformPin}  style="
          transform-origin: center center;
          transform-box: fill-box;
        ">
          <text style="fill: white; font-weight: 400; font-size: 10px" x="${x}" y="${y}">${this.i18n.t(`infoBox.flyby--${el.dataset.flyby}--${el.dataset.side}`)}</text>
        </g>
        `
        : `
        <g ${transformPin}  style="
          transform-origin: center center;
          transform-box: fill-box;
        ">          
          <text style="fill: white; font-weight: 400" x="${x}" y="${y}">${this.i18n.t(`infoBox.flyby--${el.dataset.flyby}--${el.dataset.side}`)}</text>
        </g>
      `;
      array.push(pinGroup);
      // $svg.querySelector('svg').insertAdjacentHTML('beforeend',pinGroup);
    });
    return array.join('');
  }
  /**
   *  С девбейза приходят координаты все через запятую. Для поиска центра переводит их в корректный формат.
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points
   * */
  normalizepolygonPoints(points) {
    const splitedPoints = points.split(',');
    const normalized = [`${splitedPoints[0]}`];
    const lastElement = ''+splitedPoints.pop();

    for (let i = 1; i <= splitedPoints.length - 1; i += 2) {
      normalized.push(`${splitedPoints[i]} ${splitedPoints[i + 1]}`);
    }
    normalized.push(lastElement);
    return normalized.join(',');
  }

  addRectFillBackgrounds() {
    if (document.querySelector('[data-rect-fill-backgrounds]') !== null) return;
    document.body.insertAdjacentHTML('afterbegin', `
      <svg data-rect-fill-backgrounds width="700" height="660" style=" width: 0; height: 0; overflow: hidden; position: absolute;">
        <defs>
          <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood flood-color="#0E0E0E" result="bg" />
            <feMerge>
              <feMergeNode in="bg"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <pattern id="vr360" x="0" y="0" height="1" width="1">
            <image preserveAspectRatio="none" width="${this.pinWidth}" height="${this.pinHeight}"  xlink:href="${window.defaultModulePath}/images/markers/vr360.svg"></image>
          </pattern>
          <pattern id="image" x="0" y="0" height="1" width="1">
            <image preserveAspectRatio="none" width="${this.pinWidth}" height="${this.pinHeight}"  xlink:href="${window.defaultModulePath}/images/markers/marker.svg"></image>
          </pattern>
        </defs>
      </svg>
    `);
  }

  /**Синхронізує дані в полігоні квартири (Дані в полігоні можуть відрізнятися від актуальних даних про квартиру) */
  assignFlatPolygonsWithFlatData(data) {
    const parser = new DOMParser();
    const $svg = parser.parseFromString(data, 'text/html').querySelector('svg');
    
    $svg.querySelectorAll('[data-type="flat"]').forEach(el => {
      const flat = this.getFlat(el.dataset.id);
      if (!flat) return;
      Object.entries(el.dataset).map(snglDataset => {
        if (snglDataset[0] == 'id' || snglDataset[0] == 'type') return;
        el.dataset[snglDataset[0]] = flat[snglDataset[0]];
      });
    });

    
    return $svg.outerHTML;
  }
}

function findTopLeftBounds(pointsAttr) {
  const pointsArr = pointsAttr.split(' ');
  let leftmost = parseFloat(pointsArr[0].split(',')[0]);
  let topmost = parseFloat(pointsArr[0].split(',')[1]);
  let rightmost = parseFloat(pointsArr[0].split(',')[0]);
  let bottommost = parseFloat(pointsArr[0].split(',')[1]);

  for (let i = 1; i < pointsArr.length; i++) {
    const point = pointsArr[i].split(',');
    const x = parseFloat(point[0]);
    const y = parseFloat(point[1]);

    if (x < leftmost) {
      leftmost = x;
    }

    if (x > rightmost) {
      rightmost = x;
    }

    if (y < topmost) {
      topmost = y;
    }
    if (y > bottommost) {
      bottommost = y;
    }
  }

  return {
    top: topmost,
    leftmost:leftmost,
    bottommost: bottommost,
    rightmost: rightmost
  };
}

export default Svg;
