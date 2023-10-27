import markersFromPrevSite from "./markersFromPrevSite";

const baseFolder = window.location.href.match(/localhost/) 
? './assets/images/markers/'
: '/wp-content/themes/rams/assets/images/markers/';

const markersAdresses = {
    main: `${baseFolder}main.svg`,
    office: `${baseFolder}office.svg`,
    hotel: `${baseFolder}hotel.svg`,
    shop: `${baseFolder}shop.svg`,
    park: `${baseFolder}park.svg`,
    school: `${baseFolder}school.svg`,
    education: `${baseFolder}education.svg`,
    medicine: `${baseFolder}medicine.svg`,
    market: `${baseFolder}market.svg`,
    transport: `${baseFolder}transport.svg`,
    ramsbeyondistanbul: `${baseFolder}ramsbeyondistanbul.svg`,
    ramscity: `${baseFolder}ramscity.svg`,
    quattro: `${baseFolder}quattro.svg`,
    bayramoglu: `${baseFolder}bayramoglu.svg`,
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

export async function fetchMarkersData(google) {

    
    const buildLogoSize = new google.maps.Size(125, 55);
    const sendData = new FormData();
    sendData.append('action', 'infrastructure');
    const url = window.location.href.match(/localhost/)
      ? 'https://central-park-wp.smarto.com.ua/wp-admin/admin-ajax.php'
      : '/wp-admin/admin-ajax.php'
    // let markersData = window.location.href.match(/localhost|smarto/) ? Promise.resolve(mockData()) : await fetch(url, {
    //   method: 'POST',
    //   body: sendData,
    // });
    let markersData = Promise.resolve(mockData());
    // markersData = window.location.href.match(/localhost|smarto/) ? mockData() : await markersData.json();
    markersData = mockData();
    if (!markersData) {
      console.warn('Wrong data recieved');
      return;
    };

    let formatedMarkersDataForMap = markersData.reduce((acc, el) => {
      if (!el.list) return acc;
      el.list.forEach(marker => {
        acc.push({
          content: `<div ${markerPopupStyle}>${marker.name}</div>`,
          position: { 
            lat: marker.coordinations.latitude, 
            lng: marker.coordinations.elevation 
          },
          type: el.code,
          id: marker.id,
          zIndex: 2,
          icon: { rotation:marker.rotation ? marker.rotation : 0, url: marker.iconUrl, scaledSize: marker.iconHeight ? new google.maps.Size(marker.iconWidth, marker.iconHeight) : buildLogoSize },
          options: {
            ...marker
          }
        });
      });
      return acc;
    }, []);
    return formatedMarkersDataForMap;
}



function mockData() {
    return [
        {
            "name": "Rams Garden Bahçelievler",
            "code": "main",
            "list": [
                {
                    "name": "<a style='text-decoration:none; color: rgba(122,144,73,1); font-weight: bold' target='_blank' href='https://ramsgarden.com/'>Rams Garden Bahçelievler</a>",
                    "id": "00",
                    "iconWidth": '100',
                    "iconHeight": '100',
                    "iconDarkUrl": "/wp-content/themes/3d/assets/s3d/images/markers/dark/google_map_logo.svg",
                    "iconUrl": `data:image/svg+xml,%3Csvg width='92' height='95' viewBox='0 0 92 95' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_13_1043)'%3E%3Crect width='80' height='70' transform='translate(6)' fill='%23090C13'/%3E%3Cpath d='M77.618 38L64.8285 20.2368L52.0391 38H77.618Z' fill='url(%23paint0_linear_13_1043)'/%3E%3Cpath d='M54.1708 18.1053L48.4866 11L44.934 14.5526C39.2498 20.2368 40.6708 15.9737 37.8287 18.8158L18.6445 38H71.934L56.3024 16.6842L54.1708 18.1053Z' fill='url(%23paint1_linear_13_1043)'/%3E%3Cpath d='M32.1445 15.2632L14.3813 38H56.3024C48.4866 30.8948 47.7761 28.7632 44.934 28.7632C42.6603 28.7632 41.1445 28.2895 40.6708 28.0527L32.1445 15.2632Z' fill='url(%23paint2_linear_13_1043)'/%3E%3Cpath d='M13.1827 47.593V45.8182H21.5449V47.593H18.4277V56H16.2999V47.593H13.1827ZM22.9221 56V45.8182H26.9391C27.708 45.8182 28.3643 45.9557 28.9078 46.2308C29.4547 46.5026 29.8707 46.8887 30.1557 47.3892C30.4441 47.8864 30.5882 48.4714 30.5882 49.1442C30.5882 49.8203 30.4424 50.402 30.1507 50.8892C29.8591 51.3731 29.4365 51.7443 28.883 52.0028C28.3328 52.2614 27.6666 52.3906 26.8844 52.3906H24.1948V50.6605H26.5364C26.9474 50.6605 27.2888 50.6042 27.5605 50.4915C27.8323 50.3788 28.0345 50.2098 28.1671 49.9844C28.303 49.759 28.3709 49.4789 28.3709 49.1442C28.3709 48.8061 28.303 48.5211 28.1671 48.2891C28.0345 48.0571 27.8307 47.8814 27.5556 47.7621C27.2838 47.6394 26.9408 47.5781 26.5265 47.5781H25.0748V56H22.9221ZM28.4206 51.3665L30.9512 56H28.5748L26.0989 51.3665H28.4206ZM41.4661 50.9091C41.4661 52.0194 41.2556 52.964 40.8347 53.7429C40.4171 54.5218 39.847 55.1167 39.1245 55.5277C38.4052 55.9354 37.5965 56.1392 36.6983 56.1392C35.7935 56.1392 34.9815 55.9337 34.2623 55.5227C33.543 55.1117 32.9746 54.5168 32.557 53.7379C32.1394 52.959 31.9306 52.0161 31.9306 50.9091C31.9306 49.7988 32.1394 48.8542 32.557 48.0753C32.9746 47.2964 33.543 46.7031 34.2623 46.2955C34.9815 45.8845 35.7935 45.679 36.6983 45.679C37.5965 45.679 38.4052 45.8845 39.1245 46.2955C39.847 46.7031 40.4171 47.2964 40.8347 48.0753C41.2556 48.8542 41.4661 49.7988 41.4661 50.9091ZM39.2836 50.9091C39.2836 50.1899 39.1758 49.5833 38.9604 49.0895C38.7483 48.5956 38.4483 48.2211 38.0605 47.9659C37.6728 47.7107 37.2187 47.5831 36.6983 47.5831C36.178 47.5831 35.7239 47.7107 35.3361 47.9659C34.9483 48.2211 34.6467 48.5956 34.4313 49.0895C34.2192 49.5833 34.1131 50.1899 34.1131 50.9091C34.1131 51.6283 34.2192 52.2348 34.4313 52.7287C34.6467 53.2225 34.9483 53.5971 35.3361 53.8523C35.7239 54.1075 36.178 54.2351 36.6983 54.2351C37.2187 54.2351 37.6728 54.1075 38.0605 53.8523C38.4483 53.5971 38.7483 53.2225 38.9604 52.7287C39.1758 52.2348 39.2836 51.6283 39.2836 50.9091ZM47.1374 45.8182H49.2653V52.9176C49.2653 53.5739 49.1178 54.1439 48.8228 54.6278C48.5311 55.1117 48.1251 55.4846 47.6048 55.7464C47.0844 56.0083 46.4795 56.1392 45.7901 56.1392C45.177 56.1392 44.6201 56.0315 44.1197 55.8161C43.6225 55.5973 43.2281 55.2659 42.9364 54.8217C42.6448 54.3743 42.5006 53.8125 42.5039 53.1364H44.6467C44.6533 53.4048 44.708 53.6352 44.8107 53.8274C44.9168 54.0163 45.061 54.1622 45.2433 54.2649C45.4289 54.3643 45.6476 54.4141 45.8995 54.4141C46.1647 54.4141 46.3884 54.3577 46.5707 54.245C46.7563 54.129 46.8971 53.96 46.9933 53.7379C47.0894 53.5159 47.1374 53.2424 47.1374 52.9176V45.8182ZM51.0451 56V45.8182H57.9059V47.593H53.1978V50.0192H57.5529V51.794H53.1978V54.2251H57.9258V56H51.0451ZM68.1337 45.8182V56H66.2743L61.8446 49.5916H61.7701V56H59.6174V45.8182H61.5066L65.9015 52.2216H65.9909V45.8182H68.1337ZM71.6673 56H69.3604L72.8754 45.8182H75.6495L79.1594 56H76.8526L74.3022 48.1449H74.2227L71.6673 56ZM71.5231 51.9979H76.9719V53.6783H71.5231V51.9979Z' fill='white'/%3E%3Cpath d='M52 70H40L46 76L52 70Z' fill='%23090C13'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_13_1043' x='0' y='0' width='92' height='95' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeMorphology radius='12' operator='erode' in='SourceAlpha' result='effect1_dropShadow_13_1043'/%3E%3CfeOffset dy='13'/%3E%3CfeGaussianBlur stdDeviation='9'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.0352941 0 0 0 0 0.0470588 0 0 0 0 0.0745098 0 0 0 0.5 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_13_1043'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_13_1043' result='shape'/%3E%3C/filter%3E%3ClinearGradient id='paint0_linear_13_1043' x1='60.9064' y1='32.3906' x2='78.765' y2='37.545' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%238F2F23'/%3E%3Cstop offset='1' stop-color='%23C65D36'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_13_1043' x1='37.1182' y1='29.4737' x2='71.9689' y2='43.2605' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%238F2F23'/%3E%3Cstop offset='1' stop-color='%23C65D36'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_13_1043' x1='31.434' y1='15.9737' x2='41.3813' y2='39.4211' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23A53B22'/%3E%3Cstop offset='1' stop-color='%23C65D36'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A`,
                    "coordinations": {
                        "latitude": "28.780364",
                        "elevation": "35.520385"
                    }
                },
                {
                  "name": "<a style='text-decoration:none; color: rgba(122,144,73,1); font-weight: bold' href='https://rams-global.com/' target='_blank'>From the coast</a>",
                  "id": "10",
                  "iconWidth": '250',
                  "iconHeight": '100',
                  "iconUrl": "/wp-content/themes/3d/assets/s3d/images/markers/google_map_from_the_coast.svg",
                  "iconDarkUrl": "/wp-content/themes/3d/assets/s3d/images/markers/dark/google_map_from_the_coast.svg",
                  "coordinations": {
                      "latitude": "28.928004",
                      "elevation": "34.533851"
                  },
                },
                {
                  "name": "<a style='text-decoration:none; color: rgba(122,144,73,1); font-weight: bold' href='https://rams-global.com/' target='_blank'>From the coast</a>",
                  "id": "10",
                  "iconWidth": '250',
                  "iconHeight": '100',
                  "iconUrl": "/wp-content/themes/3d/assets/s3d/images/markers/google_map_cooler_climate.svg",
                  "iconDarkUrl": "/wp-content/themes/3d/assets/s3d/images/markers/dark/google_map_cooler_climate.svg",
                  "coordinations": {
                      "latitude": "29.185397",
                      "elevation": "36.192988"
                  }
              },
                {
                  "name": "<a style='text-decoration:none; color: rgba(122,144,73,1); font-weight: bold' href='https://rams-global.com/' target='_blank'>From the coast</a>",
                  "id": "10",
                  "iconWidth": '250',
                  "iconHeight": '100',
                  "iconUrl": "/wp-content/themes/3d/assets/s3d/images/markers/google_map_near_airport.svg",
                  "iconDarkUrl": "/wp-content/themes/3d/assets/s3d/images/markers/dark/google_map_near_airport.svg",
                  "coordinations": {
                      "latitude": "28.462478",
                      "elevation": "36.935637"
                  }
              },
                {
                  "name": "<a style='text-decoration:none; color: rgba(122,144,73,1); font-weight: bold' href='https://rams-global.com/' target='_blank'>From the coast</a>",
                  "id": "10",
                  "iconWidth": '250',
                  "iconHeight": '100',
                  "iconUrl": "/wp-content/themes/3d/assets/s3d/images/markers/google_map_high_speed_rail.svg",
                  "iconDarkUrl": "/wp-content/themes/3d/assets/s3d/images/markers/dark/google_map_high_speed_rail.svg",
                  "coordinations": {
                      "latitude": "28.092455",
                      "elevation": "34.269697" 
                  }
              },
                {
                  "name": "<a style='text-decoration:none; color: rgba(122,144,73,1); font-weight: bold' href='https://rams-global.com/' target='_blank'>From the coast</a>",
                  "id": "10",
                  "iconWidth": '50',
                  "iconHeight": '20',
                  "iconUrl": "/wp-content/themes/3d/assets/s3d/images/markers/google_map_line_title.svg",
                  "rotation": "-90.24",
                  "coordinations": {
                      "latitude": "28.172762",
                      "elevation": "35.297074" 
                  }
              }
            ]
        },
        {
            "name": "From the coast",
            "code": "office",
            "list": [
                
            ]
        }
    ]
}


