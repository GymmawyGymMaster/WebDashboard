import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserPlus,
  TrendingUp,
  ClipboardCheck,
  Dumbbell,
  Utensils,
  Bell,
  Settings,
  DollarSign,
  FileText,
  Activity,
  Heart,
  Shield,
  Briefcase,
  BarChart3,
  Smartphone,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Clients",
    icon: Users,
    items: [
      { title: "All Clients", href: "/clients" },
      { title: "Follow up", href: "/clients/followup" },
    ],
  },
  {
    title: "Calendar",
    icon: Calendar,
    items: [
      { title: "Appointments", href: "/calendar/appointments" },
      { title: "Next Appointment", href: "/calendar/next" },
      { title: "Appointment Report", href: "/calendar/reports" },
      { title: "Available Appointment", href: "/calendar/available" },
    ],
  },
  {
    title: "Leads",
    icon: UserPlus,
    items: [
      { title: "Leads", href: "/leads" },
      { title: "Leads Charts", href: "/leads/charts" },
      { title: "Lead Responses", href: "/leads/responses" },
      { title: "Lead Referrers", href: "/leads/referrers" },
    ],
  },
  {
    title: "Client Check-ins",
    icon: ClipboardCheck,
    items: [
      { title: "All Check-ins", href: "/checkins" },
      { title: "Quick View", href: "/checkins/quick" },
      { title: "Submitted Checklists", href: "/checkins/submitted" },
      { title: "Upcoming Check-ins", href: "/checkins/upcoming" },
      { title: "Unsubmitted Check-ins", href: "/checkins/unsubmitted" },
    ],
  },
  {
    title: "Client App Requests",
    icon: Smartphone,
    items: [
      { title: "Workout", href: "/requests/workout" },
      { title: "Diet", href: "/requests/diet" },
    ],
  },
  {
    title: "Client Reminders",
    icon: Bell,
    items: [
      { title: "All Reminders", href: "/reminders" },
      { title: "Reminder Types", href: "/reminders/types" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "Theme Editor", href: "/settings" },
      { title: "Mobile Customization", href: "/mobile-customization" },
      { title: "Client Types", href: "/settings/client-types" },
      { title: "Client Groups", href: "/settings/client-groups" },
      { title: "Client General Files", href: "/settings/files" },
      { title: "Call Types", href: "/settings/call-types" },
    ],
  },
  {
    title: "Finance",
    icon: DollarSign,
    items: [
      { title: "All Invoices", href: "/finance/invoices" },
      { title: "Due Invoices", href: "/finance/due" },
      { title: "Account Statement", href: "/finance/statements" },
      { title: "All Products", href: "/finance/products" },
      { title: "Subscriptions", href: "/finance/subscriptions" },
      { title: "Financial Reports", href: "/finance/reports" },
      { title: "Mobile Wallets", href: "/finance/wallets" },
    ],
  },
  {
    title: "Forms",
    icon: FileText,
    items: [
      { title: "Check-in Forms", href: "/forms/checkins" },
      { title: "Check-in Q&A", href: "/forms/qa" },
      { title: "Questions", href: "/forms/questions" },
      { title: "Check-in Types", href: "/forms/types" },
      { title: "Labels", href: "/forms/labels" },
    ],
  },
  {
    title: "Diet",
    icon: Utensils,
    items: [
      { title: "All Diets", href: "/diet" },
      { title: "Client Medical Cases", href: "/diet/medical" },
      { title: "Diseases", href: "/diet/diseases" },
      { title: "All Food", href: "/diet/food" },
      { title: "Food Groups", href: "/diet/groups" },
    ],
  },
  {
    title: "Workout",
    icon: Dumbbell,
    items: [
      { title: "Resistance", href: "/workout/resistance" },
      { title: "Plans", href: "/workout/plans" },
      { title: "Techniques", href: "/workout/techniques" },
      { title: "Categories", href: "/workout/categories" },
    ],
  },
  {
    title: "Fitness",
    icon: Activity,
    items: [
      { title: "Plans", href: "/fitness/plans" },
      { title: "Categories", href: "/fitness/categories" },
    ],
  },
  {
    title: "Mobility",
    icon: Heart,
    items: [
      { title: "Plans", href: "/mobility/plans" },
      { title: "Categories", href: "/mobility/categories" },
    ],
  },
  {
    title: "Administration",
    icon: Shield,
    items: [
      { title: "All Team Members", href: "/admin/team" },
      { title: "Active Team Members", href: "/admin/active" },
      { title: "Roles and Permissions", href: "/admin/roles" },
      { title: "Team Productivity", href: "/admin/productivity" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    items: [
      { title: "Clients", href: "/reports/clients" },
      { title: "Accounting", href: "/reports/accounting" },
      { title: "Subscriptions", href: "/reports/subscriptions" },
      { title: "Diets", href: "/reports/diets" },
      { title: "Workouts", href: "/reports/workouts" },
      { title: "System Analysis", href: "/reports/system" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const { branding } = useTheme();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(section => section !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isParentActive = (items: { href: string }[]) => {
    return items.some(item => location.pathname === item.href);
  };

  return (
    <div className={`fixed left-0 top-0 h-screen w-64 sm:w-72 lg:w-64 flex flex-col bg-surface border-r border-border z-50 transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="flex h-14 sm:h-16 items-center justify-between border-b border-border px-4 sm:px-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <img 
              src={branding.logo} 
              alt={branding.appName} 
              className="h-4 w-4 sm:h-5 sm:w-5"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground hidden" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-foreground">{branding.appName}</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={onToggle}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2 sm:px-3 py-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.items ? (
                <Collapsible
                  open={openSections.includes(item.title)}
                  onOpenChange={() => toggleSection(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between h-8 sm:h-9 px-2 sm:px-3 transition-all duration-200 ${
                        isParentActive(item.items)
                          ? "bg-surface-secondary text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{item.title}</span>
                      </div>
                      <ChevronDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 ${
                        openSections.includes(item.title) ? 'rotate-0' : '-rotate-90'
                      }`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-4 sm:pl-6 mt-1 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                    {item.items.map((subItem) => (
                      <Link key={subItem.href} to={subItem.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start h-7 sm:h-8 px-2 sm:px-3 transition-all duration-200 ${
                            isActive(subItem.href)
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary"
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{subItem.title}</span>
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-8 sm:h-9 px-2 sm:px-3 transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 sm:mr-3" />
                    <span className="text-xs sm:text-sm">{item.title}</span>
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}