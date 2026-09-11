import { useContent } from "../../context/ContentContext.jsx";
import { Input, Button } from "../ui/index.js";
import { StringListEditor } from "./StringListEditor.jsx";
import { ImageField } from "./ImageField.jsx";
import "./AdminSections.css";

export function AdminBundlesSection() {
  const { content, addBundle, updateBundle, removeBundle, resetSection } = useContent();

  // Названия и цены пакетов правятся в коде, а в localStorage у посетителя
  // лежит его копия контента — сброс раздела подтягивает новые дефолты,
  // не трогая остальные разделы.
  const resetBundles = () => {
    if (window.confirm("Вернуть пакеты к значениям по умолчанию? Правки в этом разделе пропадут.")) {
      resetSection("bundles");
    }
  };

  return (
    <div className="admin-section">
      {content.bundles.map((b) => (
        <details key={b.id} className="admin-card">
          <summary>{b.title || "Новый пакет"}</summary>
          <div className="admin-card__body">
            <label className="admin-field">
              <span>Название</span>
              <Input value={b.title} onChange={(e) => updateBundle(b.id, { title: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Подзаголовок</span>
              <Input
                value={b.subtitle}
                onChange={(e) => updateBundle(b.id, { subtitle: e.target.value })}
              />
            </label>
            <ImageField
              label="Иконка пакета"
              value={b.imageUrl}
              onChange={(imageUrl) => updateBundle(b.id, { imageUrl })}
            />
            <label className="admin-field">
              <span>Цена, ₸ в месяц</span>
              <Input
                type="number"
                value={b.price}
                onChange={(e) => updateBundle(b.id, { price: Number(e.target.value) })}
              />
            </label>
            <label className="admin-field">
              <span>Цена при покупке отдельно, ₸ (0 — не показывать)</span>
              <Input
                type="number"
                value={b.oldPrice || 0}
                onChange={(e) => updateBundle(b.id, { oldPrice: Number(e.target.value) })}
              />
            </label>
            <div className="admin-field">
              <span>Технологии в пакете</span>
              <StringListEditor items={b.features} onChange={(features) => updateBundle(b.id, { features })} />
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeBundle(b.id)}>
              Удалить пакет
            </Button>
          </div>
        </details>
      ))}
      <Button variant="secondary" onClick={resetBundles}>
        Сбросить раздел к значениям по умолчанию
      </Button>
      <Button
        onClick={() =>
          addBundle({ title: "Новый пакет", subtitle: "", imageUrl: "", price: 0, oldPrice: 0, seller: "mvpMarket", features: [] })
        }
      >
        + Добавить пакет
      </Button>
    </div>
  );
}
