import { useContent } from "../../context/ContentContext.jsx";
import { Input, Textarea } from "../ui/index.js";
import { StringListEditor } from "./StringListEditor.jsx";
import { ImageField } from "./ImageField.jsx";
import "./AdminSections.css";

const COLUMN_LABELS = {
  business: "Колонка «Бизнесу»",
  company: "Колонка «О компании»",
  solutions: "Колонка «Решения»",
  help: "Колонка «Помощь»",
};

export function AdminFooterSection() {
  const { content, updateFooterColumn, updateFooterContact, updateVideo } = useContent();
  const { columns, contact } = content.footer;
  const { video } = content;

  return (
    <div className="admin-section">
      <div className="admin-field">
        <span>Видео-блок на главной</span>
        <div className="admin-card admin-card--static">
          <div className="admin-card__body">
            <label className="admin-field">
              <span>Подпись</span>
              <Textarea value={video.caption} onChange={(e) => updateVideo({ caption: e.target.value })} />
            </label>
            <ImageField
              label="Картинка вместо тёмного фона (необязательно)"
              value={video.imageUrl}
              onChange={(imageUrl) => updateVideo({ imageUrl })}
            />
          </div>
        </div>
      </div>

      {Object.entries(columns).map(([key, items]) => (
        <div className="admin-field" key={key}>
          <span>{COLUMN_LABELS[key] || key}</span>
          <StringListEditor items={items} onChange={(next) => updateFooterColumn(key, next)} />
        </div>
      ))}

      <div className="admin-field admin-field--row">
        <label className="admin-field">
          <span>Короткий номер</span>
          <Input
            value={contact.shortNumber}
            onChange={(e) => updateFooterContact({ shortNumber: e.target.value })}
          />
        </label>
        <label className="admin-field">
          <span>Телефон</span>
          <Input value={contact.phone} onChange={(e) => updateFooterContact({ phone: e.target.value })} />
        </label>
      </div>
    </div>
  );
}
