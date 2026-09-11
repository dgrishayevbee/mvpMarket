// Единый источник контента главной страницы — редактируется через /admin
// (см. src/context/ContentContext.jsx). Значения ниже — дефолты, которые
// используются, пока в localStorage нет сохранённых правок.
//
// Текущие дефолты — экспорт контента из /admin от 2026-09-11
// (docs/content-2026-09-11.json): тексты решений, пакетов и тарифов от
// пользователя. Поверх экспорта проставлены картинки, которых в нём не было:
// иконки решений и пакетов из набора и иллюстрации тарифов в
// public/images/tariffs (в экспорте одна из них лежала base64-строкой).
export const defaultContent = {
  categories: [
    {
      id: "employees",
      label: "Для работы сотрудников",
      icon: "nav-employees"
    },
    {
      id: "internet",
      label: "Интернет для бизнеса",
      icon: "nav-internet"
    },
    {
      id: "sales",
      label: "Продажи и работа с клиентами",
      icon: "nav-sales"
    },
    {
      id: "management",
      label: "Управление бизнесом",
      icon: "nav-management"
    },
    {
      id: "ai",
      label: "AI для бизнеса",
      icon: "nav-ai"
    }
  ],
  quickLinks: [
    {
      id: "bundles",
      label: "Готовые пакеты",
      icon: "nav-packages"
    },
    {
      id: "favorites",
      label: "Избранное",
      icon: "nav-favorites",
      to: "/profile#favorites"
    },
    {
      id: "subscriptions",
      label: "Мои платежи",
      icon: "nav-subscriptions",
      to: "/profile"
    },
    {
      id: "orders",
      label: "История заказов",
      icon: "nav-orders",
      to: "/profile"
    }
  ],
  supportLinks: [
    {
      id: "support",
      label: "Поддержка",
      icon: "nav-support"
    },
    {
      id: "requests",
      label: "История заявок",
      icon: "nav-orders"
    }
  ],
  segments: [
    {
      id: "all",
      label: "Все решения"
    },
    {
      id: "business",
      label: "Решения для вашего бизнеса"
    },
    {
      id: "office",
      label: "Офис и совместная работа"
    },
    {
      id: "trade",
      label: "Для торговли"
    }
  ],
  hero: {
    title: "Подберём инфраструктуру для вашего бизнеса",
    searchPlaceholder: "Опишите вашу задачу или спросите ИИ…",
    prompts: [
      "Все инструменты для предпринимателя",
      "Бухгалтерия и crm для большого бизнеса",
      "Автоматизировать продажи",
      "Подобрать бизнес решения"
    ]
  },
  solutions: [
    {
      id: "sol-ms365",
      title: "Microsoft 365",
      subtitle: "Цифровые инструменты для бизнеса",
      icon: "📄",
      imageUrl: "/images/icons/solutions/sol-ms365.svg",
      category: "it-cloud",
      segment: "office",
      tags: [
        "Облачный сервис",
        "Хит"
      ],
      badges: [
        "hit"
      ],
      price: 1833,
      billing: "в месяц",
      singleCta: true,
      seller: "mvpMarket",
      rating: 4.8,
      reviewsCount: 96,
      stock: 999,
      features: [
        "Word, Excel, PowerPoint",
        "5 пользователей",
        "1 ТБ облачного хранилища"
      ],
      description: "Набор офисных приложений и облачное хранилище для команды — работайте над документами вместе, из любого места."
    },
    {
      id: "sol-starter",
      title: "Всё для бизнеса на старте",
      subtitle: "Связь для предпринимателей",
      icon: "🏢",
      imageUrl: "/images/icons/solutions/sol-starter.svg",
      category: "internet",
      segment: "business",
      tags: [
        "Расширяем",
        "Хит"
      ],
      badges: [
        "hit"
      ],
      price: 15000,
      billing: "в месяц",
      seller: "mvpMarket",
      rating: 4.6,
      reviewsCount: 54,
      stock: 999,
      features: [
        "WhatsApp — безлимит",
        "Telegram — безлимит",
        "Cashback 7%"
      ],
      description: "Мобильная связь и мессенджеры без ограничений для небольшой команды — чтобы оставаться на связи с клиентами."
    },
    {
      id: "sol-sales",
      title: "Увеличьте продажи",
      subtitle: "Бизнес-Сейла",
      icon: "📈",
      imageUrl: "/images/icons/solutions/sol-sales.svg",
      category: "sales",
      segment: "business",
      tags: [
        "Продажи",
        "Новинка"
      ],
      badges: [
        "new"
      ],
      price: 25000,
      billing: "в месяц",
      seller: "mvpMarket",
      rating: 4.5,
      reviewsCount: 31,
      stock: 999,
      features: [
        "WhatsApp — безлимит",
        "Telegram — безлимит",
        "Cashback 7%"
      ],
      description: "Инструменты для роста продаж: чаты с клиентами, кешбэк на покупки, безлимитная связь.",
      singleCta: false
    },
    {
      id: "sol-trade",
      title: "Для торговли и услуг",
      subtitle: "Бизнес-Трейд",
      icon: "🛒",
      imageUrl: "/images/icons/solutions/sol-trade.svg",
      category: "sales",
      segment: "trade",
      tags: [
        "Торговля и продажи"
      ],
      badges: [],
      price: 40000,
      billing: "в месяц",
      seller: "mvpMarket",
      rating: 4.4,
      reviewsCount: 22,
      stock: 999,
      features: [
        "WhatsApp — безлимит",
        "Telegram — безлимит",
        "Cashback 7%"
      ],
      description: "Пакет связи и сервисов для точек продаж и сферы услуг."
    }
  ],
  video: {
    caption: "Кратко рассказываем о преимуществах интернета для бизнеса",
    imageUrl: ""
  },
  businessChoice: {
    sectionTitle: "Что выбирают предприниматели",
    interactiveTariff: {
      basePrice: 1590,
      speeds: [
        10,
        15,
        25
      ],
      defaultSpeedIndex: 1,
      minGb: 10,
      maxGb: 500,
      stepGb: 10,
      defaultGb: 100
    },
    simpleTariffs: [
      {
        id: "starlink",
        title: "Интернет для офиса",
        subtitle: "Покройте весь офис выгодным качественным интернетом",
        icon: "🛰️",
        imageUrl: "/images/tariffs/tariff-office-internet.svg",
        price: 193000,
        billing: ""
      },
      {
        id: "office-internet",
        title: "Корпоративная связь",
        subtitle: "АТС и бесперебойная связь",
        icon: "🏢",
        imageUrl: "/images/tariffs/tariff-corp-call.svg",
        price: 14290,
        billing: "/мес"
      },
      {
        id: "jelide",
        title: "Пакет под все",
        subtitle: "CRM + 1C + Документооборот",
        icon: "📶",
        imageUrl: "/images/tariffs/tariff-all-in-one.svg",
        price: 115900,
        billing: ""
      }
    ]
  },
  bundles: [
    {
      id: "bundle-small-office",
      title: "Начни бизнес с нуля",
      subtitle: "Всё для продуктивной работы небольшой команды",
      imageUrl: "/images/icons/solutions/bundle-solo.svg",
      price: 7900,
      oldPrice: 15000,
      seller: "mvpMarket",
      features: [
        "Интернет 100 Мбит/с",
        "Wi-Fi для офиса",
        "Microsoft 365",
        "Виртуальная АТС"
      ]
    },
    {
      id: "bundle-corporate",
      title: "Всё для эффективной работы команды",
      subtitle: "Полная ИТ-инфраструктура крупного бизнеса",
      imageUrl: "/images/icons/solutions/bundle-office.svg",
      price: 11000,
      oldPrice: 19900,
      seller: "mvpMarket",
      features: [
        "Интернет 1 Гбит/с",
        "Корпоративная связь",
        "Видеонаблюдение Pro",
        "Облачные серверы"
      ]
    },
    {
      id: "bundle-cloud-storage",
      title: "Безопасное хранение данных",
      subtitle: "Обезопасьте данные своей компании и сотрудников",
      imageUrl: "/images/icons/solutions/bundle-trade.svg",
      price: 14990,
      oldPrice: 24900,
      seller: "mvpMarket",
      features: [
        "Резервное копирование",
        "100 ГБ хранилища",
        "Шифрование данных",
        "Облачные бэкапы"
      ]
    }
  ],
  aiBanner: {
    title: "Решите свою задачу с нашим ИИ-ассистентом",
    subtitle: "Расскажите о задачах — подберём решения для роста и защиты компании.",
    ctaLabel: "Попробовать сейчас",
    suggestions: [
      {
        emoji: "🧑‍💼",
        text: "Открываю офис на 30 сотрудников"
      },
      {
        emoji: "📶",
        text: "Организовать Wi-Fi для офиса"
      },
      {
        emoji: "🏠",
        text: "Настроить удалённую работу"
      }
    ]
  },
  footer: {
    columns: {
      business: [
        "Мобильная связь",
        "Интернет для бизнеса",
        "Продажи и работа с клиентами",
        "Управление бизнесом"
      ],
      company: [
        "О нас",
        "Контакты",
        "Вакансии",
        "Партнёрам"
      ],
      solutions: [
        "Готовые пакеты",
        "Популярные решения",
        "Новинки"
      ],
      help: [
        "Поддержка",
        "История заявок",
        "Частые вопросы"
      ]
    },
    contact: {
      shortNumber: "7900",
      phone: "+7 (727) 259 9000"
    }
  }
};
