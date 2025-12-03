import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Lunch from "./pages/Lunch";
import Diner from "./pages/Diner";
import Suggesties from "./pages/Suggesties";
import Feestzaal from "./pages/Feestzaal";
import FAQ from "./pages/FAQ";
import VolgOns from "./pages/VolgOns";
import Reserveer from "./pages/Reserveer";
import OpMaatVoorstel from "./pages/OpMaatVoorstel";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/diner" element={<Diner />} />
          <Route path="/suggesties" element={<Suggesties />} />
          <Route path="/feestzaal" element={<Feestzaal />} />
          <Route path="/petit-djeu" element={<Feestzaal />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/volg-ons" element={<VolgOns />} />
          <Route path="/reserveer" element={<Reserveer />} />
          <Route path="https://resto-online.be/vjeudjeu" element={<Reserveer />} />
          <Route path="/op-maat-voorstel" element={<OpMaatVoorstel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
