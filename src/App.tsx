
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Index from "./pages/Index";
import Budget from "./pages/Budget";
import Goals from "./pages/Goals";
import Transactions from "./pages/Transactions";
import TransactionAdd from "./pages/TransactionAdd";
import Transfer from "./pages/Transfer";
import Accounts from "./pages/Accounts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProfileSettings from "./pages/settings/ProfileSettings";
import PaymentMethods from "./pages/settings/PaymentMethods";
import SecuritySettings from "./pages/settings/SecuritySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import HelpSupport from "./pages/settings/HelpSupport";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* App Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/add" element={<TransactionAdd />} />
              <Route path="/transfers" element={<Transfer />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/profile" element={<ProfileSettings />} />
              <Route path="/settings/payment-methods" element={<PaymentMethods />} />
              <Route path="/settings/security" element={<SecuritySettings />} />
              <Route path="/settings/notifications" element={<NotificationSettings />} />
              <Route path="/settings/help-support" element={<HelpSupport />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
