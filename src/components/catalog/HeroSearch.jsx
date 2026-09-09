import { forwardRef } from "react";
import "./HeroSearch.css";

const QUICK_PROMPTS = ["Обслужить себя", "Открыть офис", "Автоматизировать продажи", "Подобрать бизнес"];

export const HeroSearch = forwardRef(function HeroSearch({ value, onChange, onSubmit }, ref) {
  const submit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <section className="hero-search" ref={ref}>
      <h1 className="hero-search__title">
        Подберём инфраструктуру
        <br />
        для вашего бизнеса
      </h1>

      <form className="hero-search__bar" onSubmit={submit}>
        <span className="hero-search__icon">✦</span>
        <input
          className="hero-search__input"
          placeholder="Опишите вашу задачу или спросите ИИ…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className="hero-search__submit" aria-label="Найти">
          →
        </button>
      </form>

      <button type="button" className="hero-search__voice">
        🎙️ Голосовой чат
      </button>

      <div className="hero-search__prompts">
        {QUICK_PROMPTS.map((p) => (
          <button key={p} type="button" className="hero-search__prompt" onClick={() => onSubmit(p)}>
            {p}
          </button>
        ))}
      </div>
    </section>
  );
});
