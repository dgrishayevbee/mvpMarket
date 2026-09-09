import { useRef, useState } from "react";
import { useContent } from "../context/ContentContext.jsx";
import { Button } from "../components/ui/index.js";
import { AdminHeroSection } from "../components/admin/AdminHeroSection.jsx";
import { AdminNavigationSection } from "../components/admin/AdminNavigationSection.jsx";
import { AdminSolutionsSection } from "../components/admin/AdminSolutionsSection.jsx";
import { AdminBusinessChoiceSection } from "../components/admin/AdminBusinessChoiceSection.jsx";
import { AdminBundlesSection } from "../components/admin/AdminBundlesSection.jsx";
import { AdminAIBannerSection } from "../components/admin/AdminAIBannerSection.jsx";
import { AdminFooterSection } from "../components/admin/AdminFooterSection.jsx";
import "./AdminPage.css";

const TABS = [
  { id: "hero", label: "Поиск и заголовок", Component: AdminHeroSection },
  { id: "nav", label: "Категории и разделы", Component: AdminNavigationSection },
  { id: "solutions", label: "Карточки решений", Component: AdminSolutionsSection },
  { id: "tariffs", label: "Тарифы", Component: AdminBusinessChoiceSection },
  { id: "bundles", label: "Готовые пакеты", Component: AdminBundlesSection },
  { id: "ai", label: "AI-баннер", Component: AdminAIBannerSection },
  { id: "footer", label: "Видео и футер", Component: AdminFooterSection },
];

export function AdminPage() {
  const { exportJson, importJson, resetAll } = useContent();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [importError, setImportError] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const fileInputRef = useRef(null);

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.Component;

  const flashSaved = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const onExport = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mvpmarket-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importJson(String(reader.result));
        setImportError("");
        flashSaved();
      } catch {
        setImportError("Не удалось прочитать файл — проверьте, что это валидный JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const onReset = () => {
    if (window.confirm("Сбросить весь контент главной к значениям по умолчанию?")) {
      resetAll();
      flashSaved();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Редактор контента главной</h1>
          <p className="admin-page__hint">
            Правки сохраняются у вас в браузере и сразу видны на сайте. Когда всё устроит — нажмите
            «Экспортировать» и пришлите файл, чтобы зафиксировать его для всех посетителей.
          </p>
        </div>
        <div className="admin-page__actions">
          {savedFlash && <span className="admin-page__flash">Сохранено ✓</span>}
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            Импортировать JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={onImportFile}
          />
          <Button variant="secondary" size="sm" onClick={onExport}>
            Экспортировать JSON
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Сбросить всё
          </Button>
        </div>
      </div>

      {importError && <p className="admin-page__error">{importError}</p>}

      <div className="admin-page__layout">
        <nav className="admin-page__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={"admin-page__tab" + (tab.id === activeTab ? " admin-page__tab--active" : "")}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-page__content">{ActiveComponent && <ActiveComponent />}</div>
      </div>
    </div>
  );
}
