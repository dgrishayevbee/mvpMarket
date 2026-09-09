import { Input, Button } from "../ui/index.js";
import "./StringListEditor.css";

export function StringListEditor({ items, onChange, placeholder = "", addLabel = "+ Добавить" }) {
  const setAt = (i, value) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };
  const removeAt = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="string-list">
      {items.map((item, i) => (
        <div key={i} className="string-list__row">
          <Input value={item} placeholder={placeholder} onChange={(e) => setAt(i, e.target.value)} />
          <button
            type="button"
            className="string-list__remove"
            onClick={() => removeAt(i)}
            aria-label="Удалить"
          >
            ✕
          </button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add}>
        {addLabel}
      </Button>
    </div>
  );
}
