import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  UserPlus,
  Dumbbell,
  Utensils,
  Bell,
} from "lucide-react";

const actions = [
  {
    title: "Add New Client",
    description: "Register a new client",
    icon: UserPlus,
    href: "/clients/new",
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "Schedule Appointment",
    description: "Book new appointment",
    icon: Calendar,
    href: "/calendar/new",
    color: "bg-accent text-accent-foreground hover:bg-accent/90",
  },
  {
    title: "Create Workout",
    description: "Design workout plan",
    icon: Dumbbell,
    href: "/workout/new",
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  },
  {
    title: "Plan Diet",
    description: "Create nutrition plan",
    icon: Utensils,
    href: "/diet/new",
    color: "bg-muted text-muted-foreground hover:bg-muted/90",
  },
  {
    title: "Send Reminder",
    description: "Notify clients",
    icon: Bell,
    href: "/reminders/new",
    color: "bg-surface-secondary text-foreground hover:bg-surface-secondary/90",
  },
  {
    title: "View Analytics",
    description: "Check performance",
    icon: TrendingUp,
    href: "/reports",
    color: "bg-gradient-primary text-primary-foreground hover:opacity-90",
  },
];

export function QuickActions() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className={`h-auto p-4 flex flex-col items-start gap-2 ${action.color} border-0`}
            asChild
          >
            <a href={action.href}>
              <action.icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-80">{action.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}