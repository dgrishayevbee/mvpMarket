import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../../components/ui/index.js";
import "./SellerLayout.css";

export function SellerLayout() {
  const { user, sellerMode, exitSellerMode } = useAuth();

  if (!user) {
    return (
      <div className="seller-layout__guard">
        <h1>Кабинет продавца</h1>
        <p>Войдите, чтобы управлять товарами.</p>
        <Link to="/login">
          <Button>Войти</Button>
        </Link>
      </div>
    );
  }

  if (!sellerMode) {
    return (
      <div className="seller-layout__guard">
        <h1>Кабинет продавца</h1>
        <p>Активируйте режим продавца в личном кабинете, чтобы добавлять товары.</p>
        <Link to="/profile">
          <Button>В личный кабинет</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="seller-layout">
      <aside className="seller-layout__sidebar">
        <NavLink to="/seller" end className="seller-layout__link">
          Дашборд
        </NavLink>
        <NavLink to="/seller/products" className="seller-layout__link">
          Мои товары
        </NavLink>
        <NavLink to="/seller/orders" className="seller-layout__link">
          Заказы
        </NavLink>
        <button type="button" className="seller-layout__exit" onClick={exitSellerMode}>
          Выйти из режима продавца
        </button>
      </aside>
      <div className="seller-layout__content">
        <Outlet />
      </div>
    </div>
  );
}
