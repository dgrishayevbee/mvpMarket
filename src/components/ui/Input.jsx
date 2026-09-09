import "./Input.css";

export function Input({ error, className = "", ...rest }) {
  const classes = ["input", error ? "input--error" : "", className].filter(Boolean).join(" ");
  return <input className={classes} {...rest} />;
}

export function Textarea({ error, className = "", ...rest }) {
  const classes = ["input", "input--textarea", error ? "input--error" : "", className]
    .filter(Boolean)
    .join(" ");
  return <textarea className={classes} {...rest} />;
}
