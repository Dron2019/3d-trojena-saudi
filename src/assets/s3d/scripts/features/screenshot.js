import html2canvas from "html2canvas";
import Toastify from 'toastify-js';

export function screenshot(target) {
    Toastify({
        text: 'Preparing screenshot',
        duration: 1500
    }).showToast();



    const screenshotImage = document.createElement('img');
    const downloadLink = document.createElement('a');
    screenshotImage.style.display = 'none';
    downloadLink.style.display = 'none';
    downloadLink.setAttribute('download', true);

    document.body.append(screenshotImage);
    document.body.append(downloadLink);

    target.setAttribute('disabled', true);
    html2canvas(document.body, {
        removeContainer: false,
        allowTaint: true,
        useCORS: true,
    }).then(canvas => {
        screenshotImage.src = canvas.toDataURL('image/jpg');
        downloadLink.href = screenshotImage.src;
        downloadLink.click();
        downloadLink.remove();
        screenshotImage.remove();
        setTimeout(() => {
            Toastify({
                text: 'Screenshot downloaded',
                duration: 1500
            }).showToast()
            target.removeAttribute('disabled');
        }, 1000);

    });

}