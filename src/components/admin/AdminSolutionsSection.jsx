import { useContent } from "../../context/ContentContext.jsx";
import { Input, Textarea, Button, Switch } from "../ui/index.js";
import { StringListEditor } from "./StringListEditor.jsx";
import { ImageField } from "./ImageField.jsx";
import "./AdminSections.css";

function SolutionForm({ solution, categories, segments, onUpdate, onRemove }) {
  const toggleBadge = (badge) => {
    const has = solution.badges?.includes(badge);
    const badges = has ? solution.badges.filter((b) => b !== badge) : [...(solution.badges || []), badge];
    onUpdate({ badges });
  };

  return (
    <details className="admin-card" open={false}>
      <summary>{solution.title || "Новая карточка"}</summary>
      <div className="admin-card__body">
        <label className="admin-field">
          <span>Название</span>
          <Input value={solution.title} onChange={(e) => onUpdate({ title: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Подзаголовок</span>
          <Input value={solution.subtitle} onChange={(e) => onUpdate({ subtitle: e.target.value })} />
        </label>

        <label className="admin-field">
          <span>Иконка (emoji, если нет картинки)</span>
          <Input value={solution.icon} onChange={(e) => onUpdate({ icon: e.target.value })} />
        </label>
        <ImageField
          label="Картинка карточки (необязательно, заменит иконку)"
          value={solution.imageUrl}
          onChange={(imageUrl) => onUpdate({ imageUrl })}
        />

        <div className="admin-field admin-field--row">
          <label className="admin-field">
            <span>Категория</span>
            <select
              className="admin-select"
              value={solution.category}
              onChange={(e) => onUpdate({ category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="admin-field">
            <span>Раздел (таб)</span>
            <select
              className="admin-select"
              value={solution.segment}
              onChange={(e) => onUpdate({ segment: e.target.value })}
            >
              {segments
                .filter((s) => s.id !== "all")
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className="admin-field admin-field--row">
          <label className="admin-field">
            <span>Цена, ₸</span>
            <Input
              type="number"
              value={solution.price}
              onChange={(e) => onUpdate({ price: Number(e.target.value) })}
            />
          </label>
          <label className="admin-field">
            <span>Период оплаты</span>
            <Input value={solution.billing} onChange={(e) => onUpdate({ billing: e.target.value })} />
          </label>
        </div>

        <div className="admin-field">
          <span>Теги (бейджи на карточке)</span>
          <StringListEditor items={solution.tags || []} onChange={(tags) => onUpdate({ tags })} />
        </div>

        <div className="admin-field">
          <span>Чек-лист возможностей</span>
          <StringListEditor
            items={solution.features || []}
            onChange={(features) => onUpdate({ features })}
          />
        </div>

        <label className="admin-field">
          <span>Описание (страница товара)</span>
          <Textarea
            value={solution.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
          />
        </label>

        <div className="admin-field admin-field--row">
          <Switch
            checked={!!solution.badges?.includes("hit")}
            onChange={() => toggleBadge("hit")}
            label="Бейдж «Хит»"
          />
          <Switch
            checked={!!solution.badges?.includes("new")}
            onChange={() => toggleBadge("new")}
            label="Бейдж «Новинка»"
          />
          <Switch
            checked={!!solution.singleCta}
            onChange={(v) => onUpdate({ singleCta: v })}
            label="Одна кнопка «Подключить» (вместо «Начать» + «Информация»)"
          />
        </div>

        <Button variant="ghost" size="sm" onClick={onRemove}>
          Удалить карточку
        </Button>
      </div>
    </details>
  );
}

export function AdminSolutionsSection() {
  const { content, addSolution, updateSolution, removeSolution } = useContent();

  return (
    <div className="admin-section">
      {content.solutions.map((s) => (
        <SolutionForm
          key={s.id}
          solution={s}
          categories={content.categories}
          segments={content.segments}
          onUpdate={(patch) => updateSolution(s.id, patch)}
          onRemove={() => removeSolution(s.id)}
        />
      ))}
      <Button
        onClick={() =>
          addSolution({
            title: "Новое решение",
            subtitle: "",
            icon: "🏷️",
            imageUrl: "",
            category: content.categories[0]?.id,
            segment: content.segments.find((s) => s.id !== "all")?.id || content.segments[0]?.id,
            tags: [],
            badges: [],
            price: 0,
            billing: "в месяц",
            seller: "mvpMarket",
            rating: 0,
            reviewsCount: 0,
            stock: 999,
            features: [],
            description: "",
          })
        }
      >
        + Добавить карточку решения
      </Button>
    </div>
  );
}
