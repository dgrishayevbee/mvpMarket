import "./Chip.css";

export function Chip({ active = false, children, className = "", ...rest }) {
  const classes = ["chip", active ? "chip--active" : "", className].filter(Boolean).join(" ");
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
