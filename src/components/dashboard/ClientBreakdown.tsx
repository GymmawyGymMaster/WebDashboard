import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClientStatusBreakdown } from "@/data/mockData";

interface ClientBreakdownProps {
  breakdown: ClientStatusBreakdown;
}

export function ClientBreakdown({ breakdown }: ClientBreakdownProps) {
  const statusItems = [
    { key: 'active', label: 'Active', data: breakdown.active, variant: 'default' as const },
    { key: 'onHold', label: 'On hold', data: breakdown.onHold, variant: 'secondary' as const },
    { key: 'prestart', label: 'Prestart', data: breakdown.prestart, variant: 'outline' as const },
    { key: 'expired', label: 'Expired', data: breakdown.expired, variant: 'destructive' as const },
    { key: 'refunded', label: 'Refunded', data: breakdown.refunded, variant: 'destructive' as const },
    { key: 'noSubscription', label: 'No subscription', data: breakdown.noSubscription, variant: 'secondary' as const },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Overall Clients</CardTitle>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
            <span>Clients</span>
            <span>Value</span>
            <span>%</span>
          </div>
          {statusItems.map((item) => (
            <div key={item.key} className="grid grid-cols-3 gap-4 items-center">
              <div className="flex items-center gap-2">
                <Badge variant={item.variant} className="text-xs">
                  {item.label}
                </Badge>
              </div>
              <span className="font-semibold">{item.data.count}</span>
              <span className="text-muted-foreground">{item.data.percentage.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}