import { useContent } from "../../context/ContentContext.jsx";
import { Input, Button } from "../ui/index.js";
import "./AdminSections.css";

function CategoryRow({ item, onUpdate, onRemove }) {
  return (
    <div className="admin-row">
      <Input
        className="admin-row__icon"
        value={item.icon}
        onChange={(e) => onUpdate({ icon: e.target.value })}
        aria-label="Иконка"
      />
      <Input value={item.label} onChange={(e) => onUpdate({ label: e.target.value })} />
      <button type="button" className="admin-row__remove" onClick={onRemove} aria-label="Удалить">
        ✕
      </button>
    </div>
  );
}

export function AdminNavigationSection() {
  const {
    content,
    addCategory,
    updateCategory,
    removeCategory,
    addSegment,
    updateSegment,
    removeSegment,
    addQuickLink,
    updateQuickLink,
    removeQuickLink,
    addSupportLink,
    updateSupportLink,
    removeSupportLink,
  } = useContent();

  return (
    <div className="admin-section">
      <div className="admin-field">
        <span>Категории в сайдбаре</span>
        <div className="admin-list">
          {content.categories.map((c) => (
            <CategoryRow
              key={c.id}
              item={c}
              onUpdate={(patch) => updateCategory(c.id, patch)}
              onRemove={() => removeCategory(c.id)}
            />
          ))}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => addCategory({ label: "Новая категория", icon: "🏷️" })}
        >
          + Добавить категорию
        </Button>
      </div>

      <div className="admin-field">
        <span>Табы разделов (над сеткой карточек)</span>
        <div className="admin-list">
          {content.segments.map((s) => (
            <div key={s.id} className="admin-row">
              <Input
                value={s.label}
                onChange={(e) => updateSegment(s.id, { label: e.target.value })}
              />
              {s.id !== "all" && (
                <button
                  type="button"
                  className="admin-row__remove"
                  onClick={() => removeSegment(s.id)}
                  aria-label="Удалить"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={() => addSegment({ label: "Новый раздел" })}>
          + Добавить раздел
        </Button>
      </div>

      <div className="admin-field">
        <span>Быстрые ссылки в сайдбаре</span>
        <div className="admin-list">
          {content.quickLinks.map((item) => (
            <div key={item.id} className="admin-row">
              <Input
                value={item.label}
                onChange={(e) => updateQuickLink(item.id, { label: e.target.value })}
              />
              <button
                type="button"
                className="admin-row__remove"
                onClick={() => removeQuickLink(item.id)}
                aria-label="Удалить"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={() => addQuickLink({ label: "Новая ссылка", icon: "🔗" })}>
          + Добавить ссылку
        </Button>
      </div>

      <div className="admin-field">
        <span>Блок поддержки в сайдбаре</span>
        <div className="admin-list">
          {content.supportLinks.map((item) => (
            <div key={item.id} className="admin-row">
              <Input
                value={item.label}
                onChange={(e) => updateSupportLink(item.id, { label: e.target.value })}
              />
              <button
                type="button"
                className="admin-row__remove"
                onClick={() => removeSupportLink(item.id)}
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
          onClick={() => addSupportLink({ label: "Новая ссылка", icon: "❓" })}
        >
          + Добавить ссылку
        </Button>
      </div>
    </div>
  );
}
