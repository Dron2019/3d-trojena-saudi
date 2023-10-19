import { downIcon, infoIcon, leftIcon, rightIcon, upIcon } from "../../../assets/icons";
import $infrastructureFilter from "../infrastructureFilter/$infrastructureFilter";
import $mapSvg from "./$mapSvg";

export default function $map(i18n) {
    const filterButtons = [
        // {
        //     title: "Landmarks",
        //     icon: `
        //     <svg class="s3d-map__filter-button__icon" width="16" height="23" viewBox="0 0 16 23" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M8.02451 23C8.02451 23 11.8018 18.2504 14.6875 12.7361C17.5733 7.22179 15.3972 2.63993 11.1094 0.612649C7.34868 -0.975159 2.833 0.612651 0.937836 4.34264C-0.275111 7.13807 -0.385091 8.26428 1.04278 11.932C2.47065 15.5997 8.02451 23 8.02451 23Z" fill="black"/>
        //     </svg>

        //     `,
        //     value: "landmarks",
        //     checked: true
        // },
        // {
        //     title: "Roads",
        //     icon: `
        //         <svg class="s3d-map__filter-button__icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //             <path d="M14.6018 16.6367L14.87 16.1195C14.9551 15.9532 15.0343 15.79 15.1088 15.6234C15.2549 15.2917 15.3744 14.955 15.4497 14.6222C15.6027 13.9504 15.5231 13.3343 15.1147 12.878C14.7063 12.4126 14.032 12.1003 13.335 11.8826C11.8513 11.4555 10.3339 10.9803 8.86583 10.4229C8.4973 10.283 8.13055 10.1377 7.76525 9.98278C7.40544 9.83156 7.01534 9.6548 6.65844 9.4155C6.30561 9.177 5.93558 8.85919 5.74456 8.37192C5.64992 8.1323 5.62508 7.86127 5.65691 7.61503C5.68902 7.36814 5.76941 7.14347 5.86916 6.94327C6.07663 6.53306 6.3312 6.23719 6.56061 5.91975L7.27475 4.9883L8.71799 3.14508L11.1752 0.0537188L9.302 0C9.302 0 5.03516 3.92386 3.13058 6.40008C1.47477 8.5523 2.37917 10.454 5.37449 11.7331C7.90259 12.8133 10.2689 13.6494 10.2689 13.6494C10.6766 13.8605 10.9666 14.2305 11.063 14.6623C11.1594 15.0945 11.0528 15.5441 10.7704 15.8951L4.25235 24H10.7555L13.5214 18.7093L14.6018 16.6367Z" fill="black"/>
        //             <path d="M20.8579 12.2355C19.9502 10.717 18.3963 9.64601 16.5962 9.29787L10.2188 7.9533C9.95283 7.90216 9.72929 7.73341 9.61641 7.4989C9.50354 7.26476 9.51558 6.9933 9.64819 6.76868L13.8877 0.131178L11.8227 0.0720215L9.21207 3.5254L7.81744 5.39852L7.1318 6.33987C6.91116 6.65655 6.66788 6.96963 6.53382 7.26255C6.39104 7.56537 6.35522 7.85397 6.45825 8.09355C6.55758 8.33904 6.80049 8.56732 7.09346 8.75074C7.39008 8.93848 7.71628 9.0798 8.07793 9.22155C8.43371 9.36218 8.7946 9.49554 9.15807 9.62337C10.6185 10.1366 12.0894 10.5588 13.6112 10.9574C14.3914 11.1897 15.2173 11.5009 15.8752 12.195C16.1959 12.5423 16.4352 12.9986 16.5261 13.4709C16.6196 13.9436 16.589 14.4089 16.5071 14.8392C16.4209 15.2691 16.2862 15.6731 16.128 16.0581C16.048 16.2495 15.9617 16.4391 15.8734 16.6218L15.6162 17.1489L14.5858 19.2489L12.2475 24H18.8393L21.3327 17.2197C21.9388 15.5709 21.7656 13.7539 20.8579 12.2355Z" fill="black"/>
        //         </svg>
            
            
        //     `,
        //     value: "roads",
        //     checked: true
        // },
        // {
        //     title: "Retails",
        //     icon: `
        //     <svg class="s3d-map__filter-button__icon" width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
        //     <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75598 6.7148C7.84942 6.58025 8.00285 6.5 8.16667 6.5H14.8333C14.9972 6.5 15.1506 6.58025 15.244 6.7148L16.9107 9.1148C16.9688 9.19854 17 9.29805 17 9.4V10V17.8C17 18.239 16.8389 18.667 16.5414 18.9882C16.2428 19.3108 15.8291 19.5 15.3889 19.5H7.61111C7.17086 19.5 6.7572 19.3108 6.45856 18.9882C6.16111 18.667 6 18.239 6 17.8V10V9.4C6 9.29805 6.03116 9.19854 6.08932 9.1148L7.75598 6.7148ZM14.5718 7.5L15.9607 9.5H7.03929L8.42818 7.5H14.5718ZM16 10.5H7V17.8C7 17.9975 7.07302 18.18 7.19232 18.3088C7.31042 18.4364 7.46199 18.5 7.61111 18.5H15.3889C15.538 18.5 15.6896 18.4364 15.8077 18.3088C15.927 18.18 16 17.9975 16 17.8V10.5ZM9 12C9 11.7239 8.77614 11.5 8.5 11.5C8.22386 11.5 8 11.7239 8 12C8 12.7434 8.44265 13.3911 9.10133 13.8302C9.75973 14.2692 10.6234 14.5 11.5 14.5C12.3766 14.5 13.2403 14.2692 13.8987 13.8302C14.5573 13.3911 15 12.7434 15 12C15 11.7239 14.7761 11.5 14.5 11.5C14.2239 11.5 14 11.7239 14 12C14 12.3174 13.8105 12.6872 13.344 12.9982C12.8772 13.3094 12.2147 13.5 11.5 13.5C10.7853 13.5 10.1228 13.3094 9.65603 12.9982C9.18949 12.6872 9 12.3174 9 12Z" fill="#4C4C4C"/>
        //     </svg>`,
        //     value: "malls"
        // },
        // {
        //     title: "Education",
        //     icon:  ` <svg class="s3d-map__filter-button__icon" width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
        //     <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7305 7.55605C11.586 7.48099 11.414 7.48099 11.2695 7.55605L4.26951 11.1924C4.10391 11.2784 4 11.4495 4 11.6361C4 11.8227 4.10391 11.9938 4.26951 12.0798L7 13.4983C7 13.4988 7 13.4993 7 13.4998V16.448C7 16.5777 7.05038 16.7023 7.14051 16.7955C8.25452 17.948 9.89587 18.4998 11.5 18.4998C13.1041 18.4998 14.7455 17.948 15.8595 16.7955C15.9496 16.7023 16 16.5777 16 16.448V13.4998C16 13.4993 16 13.4988 16 13.4983L18 12.4593V15.9998C18 16.2759 18.2239 16.4998 18.5 16.4998C18.7761 16.4998 19 16.2759 19 15.9998V11.6361C19 11.5109 18.954 11.3965 18.878 11.3088C18.8345 11.2587 18.7812 11.2172 18.7211 11.1875L11.7305 7.55605ZM15 14.0177L11.7305 15.7162C11.586 15.7912 11.414 15.7912 11.2695 15.7162L8 14.0177V16.2386C8.88545 17.0655 10.176 17.4998 11.5 17.4998C12.824 17.4998 14.1146 17.0655 15 16.2386V14.0177ZM11.5 8.5632L17.4154 11.6361L11.5 14.709L5.58462 11.6361L11.5 8.5632Z" fill="#4C4C4C"/>
        //     </svg>`,
        //     value: "education"
        // },
        // {
        //     title: "Health",
        //     icon: ` <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M16.4375 7.9375V8.4375H16.9375H22.9375C23.4895 8.4375 23.9375 8.88502 23.9375 9.4375V15.4375C23.9375 15.99 23.4895 16.4375 22.9375 16.4375H16.9375H16.4375V16.9375V22.9375C16.4375 23.4895 15.99 23.9375 15.4375 23.9375H9.4375C8.88547 23.9375 8.4375 23.49 8.4375 22.9375V16.9375V16.4375H7.9375H1.9375C1.38547 16.4375 0.9375 15.99 0.9375 15.4375V9.4375C0.9375 8.88547 1.38502 8.4375 1.9375 8.4375H7.9375H8.4375V7.9375V1.9375C8.4375 1.38547 8.88502 0.9375 9.4375 0.9375H15.4375C15.9902 0.9375 16.4375 1.38484 16.4375 1.9375V7.9375Z" stroke="black"/>
        //     </svg>
            
        //     `,
        //     value: "health"
        // },
        // {
        //     title: "Distances",
        //     icon: `<svg class="s3d-map__filter-button__icon" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M8.40933 25.6921C8.40056 25.7007 8.38878 25.7055 8.37651 25.7055C8.36424 25.7055 8.35246 25.7007 8.3437 25.6921C7.87495 25.1718 2.86401 19.4906 2.86401 15.7265C2.86401 11.0671 5.91089 9.98901 8.37651 9.98901C10.6453 9.98901 13.5609 11.2078 13.5609 15.7265C13.5609 19.6125 8.84526 25.1812 8.40933 25.6921Z" stroke="black"/>
        //     <path d="M8.21252 16.936C9.44222 16.936 10.4391 15.9392 10.4391 14.7095C10.4391 13.4798 9.44222 12.4829 8.21252 12.4829C6.98283 12.4829 5.98596 13.4798 5.98596 14.7095C5.98596 15.9392 6.98283 16.936 8.21252 16.936Z" stroke="black"/>
        //     <path d="M23.2407 16.2985C23.2311 16.3074 23.2186 16.3124 23.2055 16.3124C23.1925 16.3124 23.1799 16.3074 23.1704 16.2985C22.7625 15.8298 18.8625 11.4001 18.8625 8.45166C18.8625 4.77666 21.2625 3.92822 23.2079 3.92822C24.9938 3.92822 27.2907 4.86572 27.2907 8.45166C27.2907 11.4938 23.625 15.8485 23.2407 16.2985Z" stroke="black"/>
        //     <path d="M23.0765 9.87646C24.0474 9.87646 24.8344 9.08947 24.8344 8.11865C24.8344 7.14784 24.0474 6.36084 23.0765 6.36084C22.1057 6.36084 21.3187 7.14784 21.3187 8.11865C21.3187 9.08947 22.1057 9.87646 23.0765 9.87646Z" stroke="black"/>
        //     <path d="M8.37659 25.7297C8.97553 25.9111 9.58638 26.0505 10.2047 26.1469" stroke="black"/>
        //     <path d="M11.5687 26.2829C12.8765 26.3392 14.3109 26.1517 15.2719 25.3079C17.9906 22.922 16.6265 20.0345 18.4359 18.4126C19.1189 17.8134 19.9009 17.3376 20.7469 17.0063" stroke="black" stroke-dasharray="97.5 36.5"/>
        //     <path d="M21.389 16.7813C21.9812 16.5803 22.5898 16.4313 23.2078 16.3359" stroke="black"/>
        //     </svg>
        //     `,
        //     value: "distances"
        // }
    ];

    const legendIcons = [
        {
            title: "Red Line",
            icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="24" height="24" rx="4" fill="#FF5F5F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75005 7.5C7.33584 7.5 7.00005 7.83579 7.00005 8.25V11.5H11.0001V7.5H7.75005ZM11.5001 6.5H15.2501C16.2166 6.5 17.0001 7.2835 17.0001 8.25V12V15.75C17.0001 16.7165 16.2166 17.5 15.2501 17.5H15.1514L16.7774 18.584C17.0072 18.7372 17.0693 19.0476 16.9161 19.2774C16.7629 19.5071 16.4525 19.5692 16.2227 19.416L13.3487 17.5H9.65144L6.7774 19.416C6.54764 19.5692 6.2372 19.5071 6.08403 19.2774C5.93085 19.0476 5.99294 18.7372 6.2227 18.584L7.84867 17.5H7.75005C6.78355 17.5 6.00005 16.7165 6.00005 15.75V12V8.25C6.00005 7.2835 6.78355 6.5 7.75005 6.5H11.5001ZM13.5078 16.5C13.5029 16.4999 13.4981 16.4999 13.4932 16.5H9.50689H9.49229H7.75005C7.33584 16.5 7.00005 16.1642 7.00005 15.75V12.5H11.5001H16.0001V15.75C16.0001 16.1642 15.6643 16.5 15.2501 16.5H13.5078ZM12.0001 7.5V11.5H16.0001V8.25C16.0001 7.83579 15.6643 7.5 15.2501 7.5H12.0001Z" fill="white"/>
            </svg>
            
            `,
        },
        {
            title: "Green Line",
            icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="24" height="24" rx="4" fill="#4FDC6D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75005 7.5C7.33584 7.5 7.00005 7.83579 7.00005 8.25V11.5H11.0001V7.5H7.75005ZM11.5001 6.5H15.2501C16.2166 6.5 17.0001 7.2835 17.0001 8.25V12V15.75C17.0001 16.7165 16.2166 17.5 15.2501 17.5H15.1514L16.7774 18.584C17.0072 18.7372 17.0693 19.0476 16.9161 19.2774C16.7629 19.5071 16.4525 19.5692 16.2227 19.416L13.3487 17.5H9.65144L6.7774 19.416C6.54764 19.5692 6.2372 19.5071 6.08403 19.2774C5.93085 19.0476 5.99294 18.7372 6.2227 18.584L7.84867 17.5H7.75005C6.78355 17.5 6.00005 16.7165 6.00005 15.75V12V8.25C6.00005 7.2835 6.78355 6.5 7.75005 6.5H11.5001ZM13.5078 16.5C13.5029 16.4999 13.4981 16.4999 13.4932 16.5H9.50689H9.49229H7.75005C7.33584 16.5 7.00005 16.1642 7.00005 15.75V12.5H11.5001H16.0001V15.75C16.0001 16.1642 15.6643 16.5 15.2501 16.5H13.5078ZM12.0001 7.5V11.5H16.0001V8.25C16.0001 7.83579 15.6643 7.5 15.2501 7.5H12.0001Z" fill="white"/>
            </svg>
            
            `,
        },
        {
            title: "Tram",
            icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="24" height="24" rx="4" fill="#FF8314"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75005 7.5C7.33584 7.5 7.00005 7.83579 7.00005 8.25V11.5H11.0001V7.5H7.75005ZM11.5001 6.5H15.2501C16.2166 6.5 17.0001 7.2835 17.0001 8.25V12V15.75C17.0001 16.7165 16.2166 17.5 15.2501 17.5H15.1514L16.7774 18.584C17.0072 18.7372 17.0693 19.0476 16.9161 19.2774C16.7629 19.5071 16.4525 19.5692 16.2227 19.416L13.3487 17.5H9.65144L6.7774 19.416C6.54764 19.5692 6.2372 19.5071 6.08403 19.2774C5.93085 19.0476 5.99294 18.7372 6.2227 18.584L7.84867 17.5H7.75005C6.78355 17.5 6.00005 16.7165 6.00005 15.75V12V8.25C6.00005 7.2835 6.78355 6.5 7.75005 6.5H11.5001ZM13.5078 16.5C13.5029 16.4999 13.4981 16.4999 13.4932 16.5H9.50689H9.49229H7.75005C7.33584 16.5 7.00005 16.1642 7.00005 15.75V12.5H11.5001H16.0001V15.75C16.0001 16.1642 15.6643 16.5 15.2501 16.5H13.5078ZM12.0001 7.5V11.5H16.0001V8.25C16.0001 7.83579 15.6643 7.5 15.2501 7.5H12.0001Z" fill="white"/>
            </svg>
            
            `,
        },
        {
            title: "Future Line",
            icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="24" height="24" rx="4" fill="#FFCE36"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75005 7.5C7.33584 7.5 7.00005 7.83579 7.00005 8.25V11.5H11.0001V7.5H7.75005ZM11.5001 6.5H15.2501C16.2166 6.5 17.0001 7.2835 17.0001 8.25V12V15.75C17.0001 16.7165 16.2166 17.5 15.2501 17.5H15.1514L16.7774 18.584C17.0072 18.7372 17.0693 19.0476 16.9161 19.2774C16.7629 19.5071 16.4525 19.5692 16.2227 19.416L13.3487 17.5H9.65144L6.7774 19.416C6.54764 19.5692 6.2372 19.5071 6.08403 19.2774C5.93085 19.0476 5.99294 18.7372 6.2227 18.584L7.84867 17.5H7.75005C6.78355 17.5 6.00005 16.7165 6.00005 15.75V12V8.25C6.00005 7.2835 6.78355 6.5 7.75005 6.5H11.5001ZM13.5078 16.5C13.5029 16.4999 13.4981 16.4999 13.4932 16.5H9.50689H9.49229H7.75005C7.33584 16.5 7.00005 16.1642 7.00005 15.75V12.5H11.5001H16.0001V15.75C16.0001 16.1642 15.6643 16.5 15.2501 16.5H13.5078ZM12.0001 7.5V11.5H16.0001V8.25C16.0001 7.83579 15.6643 7.5 15.2501 7.5H12.0001Z" fill="white"/>
            </svg>
            
            `,
        },
        {
            title: "Future Line",
            icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="24" height="24" rx="4" fill="#AC53FF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75005 7.5C7.33584 7.5 7.00005 7.83579 7.00005 8.25V11.5H11.0001V7.5H7.75005ZM11.5001 6.5H15.2501C16.2166 6.5 17.0001 7.2835 17.0001 8.25V12V15.75C17.0001 16.7165 16.2166 17.5 15.2501 17.5H15.1514L16.7774 18.584C17.0072 18.7372 17.0693 19.0476 16.9161 19.2774C16.7629 19.5071 16.4525 19.5692 16.2227 19.416L13.3487 17.5H9.65144L6.7774 19.416C6.54764 19.5692 6.2372 19.5071 6.08403 19.2774C5.93085 19.0476 5.99294 18.7372 6.2227 18.584L7.84867 17.5H7.75005C6.78355 17.5 6.00005 16.7165 6.00005 15.75V12V8.25C6.00005 7.2835 6.78355 6.5 7.75005 6.5H11.5001ZM13.5078 16.5C13.5029 16.4999 13.4981 16.4999 13.4932 16.5H9.50689H9.49229H7.75005C7.33584 16.5 7.00005 16.1642 7.00005 15.75V12.5H11.5001H16.0001V15.75C16.0001 16.1642 15.6643 16.5 15.2501 16.5H13.5078ZM12.0001 7.5V11.5H16.0001V8.25C16.0001 7.83579 15.6643 7.5 15.2501 7.5H12.0001Z" fill="white"/>
            </svg>
            
            `,
        },
    ]

    return `
    <div class="js-s3d__wrapper__map js-s3d-ctr unselectable s3d-map s3d__wrap" data-type="map">
        <div class="js-s3d-map-filter s3d-map__custom-filter">
                ${filterButtons.map(data => `
                    <button data-custom-map-filter="${data.value}" class="s3d-map__custom-filter-item ${data.checked ? 'active' : ''}">
                        ${data.title}
                        ${data.icon}
                    </button>
                `).join('')}
                <button data-custom-map-filter-reset class="s3d-map__custom-filter-item">
                    Show All
                </button>
        </div>
        <div class="s3d-map__map-wrapper">
            ${$mapSvg(i18n)}
        </div>
        <div class="s3d-map__navigation">
            ${leftIcon('data-map-scroll="left"')}
            ${rightIcon('data-map-scroll="right"')}
            ${downIcon('data-map-scroll="down"')}
            ${upIcon('data-map-scroll="up"')}
            ${infoIcon('data-map-tutorial')}
        
        </div>
    </div>`;
} 