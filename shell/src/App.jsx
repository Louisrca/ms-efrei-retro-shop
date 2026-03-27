import React, { useState, useEffect, Suspense, lazy } from "react";
import eventBus from "shared/eventBus";
import "./App.css";

// TODO: importer les 3 MFEs avec React.lazy()
const MfeProduct = lazy(() => import("mfeProduct/ProductGrid"));
const MfeCart = lazy(() => import("mfeCart/Cart"));
const MfeReco = lazy(() => import("mfeReco/Recommendations"));

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  console.log("🚀 ~ App ~ cartCount:", cartCount);

  useEffect(() => {
    // TODO: ecouter les mises a jour du panier pour le badge
    eventBus.on("add-product", () => {
      setCartCount((count) => count + 1);
    });

    eventBus.on("clear-cart", () => {
      setCartCount(0);
    });

    eventBus.on("remove-cart", () => {
      setCartCount((count) => Math.max(0, count - 1));
    });
  }, []);

  return (
    <div className="shell">
      <header className="shell-header">
        <h1 className="logo">RetroShop</h1>
        <div className="cart-badge">Panier ({cartCount})</div>
      </header>
      <main className="shell-main">
        <section className="product-area">
          {/* TODO: afficher mfe-product avec Suspense */}
          <Suspense fallback={<LoadingFallback name="Products" />}>
            <MfeProduct />
          </Suspense>
        </section>
        <aside className="cart-area">
          {/* TODO: afficher mfe-cart avec Suspense */}
          <Suspense fallback={<LoadingFallback name="Cart" />}>
            <MfeCart />
          </Suspense>
        </aside>
        <aside className="reco-area">
          {/* TODO: afficher mfe-reco avec Suspense */}
          <Suspense fallback={<LoadingFallback name="Recommendations" />}>
            <MfeReco />
          </Suspense>
        </aside>
      </main>
    </div>
  );
}

export default App;
