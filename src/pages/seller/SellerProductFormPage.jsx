import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProducts } from "../../context/ProductsContext.jsx";
import { useContent } from "../../context/ContentContext.jsx";
import { Button, Input, Textarea } from "../../components/ui/index.js";
import "./SellerProductFormPage.css";

export function SellerProductFormPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { getById, addProduct, updateProduct } = useProducts();
  const { content } = useContent();
  const categories = content.categories;
  const navigate = useNavigate();

  const existing = id ? getById(id) : null;
  const [form, setForm] = useState(
    existing
      ? {
          title: existing.title,
          category: existing.category,
          price: existing.price,
          stock: existing.stock,
          description: existing.description,
        }
      : { title: "", category: categories[0].id, price: "", stock: "", description: "" }
  );

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: form.title,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description,
    };
    if (existing) {
      updateProduct(existing.id, data);
    } else {
      addProduct(data, user.name);
    }
    navigate("/seller/products");
  };

  return (
    <div className="seller-product-form">
      <h1>{existing ? "Редактировать товар" : "Новый товар"}</h1>
      <form className="seller-product-form__form" onSubmit={onSubmit}>
        <label>
          Название
          <Input required value={form.title} onChange={set("title")} />
        </label>

        <label>
          Категория
          <select
            className="seller-product-form__select"
            value={form.category}
            onChange={set("category")}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <div className="seller-product-form__row">
          <label>
            Цена, ₸
            <Input type="number" min="0" required value={form.price} onChange={set("price")} />
          </label>
          <label>
            Остаток, шт.
            <Input type="number" min="0" required value={form.stock} onChange={set("stock")} />
          </label>
        </div>

        <label>
          Описание
          <Textarea value={form.description} onChange={set("description")} />
        </label>

        <div className="seller-product-form__actions">
          <Button type="submit">{existing ? "Сохранить" : "Добавить товар"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/seller/products")}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
