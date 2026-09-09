import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProducts } from "../../context/ProductsContext.jsx";
import { Button, Price } from "../../components/ui/index.js";
import "./SellerProductsPage.css";

export function SellerProductsPage() {
  const { user } = useAuth();
  const { listBySeller, deleteProduct } = useProducts();
  const myProducts = listBySeller(user.name);

  return (
    <div className="seller-products">
      <div className="seller-products__header">
        <h1>Мои товары</h1>
        <Link to="/seller/products/new">
          <Button>Добавить товар</Button>
        </Link>
      </div>

      {myProducts.length === 0 ? (
        <p className="seller-products__empty">
          Вы ещё не добавили товары. Нажмите «Добавить товар», чтобы он появился в каталоге.
        </p>
      ) : (
        <div className="seller-products__list">
          {myProducts.map((p) => (
            <div key={p.id} className="seller-products__row">
              <span className="seller-products__row-title">{p.title}</span>
              <Price price={p.price} oldPrice={p.oldPrice} />
              <span className="seller-products__row-stock">{p.stock} шт.</span>
              <div className="seller-products__row-actions">
                <Link to={`/seller/products/${p.id}/edit`}>
                  <Button variant="secondary" size="sm">
                    Редактировать
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => deleteProduct(p.id)}>
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
