import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { defaultContent } from "../data/siteContent.js";

const ContentContext = createContext(null);

function makeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

// Merge saved content over defaults key-by-key so an old/partial export
// (or a hand-edited JSON missing a section) never breaks the page.
function mergeWithDefaults(saved) {
  if (!saved || typeof saved !== "object") return defaultContent;
  const merged = { ...defaultContent };
  for (const key of Object.keys(defaultContent)) {
    if (saved[key] !== undefined) merged[key] = saved[key];
  }
  return merged;
}

export function ContentProvider({ children }) {
  const [content, setContent] = useLocalStorage("mvpmarket:content", defaultContent);

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

      updateQuickLink: (id, patch) =>
        setContent((c) => ({
          ...c,
          quickLinks: c.quickLinks.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        })),
      updateSupportLink: (id, patch) =>
        setContent((c) => ({
          ...c,
          supportLinks: c.supportLinks.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        })),

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
