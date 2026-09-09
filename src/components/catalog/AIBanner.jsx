import { useContent } from "../../context/ContentContext.jsx";
import "./AIBanner.css";

export function AIBanner({ onSuggestion }) {
  const { content } = useContent();
  const { title, subtitle, ctaLabel, suggestions } = content.aiBanner;

  return (
    <section className="ai-banner">
      <div className="ai-banner__main">
        <h2 className="ai-banner__title">{title}</h2>
        <p className="ai-banner__subtitle">{subtitle}</p>
        <button type="button" className="ai-banner__cta" onClick={() => onSuggestion("")}>
          ✦ {ctaLabel}
        </button>
      </div>
      <div className="ai-banner__suggestions">
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            className="ai-banner__suggestion"
            onClick={() => onSuggestion(s.text)}
          >
            <span className="ai-banner__suggestion-avatar">{s.emoji}</span>
            {s.text}
          </button>
        ))}
      </div>
    </section>
  );
}
