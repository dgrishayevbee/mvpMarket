import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { Badge, Button, PlaceholderImage, Tabs } from "../components/ui/index.js";
import { FeatureIcon } from "../components/catalog/featureIcons.jsx";
import "./CheckoutPage.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₸";
}

const STEPS = [
  { id: "order", label: "1. Заказ" },
  { id: "payment", label: "2. Оплата" },
  { id: "confirm", label: "3. Подтверждение" },
];

// Демо-реквизиты для прототипа: единый счёт выставляет сама платформа.
const COMPANY = {
  payer: "ТОО «Ваша компания»",
  bin: "123456789012",
  contract: "B2B-2026-004718",
  account: "8 707 000 00 00",
  provider: "ТОО «Beeline Business Kazakhstan»",
  providerBin: "980540000397",
  iik: "KZ12 3456 7890 1234 5678",
  bank: "АО «Банк ЦентрКредит», KCJBKZKX",
};

const CLOSING_DOCS = [
  {
    id: "invoice",
    title: "Счёт на оплату",
    note: "Единый счёт по всем услугам, PDF — сразу после оформления",
  },
  {
    id: "act",
    title: "Акт выполненных работ",
    note: "Формируется в первый рабочий день следующего месяца",
  },
  {
    id: "esf",
    title: "Электронная счёт-фактура (ЭСФ)",
    note: "Выписывается в ИС ЭСФ на БИН плательщика",
  },
  {
    id: "offer",
    title: "Договор-оферта на услуги",
    note: "Подписывается ЭЦП, хранится в личном кабинете",
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "invoice",
    title: "Единый счёт Beeline Business",
    note: "Постоплата: один счёт в месяц по всем услугам, оплата с расчётного счёта компании",
    tag: "Рекомендуем",
  },
  {
    id: "card",
    title: "Оплата картой онлайн",
    note: "Списание сразу, закрывающие документы формируются так же",
  },
];

// Корзина хранит витринные поля товара, но заказы, положенные в неё до этого,
// их не знают — поэтому карточку добираем из контента по id (а интерактивный
// тариф собираем из его id, он в каталоге не лежит).
function describeTariff(id) {
  const match = /^tariff-(\d+)-(limit|unlimited)-(\d+)$/.exec(id || "");
  if (!match) return null;
  const [, speed, mode, gb] = match;
  return {
    subtitle: "Интернет для бизнеса",
    icon: "🌐",
    features: [
      `Скорость ${speed} Мбит/с`,
      mode === "unlimited" ? "Безлимитный трафик" : `${gb} ГБ трафика в месяц`,
      "Подключение без визита в офис",
    ],
  };
}

function findInContent(content, id) {
  return (
    content.solutions?.find((s) => s.id === id) ||
    content.bundles?.find((b) => b.id === id) ||
    content.businessChoice?.simpleTariffs?.find((t) => t.id === id) ||
    describeTariff(id) ||
    null
  );
}

function withCardData(item, content) {
  const source = findInContent(content, item.id) || {};
  return {
    ...item,
    subtitle: item.subtitle || source.subtitle || "",
    icon: item.icon || source.icon || "",
    imageUrl: item.imageUrl || source.imageUrl || "",
    features: item.features?.length ? item.features : source.features || [],
    tags: item.tags?.length ? item.tags : source.tags || [],
  };
}

function OrderItemCard({ item, onQty }) {
  const features = item.features?.length ? item.features : [];

  return (
    <article className="checkout-item">
      <div className="checkout-item__media">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt="" className="checkout-item__image" />
        ) : item.icon ? (
          <span className="checkout-item__icon">{item.icon}</span>
        ) : (
          <PlaceholderImage label={item.title} height="88px" />
        )}
      </div>

      <div className="checkout-item__body">
        {item.tags?.length > 0 && (
          <div className="checkout-item__tags">
            {item.tags.map((tag) => (
              <Badge key={tag} variant={tag === "Хит" || tag === "Новинка" ? "solid" : "neutral"}>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <span className="checkout-item__title">{item.title}</span>
        {item.subtitle && <span className="checkout-item__subtitle">{item.subtitle}</span>}

        {features.length > 0 && (
          <ul className="checkout-item__features">
            {features.map((f) => (
              <li key={f}>
                <FeatureIcon text={f} className="checkout-item__check" />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="checkout-item__aside">
        <span className="checkout-item__price-label">Оплата в месяц</span>
        <span className="checkout-item__price">{formatPrice(item.price * item.qty)}</span>
        <div className="checkout-item__qty">
          <button type="button" onClick={() => onQty(item.id, item.qty - 1)} aria-label="Меньше">
            −
          </button>
          <span>{item.qty}</span>
          <button type="button" onClick={() => onQty(item.id, item.qty + 1)} aria-label="Больше">
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export function CheckoutPage() {
  const { items, subtotal, setQty, clear } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const { content } = useContent();
  const navigate = useNavigate();

  const [step, setStep] = useState("order");
  const [payment, setPayment] = useState("invoice");
  const [order, setOrder] = useState(null);

  if (items.length === 0 && !order) {
    return <Navigate to="/cart" replace />;
  }

  const vat = subtotal - subtotal / 1.12;

  const goNext = () => {
    if (step === "order") {
      setStep("payment");
      return;
    }
    if (step === "payment") {
      const created = createOrder({
        items,
        total: subtotal,
        payment,
        buyerEmail: user?.email || "guest@mvpmarket.dev",
      });
      setOrder(created);
      clear();
      setStep("confirm");
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-page__title">Оформление заказа</h1>
      <Tabs tabs={STEPS} activeId={step} onChange={() => {}} />

      {step === "order" && (
        <div className="checkout-page__body">
          <div className="checkout-page__step">
            <span className="checkout-page__label">Состав заказа</span>
            <div className="checkout-page__items">
              {items.map((item) => (
                <OrderItemCard key={item.id} item={withCardData(item, content)} onQty={setQty} />
              ))}
            </div>

            <div className="checkout-page__total-row">
              <span>Итого в месяц</span>
              <span className="checkout-page__total">{formatPrice(subtotal)}</span>
            </div>

            <Button onClick={goNext}>Далее — к оплате</Button>
          </div>
        </div>
      )}

      {step === "payment" && (
        <div className="checkout-page__body">
          <div className="checkout-page__step">
            <span className="checkout-page__label">Способ оплаты</span>
            <div className="checkout-page__payment-options">
              {PAYMENT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={
                    "checkout-page__payment-option" +
                    (payment === option.id ? " checkout-page__payment-option--active" : "")
                  }
                  onClick={() => setPayment(option.id)}
                >
                  <span className="checkout-page__payment-head">
                    <span className="checkout-page__payment-title">{option.title}</span>
                    {option.tag && <Badge variant="tint">{option.tag}</Badge>}
                  </span>
                  <span className="checkout-page__payment-note">{option.note}</span>
                </button>
              ))}
            </div>

            <div className="checkout-page__invoice">
              <span className="checkout-page__block-title">Единый счёт по всем услугам</span>
              <p className="checkout-page__block-text">
                Все подключённые сервисы, лицензии и тарифы попадают в один счёт Beeline Business.
                Отдельные договоры с поставщиками заключать не нужно — платформа сама рассчитывается
                с ними.
              </p>

              <div className="checkout-page__invoice-rows">
                <div className="checkout-page__invoice-row">
                  <span>Услуги за расчётный период</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="checkout-page__invoice-row checkout-page__invoice-row--muted">
                  <span>в том числе НДС 12%</span>
                  <span>{formatPrice(vat)}</span>
                </div>
                <div className="checkout-page__invoice-row checkout-page__invoice-row--total">
                  <span>К оплате по счёту</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>

            <div className="checkout-page__docs">
              <span className="checkout-page__block-title">Закрывающие документы</span>
              <ul className="checkout-page__docs-list">
                {CLOSING_DOCS.map((doc) => (
                  <li key={doc.id} className="checkout-page__doc">
                    <span className="checkout-page__doc-icon" aria-hidden="true">
                      📄
                    </span>
                    <span className="checkout-page__doc-body">
                      <span className="checkout-page__doc-title">{doc.title}</span>
                      <span className="checkout-page__doc-note">{doc.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <span className="checkout-page__hint">
                Документы формируются автоматически и появляются в личном кабинете в разделе
                «Документы и счета».
              </span>
            </div>

            <div className="checkout-page__requisites">
              <div className="checkout-page__requisites-col">
                <span className="checkout-page__block-title">Плательщик</span>
                <dl className="checkout-page__req-list">
                  <div>
                    <dt>Компания</dt>
                    <dd>{COMPANY.payer}</dd>
                  </div>
                  <div>
                    <dt>БИН</dt>
                    <dd>{COMPANY.bin}</dd>
                  </div>
                  <div>
                    <dt>Договор</dt>
                    <dd>{COMPANY.contract}</dd>
                  </div>
                  <div>
                    <dt>Лицевой счёт</dt>
                    <dd>{COMPANY.account}</dd>
                  </div>
                  <div>
                    <dt>E-mail для документов</dt>
                    <dd>{user?.email || "guest@mvpmarket.dev"}</dd>
                  </div>
                </dl>
              </div>

              <div className="checkout-page__requisites-col">
                <span className="checkout-page__block-title">Получатель платежа</span>
                <dl className="checkout-page__req-list">
                  <div>
                    <dt>Компания</dt>
                    <dd>{COMPANY.provider}</dd>
                  </div>
                  <div>
                    <dt>БИН</dt>
                    <dd>{COMPANY.providerBin}</dd>
                  </div>
                  <div>
                    <dt>ИИК</dt>
                    <dd>{COMPANY.iik}</dd>
                  </div>
                  <div>
                    <dt>Банк</dt>
                    <dd>{COMPANY.bank}</dd>
                  </div>
                  <div>
                    <dt>Назначение платежа</dt>
                    <dd>Оплата по единому счёту Beeline Business</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="checkout-page__actions">
              <Button variant="secondary" onClick={() => setStep("order")}>
                Назад
              </Button>
              <Button onClick={goNext}>Подтвердить заказ</Button>
            </div>
          </div>
        </div>
      )}

      {step === "confirm" && order && (
        <div className="checkout-page__body">
          <div className="checkout-page__confirm">
            <span className="checkout-page__confirm-icon">✓</span>
            <h2>Заказ {order.id} оформлен</h2>
            <p className="checkout-page__confirm-lead">
              Счёт выставлен на {formatPrice(order.total)} в месяц. Мы уже начали проверку оплаты.
            </p>

            <ul className="checkout-page__confirm-list">
              <li>
                <span className="checkout-page__confirm-step">1</span>
                <span className="checkout-page__confirm-body">
                  <span className="checkout-page__confirm-title">Оплата проверяется</span>
                  <span className="checkout-page__confirm-note">
                    Платёж по единому счёту подтверждается автоматически, обычно в течение одного
                    рабочего дня после поступления средств.
                  </span>
                </span>
              </li>
              <li>
                <span className="checkout-page__confirm-step">2</span>
                <span className="checkout-page__confirm-body">
                  <span className="checkout-page__confirm-title">Лицензии будут подключены</span>
                  <span className="checkout-page__confirm-note">
                    После подтверждения оплаты услуги и лицензии активируются автоматически, ключи и
                    доступы придут на {order.buyerEmail}.
                  </span>
                </span>
              </li>
              <li>
                <span className="checkout-page__confirm-step">3</span>
                <span className="checkout-page__confirm-body">
                  <span className="checkout-page__confirm-title">Информация в личном кабинете</span>
                  <span className="checkout-page__confirm-note">
                    Статус заказа, счёт и закрывающие документы — акт, ЭСФ, договор — доступны в
                    личном кабинете.
                  </span>
                </span>
              </li>
            </ul>

            <Button onClick={() => navigate("/profile")}>Перейти в личный кабинет</Button>
          </div>
        </div>
      )}
    </div>
  );
}
