import { Link } from "react-router-dom";
import { Badge, Button } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import "./SolutionCard.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function SolutionCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="solution-card">
      <div className="solution-card__head">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt="" className="solution-card__image" />
        ) : (
          <span className="solution-card__icon">{product.icon}</span>
        )}
        <div className="solution-card__tags">
          {product.tags?.map((tag) => (
            <Badge key={tag} variant={tag === "Хит" || tag === "Новинка" ? "solid" : "neutral"}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Link to={`/product/${product.id}`} className="solution-card__title">
        {product.title}
      </Link>
      <span className="solution-card__subtitle">{product.subtitle}</span>

      <ul className="solution-card__features">
        {product.features.map((f) => (
          <li key={f}>
            <span className="solution-card__check">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="solution-card__footer">
        <div className="solution-card__price-block">
          <span className="solution-card__price-label">Оплата в месяц</span>
          <span className="solution-card__price">от {formatPrice(product.price)}</span>
        </div>
        <div className="solution-card__actions">
          {product.singleCta ? (
            <Button size="sm" onClick={() => addItem(product)}>
              Подключить
            </Button>
          ) : (
            <>
              <Button size="sm" onClick={() => addItem(product)}>
                Начать
              </Button>
              <Link to={`/product/${product.id}`}>
                <Button size="sm" variant="secondary">
                  Информация
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
