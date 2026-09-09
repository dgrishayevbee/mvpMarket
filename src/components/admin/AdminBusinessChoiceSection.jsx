import { useContent } from "../../context/ContentContext.jsx";
import { Input, Button } from "../ui/index.js";
import { ImageField } from "./ImageField.jsx";
import "./AdminSections.css";

export function AdminBusinessChoiceSection() {
  const {
    content,
    updateBusinessChoiceTitle,
    updateInteractiveTariff,
    addSimpleTariff,
    updateSimpleTariff,
    removeSimpleTariff,
  } = useContent();
  const { sectionTitle, interactiveTariff, simpleTariffs } = content.businessChoice;

  const setSpeed = (i, value) => {
    const speeds = [...interactiveTariff.speeds];
    speeds[i] = Number(value);
    updateInteractiveTariff({ speeds });
  };

  return (
    <div className="admin-section">
      <label className="admin-field">
        <span>Заголовок секции</span>
        <Input value={sectionTitle} onChange={(e) => updateBusinessChoiceTitle(e.target.value)} />
      </label>

      <div className="admin-field">
        <span>Интерактивная карточка тарифа</span>
        <div className="admin-card admin-card--static">
          <div className="admin-card__body">
            <label className="admin-field">
              <span>Базовая цена, ₸</span>
              <Input
                type="number"
                value={interactiveTariff.basePrice}
                onChange={(e) => updateInteractiveTariff({ basePrice: Number(e.target.value) })}
              />
            </label>
            <div className="admin-field admin-field--row">
              {interactiveTariff.speeds.map((s, i) => (
                <label className="admin-field" key={i}>
                  <span>Скорость {i + 1}, Мб/с</span>
                  <Input type="number" value={s} onChange={(e) => setSpeed(i, e.target.value)} />
                </label>
              ))}
            </div>
            <div className="admin-field admin-field--row">
              <label className="admin-field">
                <span>Мин. ГБ на слайдере</span>
                <Input
                  type="number"
                  value={interactiveTariff.minGb}
                  onChange={(e) => updateInteractiveTariff({ minGb: Number(e.target.value) })}
                />
              </label>
              <label className="admin-field">
                <span>Макс. ГБ на слайдере</span>
                <Input
                  type="number"
                  value={interactiveTariff.maxGb}
                  onChange={(e) => updateInteractiveTariff({ maxGb: Number(e.target.value) })}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-field">
        <span>Простые карточки тарифов</span>
        {simpleTariffs.map((t) => (
          <details key={t.id} className="admin-card">
            <summary>{t.title || "Новый тариф"}</summary>
            <div className="admin-card__body">
              <label className="admin-field">
                <span>Название</span>
                <Input
                  value={t.title}
                  onChange={(e) => updateSimpleTariff(t.id, { title: e.target.value })}
                />
              </label>
              <label className="admin-field">
                <span>Подзаголовок</span>
                <Input
                  value={t.subtitle}
                  onChange={(e) => updateSimpleTariff(t.id, { subtitle: e.target.value })}
                />
              </label>
              <label className="admin-field">
                <span>Иконка (emoji)</span>
                <Input
                  value={t.icon}
                  onChange={(e) => updateSimpleTariff(t.id, { icon: e.target.value })}
                />
              </label>
              <ImageField
                label="Картинка (заменит иконку)"
                value={t.imageUrl}
                onChange={(imageUrl) => updateSimpleTariff(t.id, { imageUrl })}
              />
              <div className="admin-field admin-field--row">
                <label className="admin-field">
                  <span>Цена, ₸</span>
                  <Input
                    type="number"
                    value={t.price}
                    onChange={(e) => updateSimpleTariff(t.id, { price: Number(e.target.value) })}
                  />
                </label>
                <label className="admin-field">
                  <span>Подпись после цены</span>
                  <Input
                    value={t.billing}
                    onChange={(e) => updateSimpleTariff(t.id, { billing: e.target.value })}
                  />
                </label>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeSimpleTariff(t.id)}>
                Удалить тариф
              </Button>
            </div>
          </details>
        ))}
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            addSimpleTariff({ title: "Новый тариф", subtitle: "", icon: "📶", imageUrl: "", price: 0, billing: "" })
          }
        >
          + Добавить тариф
        </Button>
      </div>
    </div>
  );
}
