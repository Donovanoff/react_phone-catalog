import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './main.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { CatalogPage } from './pages/CatalogPage';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />

      <div className="app__main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to={'/'} replace />} />

          <Route
            path="/phones"
            element={<CatalogPage category="phones" title="Mobile phones" />}
          />
          <Route
            path="/tablets"
            element={<CatalogPage category="tablets" title="Tablets" />}
          />
          <Route
            path="/accessories"
            element={<CatalogPage category="accessories" title="Accessories" />}
          />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};
