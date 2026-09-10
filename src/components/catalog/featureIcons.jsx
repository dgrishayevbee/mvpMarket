// Small line-icon set used to visually represent feature/technology text
// (e.g. "Wi-Fi для офиса", "Резервное копирование") until real brand icons
// are supplied. `iconForFeature` picks one by keyword match, falling back to
// a generic tag icon.

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ children }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke}>
      {children}
    </svg>
  );
}

const ICONS = {
  mail: (
    <Svg>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Svg>
  ),
  globe: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
    </Svg>
  ),
  wifi: (
    <Svg>
      <path d="M2 8.5a15 15 0 0 1 20 0" />
      <path d="M5.5 12.5a10 10 0 0 1 13 0" />
      <path d="M9 16.5a5 5 0 0 1 6 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </Svg>
  ),
  cloud: (
    <Svg>
      <path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.5A4.5 4.5 0 0 0 7 18Z" />
    </Svg>
  ),
  phone: (
    <Svg>
      <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L20 15v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2Z" />
    </Svg>
  ),
  doc: (
    <Svg>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </Svg>
  ),
  headset: (
    <Svg>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2" y="13" width="4" height="6" rx="1.5" />
      <rect x="18" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19v1a3 3 0 0 1-3 3h-3" />
    </Svg>
  ),
  chart: (
    <Svg>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </Svg>
  ),
  megaphone: (
    <Svg>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l9 4V5L6 9H5a2 2 0 0 0-2 2Z" />
      <path d="M14 8.5a4 4 0 0 1 0 7" />
    </Svg>
  ),
  chat: (
    <Svg>
      <path d="M4 5h16v11H8l-4 4Z" />
    </Svg>
  ),
  percent: (
    <Svg>
      <path d="M5 19 19 5" />
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="17" cy="17" r="2.2" />
    </Svg>
  ),
  shield: (
    <Svg>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6Z" />
    </Svg>
  ),
  database: (
    <Svg>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5V18c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.5" />
      <path d="M5 11.75c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </Svg>
  ),
  camera: (
    <Svg>
      <rect x="3" y="7" width="13" height="11" rx="2" />
      <path d="M16 10.5 21 8v9l-5-2.5Z" />
    </Svg>
  ),
  tag: (
    <Svg>
      <path d="M12 3h6a2 2 0 0 1 2 2v6l-9 9-8-8Z" />
      <circle cx="15" cy="8" r="1.3" fill="currentColor" stroke="none" />
    </Svg>
  ),
};

const RULES = [
  [/почт|e-?mail/i, "mail"],
  [/wi-?fi/i, "wifi"],
  [/интернет|мбит|гбит/i, "globe"],
  [/облач|хранилищ|бэкап|резервн/i, "cloud"],
  [/атс|телефон|звонк/i, "phone"],
  [/word|excel|powerpoint|документ|эдо/i, "doc"],
  [/поддержк/i, "headset"],
  [/аналит|отчёт|отчет|crm/i, "chart"],
  [/whatsapp|telegram|чат|сообщени/i, "chat"],
  [/cashback|кэшбэк|кешбэк|скидк/i, "percent"],
  [/шифрован|безопасн/i, "shield"],
  [/видеонаблюден/i, "camera"],
  [/сервер|инфраструктур|1c|1с|бухгалтер/i, "database"],
  [/связь/i, "phone"],
];

export function iconForFeature(text) {
  const found = RULES.find(([re]) => re.test(text));
  return ICONS[found ? found[1] : "tag"];
}

export function FeatureIcon({ text, className }) {
  return <span className={className}>{iconForFeature(text)}</span>;
}
