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
  Utensils,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Link
} from "lucide-react";
import { useState } from "react";

// Mock diet request data
const mockDietRequests = [
  {
    id: 1,
    client: "Sarah Johnson",
    group: "Weight Loss",
    subscription: "Premium",
    diet: "Weight Loss Plan",
    meal: "Breakfast",
    recipe: "Oatmeal with Berries",
    reason: "Allergic to berries, need alternative",
    since: "2024-08-25T10:30:00Z",
    markAsRead: false,
    status: "pending"
  },
  {
    id: 2,
    client: "Mike Chen",
    group: "Muscle Gain",
    subscription: "Standard",
    diet: "Muscle Building Plan",
    meal: "Lunch",
    recipe: "Chicken Breast with Rice",
    reason: "Don't like chicken, prefer fish",
    since: "2024-08-24T15:45:00Z",
    markAsRead: true,
    status: "approved"
  },
  {
    id: 3,
    client: "Emily Davis",
    group: "Nutrition",
    subscription: "Basic",
    diet: "Vegetarian Plan",
    meal: "Dinner",
    recipe: "Quinoa Salad",
    reason: "Digestive issues with quinoa",
    since: "2024-08-23T09:15:00Z",
    markAsRead: false,
    status: "pending"
  },
  {
    id: 4,
    client: "Alex Thompson",
    group: "Fitness",
    subscription: "Premium",
    diet: "Performance Plan",
    meal: "Snack",
    recipe: "Protein Shake",
    reason: "Lactose intolerant, need dairy-free option",
    since: "2024-08-22T14:20:00Z",
    markAsRead: true,
    status: "rejected"
  },
  {
    id: 5,
    client: "Jessica Wilson",
    group: "Rehabilitation",
    subscription: "Standard",
    diet: "Recovery Plan",
    meal: "Breakfast",
    recipe: "Smoothie Bowl",
    reason: "Can't eat cold foods due to sensitivity",
    since: "2024-08-21T11:00:00Z",
    markAsRead: false,
    status: "pending"
  }
];

const ClientAppRequestDiet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);

  const filteredRequests = mockDietRequests.filter((request) => {
    const matchesSearch = request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.diet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.recipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesRead = readFilter === "all" || 
                       (readFilter === "unread" && !request.markAsRead) ||
                       (readFilter === "read" && request.markAsRead);
    
    return matchesSearch && matchesStatus && matchesRead;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const stats = {
    total: mockDietRequests.length,
    pending: mockDietRequests.filter(r => r.status === 'pending').length,
    approved: mockDietRequests.filter(r => r.status === 'approved').length,
    rejected: mockDietRequests.filter(r => r.status === 'rejected').length,
    unread: mockDietRequests.filter(r => !r.markAsRead).length,
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(filteredRequests.map(r => r.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId: number, checked: boolean) => {
    if (checked) {
      setSelectedRequests(prev => [...prev, requestId]);
    } else {
      setSelectedRequests(prev => prev.filter(id => id !== requestId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on ${selectedRequests.length} requests`);
    setSelectedRequests([]);
  };

  return (
    <DashboardLayout title="Diet Requests">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Diet Requests</h1>
            <p className="text-muted-foreground">
              Client requests for diet changes or removals
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button>
              <Utensils className="h-4 w-4 mr-2" />
              Process Requests
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All diet requests
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
                Awaiting review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <p className="text-xs text-muted-foreground">
                Requests approved
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <p className="text-xs text-muted-foreground">
                Requests rejected
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
              <p className="text-xs text-muted-foreground">
                New requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search diet requests..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={readFilter} onValueChange={setReadFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Read Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedRequests.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {selectedRequests.length} request(s) selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRequests([])}
                  >
                    Clear Selection
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('approve')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('reject')}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Reject Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('mark_read')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Mark as Read
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

        {/* Diet Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Diet Requests</CardTitle>
            <p className="text-sm text-muted-foreground">
              Client requests for diet modifications
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Diet</TableHead>
                  <TableHead>Meal</TableHead>
                  <TableHead>Recipe</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Since</TableHead>
                  <TableHead>Mark As Read</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} className={!request.markAsRead ? 'bg-blue-50' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRequests.includes(request.id)}
                        onCheckedChange={(checked) => handleSelectRequest(request.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">#{request.id}</TableCell>
                    <TableCell className="font-medium">{request.client}</TableCell>
                    <TableCell>{request.group}</TableCell>
                    <TableCell>{request.subscription}</TableCell>
                    <TableCell>{request.diet}</TableCell>
                    <TableCell>{request.meal}</TableCell>
                    <TableCell>{request.recipe}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={request.reason}>
                        {request.reason}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(request.since).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(request.since).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={request.markAsRead} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status}
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
                            Edit Request
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Reject
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

export default ClientAppRequestDiet;

