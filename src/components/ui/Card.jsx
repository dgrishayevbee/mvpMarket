import "./Card.css";

export function Card({ muted = false, className = "", children, ...rest }) {
  const classes = ["card", muted ? "card--muted" : "", className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
