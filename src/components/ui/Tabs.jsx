import "./Tabs.css";

export function Tabs({ tabs, activeId, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={"tabs__item" + (tab.id === activeId ? " tabs__item--active" : "")}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
