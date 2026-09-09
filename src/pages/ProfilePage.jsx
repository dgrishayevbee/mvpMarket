import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useProducts } from "../context/ProductsContext.jsx";
import { ProductCard } from "../components/product/ProductCard.jsx";
import { Button, Badge } from "../components/ui/index.js";
import "./ProfilePage.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function ProfilePage() {
  const { user, logout, enterSellerMode } = useAuth();
  const { orders } = useOrders();
  const { ids: favIds } = useFavorites();
  const { getById } = useProducts();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-page profile-page--guest">
        <h1>Личный кабинет</h1>
        <p>Войдите, чтобы увидеть заказы и избранное.</p>
        <Link to="/login">
          <Button>Войти</Button>
        </Link>
      </div>
    );
  }

  const myOrders = orders.filter((o) => o.buyerEmail === user.email);
  const favProducts = favIds.map(getById).filter(Boolean);

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <div>
          <h1 className="profile-page__title">{user.name}</h1>
          <span className="profile-page__email">{user.email}</span>
        </div>
        <div className="profile-page__header-actions">
          <Button
            variant="secondary"
            onClick={() => {
              enterSellerMode();
              navigate("/seller");
            }}
          >
            Стать продавцом
          </Button>
          <Button variant="ghost" onClick={logout}>
            Выйти
          </Button>
        </div>
      </div>

      <section className="profile-page__section">
        <h2>Мои заказы</h2>
        {myOrders.length === 0 ? (
          <p className="profile-page__empty">Заказов пока нет.</p>
        ) : (
          <div className="profile-page__orders">
            {myOrders.map((order) => (
              <div key={order.id} className="profile-page__order">
                <div className="profile-page__order-head">
                  <span className="profile-page__order-id">{order.id}</span>
                  <Badge variant="success">{order.status}</Badge>
                </div>
                <span className="profile-page__order-date">
                  {new Date(order.date).toLocaleDateString("ru-RU")}
                </span>
                <span className="profile-page__order-items">
                  {order.items.map((i) => i.title).join(", ")}
                </span>
                <span className="profile-page__order-total">{formatPrice(order.total)}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="favorites" className="profile-page__section">
        <h2>Избранное</h2>
        {favProducts.length === 0 ? (
          <p className="profile-page__empty">Пока ничего не добавлено.</p>
        ) : (
          <div className="profile-page__favorites-grid">
            {favProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
