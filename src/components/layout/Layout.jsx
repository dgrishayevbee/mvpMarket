import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";
import { CartDrawer } from "./CartDrawer.jsx";
import { QuickView } from "./QuickView.jsx";
import "./Layout.css";

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <div className="layout__footer-inner">
          mvpMarket — визуальный прототип. © 2026
        </div>
      </footer>
      <CartDrawer />
      <QuickView />
    </div>
  );
}
