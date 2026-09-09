import { useState } from "react";
import { SegmentedControl, Slider, Button, PlaceholderImage } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { tariffs } from "../../data/tariffs.js";
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
      id: `${tariff.id}-${speed}-${limitMode}-${gb}`,
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
        <PlaceholderImage label={tariff.icon} height="72px" />
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
  return (
    <section className="business-choice">
      <h2 className="business-choice__title">Что выбирают предприниматели</h2>
      <div className="business-choice__grid">
        {tariffs.map((t) =>
          t.kind === "interactive" ? (
            <InteractiveTariffCard key={t.id} tariff={t} />
          ) : (
            <SimpleTariffCard key={t.id} tariff={t} />
          )
        )}
      </div>
    </section>
  );
}
