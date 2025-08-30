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
  FileText,
  User,
  Calendar
} from "lucide-react";
import { useState } from "react";

// Mock lead responses data
const mockLeadResponses = [
  {
    id: 1,
    response: "I'm interested in weight loss programs",
    createdBy: "Website Form",
    createdAt: "2024-08-25T10:30:00Z",
    leadName: "John Doe",
    leadEmail: "john.doe@email.com",
    leadPhone: "+1 (555) 123-4567",
    formType: "Contact Form",
    status: "new"
  },
  {
    id: 2,
    response: "Looking for personal training sessions",
    createdBy: "Mobile App",
    createdAt: "2024-08-24T15:45:00Z",
    leadName: "Jane Smith",
    leadEmail: "jane.smith@email.com",
    leadPhone: "+1 (555) 234-5678",
    formType: "App Signup",
    status: "contacted"
  },
  {
    id: 3,
    response: "Need nutrition consultation",
    createdBy: "Social Media",
    createdAt: "2024-08-23T09:15:00Z",
    leadName: "Mike Johnson",
    leadEmail: "mike.johnson@email.com",
    leadPhone: "+1 (555) 345-6789",
    formType: "Facebook Lead",
    status: "qualified"
  },
  {
    id: 4,
    response: "Interested in group fitness classes",
    createdBy: "Referral",
    createdAt: "2024-08-22T14:20:00Z",
    leadName: "Sarah Wilson",
    leadEmail: "sarah.wilson@email.com",
    leadPhone: "+1 (555) 456-7890",
    formType: "Referral Form",
    status: "converted"
  },
  {
    id: 5,
    response: "Want to know about membership plans",
    createdBy: "Website Form",
    createdAt: "2024-08-21T11:00:00Z",
    leadName: "Alex Brown",
    leadEmail: "alex.brown@email.com",
    leadPhone: "+1 (555) 567-8901",
    formType: "Pricing Inquiry",
    status: "new"
  }
];

const LeadsResponses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formTypeFilter, setFormTypeFilter] = useState("all");
  const [createdByFilter, setCreatedByFilter] = useState("all");

  const filteredResponses = mockLeadResponses.filter((response) => {
    const matchesSearch = response.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         response.leadEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         response.response.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || response.status === statusFilter;
    const matchesFormType = formTypeFilter === "all" || response.formType === formTypeFilter;
    const matchesCreatedBy = createdByFilter === "all" || response.createdBy === createdByFilter;
    
    return matchesSearch && matchesStatus && matchesFormType && matchesCreatedBy;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'secondary';
      case 'contacted':
        return 'outline';
      case 'qualified':
        return 'default';
      case 'converted':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-600';
      case 'contacted':
        return 'text-yellow-600';
      case 'qualified':
        return 'text-green-600';
      case 'converted':
        return 'text-emerald-600';
      default:
        return 'text-gray-600';
    }
  };

  const stats = {
    total: mockLeadResponses.length,
    new: mockLeadResponses.filter(r => r.status === 'new').length,
    contacted: mockLeadResponses.filter(r => r.status === 'contacted').length,
    qualified: mockLeadResponses.filter(r => r.status === 'qualified').length,
    converted: mockLeadResponses.filter(r => r.status === 'converted').length,
  };

  return (
    <DashboardLayout title="Lead Responses">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Responses</h1>
            <p className="text-muted-foreground">
              Responses from sign-up forms and lead generation
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Responses
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All time responses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <User className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.new / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contacted</CardTitle>
              <User className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.contacted / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified</CardTitle>
              <User className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.qualified / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Converted</CardTitle>
              <User className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{stats.converted}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search responses..."
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
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
            </SelectContent>
          </Select>
          <Select value={formTypeFilter} onValueChange={setFormTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Form Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Forms</SelectItem>
              <SelectItem value="Contact Form">Contact Form</SelectItem>
              <SelectItem value="App Signup">App Signup</SelectItem>
              <SelectItem value="Facebook Lead">Facebook Lead</SelectItem>
              <SelectItem value="Referral Form">Referral Form</SelectItem>
              <SelectItem value="Pricing Inquiry">Pricing Inquiry</SelectItem>
            </SelectContent>
          </Select>
          <Select value={createdByFilter} onValueChange={setCreatedByFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Website Form">Website Form</SelectItem>
              <SelectItem value="Mobile App">Mobile App</SelectItem>
              <SelectItem value="Social Media">Social Media</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Responses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Responses</CardTitle>
            <p className="text-sm text-muted-foreground">
              Detailed list of responses from sign-up forms
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>Lead Info</TableHead>
                  <TableHead>Form Type</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResponses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell className="font-medium">#{response.id}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={response.response}>
                        {response.response}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{response.leadName}</div>
                        <div className="text-sm text-muted-foreground">{response.leadEmail}</div>
                        <div className="text-sm text-muted-foreground">{response.leadPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{response.formType}</Badge>
                    </TableCell>
                    <TableCell>{response.createdBy}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(response.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(response.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(response.status)}>
                        {response.status}
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
                            Edit Response
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

export default LeadsResponses;

