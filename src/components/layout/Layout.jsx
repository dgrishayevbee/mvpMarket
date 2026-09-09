import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
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
      <Footer />
      <CartDrawer />
      <QuickView />
    </div>
  );
}
