# CLAUDE.md — mvpMarket

Этот файл читается автоматически в начале каждой сессии Claude Code.
Не дублируй сюда историю разработки, она в `docs/ARCHITECTURE.md` и в
Changelog там же. Здесь только то, что нужно знать перед правкой кода.

## Что это за проект

B2B маркетплейс-прототип (референс Beeline Business). Единственный
поставщик товаров в каталоге - сама платформа, не независимые продавцы.
Чисто визуальный прототип: без бэкенда, без БД, без реальной авторизации.
Роли покупатель/продавец переключаются как мок, без разграничения прав
на сервере.

Полная архитектура, роуты, состояние, история решений - в
`docs/ARCHITECTURE.md`. Читай его целиком только если задача касается
общей структуры проекта. Для точечной правки конкретного компонента
обычно достаточно этого файла плюс сам компонент.

## Стек

React + Vite, React Router, React Context + localStorage (без Redux,
без сервера). Дизайн-система - CSS-переменные, экспортированные из
Claude Design.

## Структура

```
src/
  styles/          tokens.css (переменные дизайна), global.css
  components/
    ui/            базовый кит: Button, Badge, Chip, Tabs, SegmentedControl,
                    Input, Switch, Slider, Card, Price, PlaceholderImage
    overlay/       Drawer, Modal
    layout/        Header, Footer, Layout, CartDrawer, QuickView
    product/       ProductCard
    catalog/       компоненты главной: CatalogSidebar, HeroSearch,
                    SolutionCard, VideoBlock, BusinessChoiceSection,
                    BundleCarousel, AIBanner, MobileFiltersDrawer,
                    TechIconCarousel, featureIcons.jsx
    admin/         редактор контента /admin: StringListEditor, ImageField,
                    Admin*Section.jsx
  context/         Auth, Content, Products, Cart, Favorites, Orders, UI
  hooks/           useLocalStorage
  data/            siteContent.js - единственный источник контента главной
  pages/           по одной странице на роут, включая pages/seller/*
                    и AdminPage.jsx
```

## Правила работы с кодом

- Перед правкой компонента в `catalog/` или `ui/` сверься с
  `src/styles/tokens.css` - все цвета, шрифты, spacing, радиусы, тени
  берутся оттуда. Никогда не хардкодь hex-цвета или px-значения, которые
  уже есть в токенах.
- Контент главной страницы (тексты, карточки, тарифы, пакеты) живет в
  `src/data/siteContent.js` и правится через `ContentContext`, а не
  напрямую в JSX компонентов.
- `CartContext` общий для всех точек добавления в корзину (карточки
  решений, тарифы, пакеты). Не создавай отдельную логику корзины внутри
  компонента.
- Изображений по умолчанию нет, используется `PlaceholderImage`. Не
  вставляй случайные внешние картинки без запроса.
- Фокус верстки сейчас - десктоп. Не хардкодь desktop-only размеры в
  логике компонентов, разделяй layout- и контент-компоненты, чтобы потом
  можно было добавить мобильные брейкпоинты без переписывания.
- Шапка (`Header`) сейчас не входит в задачи по каталогу, если явно не
  попросили - не трогай ее.

## Формат ответа

- Не читай файлы, которые не относятся к задаче (не открывай весь
  `pages/seller/*`, если правишь `catalog/`).
- Не переписывай компонент целиком ради маленькой правки - точечный диф.
- После изменений не давай длинный пересказ того что сделано, если не
  просили - краткое резюме диффом достаточно.
- Не запускай `npm run build` или `npm run dev` самостоятельно, если явно
  не попросили проверить сборку.

## Дизайн-система (кратко)

Источник - экспорт из Claude Design (`.dc.html`), токены зафиксированы в
`src/styles/tokens.css`. Ключевое: акцент `--color-brand-yellow` (#FFCC00),
темные кнопки на `--color-ink` (#1A1A1A), шрифты Onest (текст) и
JetBrains Mono (лейблы/цены), градиент `--gradient-promo` - не более
одного на экран. Когда придет финальная версия дизайн-системы, меняются
только значения в tokens.css, компоненты их не хардкодят.

## Команды

```bash
npm install
npm run dev       # dev-сервер, обычно localhost:5173
npm run build      # сборка в dist/
npm run preview     # локальный просмотр сборки
```

Деплой - Vercel, автоматом по пушу в ветку. `vercel.json` в корне уже
настроен на SPA fallback, трогать не нужно.
