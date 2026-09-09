import { useNavigate } from "react-router-dom";
import { Drawer } from "../overlay/Drawer.jsx";
import { Button } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import "./CartDrawer.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { items, setQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <Drawer open={cartOpen} onClose={closeCart} title="Корзина">
      {items.length === 0 ? (
        <p className="cart-drawer__empty">Корзина пока пуста.</p>
      ) : (
        <div className="cart-drawer__list">
          {items.map((item) => (
            <div key={item.id} className="cart-drawer__item">
              <div className="cart-drawer__item-info">
                <span className="cart-drawer__item-title">{item.title}</span>
                <span className="cart-drawer__item-price">{formatPrice(item.price)}</span>
              </div>
              <div className="cart-drawer__item-qty">
                <button type="button" onClick={() => setQty(item.id, item.qty - 1)}>
                  −
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => setQty(item.id, item.qty + 1)}>
                  +
                </button>
              </div>
              <button
                type="button"
                className="cart-drawer__item-remove"
                onClick={() => removeItem(item.id)}
                aria-label="Удалить"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="cart-drawer__footer">
          <div className="cart-drawer__subtotal">
            <span>Итого</span>
            <span className="cart-drawer__subtotal-value">{formatPrice(subtotal)}</span>
          </div>
          <Button
            className="cart-drawer__checkout"
            onClick={() => {
              closeCart();
              navigate("/checkout");
            }}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </Drawer>
  );
}
