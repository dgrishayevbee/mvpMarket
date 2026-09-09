import { useParams, Link, Navigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { Button, Price, PlaceholderImage, ProductBadge } from "../components/ui/index.js";
import { ProductCard } from "../components/product/ProductCard.jsx";
import "./ProductPage.css";

export function ProductPage() {
  const { id } = useParams();
  const { getById, all } = useProducts();
  const { addItem } = useCart();
  const { has, toggle } = useFavorites();

  const product = getById(id);
  if (!product) return <Navigate to="/" replace />;

  const related = all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isFav = has(product.id);

  return (
    <div className="product-page">
      <nav className="product-page__breadcrumbs">
        <Link to="/">Каталог</Link> <span>/</span> <span>{product.title}</span>
      </nav>

      <div className="product-page__main">
        <div className="product-page__gallery">
          <PlaceholderImage label={product.title} height="420px" />
        </div>

        <div className="product-page__info">
          <div className="product-page__badges">
            {product.badges?.map((b) => (
              <ProductBadge key={b} type={b} />
            ))}
          </div>
          <h1 className="product-page__title">{product.title}</h1>
          <div className="product-page__meta">
            <span className="product-page__rating">★ {product.rating.toFixed(1)}</span>
            <span>{product.reviewsCount} отзывов</span>
            <span>Продавец: {product.seller}</span>
          </div>
          <p className="product-page__description">{product.description}</p>

          <Price size="lg" price={product.price} oldPrice={product.oldPrice} />
          <span className="product-page__stock">
            {product.stock > 0 ? `В наличии: ${product.stock} шт.` : "Нет в наличии"}
          </span>

          <div className="product-page__actions">
            <Button onClick={() => addItem(product)} disabled={product.stock === 0}>
              В корзину
            </Button>
            <Button variant="secondary" onClick={() => toggle(product.id)}>
              {isFav ? "В избранном ♥" : "В избранное ♡"}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="product-page__related">
          <h2 className="product-page__related-title">Похожие товары</h2>
          <div className="product-page__related-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
