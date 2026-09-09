import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext.jsx";
import "./Footer.css";

export function Footer() {
  const { content } = useContent();
  const { columns, contact } = content.footer;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__columns">
          <div className="footer__column">
            <span className="footer__heading">Бизнесу</span>
            {columns.business.map((label) => (
              <span key={label} className="footer__link footer__link--static">
                {label}
              </span>
            ))}
          </div>

          <div className="footer__column">
            <span className="footer__heading">О компании</span>
            {columns.company.map((label) => (
              <span key={label} className="footer__link footer__link--static">
                {label}
              </span>
            ))}
          </div>

          <div className="footer__column">
            <span className="footer__heading">Решения</span>
            {columns.solutions.map((label) => (
              <span key={label} className="footer__link footer__link--static">
                {label}
              </span>
            ))}
          </div>

          <div className="footer__column">
            <span className="footer__heading">Помощь</span>
            {columns.help.map((label) => (
              <span key={label} className="footer__link footer__link--static">
                {label}
              </span>
            ))}
          </div>

          <div className="footer__column footer__column--contact">
            <span className="footer__heading">Новые подключения</span>
            <span className="footer__short-number">{contact.shortNumber}</span>
            <span className="footer__phone">{contact.phone}</span>
          </div>
        </div>

        <div className="footer__bottom">
          mvpMarket — визуальный прототип. © 2026 · <Link to="/admin">Редактор контента</Link>
        </div>
      </div>
    </footer>
  );
}
