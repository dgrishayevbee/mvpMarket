import { Link } from "react-router-dom";
import { Button } from "../components/ui/index.js";

export function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Страница не найдена</h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: 20 }}>
        Такой страницы нет в прототипе.
      </p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
