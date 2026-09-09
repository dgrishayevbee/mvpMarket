import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import "./Header.css";

export function Header() {
  const { count } = useCart();
  const { openCart } = useUI();
  const { ids: favIds } = useFavorites();
  const { user, sellerMode } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : "/");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-dot" />
          mvpMarket
        </Link>

        <nav className="header__nav">
          <NavLink to="/" end className="header__nav-link">
            Каталог
          </NavLink>
          {sellerMode ? (
            <NavLink to="/seller" className="header__nav-link">
              Кабинет продавца
            </NavLink>
          ) : (
            <NavLink to="/profile" className="header__nav-link">
              Мои заказы
            </NavLink>
          )}
        </nav>

        <form className="header__search" onSubmit={onSearch}>
          <span className="header__search-icon">⌕</span>
          <input
            className="header__search-input"
            placeholder="Искать товары…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="header__actions">
          <Link to="/profile#favorites" className="header__icon-btn" aria-label="Избранное">
            ♡
            {favIds.length > 0 && <span className="header__badge">{favIds.length}</span>}
          </Link>
          <button
            type="button"
            className="header__icon-btn"
            onClick={openCart}
            aria-label="Корзина"
          >
            🛒
            {count > 0 && <span className="header__badge">{count}</span>}
          </button>
          {user ? (
            <Link to="/profile" className="header__user">
              {user.name}
            </Link>
          ) : (
            <Link to="/login" className="header__user">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
