import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { Button } from "../components/ui/index.js";
import "./CartPage.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function CartPage() {
  const { items, setQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h1>Корзина пуста</h1>
        <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
        <Link to="/">
          <Button>В каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Корзина</h1>

      <div className="cart-page__layout">
        <div className="cart-page__list">
          {items.map((item) => (
            <div key={item.id} className="cart-page__item">
              <span className="cart-page__item-title">{item.title}</span>
              <div className="cart-page__item-qty">
                <button type="button" onClick={() => setQty(item.id, item.qty - 1)}>
                  −
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => setQty(item.id, item.qty + 1)}>
                  +
                </button>
              </div>
              <span className="cart-page__item-price">{formatPrice(item.price * item.qty)}</span>
              <button
                type="button"
                className="cart-page__item-remove"
                onClick={() => removeItem(item.id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-page__summary">
          <div className="cart-page__summary-row">
            <span>Итого</span>
            <span className="cart-page__summary-value">{formatPrice(subtotal)}</span>
          </div>
          <Button className="cart-page__checkout" onClick={() => navigate("/checkout")}>
            Оформить заказ
          </Button>
        </aside>
      </div>
    </div>
  );
}
