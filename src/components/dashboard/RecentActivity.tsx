import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "completed workout",
    type: "workout",
    time: "2 hours ago",
    avatar: "/placeholder-avatar-1.jpg",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "updated diet plan",
    type: "diet",
    time: "4 hours ago",
    avatar: "/placeholder-avatar-2.jpg",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "booked appointment",
    type: "appointment",
    time: "6 hours ago",
    avatar: "/placeholder-avatar-3.jpg",
  },
  {
    id: 4,
    user: "Alex Thompson",
    action: "submitted check-in",
    type: "checkin",
    time: "1 day ago",
    avatar: "/placeholder-avatar-4.jpg",
  },
];

const badgeColors = {
  workout: "bg-accent text-accent-foreground",
  diet: "bg-primary text-primary-foreground",
  appointment: "bg-secondary text-secondary-foreground",
  checkin: "bg-muted text-muted-foreground",
};

export function RecentActivity() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar} alt={activity.user} />
              <AvatarFallback className="bg-surface-secondary text-foreground text-sm">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge 
              variant="secondary" 
              className={`${badgeColors[activity.type as keyof typeof badgeColors]} text-xs`}
            >
              {activity.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}