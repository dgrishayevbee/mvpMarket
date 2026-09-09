import "./Slider.css";

export function Slider({ label, value, unit = "", min = 0, max = 100, step = 1, onChange }) {
  return (
    <div className="slider">
      {label && (
        <div className="slider__row">
          <span className="slider__label">{label}</span>
          <span className="slider__value">
            {value} {unit}
          </span>
        </div>
      )}
      <input
        type="range"
        className="slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
