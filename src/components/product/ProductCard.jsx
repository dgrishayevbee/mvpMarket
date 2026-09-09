import { Link } from "react-router-dom";
import { Badge, Price, PlaceholderImage } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import "./ProductCard.css";

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { has, toggle } = useFavorites();
  const { openQuickView } = useUI();
  const isFav = has(product.id);

  return (
    <div className="product-card">
      <div className="product-card__media">
        <button
          type="button"
          className="product-card__fav"
          onClick={() => toggle(product.id)}
          aria-label="В избранное"
        >
          {isFav ? "♥" : "♡"}
        </button>
        <Link to={`/product/${product.id}`} className="product-card__media-link">
          <PlaceholderImage label={product.title} height="160px" />
        </Link>
        <button
          type="button"
          className="product-card__quickview"
          onClick={() => openQuickView(product.id)}
        >
          Быстрый просмотр
        </button>
      </div>

      {product.badges?.length > 0 && (
        <div className="product-card__badges">
          {product.badges.includes("hit") && <Badge variant="solid">Хит</Badge>}
          {product.badges.includes("new") && <Badge variant="tint">Новинка</Badge>}
        </div>
      )}

      <Link to={`/product/${product.id}`} className="product-card__title">
        {product.title}
      </Link>
      <span className="product-card__seller">{product.seller}</span>

      <div className="product-card__footer">
        <Price price={product.price} oldPrice={product.oldPrice} />
        <button
          type="button"
          className="product-card__add"
          onClick={() => addItem(product)}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
