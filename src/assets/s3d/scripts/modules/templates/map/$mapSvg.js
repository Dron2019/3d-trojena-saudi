

const ratio = document.documentElement.classList.contains('mobile') ? 'xMidYMax slice' : 'none';


export default function $mapSvg(i18n) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="970" fill="none" viewBox="0 0 1920 970" preserveAspectRatio="${ratio}">
        <image href="${window.defaultModulePath}/images/map-light.jpg" x="0" y="0" width="1920" height="970" data-svg-map-switch data-dark="${window.defaultModulePath}/images/map-dark.jpg" data-light="${window.defaultModulePath}/images/map-light.jpg"></image>

        <rect opacity="0.3" width="1876" height="905" fill="rgb(0, 15, 44)" data-img-overlay="" style="opacity: 0; pointer-events: none"></rect>
        <!--<g class="group-90__Group group-90__90 js-s3d-nav__btn" data-type="genplan" transform="translate(750,350)" data-dont-make-me-active>
            <g class="group-90__Ellipse group-90__2" filter="url(#group-90__a)">
            <path fill="#fff" d="M238 87c0 68.76-25.741 35.5-94.5 35.5C74.74 122.5 0 155.76 0 87 0 23 44.24 0 113 0c68.759 0 125 18.24 125 87Z"/>
            <path stroke="#fff" d="M237.5 87c0 17.188-1.614 27.889-5.038 34.32-1.702 3.197-3.846 5.329-6.463 6.685-2.624 1.361-5.761 1.961-9.474 2.03-6.112.114-13.663-1.207-22.868-2.816-2.019-.353-4.119-.721-6.3-1.09C175.263 124.084 160.731 122 143.5 122c-17.225 0-34.818 2.083-51.49 4.126l-1.867.229c-15.996 1.963-31.081 3.814-44.173 3.68-13.606-.14-24.955-2.426-32.903-8.869C5.144 114.744.5 104.102.5 87c0-31.87 11.005-53.451 30.502-67.09C50.532 6.247 78.659.5 113 .5c34.354 0 65.495 4.56 88.034 17.648C223.526 31.208 237.5 52.788 237.5 87Z"/>
            </g>
            <path fill="#000" d="M60.296 96V77.824h-7.168V73.6h19.52v4.224H65.48V96h-5.184Zm14.414 0V78.784h4.768v4.864l-.672-1.408c.512-1.216 1.334-2.133 2.464-2.752 1.13-.64 2.507-.96 4.128-.96v4.608a5.856 5.856 0 0 0-.576-.032 4.398 4.398 0 0 0-.544-.032c-1.365 0-2.474.395-3.328 1.184-.832.768-1.248 1.973-1.248 3.616V96H74.71Zm21.724.256c-1.835 0-3.467-.384-4.897-1.152a8.967 8.967 0 0 1-3.36-3.136c-.81-1.344-1.216-2.87-1.216-4.576 0-1.728.406-3.253 1.216-4.576a8.642 8.642 0 0 1 3.36-3.136c1.43-.768 3.062-1.152 4.896-1.152 1.814 0 3.435.384 4.865 1.152 1.429.747 2.549 1.781 3.36 3.104.81 1.323 1.216 2.859 1.216 4.608 0 1.707-.406 3.232-1.216 4.576-.811 1.323-1.931 2.368-3.36 3.136-1.43.768-3.051 1.152-4.865 1.152Zm0-4.096c.832 0 1.578-.192 2.24-.576a4.132 4.132 0 0 0 1.568-1.632c.384-.725.576-1.579.576-2.56 0-1.003-.192-1.856-.576-2.56a4.132 4.132 0 0 0-1.569-1.632c-.66-.384-1.407-.576-2.24-.576-.832 0-1.578.192-2.24.576a4.355 4.355 0 0 0-1.6 1.632c-.383.704-.576 1.557-.576 2.56 0 .981.193 1.835.577 2.56a4.355 4.355 0 0 0 1.6 1.632c.66.384 1.407.576 2.24.576Zm11.496 10.304a9.324 9.324 0 0 1-2.208-.256c-.704-.149-1.301-.384-1.792-.704l1.344-3.616c.576.405 1.28.608 2.112.608.619 0 1.11-.213 1.472-.64.384-.405.576-1.024.576-1.856V78.784h4.992v17.184c0 1.984-.565 3.563-1.696 4.736-1.13 1.173-2.73 1.76-4.8 1.76Zm4-26.08c-.917 0-1.664-.267-2.24-.8a2.595 2.595 0 0 1-.864-1.984c0-.79.288-1.45.864-1.984.576-.533 1.323-.8 2.24-.8.918 0 1.664.256 2.24.768.576.49.864 1.13.864 1.92 0 .832-.288 1.525-.864 2.08-.554.533-1.301.8-2.24.8Zm15.637 19.872c-1.963 0-3.691-.384-5.184-1.152-1.472-.768-2.614-1.813-3.424-3.136-.811-1.344-1.216-2.87-1.216-4.576 0-1.728.394-3.253 1.184-4.576a8.464 8.464 0 0 1 3.296-3.136c1.386-.768 2.954-1.152 4.704-1.152 1.685 0 3.2.363 4.544 1.088a7.868 7.868 0 0 1 3.232 3.072c.789 1.323 1.184 2.912 1.184 4.768 0 .192-.011.416-.032.672l-.064.672h-13.984v-2.912h11.36l-1.92.864c0-.896-.182-1.675-.544-2.336a3.863 3.863 0 0 0-1.504-1.536c-.64-.384-1.387-.576-2.24-.576-.854 0-1.611.192-2.272.576a3.806 3.806 0 0 0-1.504 1.568c-.363.661-.544 1.45-.544 2.368v.768c0 .939.202 1.77.608 2.496a4.325 4.325 0 0 0 1.76 1.632c.768.363 1.664.544 2.688.544.917 0 1.717-.139 2.4-.416a5.837 5.837 0 0 0 1.92-1.248l2.656 2.88c-.79.896-1.782 1.59-2.976 2.08-1.195.47-2.571.704-4.128.704Zm22.107-17.728c1.366 0 2.582.277 3.648.832 1.088.533 1.942 1.365 2.56 2.496.619 1.11.928 2.539.928 4.288V96h-4.992v-9.088c0-1.387-.309-2.41-.928-3.072-.597-.661-1.45-.992-2.56-.992-.789 0-1.504.17-2.144.512-.618.32-1.109.821-1.472 1.504-.341.683-.512 1.557-.512 2.624V96h-4.992V78.784h4.768v4.768l-.896-1.44a6.379 6.379 0 0 1 2.656-2.656c1.152-.619 2.464-.928 3.936-.928ZM171.895 96v-3.36l-.32-.736v-6.016c0-1.067-.33-1.899-.992-2.496-.64-.597-1.632-.896-2.976-.896-.917 0-1.824.15-2.72.448-.874.277-1.621.661-2.24 1.152l-1.792-3.488c.939-.661 2.07-1.173 3.392-1.536a15.183 15.183 0 0 1 4.032-.544c2.624 0 4.662.619 6.112 1.856 1.451 1.237 2.176 3.168 2.176 5.792V96h-4.672Zm-5.248.256c-1.344 0-2.496-.224-3.456-.672-.96-.47-1.696-1.099-2.208-1.888a4.778 4.778 0 0 1-.768-2.656c0-1.024.246-1.92.736-2.688.512-.768 1.312-1.365 2.4-1.792 1.088-.448 2.507-.672 4.256-.672h4.576V88.8h-4.032c-1.173 0-1.984.192-2.432.576a1.86 1.86 0 0 0-.64 1.44c0 .64.246 1.152.736 1.536.512.363 1.206.544 2.08.544.832 0 1.579-.192 2.24-.576.662-.405 1.142-.992 1.44-1.76l.768 2.304c-.362 1.11-1.024 1.952-1.984 2.528-.96.576-2.197.864-3.712.864Z" class="group-90__Trojena"/>
            <g class="group-90__Group">
            <path fill="#000" d="M71 53.97c.68-1.505 1.771-2.358 3.055-2.934 2.137-.959 4.3-1.863 6.48-2.718 1.684-.662 1.756-.791.462-2.38 1.934-.759 3.755-1.625 5.667-2.18 1.609-.465 3.018-1.157 4.217-2.284 1.18-1.11 2.343-2.239 3.469-3.402 1.117-1.153 2.419-1.68 4.025-1.424 2.791.443 5.019-.551 7.172-2.336 3.733-3.101 7.804-5.758 12.08-8.312.376.624.656 1.175 1.014 1.67 1.445 2.003 2.865 4.03 4.397 5.966.712.9 1.609 1.478 2.948.816.416-.204 1.38.212 1.815.63.897.862 1.606 1.916 2.39 2.893.847 1.056 1.616 2.183 2.55 3.152 1.306 1.354 2.356 1.28 3.787.066 1.004-.852 2.046-1.684 3.173-2.36 1.405-.844 2.415-.598 3.52.628.332.367.664.745.921 1.165 1.822 2.976 4.596 5.01 7.275 7.087.956.741 2.39.856 3.592 1.292 2.231.81 4.453 1.639 6.672 2.48.23.088.407.312.61.47l-.056.268c-.678-.087-1.411-.04-2.026-.286-2.633-1.05-4.723-.552-6.214 1.944-.027.046-.111.058-.246.119-.095-.143-.217-.283-.294-.446-.945-1.957-2.429-3.364-4.417-4.222-1.396-.602-2.475-1.42-3.304-2.796-1.744-2.892-4.707-3.275-7.375-1.143-.265.212-.457.553-.598.872a120.544 120.544 0 0 0-1.499 3.554c-.225.553-.567.75-1.197.777-1.153.05-2.298.268-3.544.428.2-.29.417-.7.723-1.028 1.193-1.282 2.433-2.523 3.616-3.814.402-.438.688-.981 1.173-1.688-.716 0-1.129-.058-1.519.014-.483.09-.952.275-1.417.443-2.225.807-2.69.72-4.304-1.058-.664-.729-1.222-1.555-1.825-2.34-.517-.673-.821-.675-1.238.058-.334.586-.616 1.203-.921 1.805l-.298-.006c-.236-.769-.485-1.534-.707-2.306-.211-.728-.366-1.47-.597-2.19-.208-.654-.638-.996-1.365-.73-.825.3-1.396-.048-1.873-.7-.487-.666-.964-1.344-1.515-1.954-.21-.234-.68-.47-.914-.384-.237.085-.473.57-.465.873.041 1.613.198 3.224.23 4.839.014.691-.181 1.385-.274 2.078-.086.642-.256 1.292-.221 1.93.078 1.33.267 2.651.412 3.977l-.314.164c-.575-.89-1.193-1.753-1.712-2.673-.733-1.3-.807-2.942-2.117-3.96-.189-.147-.167-.623-.161-.944.012-.824.078-1.648.107-2.472.044-1.187-.027-2.289-.707-3.4-.579-.943-.71-2.156-1.054-3.299-.805.963-1.624 1.827-2.298 2.792-.358.51-.636 1.19-.658 1.803-.042 1.111.096 2.237.231 3.348.171 1.409-.259 2.643-1.044 4.105 0-.576-.018-.881.004-1.186.06-.843-.177-1.5-.873-2.079-1.16-.965-1.538-2.263-1.23-3.747.06-.283.099-.57.201-1.16-1.789.996-3.429 1.775-4.914 2.78-1.408.952-1.823 2.579-1.678 4.138.161 1.74-.578 2.687-1.984 3.424-.817.428-1.572.97-2.532 1.575l1.54-2.627c-.083-.1-.165-.198-.248-.3l-3.52 2.164-.148-.22 2.72-2.625-.124-.212c-.234.03-.5 0-.702.1-1.367.667-2.82.82-4.321.903-.746.041-1.6.328-2.18.786-3.551 2.792-7.451 4.833-11.835 6.004-1.87.505-3.673 1.254-5.671 1.945Z" class="group-90__Vector"/>
            </g>
        </g> -->
        <g  class="js-s3d-nav__btn" data-type="genplan" transform="translate(960,370)" data-dont-make-me-active>

            <rect width="100" height="100" x="0" y="0" fill="white" fill-opacity="0.01"></rect>
        </g>
        <defs>
            <filter id="group-90__a" width="2238" height="2130.54" x="-1000" y="-1000" class="group-90__a" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="500"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_318_1897"/>
            <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_318_1897" result="shape"/>
            </filter>
        </defs>

        <g class="e-44__logo" >
            <rect width="195" height="70" x="240" y="1546" fill="#fff" rx="12" />
            <g class="e-44__Mask e-44__group">
                <mask id="e-44__b" width="155" height="50" x="260" y="1556" class="e-44__b" maskUnits="userSpaceOnUse"
                    style="mask-type:luminance">
                    <g class="e-44__Group">
                        <path fill="#fff" d="M415 1556H260v50h155v-50Z" class="e-44__Vector" />
                    </g>
                </mask>
            <g class="e-44__Group" mask="url(#e-44__b)">
                <path fill="#000"
                    d="M277.028 1584.43c0-.09-.092-.09-.092-.18-1.013-2.29-3.682-3.39-5.983-2.47-2.301.91-3.406 3.56-2.485 5.85.092.09.092.27.184.36.92 2.29 3.59 3.38 5.983 2.47 2.301-.91 3.405-3.56 2.485-5.94-.092 0-.092 0-.092-.09Zm128.215-15.36h-2.669v14.26h2.669v-14.26Zm-131.253 25.05-.184-.19c-1.656-1.46-4.142-1.28-5.522.37-1.381 1.65-1.289 4.11.368 5.48.092.1.184.19.276.19 1.657 1.46 4.142 1.28 5.523-.28 1.472-1.55 1.288-4.02-.461-5.57.093.09.093.09 0 0Zm125.731-25.05h-2.67v14.26h2.67v-14.26Zm-119.472 30.71-.184-.09c-1.288-.36-2.669.37-3.037 1.65-.368 1.28.368 2.56 1.657 3.01l.276.1c1.288.36 2.669-.37 3.037-1.65.276-1.28-.46-2.65-1.749-3.02Zm-12.978-11.42-.092-.18c-.552-1.28-1.933-1.83-3.221-1.38-1.289.55-1.841 1.92-1.381 3.2 0 .1.092.19.092.28.552 1.28 1.933 1.83 3.222 1.28 1.38-.46 1.933-1.92 1.38-3.2Zm-3.313-4.57c2.117 0 3.866-1.65 3.958-3.75v-.27c.092-2.2-1.565-3.93-3.774-4.03-2.117-.09-3.958 1.56-4.05 3.66v.37c-.092 2.19 1.565 3.93 3.774 4.02h.092Zm19.237 6.03-.184-.09c-2.393-.73-4.971.64-5.615 3.02-.736 2.37.644 4.93 3.13 5.66.092 0 .276.09.368.09 2.393.64 4.97-.82 5.522-3.19.553-2.38-.828-4.85-3.221-5.49Zm23.563-2.38c-1.933-1-4.326-.27-5.339 1.65l-.092.18a3.803 3.803 0 0 0 1.565 5.3 3.854 3.854 0 0 0 5.338-1.55v-.09c.092-.09.092-.18.185-.28 1.012-1.82.276-4.2-1.657-5.21Zm1.38-7.95c-1.38-.09-2.485 1.01-2.577 2.29v.27c-.092 1.37.921 2.47 2.301 2.56h.184c1.289 0 2.393-1 2.485-2.28v-.28c0-1.28-1.012-2.47-2.393-2.56Zm22.367-10.42h-2.761v9.69c0 1.46-.737 2.19-1.934 2.19-.828-.09-1.564-.45-2.116-1.09l-1.657 2.01c1.104 1 2.485 1.64 3.958 1.64 2.393.1 4.326-1.73 4.51-4.02v-10.42Zm-33.228 27.79-.184.09c-1.104.73-1.38 2.29-.644 3.38.736 1.1 2.301 1.37 3.405.64.093-.09.185-.09.277-.18 1.104-.82 1.38-2.29.552-3.38-.829-1.1-2.301-1.28-3.406-.55Zm-8.284 1.28h-.184a3.995 3.995 0 0 0-3.313 4.48c.368 2.1 2.301 3.56 4.51 3.29h.092c.092 0 .184 0 .368-.09 2.117-.46 3.498-2.47 3.13-4.57-.553-2.11-2.578-3.48-4.603-3.11Zm7.64-2.47c2.025-1.55 2.485-4.39.92-6.4-1.472-1.92-4.326-2.37-6.258-.91l-.185.09c-2.117 1.46-2.577 4.2-1.196 6.31 1.473 2.1 4.234 2.56 6.351 1.19h.092c.092-.19.184-.19.276-.28Zm-31.755-23.49c1.197.64 2.669.18 3.314-.91l.092-.19c.644-1.19.276-2.65-.921-3.29-1.196-.64-2.669-.27-3.313.92-.092.09-.092.18-.184.27-.645 1.1-.184 2.56 1.012 3.2Zm29.178 4.94c0-.1-.092-.19-.092-.28-.46-1.1-1.749-1.55-2.854-1.1-1.104.46-1.564 1.74-1.104 2.84 0 0 0 .09.092.09.46 1.1 1.657 1.64 2.853 1.19 1.013-.37 1.565-1.65 1.105-2.74Zm-3.498 8.68c1.013.55 2.393.27 2.946-.82.092-.1.092-.19.184-.28.552-1 .184-2.37-.921-2.92-1.104-.55-2.393-.19-2.945.91l-.092.09a2.31 2.31 0 0 0 .828 3.02Zm9.296-9.05c-2.485-.09-4.602 1.83-4.786 4.3v.18c-.184 2.47 1.749 4.66 4.234 4.75h.276c2.393 0 4.418-1.83 4.51-4.29v-.37c.277-2.29-1.656-4.39-4.234-4.57Zm-13.438 8.41h-.184c-1.196.18-2.025 1.28-1.841 2.47.184 1.09 1.105 1.83 2.117 1.83h.368c.093 0 .185 0 .277-.1 1.196-.18 1.932-1.37 1.748-2.46-.092-1.19-1.196-1.92-2.485-1.74.092 0 .092 0 0 0Zm3.958-21.48.184.09c2.117.55 4.234-.64 4.878-2.65.553-2.19-.644-4.3-2.761-4.94l-.368-.09c-2.025-.55-4.142.73-4.694 2.84-.552 2.1.644 4.2 2.761 4.75Zm-.736 10.78c.368-1.09-.276-2.37-1.473-2.65-.092 0-.184-.09-.276-.09-1.197-.27-2.393.37-2.669 1.56-.276 1.18.368 2.37 1.564 2.65h.185c1.104.27 2.393-.37 2.669-1.47Zm9.296-8.5.184.19c1.013.91 2.577.82 3.498-.19.92-1 .828-2.56-.184-3.47-.092-.09-.184-.09-.184-.18-1.013-.83-2.578-.73-3.498.36-.828.92-.736 2.38.184 3.29Zm-7.455 1.28c-1.657 1.92-1.473 4.76.46 6.4.092 0 .092.09.184.09 1.841 1.74 4.694 1.65 6.443-.27 1.749-1.83 1.657-4.66-.276-6.4l-.092-.09a7.34 7.34 0 0 1-.276-.28c-1.933-1.55-4.879-1.37-6.443.55Zm10.584 6.49c0 .09.093.09.093.19.828 2.01 3.129 2.92 5.154 2.1 1.933-.82 2.945-3.11 2.117-5.03 0-.09-.092-.18-.184-.36v-.1c-.921-2.01-3.222-2.83-5.247-1.92-1.932.83-2.853 3.11-1.933 5.12Zm-19.605 10.33-.092-.09c-.92-.82-2.301-.73-3.037.18-.736.92-.736 2.2.092 3.02.092.09.184.09.184.18.921.73 2.301.64 3.037-.27.829-.82.645-2.2-.184-3.02Zm-5.982-4.2v.27c-.092 1.19.92 2.2 2.117 2.2h.092c1.196 0 2.117-.92 2.209-2.11v-.18c.092-1.19-.737-2.28-1.933-2.38-1.197-.09-2.301.73-2.393 1.92-.092.09-.092.19-.092.28Zm-3.682-12.62c.828 0 1.657-.27 2.301-.73l.184-.18c1.749-1.28 2.209-3.66 1.013-5.49-1.197-1.82-3.682-2.19-5.523-1h-.092l-.276.18a3.921 3.921 0 0 0-.829 5.49c.829 1.18 1.933 1.73 3.222 1.73Zm10.309 4.39c.276 0 .552 0 .828-.09h.184c2.485-.46 4.142-2.74 3.682-5.21-.46-2.38-2.761-4.02-5.155-3.66-.092 0-.276 0-.368.09-2.485.46-4.142 2.84-3.681 5.31.46 1.92 2.301 3.47 4.51 3.56Zm-1.197-10.33h.736c1.197-.27 2.117-1.55 1.933-2.83-.276-1.37-1.472-2.29-2.853-2.1l-.276.09c-1.289.27-2.209 1.46-2.025 2.83.276 1.19 1.289 2.01 2.485 2.01Zm-10.769 16.91a4.562 4.562 0 0 0 6.167-1.83c0-.09.092-.09.092-.18 1.197-2.19.368-4.93-1.841-6.12-2.209-1.19-4.97-.46-6.167 1.73-.092.09-.092.19-.184.37-1.104 2.1-.276 4.84 1.933 6.03Zm12.242-4.66c-.644-1.01-2.025-1.28-3.038-.55-.092.09-.184.09-.276.18-.92.74-1.196 2.11-.46 3.02.736.92 2.117 1.19 3.037.46l.093-.09c1.104-.73 1.38-2.11.644-3.02Zm114.133 17c-.276-.45-.736-.73-1.289-.64-.92 0-1.748.73-1.748 1.74 0 .91.736 1.74 1.748 1.74a1.63 1.63 0 0 0 1.289-.64v.64h.46v-3.29h-.46v.45Zm-1.197 2.29c-.736 0-1.289-.55-1.289-1.19 0-.73.553-1.28 1.197-1.28.737 0 1.289.55 1.289 1.19.092.64-.461 1.19-1.197 1.28Zm-13.99-3.75c0-.18.092-.18.184-.18h.644v-.46h-.736c-.276 0-.645.18-.645.55v.91h-.644v.46h.644v2.83h.461v-2.83h.92v-.46h-.92l.092-.82Zm6.351-5.76v-14.26h-2.761v5.85h-6.443v-5.85h-2.762v14.26h2.762v-5.85h6.443v5.85h2.761Zm-2.669 9.87h2.853v-.45h-2.301v-1.65h2.209v-.46h-2.209V1589h2.301v-.46h-2.853v4.66Zm-8.745-3.38c-.92 0-1.748.73-1.748 1.65v.09c0 1 .828 1.73 1.84 1.73.921 0 1.75-.73 1.75-1.73 0-.92-.829-1.74-1.842-1.74.092 0 .092 0 0 0Zm.092 3.02c-.736 0-1.288-.55-1.288-1.19 0-.73.552-1.28 1.196-1.28h.092c.737 0 1.289.64 1.197 1.28 0 .64-.552 1.1-1.197 1.19Zm-4.602-1.83h1.657c-.092 1-.828 1.74-1.841 1.74-1.104 0-2.025-.92-2.025-1.92 0-1.1.829-1.92 1.933-1.92.553 0 1.197.27 1.565.64l.368-.37c-.552-.55-1.197-.73-1.933-.73-1.381 0-2.485 1.01-2.485 2.38v.09c0 1.37 1.104 2.47 2.485 2.47 1.289 0 2.393-1.01 2.393-2.29v-.46h-2.208l.091.37Zm7.18 2.19h.46v-4.75h-.46v4.75Zm11.045-1.83-.369-.09c-.368-.09-.551-.27-.551-.55 0-.27.276-.45.551-.45.369 0 .645.18.737.55l.46-.1c-.092-.54-.552-.91-1.104-.91-.553-.09-1.012.28-1.105.82v.09c0 .46.368.74.737.92l.46.18c.46.09.552.28.552.55s-.276.46-.644.46a.891.891 0 0 1-.829-.64l-.46.18c.092.55.645 1.01 1.289.91.552.1 1.104-.36 1.196-.91v-.09c-.092-.46-.46-.73-.92-.92Zm11.781-1.55c-.92 0-1.748.73-1.748 1.65v.09c0 .91.644 1.64 1.564 1.73h.184c.553 0 1.105-.18 1.473-.54l-.276-.37c-.276.27-.737.46-1.105.46-.644 0-1.196-.46-1.196-1.1h2.853v-.37a1.782 1.782 0 0 0-1.749-1.55Zm-1.196 1.46c.092-.55.644-1 1.196-1 .553 0 1.104.45 1.104 1h-2.3Zm-35.068-22.57c-.921 0-1.657.73-1.657 1.64 0 .92.736 1.65 1.657 1.65.92 0 1.656-.73 1.656-1.65.093-.91-.644-1.64-1.656-1.64Zm40.13 22.66-.368-.09c-.369-.09-.552-.27-.552-.55 0-.27.276-.45.552-.45.368 0 .644.18.736.55l.461-.1c-.092-.54-.553-.91-1.105-.91-.552-.09-1.012.28-1.105.82v.09c0 .46.368.74.737.92l.46.18c.46.09.552.28.552.55s-.276.46-.644.46a.892.892 0 0 1-.829-.64l-.459.18c.091.55.644 1.01 1.288.91.552.1 1.105-.36 1.196-.91v-.09c-.091-.46-.459-.73-.92-.92Zm5.799-13.89-1.381-.55c-.644-.18-.92-.45-.92-.82 0-.46.368-.73 1.012-.73.645 0 1.289.46 1.381 1.1l2.301-.37c-.276-1.74-1.841-3.02-3.682-2.93-2.117 0-3.59 1.28-3.59 3.11 0 1.19.737 2.2 2.302 2.84l1.657.64c.644.27.828.54.828.91 0 .46-.46.82-1.105.82-.736 0-1.472-.45-1.657-1.19l-2.301.64c.185 1.38 1.565 2.84 3.866 2.84 2.117 0 3.774-1.28 3.774-3.2.092-1.74-1.105-2.56-2.485-3.11Zm-79.893 13.07c-.277-.45-.736-.73-1.289-.64-.92 0-1.749.73-1.749 1.74 0 .91.736 1.74 1.749 1.74.553 0 1.012-.28 1.289-.64v.64h.46v-3.29h-.46v.45Zm-1.289 2.29c-.736 0-1.289-.55-1.289-1.19 0-.73.553-1.28 1.197-1.28.736 0 1.289.55 1.289 1.19.092.64-.461 1.19-1.197 1.28.092 0 .092 0 0 0Zm62.129-.37v-2.1h.737v-.46h-.737v-.91h-.46v.91h-.645v.46h.645v2.19c0 .37.184.64.552.64h.645v-.45h-.553c-.092 0-.184-.1-.184-.28Zm-.552-23.76c-.921 0-1.657.73-1.657 1.64 0 .92.736 1.65 1.657 1.65.92 0 1.657-.73 1.657-1.65.091-.91-.645-1.64-1.657-1.64Zm6.995 23.76v-2.1h.736v-.46h-.736v-.91h-.46v.91h-.645v.46h.645v2.19c0 .37.184.64.552.64h.644v-.45h-.46c-.184 0-.276-.1-.276-.28Zm-8.284-9.14h2.669v-9.96h-2.669v9.96Zm-47.586 8.23c0 .73-.46 1.19-1.013 1.19-.552 0-.92-.37-.92-1.1v-1.83h-.46v2.01c0 .82.46 1.37 1.288 1.37.461 0 .921-.18 1.105-.64v.55h.46v-3.29h-.46v1.74Zm9.48-1.74c-.92 0-1.749.73-1.749 1.65v.09c0 .91.645 1.64 1.566 1.73h.183c.553 0 1.105-.18 1.473-.54l-.276-.37c-.276.27-.736.46-1.105.46-.644 0-1.196-.46-1.196-1.1h2.853v-.37a1.782 1.782 0 0 0-1.749-1.55Zm-1.196 1.46c.092-.55.644-1 1.196-1 .553 0 1.105.45 1.105 1h-2.301Zm-.276-7.95h2.577v-9.96h-2.669v4.93c0 1.56-.553 2.75-2.025 2.75-1.105 0-2.025-.83-2.025-1.92v-5.85h-2.669v5.94c0 2.47 1.012 4.2 3.682 4.2 1.196 0 2.3-.55 3.037-1.55l.092 1.46Zm-2.393 6.49c-.553 0-1.013.28-1.197.73-.184-.45-.644-.82-1.196-.73-.461 0-.921.18-1.105.64v-.55h-.461v3.29h.461v-1.64c0-.73.46-1.19 1.013-1.19.551 0 .828.36.828 1.1v1.82h.46v-1.64c0-.73.461-1.19 1.012-1.19.553 0 .829.37.829 1.1v1.83h.46v-2.02a1.23 1.23 0 0 0-1.013-1.37c.093-.18 0-.18-.091-.18Zm-14.727 2.65v-2.1h.736v-.46h-.736v-.91h-.461v.91h-.644v.46h.644v2.19c0 .37.185.64.553.64h.644v-.45h-.46c-.184 0-.276-.1-.276-.28Zm8.375-14.17c-.091-2.92-2.576-5.3-5.522-5.21-2.853.09-5.154 2.38-5.246 5.21 0 2.93 2.485 5.31 5.43 5.31 2.945-.1 5.247-2.38 5.338-5.31Zm-5.338 2.84c-1.565 0-2.853-1.19-2.853-2.75v-.09c0-1.55 1.197-2.74 2.761-2.74h.092c1.473 0 2.762 1.19 2.762 2.65v.09c0 1.56-1.197 2.84-2.762 2.84Zm2.209 10.51c0 .73-.276 1.1-.828 1.1-.368 0-.644-.19-.829-.46l-.46.46c.277.36.737.54 1.197.54.92 0 1.38-.54 1.38-1.55v-3.29h-.552l.092 3.2Zm18.041-1.19v-.55h-.46v3.29h.46v-1.64c0-.83.368-1.19 1.104-1.19v-.46c-.46-.09-.828.19-1.104.55Zm1.84-15.36-.092-1.73h-2.485v9.87h2.67v-4.39c0-2.28 1.288-3.2 3.313-3.2h.092v-2.56c-1.473 0-2.854.73-3.498 2.01Zm2.669 15.45c-.276-.45-.736-.73-1.288-.64-.92 0-1.749.73-1.749 1.74 0 .91.737 1.74 1.749 1.74a1.63 1.63 0 0 0 1.288-.64v.64h.461v-3.29h-.461v.45Zm-1.288 2.29c-.737 0-1.288-.55-1.288-1.19 0-.73.551-1.28 1.196-1.28.736 0 1.289.55 1.289 1.19.091.64-.46 1.19-1.197 1.28.092 0 .092 0 0 0Zm4.51-3.02c-.46 0-.92.18-1.104.64v-2.01h-.461v4.75h.461v-1.73c0-.74.46-1.19 1.012-1.19s.829.36.829 1.09v1.83h.459v-2.01c.093-.82-.368-1.37-1.196-1.37Zm-9.665-1.28a.394.394 0 0 0-.368.37c0 .18.185.36.368.36.185 0 .369-.18.369-.36 0-.28-.092-.37-.369-.37.093 0 .093 0 0 0Zm-.183 4.66h.46v-3.29h-.46v3.29Zm9.204-9.87h2.669v-9.96h-2.669v9.96Z"
                    class="e-44__Vector" />
                    </g>
                </g>
            </g>
            <g class="e-44__line">
                <circle cx="338" cy="1696" r="12" fill="#fff" fill-opacity=".8" class="e-44__Ellipse e-44__1" />
                <path fill="#fff" d="M344 1696c0 3.31-2.686 6-6 6s-6-2.69-6-6 2.686-6 6-6 6 2.69 6 6Z"
                    class="e-44__Ellipse e-44__1" />
                <path fill="#fff" d="M337 1616h2v80h-2z" class="e-44__Rectangle e-44__1" />
            </g>
        </g>
        </svg>`
}