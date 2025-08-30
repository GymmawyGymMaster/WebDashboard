import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock } from "lucide-react";
import { SubscriptionStatus } from "@/data/mockData";

interface SubscriptionAlertProps {
  subscription: SubscriptionStatus;
}

export function SubscriptionAlert({ subscription }: SubscriptionAlertProps) {
  if (!subscription.isExpiring) return null;

  return (
    <Alert className="border-warning/20 text-warning-foreground bg-warning/5">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-medium text-foreground mb-2">
            Your subscription will expire soon
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            Only {subscription.daysLeft} days, {subscription.hoursLeft} hours left. Renew now to continue enjoying our services!
          </p>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-3 w-3" />
            <span className="text-xs">remaining days:</span>
          </div>
          <Progress value={subscription.remainingPercentage} className="h-2 mb-2" />
          <span className="text-xs font-medium">{subscription.remainingPercentage}%</span>
        </div>
        <Button size="sm" className="ml-4">
          Renew Now
        </Button>
      </AlertDescription>
    </Alert>
  );
}