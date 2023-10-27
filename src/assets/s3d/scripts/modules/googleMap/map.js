import { fetchMarkersData } from "./getMarkers";
import mapStyle from "./map-style";



export default function googleMap(updateFsm, theme) {
  global.initMap = initMap.bind(null, updateFsm, theme);

  func();
}

async function func() {
  const script = document.createElement('script');
  let key = document.documentElement.dataset.key ? document.documentElement.dataset.key : '';
  // if (window.location.href.match(/localhost|smarto/)) key = '';
  // const key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=${document.documentElement.getAttribute('lang')}`;
  document.getElementsByTagName('head')[0].appendChild(script);
}
// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach((image) => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);

      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

// eslint-disable-next-line no-unused-vars
function initMap(updateFsm, theme) {
  const gmarkers1 = [];
  //28.4600074, 49.2384203
  const center = {
    lat: 28.660448, 
    lng: 34.508267,
  };
  /** Массив, куда записываются выбраные категории */
  const choosedCategories = new Set();
  choosedCategories.add('main');
  /** Елементы, при клике на который будет происходить фильтрация */
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center,
    minZoom: 8,
    // scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    gestureHandling: 'cooperative',
    language: document.documentElement.getAttribute('lang') || 'en',
    styles: mapStyle()
  });
  window.googleMap = map;

  const filterMarkers = function (category, categoriesArray) {
    gmarkers1.forEach((el) => {
      if (categoriesArray.has(el.category)) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
        if (item.dataset.multicategory) {
          const innerCategories = item.dataset.multicategory.split('~');
          innerCategories.forEach(el => choosedCategories.add(el));
        }
      } else {
        choosedCategories.delete(item.dataset.category);
        if (item.dataset.multicategory) {
          const innerCategories = item.dataset.multicategory.split('~');
          innerCategories.forEach(el => choosedCategories.delete(el));
        }
      }
      filterMarkers('main', choosedCategories);
    });
  });


  // var baseFolder = '/wp-content/themes/centower/assets/images/markers/';
  const baseFolder = window.location.href.match(/localhost/) 
    ? './assets/images/markers/'
    : '/wp-content/themes/central-park/assets/images/markers/';
  let defaultMarkerSize = new google.maps.Size(40, 53);
  if (document.documentElement.clientWidth < 950) {
    // defaultMarkerSize = new google.maps.Size(40, 53);
  }
  const buildLogoSize = new google.maps.Size(125, 55);
  const markersAdresses = {
    main: `${baseFolder}main.svg`,
    cafe: `${baseFolder}cafe.svg`,
    kinder: `${baseFolder}kindergarten.svg`,
    shop: `${baseFolder}shop.svg`,
    sport: `${baseFolder}sport.svg`,
    school: `${baseFolder}school.svg`,
    cafe: `${baseFolder}meal.svg`,
    medicine: `${baseFolder}medicine.svg`,
    bank: `${baseFolder}bank.svg`,
    leisure: `${baseFolder}leisure.svg`,
  };
  const markerPopupStyle = `
          style="
          background: #ffffff;
          color:#000000;
          font-weight: bold;
          padding:5px 10px;
          font-size: 16px;
          line-height: 120%;"
          `;


  
  const ajaxMarkers = fetchMarkersData(google);

  ajaxMarkers.then(result => {
    putMarkersOnMap(result, map);
  })
  console.log(ajaxMarkers);

  function putMarkersOnMap(markers, map) {
    const infowindow = new google.maps.InfoWindow({
      content: '',
      maxWidth: 200,
    });
    const initedMarkers = [];
    markers.forEach((marker) => {
      const category = marker.type;
      const mapMarker = new google.maps.Marker({
        map,
        category,
        zIndex: marker.zIndex || 1,
        icon: marker.icon,
        dataId: +marker.id,
        content: marker.content,
        position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      });
      mapMarker.dataId = +marker.id;
      mapMarker.options = {
        ...marker
      }
      initedMarkers.push(mapMarker);
  
      google.maps.event.addListener(mapMarker, 'dblclick', function () {
        // infowindow.setContent(marker.content);
        // infowindow.open(map, mapMarker);
        // map.panTo(this.getPosition());
        if (mapMarker.category === 'main') {
          updateFsm({
            type: 'flyby',
            flyby: '1',
            side: 'outside'
          })

        }
      });
      mapMarker.name = marker.type;
      gmarkers1.push(mapMarker);
    });
    map.initedMarkers = initedMarkers;

    // , 

    //, 

    const line = new google.maps.Polyline({
      path: [
        { lat: 28.138035, lng: 35.963475},
        { lat: 28.306324,   lng: 34.201280,},
      ],
      geodesic: true,
      strokeColor: "#000000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    line.setMap(map);


    console.log(map);

    theme.subscribe((theme) => {
      console.log('------------');
      console.log(theme);
      console.log('------------');

      console.log(initedMarkers);

      initedMarkers.forEach(el => {
        switch (theme) {
          case 'light':
            el.setIcon(el.options.options.iconUrl);
            break;
          case 'dark':
            el.setIcon(el.options.options.iconDarkUrl ? el.options.options.iconDarkUrl : el.options.options.iconUrl);
            break;
        
          default:
            break;
        }
      })


      line.setOptions({
        strokeColor: theme === 'light' ? '#000' : '#ffffff' 
      })

    })

    filterMarkers('main', choosedCategories);
    markersHightlight(google, map, infowindow);
    // markersHandler();
  }
  /* beautify preserve:end */
  
  
}



function markersHightlight(google, map, infowindow) {
  const $markerLinks = document.querySelectorAll('[data-marker-id]');
  // const infowindow = new google.maps.InfoWindow({
  //   content: '',
  //   maxWidth: 280,
  // });
  querySelectorWithNodeList('[data-marker-id]', (item) => {
    item.addEventListener('click', () => {

      const marker = map.initedMarkers.find(el => {
        return el.dataId === +item.dataset.markerId
      });
      if (marker === undefined) return;
      infowindow.setContent(marker.content);
      infowindow.open(map, marker);
      // console.log(marker);
    })
  })
  // console.log(document.querySelectorAll('[data-marker-id]'));
  // console.log(map);
}


function querySelectorWithNodeList(selector, cb = () => { }) {
  const $list = document.querySelectorAll(selector);
  $list.forEach(el => cb(el));
}


function markersHandler() {
  document.querySelector('.map-wrapper')
    .addEventListener('click', ({ target }) => {
      const map = window.googleMap;
      if (target.closest('[data-marker-id]') === null || !map) return;
      const markerId = target.closest('[data-marker-id]').dataset.markerId;
      const marker = map.initedMarkers.find(marker => marker.dataId == markerId);
      marker && map.setCenter(marker.getPosition());
      console.log(map.initedMarkers.find(marker => marker.dataId == markerId));
      console.log(map);
      // console.log(marker);
    })
}