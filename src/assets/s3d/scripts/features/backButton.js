


function getContainer() {
    const selector = 'data-s3d-back-button';
    return document.querySelector(`[${selector}]`);
}

export function $backButton() {
    return `
        <div class="s3d-back-button" data-s3d-back-button></div>
    `;
}

export function backButton(data, config, history) {
    console.log('back button', history);
    if (!Array.isArray(history.histories) || history.histories.length < 2) {
        return getContainer().innerHTML = '';
    }

    const prevPage = history.histories[history.histories.length - 2];
    if (!prevPage) return getContainer().innerHTML = '';



    console.log('prevPage', prevPage);
    const attributes = Object.entries(prevPage).map(([key,val]) => `data-${key}="${val}"`).join(' ');

    getContainer().innerHTML = `
        <button ${attributes} class="js-s3d-nav__btn">Back</button>
    `;
    getContainer().innerHTML = `
        <button onclick="window.history.back();">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.90778 5.54663C5.80321 5.54663 4.90778 6.44206 4.90778 7.54663L4.90778 7.59102C4.90778 8.69559 5.80321 9.59102 6.90778 9.59102L17.2285 9.59102C18.3331 9.59102 19.2285 8.69559 19.2285 7.59102L19.2285 7.54663C19.2285 6.44206 18.3331 5.54663 17.2285 5.54663L6.90778 5.54663Z" fill="#F7FCFF"/>
                <path d="M9.01392 1.4454C9.79474 2.22669 9.79436 3.49303 9.01307 4.27385L7.13129 6.15446C6.34965 6.93562 6.34967 8.20265 7.13132 8.98379L9.01301 10.8642C9.79434 11.6451 9.79473 12.9114 9.0139 13.6927L8.98345 13.7232C8.20252 14.5046 6.93596 14.5048 6.15473 13.7237L1.41359 8.98347C0.632376 8.2024 0.632367 6.93588 1.41357 6.1548L6.15474 1.4144C6.93597 0.633296 8.20253 0.633535 8.98346 1.41493L9.01392 1.4454Z" fill="#F7FCFF"/>
            </svg>
            <span>Back</span>
        </button>
    `;

    getContainer().addEventListener('click',function(evt){

    }, {
        once: true
    });

    // getContainer().innerHTML = 
}