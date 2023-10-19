import { closeIcon, infoIcon, leftIcon, moveIcon, rightIcon, touchMoveIcon } from "../../../assets/icons";
import { isDesktop } from "../../helpers/helpers";

function $earthTutorial() {
    return `
        <div class="s3d-earth__tutorial" data-earth-tutorial>
            <div class="s3d-earth__tutorial__close">
                ${closeIcon('data-earth-tutorial-close')}
            </div>
            <div class="s3d-earth__tutorial-part">
                <div class="s3d-earth__tutorial-part-title">Click on the arrows to rotate</div>
                ${leftIcon()}
            </div>
            <div class="s3d-earth__tutorial-part">
                <div class="s3d-earth__tutorial-part-title">Use drag to rotate</div>
                ${isDesktop() ?  moveIcon() : touchMoveIcon()}
            </div>
            <div class="s3d-earth__tutorial-part">
                <div class="s3d-earth__tutorial-part-title">Click on pin to show map</div>
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect class="s3d-earth__unpaintable" width="37" height="36" rx="4" fill="white"/>
                    <circle class="s3d-earth__unpaintable" cx="18" cy="18" r="15" fill="#000F2C"/>
                    <circle class="s3d-earth__unpaintable" cx="18.0073" cy="18.0073" r="6.71435" fill="white"/>
                </svg>
            </div>
        </div>
    `;
}


export default function $earth(params = {}) {
    return `
        <div class="js-s3d__wrapper__earth js-s3d-ctr unselectable s3d-earth s3d__wrap" data-type="earth">
            <div class="s3d-earth__navigation">
                ${leftIcon('data-earth-left id="rotateButtonClockwise"')}
                ${rightIcon('data-earth-right id="rotateButtonCounterClockwise"')}
                ${infoIcon('data-earth-tutorial-open')}
            </div>
            ${$earthTutorial()}
        </div>
    
    `
}



