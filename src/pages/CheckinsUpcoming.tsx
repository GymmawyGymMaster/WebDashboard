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
  Send,
  Mail
} from "lucide-react";
import { useState } from "react";

// Mock upcoming check-ins data
const mockUpcomingCheckins = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientMobile: "+1 (555) 123-4567",
    group: "Weight Loss",
    subscription: "Premium",
    checkIn: "Weekly Progress",
    scheduledFor: "2024-08-30T10:00:00Z",
    relatedPrograms: "Diet Plan, Workout",
    assignedBy: "Mike Chen",
    teamNote: "Client is doing well, expect positive feedback",
    status: "scheduled"
  },
  {
    id: 2,
    clientName: "Mike Chen",
    clientMobile: "+1 (555) 234-5678",
    group: "Muscle Gain",
    subscription: "Standard",
    checkIn: "Monthly Assessment",
    scheduledFor: "2024-08-31T14:00:00Z",
    relatedPrograms: "Strength Training",
    assignedBy: "Sarah Johnson",
    teamNote: "Focus on progress tracking",
    status: "scheduled"
  },
  {
    id: 3,
    clientName: "Emily Davis",
    clientMobile: "+1 (555) 345-6789",
    group: "Nutrition",
    subscription: "Basic",
    checkIn: "Diet Review",
    scheduledFor: "2024-09-01T09:00:00Z",
    relatedPrograms: "Meal Plan",
    assignedBy: "Alex Thompson",
    teamNote: "Check adherence to meal plan",
    status: "scheduled"
  },
  {
    id: 4,
    clientName: "Alex Thompson",
    clientMobile: "+1 (555) 456-7890",
    group: "Fitness",
    subscription: "Premium",
    checkIn: "Bi-weekly Check",
    scheduledFor: "2024-09-02T16:00:00Z",
    relatedPrograms: "Cardio, Strength",
    assignedBy: "Jessica Wilson",
    teamNote: "Monitor cardio progress",
    status: "scheduled"
  },
  {
    id: 5,
    clientName: "Jessica Wilson",
    clientMobile: "+1 (555) 567-8901",
    group: "Rehabilitation",
    subscription: "Standard",
    checkIn: "Injury Progress",
    scheduledFor: "2024-09-03T11:00:00Z",
    relatedPrograms: "Physical Therapy",
    assignedBy: "Mike Chen",
    teamNote: "Check recovery status",
    status: "scheduled"
  }
];

const CheckinsUpcoming = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedCheckins, setSelectedCheckins] = useState<number[]>([]);

  const filteredCheckins = mockUpcomingCheckins.filter((checkin) => {
    const matchesSearch = checkin.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkin.clientMobile.includes(searchTerm) ||
                         checkin.checkIn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = groupFilter === "all" || checkin.group === groupFilter;
    
    let matchesDate = true;
    if (dateFilter !== "all") {
      const checkinDate = new Date(checkin.scheduledFor);
      const today = new Date();
      
      switch (dateFilter) {
        case "today":
          matchesDate = checkinDate.toDateString() === today.toDateString();
          break;
        case "tomorrow":
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          matchesDate = checkinDate.toDateString() === tomorrow.toDateString();
          break;
        case "week":
          const weekFromNow = new Date(today);
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          matchesDate = checkinDate <= weekFromNow;
          break;
      }
    }
    
    return matchesSearch && matchesGroup && matchesDate;
  });

  const stats = {
    total: mockUpcomingCheckins.length,
    today: mockUpcomingCheckins.filter(c => {
      const checkinDate = new Date(c.scheduledFor);
      const today = new Date();
      return checkinDate.toDateString() === today.toDateString();
    }).length,
    tomorrow: mockUpcomingCheckins.filter(c => {
      const checkinDate = new Date(c.scheduledFor);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return checkinDate.toDateString() === tomorrow.toDateString();
    }).length,
    thisWeek: mockUpcomingCheckins.filter(c => {
      const checkinDate = new Date(c.scheduledFor);
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      return checkinDate <= weekFromNow;
    }).length,
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
    setSelectedCheckins([]);
  };

  const handleSendCheckin = (checkinId: number) => {
    console.log(`Sending check-in ${checkinId}`);
  };

  const getTimeUntil = (scheduledFor: string) => {
    const scheduledDate = new Date(scheduledFor);
    const now = new Date();
    const diffMs = scheduledDate.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `In ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else {
      return `In ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    }
  };

  return (
    <DashboardLayout title="Upcoming Check-ins">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Upcoming Check-ins</h1>
            <p className="text-muted-foreground">
              Check-ins assigned but not sent yet
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send Selected
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Upcoming</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All scheduled check-ins
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
              <p className="text-xs text-muted-foreground">
                Due today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tomorrow</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.tomorrow}</div>
              <p className="text-xs text-muted-foreground">
                Due tomorrow
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <AlertTriangle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground">
                Next 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search upcoming check-ins..."
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
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
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
                    onClick={() => handleBulkAction('send')}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Selected
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

        {/* Upcoming Check-ins Table */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Check-ins</CardTitle>
            <p className="text-sm text-muted-foreground">
              Check-ins scheduled to be sent to clients
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
                  <TableHead>Scheduled For</TableHead>
                  <TableHead>Time Until</TableHead>
                  <TableHead>Related Programs</TableHead>
                  <TableHead>Assigned By</TableHead>
                  <TableHead>Team Note</TableHead>
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
                          {new Date(checkin.scheduledFor).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(checkin.scheduledFor).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTimeUntil(checkin.scheduledFor)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={checkin.relatedPrograms}>
                        {checkin.relatedPrograms}
                      </div>
                    </TableCell>
                    <TableCell>{checkin.assignedBy}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={checkin.teamNote}>
                        {checkin.teamNote}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSendCheckin(checkin.id)}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Check-in
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Check-in
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Now
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

export default CheckinsUpcoming;

