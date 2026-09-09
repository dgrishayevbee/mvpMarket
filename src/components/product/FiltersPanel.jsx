import { Chip, Slider } from "../ui/index.js";
import { categories } from "../../data/categories.js";
import "./FiltersPanel.css";

export const SORT_OPTIONS = [
  { value: "relevance", label: "По популярности" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "rating", label: "По рейтингу" },
];

export function FiltersPanel({ category, onCategoryChange, maxPrice, onMaxPriceChange, sort, onSortChange }) {
  return (
    <div className="filters-panel">
      <div className="filters-panel__section">
        <span className="filters-panel__label">Категории</span>
        <div className="filters-panel__chips">
          <Chip active={category === "all"} onClick={() => onCategoryChange("all")}>
            Все
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => onCategoryChange(c.id)}>
              {c.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="filters-panel__section">
        <Slider
          label="Цена до"
          unit="₸"
          min={5000}
          max={60000}
          step={1000}
          value={maxPrice}
          onChange={onMaxPriceChange}
        />
      </div>

      <div className="filters-panel__section">
        <span className="filters-panel__label">Сортировка</span>
        <select
          className="filters-panel__select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
