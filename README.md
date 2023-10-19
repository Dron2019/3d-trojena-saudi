# 3D MODEL Version 2
___
##  Компас
#### Параметр, который отвечает за положение компаса:
> frameWithNorthDirection 
>> Выставляется для каждого облета отдельно
#### Значение этого параметра: 
> Кадр, который смотрит на север
>> Нужно визуально определить в секвенции номер кадра, который смотри на север
#### Важно!
> Нельзя менять параметры, котрые влияют на размер компасса
___
## Изображения
+ `sd_imageUrl` - путь в облету плохого качества
+ `image_format`- формат изображений (по умолчанию jpg)
___
## Popup
При нажатии на елемент с классом ```js-s3d-flat__3d-tour``` откроется попап с айфремом (ссылка - атрибут href нажатого елемента)
___
## Демо режим
При добавлении в **html || body** теги аттрибута ```data-demo_view```  остается возможность только крутить облет (если клиент хочет вставить 3д через айфрейм).

Когда 3д добавлена на WP - для вставки в демо режиме добавить GET параметр ```demo=true```
___
## Пины инфраструктуры
###### Для отображение пинов на генплане
- У приходящего полигона в SVG для ключевого кадра должны быть аттрибуты `(data-type="infrastructure" points="\[coordinates\]" data-id="\[category\]_\[name\]")`
- для переводов в langfile.json обьекте translation указать обьект `pins.\[category\]_\[name\]`
	прим. 
```
  "pins": {
    \[category\]_\[name\: "Park",
  },
```

- Если у координат полигона больше 3 точек, он будет подсвечиватся при наведение на маркер
- При нажатии на маркер открывается iframe с ссылкой.
	Для добавление ссылки в settings.json указать:
```
  "pin": {
    "genplan": {
      \[category\]_\[name\: link
    },
  },
```
___


##### Налаштування інформації про інфраструктуру

в settings.json по ключу "pinsInfo"

```
{
  "iframe": "https://google.com", //посилання яке відкриється у айфреймі при кліку
  "type": "zone", // [ zone(підсвічує обведену зону), pin(не підсвічує обведену зону) ] // 
  "title_i18n": "pins.zone_sport_jogging", //шлях до об'єкта перекладу
  "img": "images/infrastructure/footbal-field.jpg", // Зображення в описанні
  "description_i18n": "pins.pin_sport_wellfit_description", //шлях до об'єкта перекладу опису 
  "position": "top_left", //позиція іконки [center(default) || top_left || bottom_left ||  bottom_right || top_right ]  
  "filter_type": "sport" // назва категорії для фільтрації та підсвічування короткого текстового опису
}

```


## Отображение результатов бокового фильтра (Варианты: карточка, таблица)
######	В settings.json указать:
```
  "filter": {
    "viewType": one of ['card', 'list'],
  },
```

## Параметры чекбоксов для фильтра (автоматически формирует весь список параметров, которые есть в массиве квартир)
######	В settings.json указать:
```
  "filter": {
    "viewType": one of ['card', 'list'],
    "checkboxes": [
      {
        "title": "Filter.list.rooms", //переменная перевода из i18n для общей подписи
        "type": "checkbox", // так и оставить
        "needTranslation": false, // брать ли переменную из i18n (в случае если параметр не цифра)
        "translationNS": "", //где находятся в обьекте переводов подписи для каждого ключа параметра
        "paramaterByWhatWillBeFilter": "rooms" //название параметра из обьекта квартир, по которому будет фильтровать
      },
    ]
  },
```
___
## Галерея на плане квартиры
###### В приходящих параметрах квартиры указать 
    gallery: [Массив ссылок на изображения]
___
## Слайдер
###### Появление при нажатии на полигон в облете
##### Указать полигону:
    data-type="slider_popup" data-id="[ID]"
##### В settings.json: 
	{
		"sliderPopup": {
			"[ID]": {
				"[подпись к фото]": "[ссылка на фото]"
			}
		}
	}
___
### На плане этажа можно выбирать характеристику обведенной квартиры, которая будет выводится

[Где указывать параметр](./src/assets/s3d/scripts/modules/templates/floorSvg.js#L117) - строка 117

###### Параметр - valueToRenderOnPolygon
**Важно!** : он должен быть указан в обьекте квартиры, который приходит с сервера	
___
## Триггеры для аналитики
|  **Название** |  **Триггер**   |
| ------------ | ------------ |
| Переход на страницу апартамента | visit-appartment-page | 
| Нажатия кнопки "Связаться с менеджером" | callback-click | 
| Открытие фильтра  |  open-filter | 
| Ошибка модуля | module-error | 
| Переключение "день/ночь" | day-night-view |  
| переход на облет | visit-flyby-page |  
| Переход на страницу планировки | visit-plannings-page |  
| Переход на страницу этажи | visit-floor-page | 
| Переключение в фильтре "карточка/список" | filter-view-type-change |  
| Переход на квартиру с облета |  | 
| Переход на квартиру с страницы "Планировки" |  |  
| Отправка формы обратной связи | succesFormSend |  
| Нажатие кнопки "Обучение"  |  faq-button-click |  
| Переход на страницу "Избранное" | visit-favourites-page |  
| Добавление квартиры в избранное | add-object-to-favourites | 
| Удаление из избранного | delete-object-from-favourites |  
| По фильтрам клиента не найдено объектов | filter-flats-not-found | 
| Открытие ВР  тура на странице квартиры  |  vr-popup-open | 
| Открытие ссылки инфраструктуры на облете | click-infrastructure-pin |  
| Переключение вида 2д/3д на странице планировки |  |  
| Нажатие кнопки ПДФ  |  pdf-file-download | 
| Переход на страницу "этаж" из квартиры | visit-floor-page-from-flat-page |  
| Переход на страницу "этаж" из облета |  |  
| Переход на любую страницу 3д  |  visit-page | 
| загружен облет (в параметрах передается время загрузки)  |  flybyLoading | 
___


## Данные для мониторинга времени загрузки облета (flybyLoading)

```
  {
    timePlain: /*Время загрузки*/,
    url: /*Адрес*/,
    flybyId: /*название облета*/,
    flybySize: /*Размер облета*/,
    deviceType: /*Тип устройства ['desktop', 'tablet', 'mobile']*/,
    date: /* Дата загрузки */,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    browser: /* Информация о браузере */,
  }
```


## Пример кода для перехвата событий
```js
	window.addEventListener(/*триггер*/, (event) => {
		const eventDetails = event.detail; // Данные этого триггера (объект)
	})
```


## Фильтр для інфраструктури
  [layout](./src/assets/s3d/scripts/modules/templates/infrastructureFilter/$infrastructureFilter.js)
  [data-location](./src/assets/s3d/scripts/modules/infrastructureFilter/infrastructureFilter.js)

#### layout initialization in: 
[header](./src/assets/s3d/scripts/modules/templates/header/header.js)


## Features

#### Масштабування вказаного контейнера

При ініціалізації в контейнер додається панель навігації та попап туторіал

htmlZoom(wrapper - jQueryElement) [layout](./src/assets/s3d/scripts/features/html-zoom.js)
Бібліотека - [zoom](https://www.npmjs.com/package/vanilla-js-wheel-zoom)

#### Сповіщення 

Бібліотека - [Toastify](https://www.npmjs.com/package/toastify-js)

#### VrPinsList 

Малює список пінів, в яких є посилання на iframe - [Link](./src/assets/s3d/scripts/modules/vrPinsList/vrPinsList.js)

Інформація береться із активної СВГ, де промальовані піни - [Svg class](./src/assets/s3d/scripts/modules/Svg.js)

В хедері малюється кнопка яка відкриває цей список, кнопку видно тільки на fsm type = **flyby**


# Managers 

[Link](./src/assets/s3d/scripts/managers)


