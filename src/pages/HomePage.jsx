import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { CatalogSidebar } from "../components/catalog/CatalogSidebar.jsx";
import { HeroSearch } from "../components/catalog/HeroSearch.jsx";
import { SolutionCard } from "../components/catalog/SolutionCard.jsx";
import { VideoBlock } from "../components/catalog/VideoBlock.jsx";
import { BusinessChoiceSection } from "../components/catalog/BusinessChoiceSection.jsx";
import { BundleCarousel } from "../components/catalog/BundleCarousel.jsx";
import { AIBanner } from "../components/catalog/AIBanner.jsx";
import { MobileFiltersDrawer } from "../components/catalog/MobileFiltersDrawer.jsx";
import { Tabs, Button } from "../components/ui/index.js";
import "./HomePage.css";

const SORT_OPTIONS = [
  { value: "relevance", label: "По популярности" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
];

function matchesQuery(product, query) {
  if (!query) return true;
  const haystack = [product.title, product.subtitle, product.description, ...(product.tags || []), ...(product.features || [])]
    .join(" ")
    .toLowerCase();
  const words = query.split(/\s+/).filter((w) => w.length >= 3);
  if (words.length === 0) return haystack.includes(query);
  return words.some((w) => haystack.includes(w));
}

export function HomePage() {
  const { all } = useProducts();
  const { content } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const [heroValue, setHeroValue] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [segment, setSegment] = useState("all");
  const [badgeFilter, setBadgeFilter] = useState(null);
  const [sort, setSort] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const heroRef = useRef(null);
  const bundlesRef = useRef(null);

  const commitSearch = (text) => {
    setHeroValue(text);
    const next = new URLSearchParams(searchParams);
    if (text) next.set("q", text);
    else next.delete("q");
    setSearchParams(next);
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onCategoryChange = (id) => {
    setCategory(id);
    setBadgeFilter(null);
  };

  const onQuickLink = (id) => {
    if (id === "popular") {
      setCategory("all");
      setBadgeFilter("hit");
    } else if (id === "new") {
      setCategory("all");
      setBadgeFilter("new");
    } else if (id === "bundles") {
      bundlesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const solutions = useMemo(() => {
    let list = all.filter((p) => matchesQuery(p, query));
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (segment !== "all") list = list.filter((p) => p.segment === segment);
    if (badgeFilter) list = list.filter((p) => p.badges?.includes(badgeFilter));

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [all, query, category, segment, badgeFilter, sort]);

  return (
    <div className="home-page">
      <div className="home-page__backdrop" aria-hidden="true" />
      <div className="home-page__layout">
        <aside className="home-page__sidebar">
          <CatalogSidebar activeCategory={category} onCategoryChange={onCategoryChange} onQuickLink={onQuickLink} />
        </aside>

        <div className="home-page__main">
          <HeroSearch ref={heroRef} value={heroValue} onChange={setHeroValue} onSubmit={commitSearch} />

          <div ref={bundlesRef}>
            <BundleCarousel />
          </div>

          <div className="home-page__toolbar">
            <Tabs tabs={content.segments} activeId={segment} onChange={setSegment} />
            <div className="home-page__toolbar-actions">
              <select
                className="home-page__sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Сортировка"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Button variant="secondary" size="sm" onClick={() => setMobileFiltersOpen(true)}>
                Фильтры
              </Button>
            </div>
          </div>

          {solutions.length === 0 ? (
            <p className="home-page__empty">Ничего не найдено — попробуйте изменить запрос или фильтры.</p>
          ) : (
            <div className="home-page__grid">
              {solutions.map((product) => (
                <SolutionCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <VideoBlock />
          <BusinessChoiceSection />
          <AIBanner onSuggestion={commitSearch} />
        </div>
      </div>

      <MobileFiltersDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        activeCategory={category}
        onCategoryChange={onCategoryChange}
        activeSegment={segment}
        onSegmentChange={setSegment}
        onQuickLink={onQuickLink}
      />
    </div>
  );
}
