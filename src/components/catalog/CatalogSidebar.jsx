import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext.jsx";
import NavIcon from "../common/NavIcon.jsx";
import { navIconId } from "../../data/iconMap.js";
import "./CatalogSidebar.css";

// В данных лежит либо имя иконки набора ("nav-orders"), либо эмодзи из
// старого контента в localStorage — тогда подбираем иконку по подписи, а если
// и она не нашлась, показываем то, что лежит в данных.
function SidebarIcon({ icon, label }) {
  const name = icon?.startsWith("nav-") ? icon : navIconId(label);
  if (name) return <NavIcon name={name} size={20} className="catalog-sidebar__icon" />;
  return <span className="catalog-sidebar__icon">{icon}</span>;
}

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
          <SidebarIcon icon="nav-packages" label="Все категории" />
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
            <SidebarIcon icon={c.icon} label={c.label} />
            {c.label}
          </button>
        ))}
      </div>

      <div className="catalog-sidebar__group">
        {quickLinks.map((item) =>
          item.to ? (
            <Link key={item.id} to={item.to} className="catalog-sidebar__item">
              <SidebarIcon icon={item.icon} label={item.label} />
              {item.label}
            </Link>
          ) : (
            <button
              key={item.id}
              type="button"
              className="catalog-sidebar__item"
              onClick={() => onQuickLink(item.id)}
            >
              <SidebarIcon icon={item.icon} label={item.label} />
              {item.label}
            </button>
          )
        )}
      </div>

      <div className="catalog-sidebar__group">
        {supportLinks.map((item) => (
          <button key={item.id} type="button" className="catalog-sidebar__item" disabled>
            <SidebarIcon icon={item.icon} label={item.label} />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
