import { useAuth } from "../../context/AuthContext.jsx";
import { useProducts } from "../../context/ProductsContext.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";
import { Card } from "../../components/ui/index.js";
import "./SellerDashboardPage.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function SellerDashboardPage() {
  const { user } = useAuth();
  const { listBySeller } = useProducts();
  const { listForSeller } = useOrders();

  const myProducts = listBySeller(user.name);
  const myOrders = listForSeller(user.name);
  const revenue = myOrders.reduce(
    (sum, order) => sum + order.items.reduce((s, i) => s + i.price * i.qty, 0),
    0
  );

  const stats = [
    { label: "Товаров", value: myProducts.length },
    { label: "Заказов", value: myOrders.length },
    { label: "Выручка", value: formatPrice(revenue) },
  ];

  return (
    <div className="seller-dashboard">
      <h1 className="seller-dashboard__title">Дашборд</h1>
      <div className="seller-dashboard__stats">
        {stats.map((s) => (
          <Card key={s.label} muted className="seller-dashboard__stat">
            <span className="seller-dashboard__stat-value">{s.value}</span>
            <span className="seller-dashboard__stat-label">{s.label}</span>
          </Card>
        ))}
      </div>
      <p className="seller-dashboard__note">
        Статистика визуальная, на основе действий в этом прототипе (мок-данные, без реального
        бэкенда).
      </p>
    </div>
  );
}
