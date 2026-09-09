import "./AIBanner.css";

const SUGGESTIONS = [
  { emoji: "🧑‍💼", text: "Открываю офис на 30 сотрудников" },
  { emoji: "📶", text: "Организовать Wi-Fi для офиса" },
  { emoji: "🏠", text: "Настроить удалённую работу" },
];

export function AIBanner({ onSuggestion }) {
  return (
    <section className="ai-banner">
      <div className="ai-banner__main">
        <h2 className="ai-banner__title">Решите свою задачу с нашим ИИ-ассистентом</h2>
        <p className="ai-banner__subtitle">
          Расскажите о задачах — подберём решения для роста и защиты компании.
        </p>
        <button type="button" className="ai-banner__cta" onClick={() => onSuggestion("")}>
          ✦ Попробовать сейчас
        </button>
      </div>
      <div className="ai-banner__suggestions">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
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
