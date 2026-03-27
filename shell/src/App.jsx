import React, { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";

// TODO: importer les 3 MFEs avec React.lazy()
const MfeProduct = lazy(() => import("mfeProduct/ProductList"));
const MfeCart = lazy(() => import("mfeCart/Cart"));
const MfeRecommendations = lazy(
  () => import("mfeRecommendations/Recommendations"),
);

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // TODO: ecouter les mises a jour du panier pour le badge
    const onAddProduct = (e) => {
      console.log("Produits reçus :", e.detail);
    };

    const onTotalCart = (e) => {
      console.log("Total panier :", e.detail);
    };

    const onDeleteCart = (e) => {
      console.log("Panier supprimé");
    };

    window.addEventListener("add-product", onAddProduct);
    window.addEventListener("total-cart", onTotalCart);
    window.addEventListener("delete-cart", onDeleteCart);

    return () => {
      window.removeEventListener("add-product", onAddProduct);
      window.removeEventListener("total-cart", onTotalCart);
      window.removeEventListener("delete-cart", onDeleteCart);
    };
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
      </main>
      <section className="reco-area">
        {/* TODO: afficher mfe-reco avec Suspense */}
        <Suspense fallback={<LoadingFallback name="Recommendations" />}>
          <MfeRecommendations />
        </Suspense>
      </section>
    </div>
  );
}

export default App;
