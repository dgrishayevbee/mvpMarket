import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext.jsx";
import "./CatalogSidebar.css";

export function CatalogSidebar({ activeCategory, onCategoryChange, onQuickLink }) {
  const { content } = useContent();
  const { categories, quickLinks, supportLinks } = content;

  return (
    <nav className="catalog-sidebar">
      <div className="catalog-sidebar__group">
        <button
          type="button"
          className={
            "catalog-sidebar__item" + (activeCategory === "all" ? " catalog-sidebar__item--active" : "")
          }
          onClick={() => onCategoryChange("all")}
        >
          <span className="catalog-sidebar__icon">🗂️</span>
          Все категории
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={
              "catalog-sidebar__item" + (activeCategory === c.id ? " catalog-sidebar__item--active" : "")
            }
            onClick={() => onCategoryChange(c.id)}
          >
            <span className="catalog-sidebar__icon">{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className="catalog-sidebar__group">
        {quickLinks.map((item) =>
          item.to ? (
            <Link key={item.id} to={item.to} className="catalog-sidebar__item">
              <span className="catalog-sidebar__icon">{item.icon}</span>
              {item.label}
            </Link>
          ) : (
            <button
              key={item.id}
              type="button"
              className="catalog-sidebar__item"
              onClick={() => onQuickLink(item.id)}
            >
              <span className="catalog-sidebar__icon">{item.icon}</span>
              {item.label}
            </button>
          )
        )}
      </div>

      <div className="catalog-sidebar__group">
        {supportLinks.map((item) => (
          <button key={item.id} type="button" className="catalog-sidebar__item" disabled>
            <span className="catalog-sidebar__icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
