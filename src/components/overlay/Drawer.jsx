import { useEffect } from "react";
import "./Drawer.css";

export function Drawer({ open, onClose, side = "right", title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className={"drawer drawer--" + side}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer__header">
          <span className="drawer__title">{title}</span>
          <button type="button" className="drawer__close" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>
        <div className="drawer__body">{children}</div>
      </div>
    </div>
  );
}
