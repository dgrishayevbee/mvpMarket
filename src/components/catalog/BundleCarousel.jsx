import { Button } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { useContent } from "../../context/ContentContext.jsx";
import { TechIconCarousel } from "./TechIconCarousel.jsx";
import { FeatureIcon } from "./featureIcons.jsx";
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
            <div className="bundle-card__info">
              <span className="bundle-card__title">{b.title}</span>
              <span className="bundle-card__subtitle">{b.subtitle}</span>
            </div>

            <TechIconCarousel items={b.features} />

            <ul className="bundle-card__features">
              {b.features.map((f) => (
                <li key={f}>
                  <FeatureIcon text={f} className="bundle-card__check" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="bundle-card__footer">
              <div>
                <span className="bundle-card__from-label">Оплата в месяц</span>
                <span className="bundle-card__from">от {formatPrice(b.price)}</span>
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
