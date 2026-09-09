import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { ProductCard } from "../components/product/ProductCard.jsx";
import { FiltersPanel } from "../components/product/FiltersPanel.jsx";
import { Drawer } from "../components/overlay/Drawer.jsx";
import { Button } from "../components/ui/index.js";
import "./HomePage.css";

export function HomePage() {
  const { all } = useProducts();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sort, setSort] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = all.filter((p) => p.price <= maxPrice);
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query) list = list.filter((p) => p.title.toLowerCase().includes(query));

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [all, category, maxPrice, query, sort]);

  const filtersProps = {
    category,
    onCategoryChange: setCategory,
    maxPrice,
    onMaxPriceChange: setMaxPrice,
    sort,
    onSortChange: setSort,
  };

  return (
    <div className="home-page">
      <aside className="home-page__sidebar">
        <FiltersPanel {...filtersProps} />
      </aside>

      <div className="home-page__content">
        <div className="home-page__toolbar">
          <h1 className="home-page__title">
            {query ? `Результаты по запросу «${query}»` : "Каталог"}
          </h1>
          <Button variant="secondary" size="sm" onClick={() => setFiltersOpen(true)}>
            Фильтры
          </Button>
        </div>

        {filtered.length === 0 ? (
          <p className="home-page__empty">Ничего не найдено — попробуйте изменить фильтры.</p>
        ) : (
          <div className="home-page__grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Фильтры">
        <FiltersPanel {...filtersProps} />
      </Drawer>
    </div>
  );
}
