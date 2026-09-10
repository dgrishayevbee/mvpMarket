import { featureIcons, featureIconId } from '../../data/iconMap.js';

/**
 * Иконка характеристики. Можно передать точный id (`icon="f-internet"`)
 * или просто текст строки (`text="Интернет 100 Мбит/с"`) — иконка подберётся сама.
 */
export default function FeatureIcon({ icon, text, size = 24, className, style }) {
  const id = icon || featureIconId(text);
  const src = id ? featureIcons[id] : null;
  if (!src) return null;
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ display: 'block', flex: 'none', ...style }}
    />
  );
}
