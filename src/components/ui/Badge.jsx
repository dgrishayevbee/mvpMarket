import "./Badge.css";

const VARIANT_CLASS = {
  solid: "badge--solid",
  tint: "badge--tint",
  neutral: "badge--neutral",
  success: "badge--success",
  dark: "badge--dark",
};

const LABELS = {
  hit: "Хит",
  new: "Новинка",
};

export function Badge({ variant = "neutral", children, className = "" }) {
  const classes = ["badge", VARIANT_CLASS[variant] || VARIANT_CLASS.neutral, className]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}

export function ProductBadge({ type }) {
  if (type === "hit") return <Badge variant="solid">{LABELS.hit}</Badge>;
  if (type === "new") return <Badge variant="tint">{LABELS.new}</Badge>;
  return null;
}
