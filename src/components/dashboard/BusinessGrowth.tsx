import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BusinessGrowth as BusinessGrowthType } from "@/data/mockData";

interface BusinessGrowthProps {
  growth: BusinessGrowthType;
}

export function BusinessGrowth({ growth }: BusinessGrowthProps) {
  const growthItems = [
    { label: 'Daily new clients', data: growth.dailyNewClients },
    { label: 'Daily renew', data: growth.dailyRenewals },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Today's Business Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
            <span>Status</span>
            <span>Value</span>
            <span>%</span>
          </div>
          {growthItems.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center">
              <span className="text-sm">{item.label}</span>
              <span className="font-semibold">{item.data.count}</span>
              <span className="text-muted-foreground">{item.data.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}