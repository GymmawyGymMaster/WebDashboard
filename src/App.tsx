import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import FollowUp from "./pages/FollowUp";
import CalendarAppointments from "./pages/CalendarAppointments";
import CalendarNext from "./pages/CalendarNext";
import CalendarReports from "./pages/CalendarReports";
import CalendarAvailable from "./pages/CalendarAvailable";
import Leads from "./pages/Leads";
import LeadsCharts from "./pages/LeadsCharts";
import LeadsResponses from "./pages/LeadsResponses";
import LeadsReferrers from "./pages/LeadsReferrers";
import CheckinsAll from "./pages/CheckinsAll";
import CheckinsQuickView from "./pages/CheckinsQuickView";
import CheckinsSubmitted from "./pages/CheckinsSubmitted";
import CheckinsUpcoming from "./pages/CheckinsUpcoming";
import CheckinsUnsubmitted from "./pages/CheckinsUnsubmitted";
import ClientAppRequestWorkout from "./pages/ClientAppRequestWorkout";
import ClientAppRequestDiet from "./pages/ClientAppRequestDiet";
import ClientReminders from "./pages/ClientReminders";
import ReminderTypes from "./pages/ReminderTypes";
import PersonalProfile from "./pages/PersonalProfile";
import ClientProfile from "./pages/ClientProfile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import MobileCustomization from "./pages/MobileCustomization";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/followup" element={<FollowUp />} />
            <Route path="/calendar/appointments" element={<CalendarAppointments />} />
            <Route path="/calendar/next" element={<CalendarNext />} />
            <Route path="/calendar/reports" element={<CalendarReports />} />
            <Route path="/calendar/available" element={<CalendarAvailable />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/charts" element={<LeadsCharts />} />
            <Route path="/leads/responses" element={<LeadsResponses />} />
            <Route path="/leads/referrers" element={<LeadsReferrers />} />
            <Route path="/checkins" element={<CheckinsAll />} />
            <Route path="/checkins/quick" element={<CheckinsQuickView />} />
            <Route path="/checkins/submitted" element={<CheckinsSubmitted />} />
            <Route path="/checkins/upcoming" element={<CheckinsUpcoming />} />
            <Route path="/checkins/unsubmitted" element={<CheckinsUnsubmitted />} />
            <Route path="/requests/workout" element={<ClientAppRequestWorkout />} />
            <Route path="/requests/diet" element={<ClientAppRequestDiet />} />
            <Route path="/reminders" element={<ClientReminders />} />
            <Route path="/reminders/types" element={<ReminderTypes />} />
            <Route path="/profile" element={<PersonalProfile />} />
            <Route path="/clients/:id" element={<ClientProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mobile-customization" element={<MobileCustomization />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
