import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyProvider } from "@/contexts/SurveyContext";
import Index from "./pages/Index";
import ShortFunnel from "./pages/ShortFunnel";
import Funnel2 from "./pages/Funnel2";
import ApplyFunnel from "./pages/ApplyFunnel";
import WebsiteIndex from "./pages/WebsiteIndex";
import WebsitePrivacyPolicy from "./pages/WebsitePrivacyPolicy";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ClickFunnel from "./pages/ClickFunnel";
import SalesAgents from "./pages/SalesAgents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SurveyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WebsiteIndex />} />
            <Route path="/og-funnel" element={<Index />} />
            <Route path="/funnel" element={<ShortFunnel />} />
            <Route path="/funnel-2" element={<Funnel2 />} />
            <Route path="/apply" element={<ApplyFunnel />} />
            <Route path="/website/privacy-policy" element={<WebsitePrivacyPolicy />} />
            <Route path="/website/privacy-policy" element={<WebsitePrivacyPolicy />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/quiz" element={<ClickFunnel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SurveyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
