import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Button, Input, Tabs } from "../components/ui/index.js";
import "./CheckoutPage.css";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

const STEPS = [
  { id: "delivery", label: "1. Доставка" },
  { id: "payment", label: "2. Оплата" },
  { id: "confirm", label: "3. Подтверждение" },
];

export function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("delivery");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");
  const [order, setOrder] = useState(null);

  if (items.length === 0 && !order) {
    return <Navigate to="/cart" replace />;
  }

  const goNext = () => {
    if (step === "delivery") setStep("payment");
    else if (step === "payment") {
      const created = createOrder({
        items,
        total: subtotal,
        address,
        buyerEmail: user?.email || "guest@mvpmarket.dev",
      });
      setOrder(created);
      clear();
      setStep("confirm");
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-page__title">Оформление заказа</h1>
      <Tabs tabs={STEPS} activeId={step} onChange={() => {}} />

      <div className="checkout-page__body">
        {step === "delivery" && (
          <div className="checkout-page__step">
            <label className="checkout-page__label">Адрес доставки</label>
            <Input
              placeholder="Город, улица, дом, квартира"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button disabled={!address.trim()} onClick={goNext}>
              Далее — к оплате
            </Button>
          </div>
        )}

        {step === "payment" && (
          <div className="checkout-page__step">
            <label className="checkout-page__label">Способ оплаты</label>
            <div className="checkout-page__payment-options">
              <button
                type="button"
                className={"checkout-page__payment-option" + (payment === "card" ? " checkout-page__payment-option--active" : "")}
                onClick={() => setPayment("card")}
              >
                Картой онлайн
              </button>
              <button
                type="button"
                className={"checkout-page__payment-option" + (payment === "cash" ? " checkout-page__payment-option--active" : "")}
                onClick={() => setPayment("cash")}
              >
                Наличными при получении
              </button>
            </div>
            <Button onClick={goNext}>Подтвердить заказ</Button>
          </div>
        )}

        {step === "confirm" && order && (
          <div className="checkout-page__confirm">
            <span className="checkout-page__confirm-icon">✓</span>
            <h2>Заказ {order.id} оформлен</h2>
            <p>Доставим по адресу: {order.address}</p>
            <p className="checkout-page__confirm-total">{formatPrice(order.total)}</p>
            <Button onClick={() => navigate("/profile")}>Мои заказы</Button>
          </div>
        )}
      </div>
    </div>
  );
}
