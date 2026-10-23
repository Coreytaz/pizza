# Pizza

Статический сайт пиццерии: Vite и JavaScript без runtime-зависимостей.
Форма работает в демонстрационном режиме: данные не отправляются и не сохраняются.

## Разработка

Нужен Node.js 24 LTS и npm.

```sh
npm ci
npm run dev
```

Сайт доступен по адресу http://127.0.0.1:5173/pizza/.

## Проверки

```sh
npm run lint
npm run format:check
npm run build
npx playwright install chromium firefox webkit
npm test
```

На Linux для браузеров: `npx playwright install --with-deps`.
`npm run format` форматирует исходники; `npm run preview` показывает сборку.
Тесты проверяют каталог, размеры, цены, форму, меню и адаптивность в трёх браузерах.
Снимки экранов находятся в `test-results/`.

## Структура

`index.html` содержит каталог и форму; `css/style.css` — читаемые стили.
Модули в `js/` отвечают за меню, каталог, диалог и валидацию формы.
Цены и категории сохранены из исходного сайта, включая цены 25 см для «Ассорти» и «Три сыра».
Телефон принимает российские номера с +7 или 8; десятизначный номер с 9 нормализуется при вставке.
Шрифты Google и карта Яндекса требуют интернета; остальной интерфейс работает без них.

## GitHub Pages

Адрес: https://coreytaz.github.io/pizza/.
В Settings → Pages источником должен быть выбран GitHub Actions.
Workflow проверяет pull request, а после успешных проверок `main` публикует `dist`.
Ручной запуск доступен в Actions → Check and deploy Pizza → Run workflow.
Используется встроенный GITHUB_TOKEN; отдельный токен в репозитории не нужен.
Для изменения репозитория или домена обновите `base` в `vite.config.js`.
Публикуются только файлы сборки; серверная часть и настоящая оплата отсутствуют.

Если скачивание Chromium недоступно, локальную проверку можно выполнить в установленном Chrome:

```powershell
$env:PLAYWRIGHT_CHROMIUM_CHANNEL = 'chrome'
npx playwright test --project=chromium
```

В CI используется стандартный набор браузеров Playwright.
