import "./Price.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function Price({ price, oldPrice, size = "md" }) {
  return (
    <div className={"price price--" + size}>
      {oldPrice && <span className="price__old">{formatPrice(oldPrice)}</span>}
      <span className="price__current">{formatPrice(price)}</span>
      {oldPrice && (
        <span className="price__discount">
          −{Math.round(100 - (price / oldPrice) * 100)}%
        </span>
      )}
    </div>
  );
}
