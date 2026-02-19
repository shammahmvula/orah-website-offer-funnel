import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyProvider } from "@/contexts/SurveyContext";
import Index from "./pages/Index";
import ShortFunnel from "./pages/ShortFunnel";
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
            <Route path="/" element={<Index />} />
            <Route path="/funnel" element={<ShortFunnel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SurveyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
