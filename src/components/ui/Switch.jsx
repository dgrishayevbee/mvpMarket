import "./Switch.css";

export function Switch({ checked, onChange, label }) {
  return (
    <label className="switch">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={"switch__track" + (checked ? " switch__track--on" : "")}
        onClick={() => onChange(!checked)}
      >
        <span className="switch__thumb" />
      </button>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
}
