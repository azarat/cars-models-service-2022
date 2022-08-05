# README

## Request body fields

-   type(`get-modification`) - type of request
-   fileds(`url, year, mark, model, modelType, modification, driveType.ru, driveType.ua, bodyType.ru, bodyType.ua, capacityTechnical, power.ru, power.ua, engineType.ru, engineType.ua, numberOfValves, fuelType, fuelTypeUa, capacity, numberOfCylinders, yearStart, yearEnd,`) - selection from db
-   filter(_fields from previous point_) - conditions
-   unique(`true or false`) - if true select unique values(DISTINCT), default value true

## Example

#### Request

```
axios.post('url', {
    type: 'get-modification'
    fields: ['mark', 'model', 'year'],
    filter: {
        year: '2019',
        engineType.ru: 'Бензиновый двигатель',
    },
    unique: false,
})
```

#### Resopnse

```
[
    {
        "mark": "Audi",
        "model": "A4 Avant",
        "year": "2019"
    },
    {
        "mark": "BMW",
        "model": "5 series",
        "year": "2019"
    },
    ...
]
```

## Some values of fields

-   driveType.ru: `Вариатор, Привод на все колеса, Привод на задние колеса, Привод на передние колеса, Цепной привод`
-   bodyType.ru: `SUV, Автобус, Ван, Внедорожник открытый, Внедорожник с открытым верхом, Внедорожник с твердой крышей, Жесткая съёмная крыша, Кабриолет, Компактный СУВ, Кроссовер, Купе, Наклонная задняя часть, Одноосный тягач, Пикап, Рама c бортовой платформой, С бортовой платформой/ходовая часть, Самосвал, Седан, Специальный Кузов, Тягач, Универсал, Фургон, Фургон/универсал, Фургон/хетчбэк, Хетчбек`
-   engineType.ru: `Бензиновый двигатель, Бензиновый двигатель (двухтактный), Гибрид, Гибрид (карбюраторный двигатель/электродвигатель), Двигатель Ванкеля, Дизельный двигатель, Электрический двигатель`
-   fuelType.ru: `Бензин, Бензин / Метанол, Бензин / Электричество, Бензин / электричество / автогаз (LPG), Бензин/автогаз (LPG), Бензин/природный газ (CNG), Бензин/этанол, Водород, Дизель / LPG, Дизельное топливо, Природный газ (CNG), Сжиженный газ, Cмесь, Спирт, Эластичное топливо, Электричество, Электричество/Дизель`
