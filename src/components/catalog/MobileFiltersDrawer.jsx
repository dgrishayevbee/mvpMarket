import { Drawer } from "../overlay/Drawer.jsx";
import { CatalogSidebar } from "./CatalogSidebar.jsx";
import { Tabs } from "../ui/index.js";
import { segments } from "../../data/categories.js";
import "./MobileFiltersDrawer.css";

export function MobileFiltersDrawer({
  open,
  onClose,
  activeCategory,
  onCategoryChange,
  activeSegment,
  onSegmentChange,
  onQuickLink,
}) {
  return (
    <Drawer open={open} onClose={onClose} title="Фильтры">
      <div className="mobile-filters">
        <span className="mobile-filters__label">Раздел</span>
        <Tabs tabs={segments} activeId={activeSegment} onChange={onSegmentChange} />
        <span className="mobile-filters__label">Категории</span>
        <CatalogSidebar
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          onQuickLink={onQuickLink}
        />
      </div>
    </Drawer>
  );
}
