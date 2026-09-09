import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button, Input } from "../components/ui/index.js";
import "./AuthPages.css";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    register(name, email);
    navigate("/profile");
  };

  return (
    <div className="auth-page">
      <form className="auth-page__card" onSubmit={onSubmit}>
        <h1 className="auth-page__title">Регистрация</h1>
        <p className="auth-page__subtitle">Прототип: любые данные подойдут для регистрации.</p>
        <Input
          placeholder="Имя"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button type="submit">Создать аккаунт</Button>
        <span className="auth-page__hint">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </span>
      </form>
    </div>
  );
}
