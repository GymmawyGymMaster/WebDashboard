import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { 
  mockLeadConversionData, 
  mockMonthlyLeadsData, 
  mockLeadSourceData,
  mockLeads 
} from "@/data/mockData";
import { TrendingUp, Users, Target, Award, Calendar } from "lucide-react";
import { useState } from "react";

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--primary))",
  },
  converted: {
    label: "Converted",
    color: "hsl(var(--success))",
  },
  new: {
    label: "New",
    color: "hsl(var(--primary))",
  },
  contacted: {
    label: "Contacted",
    color: "hsl(var(--warning))",
  },
  qualified: {
    label: "Qualified",
    color: "hsl(var(--success))",
  },
  lost: {
    label: "Lost",
    color: "hsl(var(--destructive))",
  },
};

const LeadsCharts = () => {
  const [timeRange, setTimeRange] = useState("monthly");

  // Calculate conversion rate over time
  const conversionRateData = mockMonthlyLeadsData.map(item => ({
    ...item,
    conversionRate: item.leads > 0 ? ((item.converted / item.leads) * 100).toFixed(1) : 0
  }));

  // Lead status distribution
  const statusDistribution = [
    { status: 'New', count: mockLeads.filter(l => l.status === 'new').length, color: '#3B82F6' },
    { status: 'Contacted', count: mockLeads.filter(l => l.status === 'contacted').length, color: '#F59E0B' },
    { status: 'Qualified', count: mockLeads.filter(l => l.status === 'qualified').length, color: '#10B981' },
    { status: 'Converted', count: mockLeads.filter(l => l.status === 'converted').length, color: '#059669' },
    { status: 'Lost', count: mockLeads.filter(l => l.status === 'lost').length, color: '#EF4444' },
  ];

  // Weekly trend data (mock)
  const weeklyTrendData = [
    { week: 'Week 1', leads: 12, converted: 3 },
    { week: 'Week 2', leads: 18, converted: 5 },
    { week: 'Week 3', leads: 15, converted: 4 },
    { week: 'Week 4', leads: 21, converted: 7 },
  ];

  const totalLeads = mockLeads.length;
  const convertedLeads = mockLeads.filter(l => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

  return (
    <DashboardLayout title="Lead Analytics">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground">{convertedLeads} converted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">43</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Source</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">Website</div>
              <p className="text-xs text-muted-foreground">51% of all leads</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Lead Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Lead Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ status, count }) => `${status}: ${count}`}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {statusDistribution.map((item) => (
                  <div key={item.status} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.status}: {item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lead Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeadSourceData.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.source}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{source.count}</span>
                        <Badge variant="secondary">{source.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Lead Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Lead Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockMonthlyLeadsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="converted"
                      stackId="2"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success))"
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Conversion Rate Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [
                        name === 'conversionRate' ? `${value}%` : value,
                        name === 'conversionRate' ? 'Conversion Rate' : name
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversionRate"
                      stroke="hsl(var(--success))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">68</div>
                <div className="text-sm text-muted-foreground">Total Leads This Month</div>
                <Badge className="mt-2">+12% vs last month</Badge>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-success mb-2">19</div>
                <div className="text-sm text-muted-foreground">Converted This Month</div>
                <Badge className="mt-2">27.9% conversion rate</Badge>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-warning mb-2">$12,400</div>
                <div className="text-sm text-muted-foreground">Revenue from Leads</div>
                <Badge className="mt-2">Average: $653 per lead</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LeadsCharts;