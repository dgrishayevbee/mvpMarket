import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button, Input } from "../components/ui/index.js";
import "./AuthPages.css";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    login(email);
    navigate("/profile");
  };

  return (
    <div className="auth-page">
      <form className="auth-page__card" onSubmit={onSubmit}>
        <h1 className="auth-page__title">Вход</h1>
        <p className="auth-page__subtitle">Прототип: любые данные подойдут для входа.</p>
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Войти</Button>
        <span className="auth-page__hint">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </span>
      </form>
    </div>
  );
}
