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
  MessageSquare,
  Tag,
  StopCircle,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

// Mock submitted check-ins data
const mockSubmittedCheckins = [
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
    automaticCycle: true
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
    automaticCycle: true
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
    automaticCycle: false
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
    status: "submitted",
    automaticCycle: true
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
    automaticCycle: true
  }
];

const CheckinsSubmitted = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState("all");
  const [cycleFilter, setCycleFilter] = useState("all");
  const [selectedCheckins, setSelectedCheckins] = useState<number[]>([]);

  const filteredCheckins = mockSubmittedCheckins.filter((checkin) => {
    const matchesSearch = checkin.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkin.clientMobile.includes(searchTerm) ||
                         checkin.checkIn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkin.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = groupFilter === "all" || checkin.group === groupFilter;
    const matchesLabel = labelFilter === "all" || checkin.label === labelFilter;
    const matchesCycle = cycleFilter === "all" || 
                        (cycleFilter === "automatic" && checkin.automaticCycle) ||
                        (cycleFilter === "manual" && !checkin.automaticCycle);
    
    return matchesSearch && matchesGroup && matchesLabel && matchesCycle;
  });

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

  const stats = {
    total: mockSubmittedCheckins.length,
    automatic: mockSubmittedCheckins.filter(c => c.automaticCycle).length,
    manual: mockSubmittedCheckins.filter(c => !c.automaticCycle).length,
    positive: mockSubmittedCheckins.filter(c => c.label === 'Positive' || c.label === 'Excellent' || c.label === 'Good').length,
    needsAttention: mockSubmittedCheckins.filter(c => c.label === 'Needs Attention').length,
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
    <DashboardLayout title="Submitted Check-ins">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Submitted Check-ins</h1>
            <p className="text-muted-foreground">
              Check-ins that have been submitted by clients
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button>
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Process Selected
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submitted</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All submitted check-ins
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automatic Cycle</CardTitle>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.automatic}</div>
              <p className="text-xs text-muted-foreground">
                Auto-scheduled
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manual</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.manual}</div>
              <p className="text-xs text-muted-foreground">
                Manually scheduled
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positive</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.positive}</div>
              <p className="text-xs text-muted-foreground">
                Good progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.needsAttention}</div>
              <p className="text-xs text-muted-foreground">
                Require follow-up
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search submitted check-ins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={groupFilter} onValueChange={setGroupFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="Weight Loss">Weight Loss</SelectItem>
              <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
              <SelectItem value="Nutrition">Nutrition</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
              <SelectItem value="Rehabilitation">Rehabilitation</SelectItem>
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
          <Select value={cycleFilter} onValueChange={setCycleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cycles</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
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
                    onClick={() => handleBulkAction('accept')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('add_note')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('add_label')}
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    Add Label
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('stop_cycle')}
                  >
                    <StopCircle className="h-4 w-4 mr-2" />
                    Stop Automatic Cycle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('delete')}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submitted Check-ins Table */}
        <Card>
          <CardHeader>
            <CardTitle>Submitted Check-ins</CardTitle>
            <p className="text-sm text-muted-foreground">
              Check-ins that have been submitted by clients with all details
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
                  <TableHead>Client Mobile</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Next Check-in</TableHead>
                  <TableHead>Related Programs</TableHead>
                  <TableHead>Program Report</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCheckins.map((checkin) => (
                  <TableRow key={checkin.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCheckins.includes(checkin.id)}
                        onCheckedChange={(checked) => handleSelectCheckin(checkin.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">#{checkin.id}</TableCell>
                    <TableCell className="font-medium">{checkin.clientName}</TableCell>
                    <TableCell>{checkin.clientMobile}</TableCell>
                    <TableCell>{checkin.group}</TableCell>
                    <TableCell>{checkin.subscription}</TableCell>
                    <TableCell>{checkin.checkIn}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {new Date(checkin.nextCheckIn).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={checkin.relatedPrograms}>
                        {checkin.relatedPrograms}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{checkin.programReport}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(checkin.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(checkin.submittedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={checkin.note}>
                        {checkin.note}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLabelColor(checkin.label)}>
                        {checkin.label}
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
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Note
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Tag className="h-4 w-4 mr-2" />
                            Add Label
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <StopCircle className="h-4 w-4 mr-2" />
                            Stop Automatic Cycle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Go To Next Check-in
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

export default CheckinsSubmitted;

