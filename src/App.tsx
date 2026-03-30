import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Index from "./pages/Index.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route
          path="/case-study/amazon-bazaar"
          element={<Navigate to="/case-study/roo-incident-management" replace />}
        />
        <Route
          path="/case-study/qnb-design-system"
          element={<Navigate to="/case-study/rapido-captain" replace />}
        />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

/** Custom cursor clashes with the full-page SmartHelm case study layout. */
const CursorAwareLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const hideCursor = pathname === "/case-study/smart-helmet-bike-care";
  return (
    <>
      {!hideCursor && <CustomCursor />}
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CursorAwareLayout>
          <AnimatedRoutes />
        </CursorAwareLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
