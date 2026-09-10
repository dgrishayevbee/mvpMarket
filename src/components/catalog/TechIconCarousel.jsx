import { useState } from "react";
import { FeatureIcon } from "./featureIcons.jsx";
import "./TechIconCarousel.css";

const PAGE_SIZE = 3;

export function TechIconCarousel({ items, static: isStatic = false }) {
  const pageCount = Math.ceil(items.length / PAGE_SIZE);
  const [page, setPage] = useState(0);

  if (items.length === 0) return null;

  const visible = isStatic
    ? items.slice(0, PAGE_SIZE)
    : items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const showNav = !isStatic && pageCount > 1;

  return (
    <div className={"tech-carousel" + (isStatic ? " tech-carousel--static" : "")}>
      <div className="tech-carousel__row">
        {showNav && (
          <button
            type="button"
            className="tech-carousel__arrow"
            onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
            aria-label="Предыдущие"
          >
            ←
          </button>
        )}
        <div className="tech-carousel__items">
          {visible.map((text) => (
            <div key={text} className="tech-carousel__item">
              <FeatureIcon text={text} className="tech-carousel__icon" />
              <span className="tech-carousel__label">{text}</span>
            </div>
          ))}
        </div>
        {showNav && (
          <button
            type="button"
            className="tech-carousel__arrow"
            onClick={() => setPage((p) => (p + 1) % pageCount)}
            aria-label="Следующие"
          >
            →
          </button>
        )}
      </div>
      {showNav && (
        <div className="tech-carousel__dots">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={"tech-carousel__dot" + (i === page ? " tech-carousel__dot--active" : "")}
              onClick={() => setPage(i)}
              aria-label={`Страница ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
