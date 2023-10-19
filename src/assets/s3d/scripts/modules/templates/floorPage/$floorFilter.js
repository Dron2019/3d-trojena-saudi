export default function $floorFilter(i18n) {
  return `
    <div class="s3d-floor__tabs-wrapper">
     <div class="s3d-floor__tabs-title-mob">${i18n.t('Floor.filter.title-mob')}</div>
     <div class="s3d-floor__tabs">
        <button class="s3d-floor__tab" data-rooms="1">${i18n.t('Floor.filter.1')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.64645 14.3536L8 14.7071L8.35355 14.3536L14.3536 8.35355L14.7071 8L14.3536 7.64645L8.35355 1.64645L8 1.29289L7.64645 1.64645L1.64645 7.64645L1.29289 8L1.64645 8.35355L7.64645 14.3536Z"/>
          </svg>
        </button>
        <button class="s3d-floor__tab" data-rooms="2">${i18n.t('Floor.filter.2')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.64645 14.3536L8 14.7071L8.35355 14.3536L14.3536 8.35355L14.7071 8L14.3536 7.64645L8.35355 1.64645L8 1.29289L7.64645 1.64645L1.64645 7.64645L1.29289 8L1.64645 8.35355L7.64645 14.3536Z"/>
          </svg>
        </button>
        <button class="s3d-floor__tab" data-rooms="3">${i18n.t('Floor.filter.3')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.64645 14.3536L8 14.7071L8.35355 14.3536L14.3536 8.35355L14.7071 8L14.3536 7.64645L8.35355 1.64645L8 1.29289L7.64645 1.64645L1.64645 7.64645L1.29289 8L1.64645 8.35355L7.64645 14.3536Z"/>
          </svg>
        </button>
        <button class="s3d-floor__tab" data-rooms="4">${i18n.t('Floor.filter.4')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.64645 14.3536L8 14.7071L8.35355 14.3536L14.3536 8.35355L14.7071 8L14.3536 7.64645L8.35355 1.64645L8 1.29289L7.64645 1.64645L1.64645 7.64645L1.29289 8L1.64645 8.35355L7.64645 14.3536Z"/>
          </svg>
        </button>
        <button class="s3d-floor__tab" data-rooms="all">${i18n.t('Floor.filter.all')}</button>
      </div>
    </div>
  `;
}
