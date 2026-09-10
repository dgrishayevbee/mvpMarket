import { useState } from "react";
import { SegmentedControl, Slider, Button, PlaceholderImage } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { useContent } from "../../context/ContentContext.jsx";
import "./BusinessChoiceSection.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

function InteractiveTariffCard({ tariff }) {
  const { addItem } = useCart();
  const [limitMode, setLimitMode] = useState("limit");
  const [speedIndex, setSpeedIndex] = useState(tariff.defaultSpeedIndex);
  const [gb, setGb] = useState(tariff.defaultGb);

  const speed = tariff.speeds[speedIndex];

  const connect = () => {
    addItem({
      id: `tariff-${speed}-${limitMode}-${gb}`,
      title: `Интернет ${speed} Мбит/с${limitMode === "unlimited" ? ", безлимит" : `, ${gb} ГБ`}`,
      price: tariff.basePrice,
      seller: "mvpMarket",
    });
  };

  return (
    <div className="tariff-card">
      <div className="tariff-card__price-row">
        <span className="tariff-card__price">{formatPrice(tariff.basePrice)}</span>
      </div>

      <SegmentedControl
        value={limitMode}
        onChange={setLimitMode}
        options={[
          { value: "limit", label: "Лимит" },
          { value: "unlimited", label: "Безлимит" },
        ]}
      />

      <div className="tariff-card__speeds">
        {tariff.speeds.map((s, i) => (
          <button
            key={s}
            type="button"
            className={"tariff-card__speed" + (i === speedIndex ? " tariff-card__speed--active" : "")}
            onClick={() => setSpeedIndex(i)}
          >
            {s} Мб/с
          </button>
        ))}
      </div>

      {limitMode === "limit" && (
        <Slider
          label="Сколько Вам нужно?"
          unit="ГБ"
          min={tariff.minGb}
          max={tariff.maxGb}
          step={tariff.stepGb}
          value={gb}
          onChange={setGb}
        />
      )}

      <Button onClick={connect}>Подключить</Button>
    </div>
  );
}

function SimpleTariffCard({ tariff }) {
  const { addItem } = useCart();
  return (
    <div className="tariff-card tariff-card--simple">
      <div className="tariff-card__media">
        {tariff.imageUrl ? (
          <img src={tariff.imageUrl} alt={tariff.title} className="tariff-card__image" />
        ) : (
          <PlaceholderImage label={tariff.icon} />
        )}
      </div>
      <div className="tariff-card__info">
        <span className="tariff-card__title">{tariff.title}</span>
        <span className="tariff-card__subtitle">{tariff.subtitle}</span>
      </div>
      <div className="tariff-card__footer">
        <span className="tariff-card__from">
          от {formatPrice(tariff.price)}
          {tariff.billing || ""}
        </span>
        <button
          type="button"
          className="tariff-card__connect"
          onClick={() => addItem({ id: tariff.id, title: tariff.title, price: tariff.price, seller: "mvpMarket" })}
        >
          Подключить
        </button>
      </div>
    </div>
  );
}

export function BusinessChoiceSection() {
  const { content } = useContent();
  const { sectionTitle, interactiveTariff, simpleTariffs } = content.businessChoice;

  return (
    <section className="business-choice">
      <h2 className="business-choice__title">{sectionTitle}</h2>
      <div className="business-choice__grid">
        <InteractiveTariffCard tariff={interactiveTariff} />
        {simpleTariffs.map((t) => (
          <SimpleTariffCard key={t.id} tariff={t} />
        ))}
      </div>
    </section>
  );
}
