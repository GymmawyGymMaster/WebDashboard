import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, FileText } from "lucide-react";

export function QuickReports() {
  const reports = [
    {
      title: "Today's Clients needs",
      icon: Users,
      badge: "5 pending",
      variant: "secondary" as const,
    },
    {
      title: "Today's Team report",
      icon: UserCheck,
      badge: "All updated",
      variant: "default" as const,
    },
  ];

  const programNavigation = [
    { name: "Diet", color: "bg-green-500/10 text-green-600" },
    { name: "Resistance", color: "bg-purple-500/10 text-purple-600" },
    { name: "Fitness", color: "bg-blue-500/10 text-blue-600" },
    { name: "Mobility", color: "bg-orange-500/10 text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Reports */}
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{report.title}</CardTitle>
                </div>
                <Badge variant={report.variant}>{report.badge}</Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Program Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Program Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {programNavigation.map((program) => (
              <Button
                key={program.name}
                variant="ghost"
                className={`h-12 ${program.color} hover:opacity-80`}
              >
                {program.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}