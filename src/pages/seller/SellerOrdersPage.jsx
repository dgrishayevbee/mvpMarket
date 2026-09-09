import { useAuth } from "../../context/AuthContext.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";
import { Badge } from "../../components/ui/index.js";
import "./SellerOrdersPage.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

const STATUS_OPTIONS = ["Оформлен", "Собирается", "В пути", "Доставлен"];

export function SellerOrdersPage() {
  const { user } = useAuth();
  const { listForSeller, setStatus } = useOrders();
  const orders = listForSeller(user.name);

  return (
    <div className="seller-orders">
      <h1>Заказы</h1>
      {orders.length === 0 ? (
        <p className="seller-orders__empty">Заказов на ваши товары пока нет.</p>
      ) : (
        <div className="seller-orders__list">
          {orders.map((order) => {
            const orderTotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
            return (
              <div key={order.id} className="seller-orders__row">
                <div className="seller-orders__row-main">
                  <span className="seller-orders__id">{order.id}</span>
                  <span className="seller-orders__items">
                    {order.items.map((i) => `${i.title} ×${i.qty}`).join(", ")}
                  </span>
                  <span className="seller-orders__total">{formatPrice(orderTotal)}</span>
                </div>
                <select
                  className="seller-orders__status"
                  value={order.status}
                  onChange={(e) => setStatus(order.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <Badge variant="success">{order.status}</Badge>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
