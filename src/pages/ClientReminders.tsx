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
  Bell,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
  Mail,
  User
} from "lucide-react";
import { useState } from "react";

// Mock client reminders data
const mockClientReminders = [
  {
    id: 1,
    reminder: "Weekly Progress Check",
    client: "Sarah Johnson",
    clientPhone: "+1 (555) 123-4567",
    subscription: "Premium",
    group: "Weight Loss",
    scheduleType: "Weekly",
    scheduleDate: "2024-08-30T10:00:00Z",
    scheduleTime: "10:00 AM",
    assignedTo: "Mike Chen",
    status: "active"
  },
  {
    id: 2,
    reminder: "Monthly Assessment",
    client: "Mike Chen",
    clientPhone: "+1 (555) 234-5678",
    subscription: "Standard",
    group: "Muscle Gain",
    scheduleType: "Monthly",
    scheduleDate: "2024-08-31T14:00:00Z",
    scheduleTime: "2:00 PM",
    assignedTo: "Sarah Johnson",
    status: "active"
  },
  {
    id: 3,
    reminder: "Diet Review",
    client: "Emily Davis",
    clientPhone: "+1 (555) 345-6789",
    subscription: "Basic",
    group: "Nutrition",
    scheduleType: "Bi-weekly",
    scheduleDate: "2024-09-01T09:00:00Z",
    scheduleTime: "9:00 AM",
    assignedTo: "Alex Thompson",
    status: "paused"
  },
  {
    id: 4,
    reminder: "Bi-weekly Check",
    client: "Alex Thompson",
    clientPhone: "+1 (555) 456-7890",
    subscription: "Premium",
    group: "Fitness",
    scheduleType: "Bi-weekly",
    scheduleDate: "2024-09-02T16:00:00Z",
    scheduleTime: "4:00 PM",
    assignedTo: "Jessica Wilson",
    status: "active"
  },
  {
    id: 5,
    reminder: "Injury Progress",
    client: "Jessica Wilson",
    clientPhone: "+1 (555) 567-8901",
    subscription: "Standard",
    group: "Rehabilitation",
    scheduleType: "Weekly",
    scheduleDate: "2024-09-03T11:00:00Z",
    scheduleTime: "11:00 AM",
    assignedTo: "Mike Chen",
    status: "completed"
  }
];

const ClientReminders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scheduleFilter, setScheduleFilter] = useState("all");
  const [selectedReminders, setSelectedReminders] = useState<number[]>([]);

  const filteredReminders = mockClientReminders.filter((reminder) => {
    const matchesSearch = reminder.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.clientPhone.includes(searchTerm) ||
                         reminder.reminder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = groupFilter === "all" || reminder.group === groupFilter;
    const matchesStatus = statusFilter === "all" || reminder.status === statusFilter;
    const matchesSchedule = scheduleFilter === "all" || reminder.scheduleType === scheduleFilter;
    
    return matchesSearch && matchesGroup && matchesStatus && matchesSchedule;
  });

  const stats = {
    total: mockClientReminders.length,
    active: mockClientReminders.filter(r => r.status === 'active').length,
    paused: mockClientReminders.filter(r => r.status === 'paused').length,
    completed: mockClientReminders.filter(r => r.status === 'completed').length,
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReminders(filteredReminders.map(r => r.id));
    } else {
      setSelectedReminders([]);
    }
  };

  const handleSelectReminder = (reminderId: number, checked: boolean) => {
    if (checked) {
      setSelectedReminders(prev => [...prev, reminderId]);
    } else {
      setSelectedReminders(prev => prev.filter(id => id !== reminderId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on ${selectedReminders.length} reminders`);
    setSelectedReminders([]);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'paused':
        return 'secondary';
      case 'completed':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getScheduleColor = (scheduleType: string) => {
    switch (scheduleType) {
      case 'Weekly':
        return 'text-blue-600';
      case 'Monthly':
        return 'text-green-600';
      case 'Bi-weekly':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout title="Client Reminders">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Client Reminders</h1>
            <p className="text-muted-foreground">
              All reminders created and set to clients
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button>
              <Bell className="h-4 w-4 mr-2" />
              Create Reminder
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reminders</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All reminders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paused</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.paused}</div>
              <p className="text-xs text-muted-foreground">
                Temporarily paused
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">
                Completed reminders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search client reminders..."
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schedules</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedReminders.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {selectedReminders.length} reminder(s) selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedReminders([])}
                  >
                    Clear Selection
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('pause')}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pause Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('activate')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Activate Selected
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

        {/* Client Reminders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Client Reminders</CardTitle>
            <p className="text-sm text-muted-foreground">
              All reminders created and set to clients
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedReminders.length === filteredReminders.length && filteredReminders.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Reminder</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Schedule Type</TableHead>
                  <TableHead>Schedule Date</TableHead>
                  <TableHead>Schedule Time</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReminders.map((reminder) => (
                  <TableRow key={reminder.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedReminders.includes(reminder.id)}
                        onCheckedChange={(checked) => handleSelectReminder(reminder.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">#{reminder.id}</TableCell>
                    <TableCell className="font-medium">{reminder.reminder}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{reminder.client}</div>
                        <div className="text-sm text-muted-foreground">{reminder.clientPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{reminder.subscription}</TableCell>
                    <TableCell>{reminder.group}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getScheduleColor(reminder.scheduleType)}>
                        {reminder.scheduleType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {new Date(reminder.scheduleDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{reminder.scheduleTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {reminder.assignedTo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(reminder.status)}>
                        {reminder.status}
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
                            Edit Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Send Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="h-4 w-4 mr-2" />
                            Pause/Resume
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

export default ClientReminders;

