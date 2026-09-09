import "./PlaceholderImage.css";

export function PlaceholderImage({ label = "изображение", height, rounded = true, className = "" }) {
  const classes = ["placeholder-image", rounded ? "placeholder-image--rounded" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} style={height ? { height } : undefined}>
      <span className="placeholder-image__label">{label}</span>
    </div>
  );
}
