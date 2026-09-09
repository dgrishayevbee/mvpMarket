import { Link } from "react-router-dom";
import { Modal } from "../overlay/Modal.jsx";
import { Button, Price, PlaceholderImage, ProductBadge } from "../ui/index.js";
import { useProducts } from "../../context/ProductsContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import "./QuickView.css";

export function QuickView() {
  const { quickViewId, closeQuickView } = useUI();
  const { getById } = useProducts();
  const { addItem } = useCart();

  const product = quickViewId ? getById(quickViewId) : null;

  return (
    <Modal open={!!product} onClose={closeQuickView}>
      {product && (
        <div className="quick-view">
          <div className="quick-view__media">
            <PlaceholderImage label={product.title} height="280px" />
          </div>
          <div className="quick-view__info">
            <div className="quick-view__badges">
              {product.badges?.map((b) => (
                <ProductBadge key={b} type={b} />
              ))}
            </div>
            <h3 className="quick-view__title">{product.title}</h3>
            <span className="quick-view__seller">{product.seller}</span>
            <p className="quick-view__description">{product.description}</p>
            <Price size="lg" price={product.price} oldPrice={product.oldPrice} />
            <div className="quick-view__actions">
              <Button
                onClick={() => {
                  addItem(product);
                  closeQuickView();
                }}
              >
                В корзину
              </Button>
              <Link to={`/product/${product.id}`} onClick={closeQuickView}>
                <Button variant="secondary">Подробнее</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
