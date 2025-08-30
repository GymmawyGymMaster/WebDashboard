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
  Mail,
  User
} from "lucide-react";
import { useState } from "react";

// Mock unsubmitted check-ins data
const mockUnsubmittedCheckins = [
  {
    id: 1,
    checkIn: "Weekly Progress",
    client: "Sarah Johnson",
    by: "Mike Chen",
    clientPhone: "+1 (555) 123-4567",
    subscription: "Premium",
    group: "Weight Loss",
    teamNote: "Client usually responds quickly",
    sendAt: "2024-08-25T10:30:00Z",
    status: "sent"
  },
  {
    id: 2,
    checkIn: "Monthly Assessment",
    client: "Mike Chen",
    by: "Sarah Johnson",
    clientPhone: "+1 (555) 234-5678",
    subscription: "Standard",
    group: "Muscle Gain",
    teamNote: "Follow up needed",
    sendAt: "2024-08-24T15:45:00Z",
    status: "sent"
  },
  {
    id: 3,
    checkIn: "Diet Review",
    client: "Emily Davis",
    by: "Alex Thompson",
    clientPhone: "+1 (555) 345-6789",
    subscription: "Basic",
    group: "Nutrition",
    teamNote: "Client may be busy",
    sendAt: "2024-08-23T09:15:00Z",
    status: "sent"
  },
  {
    id: 4,
    checkIn: "Bi-weekly Check",
    client: "Alex Thompson",
    by: "Jessica Wilson",
    clientPhone: "+1 (555) 456-7890",
    subscription: "Premium",
    group: "Fitness",
    teamNote: "Send reminder",
    sendAt: "2024-08-22T14:20:00Z",
    status: "sent"
  },
  {
    id: 5,
    checkIn: "Injury Progress",
    client: "Jessica Wilson",
    by: "Mike Chen",
    clientPhone: "+1 (555) 567-8901",
    subscription: "Standard",
    group: "Rehabilitation",
    teamNote: "Important for recovery tracking",
    sendAt: "2024-08-21T11:00:00Z",
    status: "sent"
  }
];

const CheckinsUnsubmitted = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedCheckins, setSelectedCheckins] = useState<number[]>([]);

  const filteredCheckins = mockUnsubmittedCheckins.filter((checkin) => {
    const matchesSearch = checkin.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkin.clientPhone.includes(searchTerm) ||
                         checkin.checkIn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checkin.by.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = groupFilter === "all" || checkin.group === groupFilter;
    
    let matchesDate = true;
    if (dateFilter !== "all") {
      const sendDate = new Date(checkin.sendAt);
      const today = new Date();
      
      switch (dateFilter) {
        case "today":
          matchesDate = sendDate.toDateString() === today.toDateString();
          break;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          matchesDate = sendDate.toDateString() === yesterday.toDateString();
          break;
        case "week":
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          matchesDate = sendDate >= weekAgo;
          break;
      }
    }
    
    return matchesSearch && matchesGroup && matchesDate;
  });

  const stats = {
    total: mockUnsubmittedCheckins.length,
    today: mockUnsubmittedCheckins.filter(c => {
      const sendDate = new Date(c.sendAt);
      const today = new Date();
      return sendDate.toDateString() === today.toDateString();
    }).length,
    yesterday: mockUnsubmittedCheckins.filter(c => {
      const sendDate = new Date(c.sendAt);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return sendDate.toDateString() === yesterday.toDateString();
    }).length,
    thisWeek: mockUnsubmittedCheckins.filter(c => {
      const sendDate = new Date(c.sendAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sendDate >= weekAgo;
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

  const handleResendCheckin = (checkinId: number) => {
    console.log(`Resending check-in ${checkinId}`);
  };

  const getTimeSince = (sendAt: string) => {
    const sendDate = new Date(sendAt);
    const now = new Date();
    const diffMs = now.getTime() - sendDate.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <DashboardLayout title="Unsubmitted Check-ins">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Unsubmitted Check-ins</h1>
            <p className="text-muted-foreground">
              Forms sent but not responded to yet
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Resend Selected
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Unsubmitted</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting response
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent Today</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
              <p className="text-xs text-muted-foreground">
                Sent today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent Yesterday</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.yesterday}</div>
              <p className="text-xs text-muted-foreground">
                Sent yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground">
                Last 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search unsubmitted check-ins..."
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
              <SelectItem value="yesterday">Yesterday</SelectItem>
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
                    onClick={() => handleBulkAction('resend')}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Resend Selected
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

        {/* Unsubmitted Check-ins Table */}
        <Card>
          <CardHeader>
            <CardTitle>Unsubmitted Check-ins</CardTitle>
            <p className="text-sm text-muted-foreground">
              Forms sent but not responded to yet
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
                  <TableHead>Check-in</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>By</TableHead>
                  <TableHead>Client Phone</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Team Note</TableHead>
                  <TableHead>Send At</TableHead>
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
                    <TableCell className="font-medium">{checkin.checkIn}</TableCell>
                    <TableCell>{checkin.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {checkin.by}
                      </div>
                    </TableCell>
                    <TableCell>{checkin.clientPhone}</TableCell>
                    <TableCell>{checkin.subscription}</TableCell>
                    <TableCell>{checkin.group}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={checkin.teamNote}>
                        {checkin.teamNote}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(checkin.sendAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getTimeSince(checkin.sendAt)}
                        </div>
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
                          <DropdownMenuItem onClick={() => handleResendCheckin(checkin.id)}>
                            <Send className="h-4 w-4 mr-2" />
                            Resend Check-in
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
                            Send Reminder
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

export default CheckinsUnsubmitted;

