import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Utensils, Activity, Zap } from "lucide-react";
import { PlanStatus as PlanStatusType } from "@/data/mockData";

interface PlanStatusProps {
  planStatus: PlanStatusType;
}

export function PlanStatus({ planStatus }: PlanStatusProps) {
  const planItems = [
    { 
      key: 'diet', 
      label: 'Diet', 
      data: planStatus.diet, 
      icon: Utensils,
      color: 'bg-green-500/10 text-green-600'
    },
    { 
      key: 'resistance', 
      label: 'Resistance', 
      data: planStatus.resistance, 
      icon: Dumbbell,
      color: 'bg-purple-500/10 text-purple-600'
    },
    { 
      key: 'fitness', 
      label: 'Fitness', 
      data: planStatus.fitness, 
      icon: Activity,
      color: 'bg-blue-500/10 text-blue-600'
    },
    { 
      key: 'mobility', 
      label: 'Mobility', 
      data: planStatus.mobility, 
      icon: Zap,
      color: 'bg-orange-500/10 text-orange-600'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Today's Plans Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
            <span>Status</span>
            <span>Value</span>
          </div>
          {planItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${item.color}`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{item.data.current}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">{item.data.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}