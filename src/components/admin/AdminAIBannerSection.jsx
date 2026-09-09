import { useContent } from "../../context/ContentContext.jsx";
import { Input, Textarea, Button } from "../ui/index.js";
import "./AdminSections.css";

export function AdminAIBannerSection() {
  const { content, updateAiBanner, addSuggestion, updateSuggestion, removeSuggestion } = useContent();
  const { title, subtitle, ctaLabel, suggestions } = content.aiBanner;

  return (
    <div className="admin-section">
      <label className="admin-field">
        <span>Заголовок</span>
        <Input value={title} onChange={(e) => updateAiBanner({ title: e.target.value })} />
      </label>
      <label className="admin-field">
        <span>Подзаголовок</span>
        <Textarea value={subtitle} onChange={(e) => updateAiBanner({ subtitle: e.target.value })} />
      </label>
      <label className="admin-field">
        <span>Текст кнопки</span>
        <Input value={ctaLabel} onChange={(e) => updateAiBanner({ ctaLabel: e.target.value })} />
      </label>

      <div className="admin-field">
        <span>Подсказки-сценарии</span>
        <div className="admin-list">
          {suggestions.map((s, i) => (
            <div key={i} className="admin-row">
              <Input
                className="admin-row__icon"
                value={s.emoji}
                onChange={(e) => updateSuggestion(i, { emoji: e.target.value })}
                aria-label="Эмодзи"
              />
              <Input value={s.text} onChange={(e) => updateSuggestion(i, { text: e.target.value })} />
              <button
                type="button"
                className="admin-row__remove"
                onClick={() => removeSuggestion(i)}
                aria-label="Удалить"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => addSuggestion({ emoji: "✦", text: "Новый сценарий" })}
        >
          + Добавить подсказку
        </Button>
      </div>
    </div>
  );
}
