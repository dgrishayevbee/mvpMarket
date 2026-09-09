import { Link } from "react-router-dom";
import { categories, quickLinks, supportLinks } from "../../data/categories.js";
import "./Footer.css";

const COMPANY_LINKS = ["О нас", "Контакты", "Вакансии", "Партнёрам"];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__columns">
          <div className="footer__column">
            <span className="footer__heading">Бизнесу</span>
            {categories.slice(0, 5).map((c) => (
              <Link key={c.id} to={`/?category=${c.id}`} className="footer__link">
                {c.label}
              </Link>
            ))}
          </div>

          <div className="footer__column">
            <span className="footer__heading">О компании</span>
            {COMPANY_LINKS.map((label) => (
              <span key={label} className="footer__link footer__link--static">
                {label}
              </span>
            ))}
          </div>

          <div className="footer__column">
            <span className="footer__heading">Решения</span>
            {quickLinks.slice(0, 3).map((item) => (
              <span key={item.id} className="footer__link footer__link--static">
                {item.label}
              </span>
            ))}
          </div>

          <div className="footer__column">
            <span className="footer__heading">Помощь</span>
            {supportLinks.map((item) => (
              <span key={item.id} className="footer__link footer__link--static">
                {item.label}
              </span>
            ))}
            <span className="footer__link footer__link--static">Частые вопросы</span>
          </div>

          <div className="footer__column footer__column--contact">
            <span className="footer__heading">Новые подключения</span>
            <span className="footer__short-number">7900</span>
            <span className="footer__phone">+7 (727) 259 9000</span>
          </div>
        </div>

        <div className="footer__bottom">mvpMarket — визуальный прототип. © 2026</div>
      </div>
    </footer>
  );
}
