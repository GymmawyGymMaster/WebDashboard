import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ClipboardCheck,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  StarOff
} from "lucide-react";
import { useState } from "react";

// Mock quick view check-ins data
const mockQuickViewCheckins = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientMobile: "+1 (555) 123-4567",
    group: "Weight Loss",
    subscription: "Premium",
    checkIn: "Weekly Progress",
    nextCheckIn: "2024-08-30",
    relatedPrograms: "Diet Plan, Workout",
    programReport: "On track",
    submittedAt: "2024-08-25T10:30:00Z",
    note: "Feeling great, lost 2kg this week",
    label: "Positive",
    status: "submitted",
    priority: "high"
  },
  {
    id: 2,
    clientName: "Mike Chen",
    clientMobile: "+1 (555) 234-5678",
    group: "Muscle Gain",
    subscription: "Standard",
    checkIn: "Monthly Assessment",
    nextCheckIn: "2024-09-25",
    relatedPrograms: "Strength Training",
    programReport: "Behind schedule",
    submittedAt: "2024-08-24T15:45:00Z",
    note: "Missed 3 workouts due to work",
    label: "Needs Attention",
    status: "submitted",
    priority: "medium"
  },
  {
    id: 3,
    clientName: "Emily Davis",
    clientMobile: "+1 (555) 345-6789",
    group: "Nutrition",
    subscription: "Basic",
    checkIn: "Diet Review",
    nextCheckIn: "2024-08-28",
    relatedPrograms: "Meal Plan",
    programReport: "Excellent progress",
    submittedAt: "2024-08-23T09:15:00Z",
    note: "Following diet perfectly",
    label: "Excellent",
    status: "submitted",
    priority: "low"
  },
  {
    id: 4,
    clientName: "Alex Thompson",
    clientMobile: "+1 (555) 456-7890",
    group: "Fitness",
    subscription: "Premium",
    checkIn: "Bi-weekly Check",
    nextCheckIn: "2024-09-08",
    relatedPrograms: "Cardio, Strength",
    programReport: "Good progress",
    submittedAt: "2024-08-22T14:20:00Z",
    note: "Increased stamina noticed",
    label: "Good",
    status: "pending",
    priority: "medium"
  },
  {
    id: 5,
    clientName: "Jessica Wilson",
    clientMobile: "+1 (555) 567-8901",
    group: "Rehabilitation",
    subscription: "Standard",
    checkIn: "Injury Progress",
    nextCheckIn: "2024-08-29",
    relatedPrograms: "Physical Therapy",
    programReport: "Recovery on track",
    submittedAt: "2024-08-21T11:00:00Z",
    note: "Pain reduced significantly",
    label: "Recovery",
    status: "submitted",
    priority: "high"
  }
];

const CheckinsQuickView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState("all");
  const [selectedCheckins, setSelectedCheckins] = useState<number[]>([]);

  const filteredCheckins = mockQuickViewCheckins.filter((checkin) => {
    const matchesSearch = checkin.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkin.clientMobile.includes(searchTerm) ||
                         checkin.checkIn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || checkin.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || checkin.priority === priorityFilter;
    const matchesLabel = labelFilter === "all" || checkin.label === labelFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesLabel;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'Positive':
        return 'bg-green-100 text-green-800';
      case 'Needs Attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'Excellent':
        return 'bg-blue-100 text-blue-800';
      case 'Good':
        return 'bg-emerald-100 text-emerald-800';
      case 'Recovery':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const stats = {
    total: mockQuickViewCheckins.length,
    submitted: mockQuickViewCheckins.filter(c => c.status === 'submitted').length,
    pending: mockQuickViewCheckins.filter(c => c.status === 'pending').length,
    highPriority: mockQuickViewCheckins.filter(c => c.priority === 'high').length,
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCheckins(filteredCheckins.map(c => c.id));
    } else {
      setSelectedCheckins([]);
    }
  };

  const handleSelectCheckin = (checkinId: number, checked: boolean) => {
    if (checked) {
      setSelectedCheckins(prev => [...prev, checkinId]);
    } else {
      setSelectedCheckins(prev => prev.filter(id => id !== checkinId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on ${selectedCheckins.length} check-ins`);
    // Here you would implement the bulk action
    setSelectedCheckins([]);
  };

  return (
    <DashboardLayout title="Quick View Check-ins">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quick View Check-ins</h1>
            <p className="text-muted-foreground">
              Priority check-ins marked for quick review
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button>
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Mark as Reviewed
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick View Items</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Marked for priority review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.submitted}</div>
              <p className="text-xs text-muted-foreground">
                Ready for review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting submission
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search quick view check-ins..."
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
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
          <Select value={labelFilter} onValueChange={setLabelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Labels</SelectItem>
              <SelectItem value="Positive">Positive</SelectItem>
              <SelectItem value="Needs Attention">Needs Attention</SelectItem>
              <SelectItem value="Excellent">Excellent</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Recovery">Recovery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedCheckins.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {selectedCheckins.length} check-in(s) selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCheckins([])}
                  >
                    Clear Selection
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('remove_from_quick')}
                  >
                    <StarOff className="h-4 w-4 mr-2" />
                    Remove from Quick View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('delete')}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('export')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick View Check-ins Table */}
        <Card>
          <CardHeader>
            <CardTitle>Quick View Check-ins</CardTitle>
            <p className="text-sm text-muted-foreground">
              Priority check-ins that require your attention
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCheckins.length === filteredCheckins.length && filteredCheckins.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Next Check-in</TableHead>
                  <TableHead>Program Report</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCheckins.map((checkin) => (
                  <TableRow key={checkin.id} className={checkin.priority === 'high' ? 'bg-red-50' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCheckins.includes(checkin.id)}
                        onCheckedChange={(checked) => handleSelectCheckin(checkin.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">#{checkin.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{checkin.clientName}</div>
                        <div className="text-sm text-muted-foreground">{checkin.clientMobile}</div>
                      </div>
                    </TableCell>
                    <TableCell>{checkin.group}</TableCell>
                    <TableCell>{checkin.subscription}</TableCell>
                    <TableCell>{checkin.checkIn}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(checkin.nextCheckIn).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{checkin.programReport}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(checkin.priority)}
                      >
                        {checkin.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLabelColor(checkin.label)}>
                        {checkin.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(checkin.status)}>
                        {checkin.status}
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
                            Edit Check-in
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <StarOff className="h-4 w-4 mr-2" />
                            Remove from Quick View
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

export default CheckinsQuickView;

