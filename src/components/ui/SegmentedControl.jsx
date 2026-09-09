import "./SegmentedControl.css";

export function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="segmented">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={"segmented__item" + (opt.value === value ? " segmented__item--active" : "")}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
