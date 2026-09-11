import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { defaultContent, CONTENT_VERSION } from "../data/siteContent.js";

const ContentContext = createContext(null);

const CONTENT_KEY = "mvpmarket:content";
const VERSION_KEY = "mvpmarket:content-version";

// Контент живёт в localStorage, а значит у каждого посетителя своя копия.
// Когда в siteContent.js выкатывается новый текст, старая копия его перекрыла
// бы — и владелец правок видел бы одно, а все остальные другое. Поэтому при
// смене CONTENT_VERSION сохранённая копия отбрасывается. Делается это до
// первого рендера, чтобы страница сразу отрисовалась новым контентом.
function dropOutdatedContent() {
  try {
    if (window.localStorage.getItem(VERSION_KEY) !== CONTENT_VERSION) {
      window.localStorage.removeItem(CONTENT_KEY);
      window.localStorage.setItem(VERSION_KEY, CONTENT_VERSION);
    }
  } catch {
    // localStorage недоступен — работаем на дефолтах, это и нужно
  }
}

dropOutdatedContent();

function makeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// Сохранённый контент кладётся поверх дефолтов, а не вместо них: поля,
// добавленные в siteContent.js уже после того, как у пользователя завёлся
// localStorage (например oldPrice у пакета), иначе никогда бы до него не
// доехали. Элементы списков сопоставляются по id — состав и порядок берём
// из сохранённого (удаление в /admin должно работать), недостающие поля
// подмешиваем из дефолтного элемента с тем же id.
function mergeDeep(defaults, saved) {
  if (saved === undefined) return defaults;

  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return saved;
    return saved.map((item) => {
      if (!isPlainObject(item) || item.id === undefined) return item;
      const base = defaults.find((d) => isPlainObject(d) && d.id === item.id);
      return base ? mergeDeep(base, item) : item;
    });
  }

  if (isPlainObject(defaults)) {
    if (!isPlainObject(saved)) return saved;
    const merged = { ...defaults };
    for (const key of Object.keys(saved)) {
      merged[key] = mergeDeep(defaults[key], saved[key]);
    }
    return merged;
  }

  return saved;
}

function mergeWithDefaults(saved) {
  if (!isPlainObject(saved)) return defaultContent;
  return mergeDeep(defaultContent, saved);
}

export function ContentProvider({ children }) {
  const [stored, setContent] = useLocalStorage(CONTENT_KEY, defaultContent);
  const content = useMemo(() => mergeWithDefaults(stored), [stored]);

  const value = useMemo(() => {
    const updateSection = (key, patch) =>
      setContent((c) => ({ ...c, [key]: { ...c[key], ...patch } }));

    const addItem = (key, item, prefix) =>
      setContent((c) => ({ ...c, [key]: [...c[key], { id: makeId(prefix || key), ...item }] }));

    const updateItem = (key, id, patch) =>
      setContent((c) => ({
        ...c,
        [key]: c[key].map((item) => (item.id === id ? { ...item, ...patch } : item)),
      }));

    const removeItem = (key, id) =>
      setContent((c) => ({ ...c, [key]: c[key].filter((item) => item.id !== id) }));

    return {
      content,

      updateHero: (patch) => updateSection("hero", patch),
      updateVideo: (patch) => updateSection("video", patch),
      updateAiBanner: (patch) => updateSection("aiBanner", patch),

      addCategory: (item) => addItem("categories", item, "cat"),
      updateCategory: (id, patch) => updateItem("categories", id, patch),
      removeCategory: (id) => removeItem("categories", id),

      addQuickLink: (item) => addItem("quickLinks", item, "quick"),
      updateQuickLink: (id, patch) => updateItem("quickLinks", id, patch),
      removeQuickLink: (id) => removeItem("quickLinks", id),

      addSupportLink: (item) => addItem("supportLinks", item, "support"),
      updateSupportLink: (id, patch) => updateItem("supportLinks", id, patch),
      removeSupportLink: (id) => removeItem("supportLinks", id),

      addSegment: (item) => addItem("segments", item, "seg"),
      updateSegment: (id, patch) => updateItem("segments", id, patch),
      removeSegment: (id) => {
        if (id === "all") return;
        removeItem("segments", id);
      },

      addSolution: (item) => addItem("solutions", item, "sol"),
      updateSolution: (id, patch) => updateItem("solutions", id, patch),
      removeSolution: (id) => removeItem("solutions", id),

      updateBusinessChoiceTitle: (sectionTitle) =>
        setContent((c) => ({ ...c, businessChoice: { ...c.businessChoice, sectionTitle } })),
      updateInteractiveTariff: (patch) =>
        setContent((c) => ({
          ...c,
          businessChoice: {
            ...c.businessChoice,
            interactiveTariff: { ...c.businessChoice.interactiveTariff, ...patch },
          },
        })),
      addSimpleTariff: (item) =>
        setContent((c) => ({
          ...c,
          businessChoice: {
            ...c.businessChoice,
            simpleTariffs: [...c.businessChoice.simpleTariffs, { id: makeId("tariff"), ...item }],
          },
        })),
      updateSimpleTariff: (id, patch) =>
        setContent((c) => ({
          ...c,
          businessChoice: {
            ...c.businessChoice,
            simpleTariffs: c.businessChoice.simpleTariffs.map((t) =>
              t.id === id ? { ...t, ...patch } : t
            ),
          },
        })),
      removeSimpleTariff: (id) =>
        setContent((c) => ({
          ...c,
          businessChoice: {
            ...c.businessChoice,
            simpleTariffs: c.businessChoice.simpleTariffs.filter((t) => t.id !== id),
          },
        })),

      addBundle: (item) => addItem("bundles", item, "bundle"),
      updateBundle: (id, patch) => updateItem("bundles", id, patch),
      removeBundle: (id) => removeItem("bundles", id),

      addSuggestion: (item) =>
        setContent((c) => ({
          ...c,
          aiBanner: { ...c.aiBanner, suggestions: [...c.aiBanner.suggestions, item] },
        })),
      updateSuggestion: (index, patch) =>
        setContent((c) => ({
          ...c,
          aiBanner: {
            ...c.aiBanner,
            suggestions: c.aiBanner.suggestions.map((s, i) => (i === index ? { ...s, ...patch } : s)),
          },
        })),
      removeSuggestion: (index) =>
        setContent((c) => ({
          ...c,
          aiBanner: { ...c.aiBanner, suggestions: c.aiBanner.suggestions.filter((_, i) => i !== index) },
        })),

      updateFooterColumn: (columnKey, items) =>
        setContent((c) => ({
          ...c,
          footer: { ...c.footer, columns: { ...c.footer.columns, [columnKey]: items } },
        })),
      updateFooterContact: (patch) =>
        setContent((c) => ({ ...c, footer: { ...c.footer, contact: { ...c.footer.contact, ...patch } } })),

      exportJson: () => JSON.stringify(content, null, 2),
      importJson: (text) => {
        const parsed = JSON.parse(text);
        setContent(mergeWithDefaults(parsed));
      },
      resetAll: () => setContent(defaultContent),
      resetSection: (key) => setContent((c) => ({ ...c, [key]: defaultContent[key] })),
    };
  }, [content, setContent]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
