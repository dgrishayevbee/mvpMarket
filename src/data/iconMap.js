// Карта иконок mvpMarket — сгенерирована вместе с набором.
// Файлы лежат в public/images/icons/**, поэтому пути начинаются с /images/icons.

export const ICON_BASE = '/images/icons';

/** Иконки решений: ключ — id решения из siteContent.solutions */
export const solutionIcons = {
  'sol-ms365': `${ICON_BASE}/solutions/sol-ms365.svg`,
  'sol-starter': `${ICON_BASE}/solutions/sol-starter.svg`,
  'sol-sales': `${ICON_BASE}/solutions/sol-sales.svg`,
  'sol-trade': `${ICON_BASE}/solutions/sol-trade.svg`,
  'sol-office': `${ICON_BASE}/solutions/sol-office.svg`,
  'sol-1c': `${ICON_BASE}/solutions/sol-1c.svg`,
};

/** Иконки готовых пакетов */
export const bundleIcons = {
  'bundle-solo': `${ICON_BASE}/solutions/bundle-solo.svg`,
  'bundle-office': `${ICON_BASE}/solutions/bundle-office.svg`,
  'bundle-trade': `${ICON_BASE}/solutions/bundle-trade.svg`,
};

/** Иконки характеристик */
export const featureIcons = {
  'f-whatsapp': `${ICON_BASE}/features/f-whatsapp.svg`,
  'f-telegram': `${ICON_BASE}/features/f-telegram.svg`,
  'f-cashback': `${ICON_BASE}/features/f-cashback.svg`,
  'f-docs': `${ICON_BASE}/features/f-docs.svg`,
  'f-cloud-backup': `${ICON_BASE}/features/f-cloud-backup.svg`,
  'f-backup': `${ICON_BASE}/features/f-backup.svg`,
  'f-cloudserver': `${ICON_BASE}/features/f-cloudserver.svg`,
  'f-storage': `${ICON_BASE}/features/f-storage.svg`,
  'f-encryption': `${ICON_BASE}/features/f-encryption.svg`,
  'f-wifi': `${ICON_BASE}/features/f-wifi.svg`,
  'f-internet': `${ICON_BASE}/features/f-internet.svg`,
  'f-video': `${ICON_BASE}/features/f-video.svg`,
  'f-pbx': `${ICON_BASE}/features/f-pbx.svg`,
  'f-corpcall': `${ICON_BASE}/features/f-corpcall.svg`,
  'f-users': `${ICON_BASE}/features/f-users.svg`,
};

/** Иконки сайдбара и быстрых ссылок (SVG на currentColor) */
export const navIcons = {
  'nav-employees': `${ICON_BASE}/nav/nav-employees.svg`,
  'nav-sales': `${ICON_BASE}/nav/nav-sales.svg`,
  'nav-management': `${ICON_BASE}/nav/nav-management.svg`,
  'nav-cloud': `${ICON_BASE}/nav/nav-cloud.svg`,
  'nav-security': `${ICON_BASE}/nav/nav-security.svg`,
  'nav-automation': `${ICON_BASE}/nav/nav-automation.svg`,
  'nav-ai': `${ICON_BASE}/nav/nav-ai.svg`,
  'nav-internet': `${ICON_BASE}/nav/nav-internet.svg`,
  'nav-packages': `${ICON_BASE}/nav/nav-packages.svg`,
  'nav-popular': `${ICON_BASE}/nav/nav-popular.svg`,
  'nav-new': `${ICON_BASE}/nav/nav-new.svg`,
  'nav-favorites': `${ICON_BASE}/nav/nav-favorites.svg`,
  'nav-subscriptions': `${ICON_BASE}/nav/nav-subscriptions.svg`,
  'nav-orders': `${ICON_BASE}/nav/nav-orders.svg`,
  'nav-support': `${ICON_BASE}/nav/nav-support.svg`,
};

/** Правила подбора иконки по тексту характеристики. Порядок важен: сверху частное. */
const FEATURE_RULES = [
  [/whatsapp|вотсап|ватсап/i, 'f-whatsapp'],  // WhatsApp
  [/telegram|телеграм/i, 'f-telegram'],  // Telegram
  [/cashback|к[эе]ш-?б[эе]к|кеш-?б[эе]к|%/i, 'f-cashback'],  // Cashback
  [/microsoft\s*365|office|word|excel|powerpoint|документ|эдо/i, 'f-docs'],  // Офисные приложения
  [/облачн[а-яё]*\s*(бэкап|резервн)/i, 'f-cloud-backup'],  // Облачные бэкапы
  [/резервн[а-яё]*\s*копирован|бэкап/i, 'f-backup'],  // Резервное копирование
  [/сервер|vps|хостинг/i, 'f-cloudserver'],  // Облачные серверы
  [/хранилищ|\d+\s*(гб|тб|gb|tb)(?![а-яёa-z])|диск/i, 'f-storage'],  // Хранилище (ГБ / ТБ)
  [/шифрован|защит[а-яё]*\s*данн|ssl/i, 'f-encryption'],  // Шифрование данных
  [/wi-?fi|вай-?фай/i, 'f-wifi'],  // Wi-Fi для офиса
  [/интернет|мбит|гбит|скорост/i, 'f-internet'],  // Интернет
  [/видеонаблюден|камер|видео/i, 'f-video'],  // Видеонаблюдение
  [/атс|телефони|виртуальн[а-яё]*\s*ном/i, 'f-pbx'],  // Виртуальная АТС
  [/связ|минут|звонк/i, 'f-corpcall'],  // Корпоративная связь
  [/пользовател|сотрудник|лиценз/i, 'f-users'],  // Пользователи
];

const NAV_RULES = [
  [/сотрудник|персонал/i, 'nav-employees'],  // Для работы сотрудников
  [/продаж|клиент|crm/i, 'nav-sales'],  // Продажи и работа с клиентами
  [/управлен|бухгалтер|уч[её]т/i, 'nav-management'],  // Управление бизнесом
  [/облач|инфраструктур|\bit\b/i, 'nav-cloud'],  // IT и облачная инфраструктура
  [/безопасн|защит/i, 'nav-security'],  // Безопасность
  [/автоматизац|iot|интернет вещей/i, 'nav-automation'],  // Автоматизация и IoT
  [/\bai\b|искусственн/i, 'nav-ai'],  // AI для бизнеса
  [/интернет|связь/i, 'nav-internet'],  // Интернет для бизнеса
  [/пакет/i, 'nav-packages'],  // Готовые пакеты
  [/популярн|хит/i, 'nav-popular'],  // Популярные решения
  [/новинк|новое/i, 'nav-new'],  // Новинки
  [/избранн|favorite/i, 'nav-favorites'],  // Избранное
  [/подписк/i, 'nav-subscriptions'],  // Мои подписки
  [/заказ|заяв|обращени/i, 'nav-orders'],  // История заказов и заявок
  [/поддержк|помощь|support/i, 'nav-support'],  // Поддержка
];

const BUNDLE_RULES = [
  [/Kense\s+solo/i, 'bundle-solo'],
  [/Business\s+Office/i, 'bundle-office'],
  [/Business\s+Trade/i, 'bundle-trade'],
];

function matchId(text, rules) {
  if (!text) return null;
  const rule = rules.find(([re]) => re.test(text));
  return rule ? rule[1] : null;
}

/** 'Интернет 100 Мбит/с' -> '/images/icons/features/f-internet.svg' */
export function featureIconSrc(text, fallback = 'f-docs') {
  const id = matchId(text, FEATURE_RULES) || fallback;
  return featureIcons[id] || null;
}

/** 'Интернет 100 Мбит/с' -> 'f-internet' */
export function featureIconId(text) {
  return matchId(text, FEATURE_RULES);
}

/** 'Безопасность' -> 'nav-security' */
export function navIconId(text) {
  return matchId(text, NAV_RULES);
}

/** 'Business Office' -> '/images/icons/solutions/bundle-office.svg' */
export function bundleIconSrc(title) {
  const id = matchId(title, BUNDLE_RULES);
  return id ? bundleIcons[id] : null;
}

/** id решения -> путь к иконке */
export function solutionIconSrc(id) {
  return solutionIcons[id] || null;
}
