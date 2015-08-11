enb-bh-i18n
============

[![NPM version](https://img.shields.io/npm/v/enb-bh-i18n.svg?style=flat)](https://www.npmjs.org/package/enb-bh-i18n)
[![Build Status](https://img.shields.io/travis/enb-bem/enb-bh-i18n/master.svg?style=flat&label=tests)](https://travis-ci.org/enb-bem/enb-bh-i18n)
[![Build status](https://img.shields.io/appveyor/ci/blond/enb-bh-i18n.svg?style=flat&label=windows)](https://ci.appveyor.com/project/blond/enb-bh-i18n)
[![Coverage Status](https://img.shields.io/coveralls/enb-bem/enb-bh-i18n.svg?style=flat)](https://coveralls.io/r/enb-bem/enb-bh-i18n?branch=master)
[![devDependency Status](http://img.shields.io/david/enb-bem/enb-bh-i18n.svg?style=flat)](https://david-dm.org/enb-bem/enb-bh-i18n)

Поддержка `BEM.I18N` для ENB.

Установка:
----------

```
npm install --save-dev enb-bh-i18n
```

Для работы модуля требуется зависимость от пакета `enb` версии `0.11.0` или выше.

Технологии
----------

* [bh-bundle-i18n](#bh-bundle-i18n)
* [bh-commonjs-i18n](#bh-commonjs-i18n)

### bh-bundle-i18n

Собирает *BH*-файлы по deps'ам в виде `?.bh.js` бандла на основе `?.keysets.<язык>.js`-файла.

Предназначен для сборки как клиентского, так и серверного BH-кода. Предполагается, что в *BH*-файлах не используется `require`.

Поддерживает CommonJS и YModules. Если в исполняемой среде нет ни одной модульной системы, то модуль будет предоставлен в глобальную переменную `bh`.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bh.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
* *String* **lang** — Язык, для которого небходимо собрать файл.
* *String* **keysetsFile** — Исходный keysets-файл. По умолчанию — `?.keysets.{lang}.js`. (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — ['bh.js'].
* *Boolean* **sourcemap** — строить карты кода.
* *String|Array* **mimic** — имена переменных/модулей для экспорта.
* *String* **jsAttrName** — атрибут блока с параметрами инициализации. По умолчанию — `data-bem`.
* *String* **jsAttrScheme** — Cхема данных для параметров инициализации. По умолчанию — `json`. Форматы: `js` — Получаем `return { ... }`. `json` — JSON-формат. Получаем `{ ... }`.
* *String|Boolean* **jsCls** — имя `i-bem` CSS-класса. По умолчанию - `i-bem`. Для того, чтобы класс не добавлялся, следует указать значение `false` или пустую строку.
* *Boolean* **escapeContent** — экранирование содержимого. По умолчанию - `false`.

**Пример**
```javascript
nodeConfig.addTech(require('enb-bh-i18n/techs/bh-bundle-i18n'));
```

### bh-commonjs-i18n

Собирает *BH*-файлы по deps'ам в виде `?.bh.js` бандла на основе `?.keysets.<язык>.js`-файла.

Предназначен для сборки только серверного BH-кода. Предполагается, что в *BH*-файлах используется `require`.

Поддерживает только CommonJS.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.bh.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
* *String* **lang** — Язык, для которого небходимо собрать файл.
* *String* **keysetsFile** — Исходный keysets-файл. По умолчанию — `?.keysets.{lang}.js`. (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — ['bh.js'].
* *Boolean* **sourcemap** — строить карты кода.
* *String|Array* **mimic** — имена переменных/модулей для экспорта.
* *String* **jsAttrName** — атрибут блока с параметрами инициализации. По умолчанию — `data-bem`.
* *String* **jsAttrScheme** — Cхема данных для параметров инициализации. По умолчанию — `json`. Форматы: `js` — Получаем `return { ... }`. `json` — JSON-формат. Получаем `{ ... }`.
* *String|Boolean* **jsCls** — имя `i-bem` CSS-класса. По умолчанию - `i-bem`. Для того, чтобы класс не добавлялся, следует указать значение `false` или пустую строку.
* *Boolean* **escapeContent** — экранирование содержимого. По умолчанию - `false`.

**Пример**
```javascript
nodeConfig.addTech(require('enb-bh-i18n/techs/bh-сommonjs-i18n'));
```

Лицензия
--------

© 2015 YANDEX LLC. Код лицензирован [Mozilla Public License 2.0](LICENSE.txt).
