import { forwardRef } from "react";
import { useContent } from "../../context/ContentContext.jsx";
import "./HeroSearch.css";

export const HeroSearch = forwardRef(function HeroSearch({ value, onChange, onSubmit }, ref) {
  const { content } = useContent();
  const { hero } = content;

  const submit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <section className="hero-search" ref={ref}>
      <h1 className="hero-search__title">{hero.title}</h1>

      <form className="hero-search__bar" onSubmit={submit}>
        <span className="hero-search__icon">✦</span>
        <input
          className="hero-search__input"
          placeholder={hero.searchPlaceholder}
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
        {hero.prompts.map((p) => (
          <button key={p} type="button" className="hero-search__prompt" onClick={() => onSubmit(p)}>
            {p}
          </button>
        ))}
      </div>
    </section>
  );
});
