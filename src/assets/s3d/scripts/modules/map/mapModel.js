import EventEmitter from '../eventEmitter/EventEmitter';
import Hammer from 'hammerjs';
import MapPopup from './mapPopup';
import useState from '../hooks/useState';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { $mapTutorial } from '../templates/map/$mapTutorial';
import googleMap from '../googleMap/map';
import { BehaviorSubject } from 'rxjs';



gsap.registerPlugin(ScrollToPlugin); 

const popupData = {
    'palm jebel ali': { title: 'fefefefef',  img: 'https://uk.bestfonts.pro/public/images/cat2.png', text: 'The concept of Azizi Riviera is borrowed from the French Riviera. The buildings and spaces around them have been designed to emulate Mediterranean contemporary living. The open spaces and public areas offer ‘several conveniences’, while the clean lines and modern glass and wood facades combine to remind you that this is not really France.', link: 'https://google.com' },
    // 'azizi_riviera': { title:'azizi riviera', img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_riviera.jpg', text: 'The concept of Azizi Riviera is borrowed from the French Riviera. The buildings and spaces around them have been designed to emulate Mediterranean contemporary living. The open spaces and public areas offer ‘several conveniences’, while the clean lines and modern glass and wood facades combine to remind you that this is not really France.', link: 'https://google.com' },
    azizi_riviera: {title: "AZIZI RIVIERA – MBR City",
    img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_riviera.jpg',
    text: "Riviera is all about community living, evoking the classic Mediterranean Riviera lifestyle with a modern, contemporary outlook. Long strolls on the French-inspired boulevard, beautiful sunsets at the crystal lagoon, endless shopping experiences, and fine-dining feasts are all that you need for the ultimate lifestyle. Azizi Riviera is easily accessible via Business Bay, Sheikh Zayed Road, Al Khail Road, and Meydan Road. It is also well-connected with malls, cinemas, retail, schools, hospitals, and other modern necessities.",
    link: "https://azizidevelopments.com/en/dubai/meydan/riviera"},

    azizi_park_avenue: {title: "AZIZI PARK AVENUE – MBR City",
    img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_park_avenue.jpg',
    text: "Nestled on Meydan Avenue at the heart of Mohammed Bin Rashid City, Park Avenue comprises three contemporary low-rise buildings: Park Avenue Ι, Park Avenue ΙΙ, and Park Avenue ΙΙΙ. The development offers an idyllic address with lush green surroundings and is strategically placed close to Downtown Dubai and a plethora of world-class amenities and attractions.",
    link: "https://azizidevelopments.com/en/dubai/meydan/park-avenue"},

    azizi_creek_views: {title: "AZIZI CREEK VIEWS – DHCC",
    img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_creek_views.jpg',
    text: "The new vibrant community in DHCC, overlooking the city’s beautiful creek, signifying Dubai’s transition from traditional views to contemporary reinvented future. With prime location and close proximity to Dubai Downtown, the three residential projects of Azizi Creek Views offer excellent connectivity.",
    link: "https://azizidevelopments.com/en/dubai/dubai-health-care-city/creek-views"},

    azizi_aliyah: {title: "AZIZI ALIYAH – DHCC",
    img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_aliyah.jpg',
    text: "Dubai Healthcare City cultivates a versatile and health conscious lifestyle in the heart of Dubai. In close proximity to the creek, yet far enough from the hub of commerce and residence- Aliyah by Azizi is your sanctuary of tranquillity. Within this tastefully planned community, bask in an enticing social life, the delightful entertainment, finest business opportunities, healthcare facilities, leisure, family amenities, panoramic views of iconic Dubai attractions such as: Burj Khalifa and the majestic Dubai Creek.",
    link: "https://azizidevelopments.com/en/dubai/dubai-health-care-city/azizi-aliyah"},

    azizi_mina: {title: "AZIZI MINA – Palm Jumeirah",    img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_mina.jpg',
    text: "Mina is a luxury residential address in the east crescent of Palm Jumeirah with spectacular views of the Arabian Gulf. Beachfront living at its best, Mina is the perfect escape from the city and offers an idyllic location, close to a variety of five-star hotels, beach clubs, malls, cafes and restaurants.",
    link: "https://azizidevelopments.com/en/dubai/palm-jumeirah/azizi-mina"},

    azizi_royal_bay: {title: "AZIZI ROYAL BAY – Palm Jumeirah", img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_royal_bay.jpg',
    text: "ROYAL BAY, a sumptuous collection of fully serviced residential apartments situated on the crescent of Dubai’s iconic Palm Jumeirah, offers home buyers a unique chance to secure a place in one of the few remaining developments on the Eighth Wonder of the World. Cleverly angled at 45 degrees with spectacular views of the city’s skyline, the Atlantis Hotel and the Arabian sea, ROYAL BAY was designed to maximise light and provide stunning views from every room. The property enjoys the unique privilege of having direct access to a private beach.",
    link: "https://azizidevelopments.com/en/dubai/palm-jumeirah/royal-bay"},

    azizi_beach_oasis: {title: "AZIZI BEACH OASIS – Studio City",img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_beach_oasis.jpg',
    text:  "Beach Oasis in Studio City is a vibrant residential community just outside the city, offering excellent connectivity to a wealth of amenities and attractions. This thriving modern community will be home to a beautiful lagoon-style swimming pool with a man-made beach.",
    link: "https://azizidevelopments.com/en/dubai/studio-city/beach-oasis"},

    azizi_vista: {title: "AZIZI VISTA – Studio City",img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_vista.jpg',
    text: "Azizi Vista welcomes you to be part of one of Dubai’s most desired residential areas – Dubai Studio City. Vista features modern apartments built with a sleek design and a welcoming atmosphere. Vista assures a perfect haven for young families and creative professionals looking for the right balance of living without having to compromise on priorities.",
    link: "https://azizidevelopments.com/en/dubai/studio-city/azizi-vista"},

    azizi_grand: {title: "AZIZI GRAND – Sport City",img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_grand.jpg',
    text: "A grandiosity encompassing the best of sustainability and sports. Strategically located on Al Fay Road, Azizi Grand is always at the heart of the action, yet at a comfortable distance away from the daily grind of the city. Most major attractions are just a short drive away. ",
    link: "https://azizidevelopments.com/en/dubai/sport-city/azizi-grand"},

    al_furjah_comunity: {title: "AL FURJAN COMMUNITY – Al Furjan",img: '/wp-content/themes/3d/assets/s3d/images/map-popups/al_furjah_comunity.jpg',
    text: "Azizi is developing numerous residential communities in Al Furjan, just minutes from the metro. Offering a strategic location, close to Expo 2020, Dubai Marina and Bluewaters Island, Al Furjan is an established community home to a variety of different properties.",
    link: "https://azizidevelopments.com/en/dubai/al-furjan"},

    azizi_venice: {title: "AZIZI VENICE – Dubai South",
    text: "Live every day in a breathtaking oasis. Where the glistening canal, a pristine beachfront, a vibrant boulevard and world-class entertainment, are all at your doorstep. Where thoughtful architecture and design echo the nature surroundings, and floor-to-ceiling windows seamlessly merge indoors with outdoors - showcasing the crystal blue lagoon in all its glory. It’s a whole new way to experience apartment living, designed for the discerning few."
    },

    azizi_aura: {title: "AZIZI AURA – Jebel Ali",img: '/wp-content/themes/3d/assets/s3d/images/map-popups/azizi_aura.jpg',
    text: "Aura is Azizi’s first completed residential community in Downtown Jebel, located on the metro line in Jebel Ali Free Zone, close to Expo 2020 and Ibn Battuta. Comprising of studios, one and two bedroom apartments, Aura offers a strategic location and excellent accessibility for residents living and working in the area.  Completed in 2020, Aura residents benefit from a swimming pool, landscaped gardens, a fully-equipped gymnasium, underground parking, 24 hour security and 9,000 sq ft dedicated to retail outlets for cafes, restaurants, convenience stores and shops. Aura is fully completed.",
    link: "https://azizidevelopments.com/en/dubai/jebel-ali/azizi-aura"},
}


function drawRoute(activeProject, clickedLandmark) {
    const routeToshow = document.querySelector(`[data-route-from="${activeProject}"][data-route-to="${clickedLandmark}"]`);
    if (routeToshow) {
        routeToshow.style.opacity = 1;
        gsap.timeline()
            .set(routeToshow, { opacity: 1 }) 
            .set(routeToshow.querySelector('path'), { fillOpacity: '0', stroke: '#fff' })
            .add(() => {
                simulatePathDrawing(routeToshow.querySelector('path'));
            })
            .to(routeToshow.querySelector('path'), { stroke: '', fillOpacity: 1, delay: 0.45 })
    }
}

function routesFilter() {
    const [ activeProject, setActiveProject, useActiveProjectEffect ] = useState('');
    const [ clickedLandmark, setClickedLandmark, useClickedLandmarkEffect ] = useState('');

    useClickedLandmarkEffect((project) => {
        document.querySelectorAll('[data-landmark]').forEach(el => {
            el.style.opacity = el.dataset.landmark === project || !project ? 1 : 0.5;
            (el.dataset.landmark === project || !project) ? el.classList.add('active') : el.classList.remove('active');
            if (!project) {
                el.classList.remove('active');
            }
        });

        const routeToshow = document.querySelector(`[data-route-from="${activeProject()}"][data-route-to="${clickedLandmark()}"]`);


        if (activeProject() || clickedLandmark())  {
            document.querySelector('[data-img-overlay]').style.opacity = 0.35;
        } else {
            document.querySelector('[data-img-overlay]').style.opacity = 0;
        }
        document.querySelectorAll('[data-route]').forEach(el => el.style.opacity = 0);
        drawRoute(activeProject(), clickedLandmark());
    })
    
    useActiveProjectEffect((project) => {
        document.querySelectorAll('[data-project]').forEach(el => {
            el.style.opacity = el.dataset.project === project || !project ? 1 : 0.35;
        });


        if (activeProject() || clickedLandmark())  {
            document.querySelector('[data-img-overlay]').style.opacity = 0.35;
        } else {
            document.querySelector('[data-img-overlay]').style.opacity = 0;
        }
        document.querySelectorAll('[data-route]').forEach(el => el.style.opacity = 0);
        drawRoute(activeProject(), clickedLandmark());
    })


    document.body.addEventListener('click', (evt) => {
        const target = evt.target.closest('[data-landmark]');
        if (evt.target.closest('[data-project]')) return;
        if (evt.target.closest('.s3d-map__navigation')) return;
        if (!target) return setClickedLandmark(null);
        
        setClickedLandmark(target.dataset.landmark);
    })
    document.body.addEventListener('click', (evt) => {
        const target = evt.target.closest('[data-project]');
        
        if (evt.target.closest('[data-landmark]')) return;
        if (evt.target.closest('.s3d-map__navigation')) return;
        if (!target) return setActiveProject(null);

        setActiveProject(target.dataset.project);
    })
}



class MapModel extends EventEmitter {
    constructor(config, i18n) {
        super();
        this.config = config;
        this.i18n = i18n;

        this.updateFsm = config.updateFsm;
        // this.$wrapper = document.querySelector('.js-s3d__wrapper__map');
        this.$wrapper = document.body;
        this.$map = this.$wrapper.querySelector('.s3d-map__map-wrapper');

        this.pos = { top: this.$map.scrollHeight, left: 0, x: 0, y: 0 };
        // this.initMapDragScroll();
        this.initFilter();
        this.pinsPositionHandler();
        this.initCloseFilterOnTouchScreens();
        // this.initMarkersHover();
        this.popup = new MapPopup();

        // this.routesFilter = routesFilter();
        window.popup = this.popup;
        this.initPopup();
        this.initMapTutorial();

        this.initGoogleMap(this.updateFsm);

        console.log(config);
    }

    initPopup() {
// data-map-popup-link="azizi_riviera"
        document.querySelectorAll('[data-map-popup-link]').forEach(el => {
            el.addEventListener('dblclick', (evt) => {
                this.popup
                    .setPosition(evt.clientX, evt.clientY)
                    .render(popupData[el.dataset.mapPopupLink])
                    .open();
            });
            const hammer = new Hammer(el);
            hammer.on('press', (evt) => {
                this.popup
                    .setPosition(evt.clientX, evt.clientY)
                    .render(popupData[el.dataset.mapPopupLink])
                    .open();
            })
        });
        // document.body.addEventListener('click', (evt) => {
        //     const target = evt.target.closest('[data-map-popup-link]');
        //     if (!target) return;
        //     this.popup.render(popupData[target.dataset.mapPopupLink]).open();
        // })
    }

    initMarkersHover() {
        this.$map.querySelectorAll('[data-title="landmarks"]').forEach(el => {
            el.addEventListener('mouseenter',(evt) => {
                this.$map.classList.add('title-hovered');
                console.log('enter');
            });
            el.addEventListener('mouseleave',(evt) => {
                this.$map.classList.remove('title-hovered');
            });
        })
    }

    pinsPositionHandler() {
        this.$wrapper.querySelectorAll('svg [data-title]').forEach(el => {
            el.addEventListener('mouseenter',function(evt){
                if (el.dataset.disabled) return;
                el.parentElement.insertAdjacentElement('beforeend', el);
            });
        })

    }

    initFilter() {
        this.filter = new Set();

        document.querySelectorAll('[data-custom-map-filter]').forEach(button => {
            const clickedFilterValue = button.getAttribute('data-custom-map-filter');
            if (button.classList.contains('active')) {
                this.filter.add(clickedFilterValue);
            }
        });
        this.renderFilteredItems();

        this.$wrapper.addEventListener('click', (evt) => {
            if (evt.target.closest('[data-custom-map-filter]') === null) return;
            const button = evt.target.closest('[data-custom-map-filter]');
            const clickedFilterValue = button.getAttribute('data-custom-map-filter');
            if (this.filter.has(clickedFilterValue)) {
                this.filter.delete(clickedFilterValue);
                button.classList.remove('active');
            } else {
                this.filter.add(clickedFilterValue);
                button.classList.add('active');
            }
            this.renderFilteredItems();
        })
        this.$wrapper.addEventListener('click', (evt) => { 
            if (evt.target.closest('[data-custom-map-filter-reset]') === null) return;
            // this.filter.clear();
            document.querySelectorAll('[data-custom-map-filter]').forEach(el => {
                this.filter.add(el.dataset.customMapFilter);
            })
            this.renderFilteredItems();
            console.log(this.filter);
            this.$wrapper.querySelectorAll('[data-custom-map-filter]').forEach(el => el.classList.add('active'));
        })
    }

    renderFilteredItems() { 
        this.$wrapper.querySelectorAll('.js-s3d__wrapper__map [data-title]').forEach(pin => {
            (this.filter.has(pin.dataset.title) /*|| this.filter.size === 0*/ || pin.dataset.title === 'main') 
            ?
            pin.classList.remove('transparent')
            :
            pin.classList.add('transparent');
        })
    }

    initMapDragScroll() {
        const ele = this.$map;
        const mouseDownHandler = (e) => {
            this.pos = {
                // The current scroll
                left: ele.scrollLeft,
                top: ele.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY,
            };
        
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
        const mouseMoveHandler = (e) => {
            // How far the mouse has been moved
            const dx = e.clientX - this.pos.x;
            const dy = e.clientY - this.pos.y;
        
            // Scroll the element
            ele.scrollTop = this.pos.top - dy;
            ele.scrollLeft = this.pos.left - dx;
        };
        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        };
        document.addEventListener('mousedown', mouseDownHandler );
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        const distance = 150;

        this.$wrapper.addEventListener('click', (evt) => {
            const target = evt.target.closest('[data-map-scroll]');
            if (!target) return;
            switch (target.dataset.mapScroll) {
                case 'left':
                    this.scrollMap(ele.scrollLeft - distance, ele.scrollTop );
                    break;
                case 'right':
                    this.scrollMap(ele.scrollLeft + distance, ele.scrollTop );
                    break;
                case 'up':
                    this.scrollMap(ele.scrollLeft, ele.scrollTop - distance);
                    break;
                case 'down':
                    this.scrollMap(ele.scrollLeft, ele.scrollTop + distance);
                    break;
            
                default:
                    break;
            }
        })

        this.scrollMap(0, ele.scrollHeight);
    }

    scrollMap(x,y) {
        gsap.to(this.$map, {
            scrollTo: {x: x, y: y, autoKill: false},
            duration: 1
        });
    }

    initCloseFilterOnTouchScreens() {
        const self = this;
        if (window.matchMedia('(min-width: 1025px)').matches) return;
        const hammerjs = new Hammer(this.$wrapper.querySelector('.s3d-map__bottom'), {
        });

        hammerjs.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        hammerjs.on('swipedown', () => {
            this.$wrapper.querySelector('label').click();
        })
    }
    initMapTutorial() {
        document.querySelector('.s3d-map').insertAdjacentHTML('beforeend', $mapTutorial);
        const tutorialContainer = document.querySelector('.s3d-map__tutorial');
        this.$wrapper.addEventListener('click', (evt) => {
            const target = evt.target.closest('[data-map-tutorial]');
            if (!target) return;
            tutorialContainer.classList.toggle('active');
        });
        this.$wrapper.addEventListener('click', (evt) => {
            const target = evt.target.closest('[data-close-tutorial]');
            if (!target) return;
            tutorialContainer.classList.remove('active');
        });
    }
    initGoogleMap(updateFsm) {
        this.$map.insertAdjacentHTML('beforebegin', `
        <div class="switch" data-google-map-theme-switch>
        <label for="toggle">
        <input id="toggle" class="toggle-switch" type="checkbox" checked>
        <div class="sun-moon"><div class="dots"></div></div>
        <div class="background"><div class="stars1"></div><div class="stars2"></div></div>
        <div class="fill"></div>
        </label>
        </div>
        `);
        
        const themeSwitcher = document.querySelector('[data-google-map-theme-switch] input');
        
        this.$googleMapTheme = new BehaviorSubject(themeSwitcher.checked ? 'light' : 'dark');
        themeSwitcher.addEventListener('change', (evt) => {
            this.$googleMapTheme.next(evt.target.checked ? 'light' : 'dark');
        });
        this.gMap = googleMap(updateFsm, this.$googleMapTheme);
        
        

        
    }
}

function simulatePathDrawing(path, strokeWidth = "3") {
  
    var length = path.getTotalLength();
  
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition = "none";
    // Set up the starting positions
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
      "stroke-dashoffset 1.5s ease-in-out";
    // Go!
    path.style.strokeDashoffset = "0";
  }
export default MapModel;