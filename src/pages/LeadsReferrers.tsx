import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

// Mock referrers data
const mockReferrers = [
  {
    id: 1,
    referrer: "FITNESS2024",
    createdBy: "Admin",
    createdAt: "2024-08-25T10:30:00Z",
    usageCount: 15,
    totalLeads: 23,
    conversionRate: 65.2,
    status: "active",
    description: "General fitness referral code"
  },
  {
    id: 2,
    referrer: "WEIGHTLOSS50",
    createdBy: "Sarah Johnson",
    createdAt: "2024-08-24T15:45:00Z",
    usageCount: 8,
    totalLeads: 12,
    conversionRate: 66.7,
    status: "active",
    description: "Weight loss program referral"
  },
  {
    id: 3,
    referrer: "NUTRITION25",
    createdBy: "Mike Chen",
    createdAt: "2024-08-23T09:15:00Z",
    usageCount: 12,
    totalLeads: 18,
    conversionRate: 66.7,
    status: "active",
    description: "Nutrition consultation referral"
  },
  {
    id: 4,
    referrer: "TRAINING100",
    createdBy: "Emily Davis",
    createdAt: "2024-08-22T14:20:00Z",
    usageCount: 5,
    totalLeads: 7,
    conversionRate: 71.4,
    status: "inactive",
    description: "Personal training referral"
  },
  {
    id: 5,
    referrer: "REHAB75",
    createdBy: "Alex Thompson",
    createdAt: "2024-08-21T11:00:00Z",
    usageCount: 3,
    totalLeads: 5,
    conversionRate: 60.0,
    status: "active",
    description: "Rehabilitation program referral"
  }
];

const LeadsReferrers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReferrer, setNewReferrer] = useState({
    code: "",
    description: "",
    createdBy: "Admin"
  });

  const filteredReferrers = mockReferrers.filter((referrer) => {
    const matchesSearch = referrer.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referrer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referrer.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || referrer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const stats = {
    total: mockReferrers.length,
    active: mockReferrers.filter(r => r.status === 'active').length,
    totalUsage: mockReferrers.reduce((sum, r) => sum + r.usageCount, 0),
    totalLeads: mockReferrers.reduce((sum, r) => sum + r.totalLeads, 0),
    avgConversion: mockReferrers.reduce((sum, r) => sum + r.conversionRate, 0) / mockReferrers.length
  };

  const handleCreateReferrer = () => {
    // Here you would typically save to backend
    console.log("Creating new referrer:", newReferrer);
    setIsDialogOpen(false);
    setNewReferrer({ code: "", description: "", createdBy: "Admin" });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <DashboardLayout title="Lead Referrers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Referrers</h1>
            <p className="text-muted-foreground">
              Manage referral codes and track their performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Referral Code</DialogTitle>
                  <DialogDescription>
                    Create a new referral code to track lead sources
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Referral Code</label>
                    <Input
                      placeholder="e.g., FITNESS2024"
                      value={newReferrer.code}
                      onChange={(e) => setNewReferrer(prev => ({ ...prev, code: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      placeholder="Brief description of this referral code"
                      value={newReferrer.description}
                      onChange={(e) => setNewReferrer(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateReferrer}>
                    Create Code
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.active} active codes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsage}</div>
              <p className="text-xs text-muted-foreground">
                Times used
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                Generated from referrals
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgConversion.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Lead to client rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search referrers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Referrers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Codes</CardTitle>
            <p className="text-sm text-muted-foreground">
              List of all referral codes and their performance metrics
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Referrer Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Conversion</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrers.map((referrer) => (
                  <TableRow key={referrer.id}>
                    <TableCell className="font-medium">#{referrer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">{referrer.referrer}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(referrer.referrer)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={referrer.description}>
                        {referrer.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{referrer.usageCount}</div>
                      <div className="text-sm text-muted-foreground">times used</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{referrer.totalLeads}</div>
                      <div className="text-sm text-muted-foreground">leads generated</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{referrer.conversionRate}%</div>
                      <div className="text-sm text-muted-foreground">conversion rate</div>
                    </TableCell>
                    <TableCell>{referrer.createdBy}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(referrer.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(referrer.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(referrer.status)}>
                        {referrer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Code
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LeadsReferrers;

