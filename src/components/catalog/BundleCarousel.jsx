import { Button } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { useContent } from "../../context/ContentContext.jsx";
import { TechIconCarousel } from "./TechIconCarousel.jsx";
import FeatureIcon from "../common/FeatureIcon.jsx";
import { bundleIconSrc } from "../../data/iconMap.js";
import "./BundleCarousel.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function BundleCarousel() {
  const { addItem } = useCart();
  const { content } = useContent();
  const bundles = content.bundles;

  return (
    <section className="bundle-carousel">
      <h2 className="bundle-carousel__title">Готовые решения и пакеты</h2>
      <div className="bundle-carousel__track">
        {bundles.map((b) => (
          <div key={b.id} className="bundle-card">
            <div className="bundle-card__head">
              {(b.imageUrl || bundleIconSrc(b.title)) && (
                <span className="bundle-card__icon">
                  <img
                    src={b.imageUrl || bundleIconSrc(b.title)}
                    alt=""
                    aria-hidden="true"
                    className="bundle-card__image"
                  />
                </span>
              )}
              <div className="bundle-card__info">
                <span className="bundle-card__title">{b.title}</span>
                <span className="bundle-card__subtitle">{b.subtitle}</span>
              </div>
            </div>

            <TechIconCarousel items={b.features} static />

            <ul className="bundle-card__features">
              {b.features.map((f) => (
                <li key={f}>
                  <FeatureIcon text={f} size={20} className="bundle-card__check" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="bundle-card__footer">
              <div className="bundle-card__prices">
                <span className="bundle-card__from-label">Оплата в месяц</span>
                {b.oldPrice > b.price && (
                  <div className="bundle-card__price-row">
                    <span className="bundle-card__old">{formatPrice(b.oldPrice)}</span>
                    <span className="bundle-card__price-note">при покупке отдельно</span>
                  </div>
                )}
                <div className="bundle-card__price-row">
                  <span className="bundle-card__from">от {formatPrice(b.price)}</span>
                  <span className="bundle-card__price-note bundle-card__price-note--gain">
                    выгодно при покупке пакетом
                  </span>
                </div>
              </div>
              <Button size="sm" onClick={() => addItem(b)}>
                Добавить в корзину
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
