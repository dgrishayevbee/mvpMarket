import "./Button.css";

const VARIANT_CLASS = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  accent: "btn--accent",
  ghost: "btn--ghost",
  gradient: "btn--gradient",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const classes = ["btn", VARIANT_CLASS[variant] || VARIANT_CLASS.primary, `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
