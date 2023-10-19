export default class MapPopup {
    constructor() {
        this.conrainer = document.createElement('div');
        this.conrainer.classList.add('map-popup-wrapper');
        this.conrainer.innerHTML = `
            <div class="map-popup__close">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7.5 6.08579L13.2929 0.292893C13.6834 -0.0976311 14.3166 -0.0976311 14.7071 0.292893C15.0976 0.683417 15.0976 1.31658 14.7071 1.70711L8.91421 7.5L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L7.5 8.91421L1.70711 14.7071C1.31658 15.0976 0.683417 15.0976 0.292893 14.7071C-0.0976311 14.3166 -0.0976311 13.6834 0.292893 13.2929L6.08579 7.5L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="white"/>
                </svg>
                </div>
                <div class="map-popup__content">
            </div>
        `;

        document.body.append(this.conrainer);
        this.initCloseHandler();
    }

    open() {
        this.conrainer.classList.add('opened');
        return this;
    }

    close() {
        this.conrainer.classList.remove('opened');
    }

    initCloseHandler() {
        this.conrainer.addEventListener('click', (evt) => {
            const target = evt.target.closest('.map-popup__close');
            if (!target) return;
            this.close();
        });
    }

    setPosition(x,y) {

        const width = this.conrainer.getBoundingClientRect().width;
        const height = this.conrainer.getBoundingClientRect().height;

        console.log(height);
        let iks = Math.min(window.innerWidth- width, x);
        let igrek = Math.min(window.innerHeight- height, y);

        this.conrainer.style.transform = `translate(${iks}px, ${igrek}px)`;
        return this;
    }

    render(data = {}) {
        const { title, link, text, img } = data;
        this.conrainer.querySelector('.map-popup__content').innerHTML = `
            <div class="map-popup__title">${title}</div>
            <div class="map-popup__text">${text}</div>
            <a href="${link}" target="_blank" class="map-popup__link">
                Discover
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 11.5H16.5M16.5 11.5L13 8M16.5 11.5L13 15" stroke="white"/>
                </svg>
            </a>
            <img src="${img}" class="map-popup__img"></img>

        `;
        return this;
    }
}