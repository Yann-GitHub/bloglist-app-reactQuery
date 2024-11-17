import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Outlet } from "react-router-dom";

export function SharedLayout() {
  return (
    <div className="sharedLayout">
      <Header />
      <main className="pt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
