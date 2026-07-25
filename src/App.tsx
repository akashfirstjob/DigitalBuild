import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "@/pages/Home";
import RequestWizard from "@/pages/RequestWizard";
import BuyerDashboard from "@/pages/BuyerDashboard";
import QuoteComparison from "@/pages/QuoteComparison";
import RentalHandover from "@/pages/RentalHandover";
import SupplierDashboard from "@/pages/SupplierDashboard";
import SupplierQuote from "@/pages/SupplierQuote";
import AdminDashboard from "@/pages/AdminDashboard";

const DEFAULT_TITLE = "BuildFleet — Construction equipment marketplace";

const ROUTE_TITLES: Record<string, string> = {
  "/": DEFAULT_TITLE,
  "/request": "Request equipment | BuildFleet",
  "/buyer": "Buyer dashboard | BuildFleet",
  "/buyer/quotes": "Compare quotations | BuildFleet",
  "/rental": "Rental handover | BuildFleet",
  "/supplier": "Supplier workspace | BuildFleet",
  "/supplier/quote": "Create quotation | BuildFleet",
  "/admin": "Operations | BuildFleet",
};

/** Keeps the tab title in sync with the route and handles hash scrolling. */
function useRouteEffects() {
  const location = useLocation();

  useEffect(() => {
    document.title = ROUTE_TITLES[location.pathname] ?? DEFAULT_TITLE;
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
}

export default function App() {
  useRouteEffects();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request" element={<RequestWizard />} />
      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path="/buyer/quotes" element={<QuoteComparison />} />
      <Route path="/rental" element={<RentalHandover />} />
      <Route path="/supplier" element={<SupplierDashboard />} />
      <Route path="/supplier/quote" element={<SupplierQuote />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
