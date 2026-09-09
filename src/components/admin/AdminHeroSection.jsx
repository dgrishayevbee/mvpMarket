import { useContent } from "../../context/ContentContext.jsx";
import { Input } from "../ui/index.js";
import { StringListEditor } from "./StringListEditor.jsx";
import "./AdminSections.css";

export function AdminHeroSection() {
  const { content, updateHero } = useContent();
  const { hero } = content;

  return (
    <div className="admin-section">
      <label className="admin-field">
        <span>Заголовок</span>
        <Input value={hero.title} onChange={(e) => updateHero({ title: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Плейсхолдер строки поиска</span>
        <Input
          value={hero.searchPlaceholder}
          onChange={(e) => updateHero({ searchPlaceholder: e.target.value })}
        />
      </label>

      <div className="admin-field">
        <span>Быстрые подсказки под поиском</span>
        <StringListEditor items={hero.prompts} onChange={(prompts) => updateHero({ prompts })} />
      </div>
    </div>
  );
}
