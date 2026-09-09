import { Button } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { bundles } from "../../data/bundles.js";
import "./BundleCarousel.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function BundleCarousel() {
  const { addItem } = useCart();

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
            <span className="bundle-card__label">Доступные технологии:</span>
            <ul className="bundle-card__features">
              {b.features.map((f) => (
                <li key={f}>
                  <span className="bundle-card__check">✓</span>
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
