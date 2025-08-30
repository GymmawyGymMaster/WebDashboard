import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Edit, 
  Plus, 
  MoreHorizontal,
  Eye,
  Trash2,
  Download,
  Upload,
  Camera,
  Dumbbell,
  Utensils,
  FileText,
  Heart,
  Activity,
  TrendingUp,
  Image,
  Scale,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Folder,
  Gallery
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Mock client data
const mockClient = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  mobile: "+1 (555) 123-4567",
  birthDate: "1990-05-15",
  gender: "Female",
  address: "123 Main St, New York, NY 10001",
  emergencyContact: "John Johnson",
  emergencyPhone: "+1 (555) 987-6543",
  joinDate: "2024-01-15",
  status: "Active",
  subscription: "Premium",
  group: "Weight Loss",
  avatar: "/placeholder-avatar.jpg",
  notes: "Client is very motivated and follows diet strictly. Has lost 15kg in 6 months.",
  goals: ["Lose 20kg", "Improve fitness", "Build muscle tone"],
  medicalConditions: ["None"],
  allergies: ["None"],
  medications: ["None"]
};

// Mock workout data
const mockWorkouts = [
  {
    id: 1,
    name: "Upper Body Strength",
    date: "2024-08-25",
    duration: "45 min",
    exercises: 8,
    status: "completed",
    notes: "Great form, increased weights"
  },
  {
    id: 2,
    name: "Cardio Session",
    date: "2024-08-23",
    duration: "30 min",
    exercises: 5,
    status: "completed",
    notes: "Good endurance"
  },
  {
    id: 3,
    name: "Lower Body Focus",
    date: "2024-08-21",
    duration: "50 min",
    exercises: 10,
    status: "completed",
    notes: "Squats improved"
  }
];

// Mock diet data
const mockDiets = [
  {
    id: 1,
    name: "Weight Loss Plan",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    calories: 1800,
    protein: "150g",
    carbs: "180g",
    fat: "60g",
    status: "active",
    notes: "Following well, good results"
  },
  {
    id: 2,
    name: "Maintenance Plan",
    startDate: "2024-07-16",
    endDate: "2024-12-31",
    calories: 2000,
    protein: "160g",
    carbs: "200g",
    fat: "70g",
    status: "active",
    notes: "New plan for maintenance"
  }
];

// Mock observations
const mockObservations = [
  {
    id: 1,
    date: "2024-08-25",
    type: "Progress Check",
    notes: "Client shows excellent progress. Weight loss is consistent and sustainable.",
    coach: "Mike Chen",
    status: "positive"
  },
  {
    id: 2,
    date: "2024-08-18",
    type: "Form Assessment",
    notes: "Squat form needs improvement. Recommend focusing on depth and knee alignment.",
    coach: "Sarah Johnson",
    status: "needs_attention"
  }
];

// Mock inbody data
const mockInbodyData = [
  {
    id: 1,
    date: "2024-08-25",
    weight: 65.2,
    bodyFat: 18.5,
    muscleMass: 45.2,
    bmi: 22.1,
    visceralFat: 5,
    notes: "Excellent progress, body fat reduced by 2%"
  },
  {
    id: 2,
    date: "2024-07-25",
    weight: 67.1,
    bodyFat: 20.5,
    muscleMass: 44.8,
    bmi: 22.8,
    visceralFat: 6,
    notes: "Good progress, muscle mass increased"
  }
];

// Mock weight log
const mockWeightLog = [
  { date: "2024-08-25", weight: 65.2, change: -0.3 },
  { date: "2024-08-18", weight: 65.5, change: -0.5 },
  { date: "2024-08-11", weight: 66.0, change: -0.8 },
  { date: "2024-08-04", weight: 66.8, change: -0.4 },
  { date: "2024-07-28", weight: 67.2, change: -0.6 }
];

const ClientProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'completed':
        return 'default';
      case 'positive':
        return 'default';
      case 'needs_attention':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <DashboardLayout title={`Client Profile - ${mockClient.name}`}>
      <div className="space-y-6">
        {/* Client Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={mockClient.avatar} alt={mockClient.name} />
                  <AvatarFallback className="text-lg">
                    {mockClient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{mockClient.name}</h1>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {mockClient.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {mockClient.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {new Date(mockClient.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="default">{mockClient.status}</Badge>
                    <Badge variant="outline">{mockClient.subscription}</Badge>
                    <Badge variant="secondary">{mockClient.group}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Client Profile</DialogTitle>
                      <DialogDescription>
                        Update client information and preferences
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={mockClient.name} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue={mockClient.email} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue={mockClient.phone} />
                        </div>
                        <div>
                          <Label htmlFor="mobile">Mobile</Label>
                          <Input id="mobile" defaultValue={mockClient.mobile} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="birthDate">Birth Date</Label>
                          <Input id="birthDate" type="date" defaultValue={mockClient.birthDate} />
                        </div>
                        <div>
                          <Label htmlFor="gender">Gender</Label>
                          <Select defaultValue={mockClient.gender.toLowerCase()}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={mockClient.address} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsEditDialogOpen(false)}>
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="diets">Diets</TabsTrigger>
            <TabsTrigger value="observations">Observations</TabsTrigger>
            <TabsTrigger value="inbody">InBody</TabsTrigger>
            <TabsTrigger value="injuries">Injuries</TabsTrigger>
            <TabsTrigger value="accounting">Accounting</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                      <p>{mockClient.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <p>{mockClient.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                      <p>{mockClient.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Mobile</Label>
                      <p>{mockClient.mobile}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Birth Date</Label>
                      <p>{new Date(mockClient.birthDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                      <p>{mockClient.gender}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                    <p>{mockClient.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Contact Name</Label>
                    <p>{mockClient.emergencyContact}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Contact Phone</Label>
                    <p>{mockClient.emergencyPhone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockClient.goals.map((goal, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Medical Conditions</Label>
                    <p>{mockClient.medicalConditions.join(', ') || 'None'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Allergies</Label>
                    <p>{mockClient.allergies.join(', ') || 'None'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Medications</Label>
                    <p>{mockClient.medications.join(', ') || 'None'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Workout History</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Workout
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Workout Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Exercises</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWorkouts.map((workout) => (
                      <TableRow key={workout.id}>
                        <TableCell>{new Date(workout.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{workout.name}</TableCell>
                        <TableCell>{workout.duration}</TableCell>
                        <TableCell>{workout.exercises}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(workout.status)}>
                            {workout.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{workout.notes}</TableCell>
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
                                Edit
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
          </TabsContent>

          {/* Diets Tab */}
          <TabsContent value="diets" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Diet Plans</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Diet Plan
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {mockDiets.map((diet) => (
                <Card key={diet.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{diet.name}</CardTitle>
                      <Badge variant={getStatusVariant(diet.status)}>
                        {diet.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                        <p>{new Date(diet.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">End Date</Label>
                        <p>{new Date(diet.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Calories</Label>
                        <p>{diet.calories} kcal</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Protein</Label>
                        <p>{diet.protein}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Carbs</Label>
                        <p>{diet.carbs}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Fat</Label>
                        <p>{diet.fat}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                      <p>{diet.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Observations Tab */}
          <TabsContent value="observations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Coach Observations</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Observation
              </Button>
            </div>
            <div className="space-y-4">
              {mockObservations.map((observation) => (
                <Card key={observation.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusVariant(observation.status)}>
                            {observation.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(observation.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Coach: {observation.coach}
                        </p>
                        <p>{observation.notes}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* InBody Tab */}
          <TabsContent value="inbody" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">InBody Measurements</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Measurement
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {mockInbodyData.map((measurement) => (
                <Card key={measurement.id}>
                  <CardHeader>
                    <CardTitle>Measurement - {new Date(measurement.date).toLocaleDateString()}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Weight</Label>
                        <p className="text-lg font-semibold">{measurement.weight} kg</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Body Fat</Label>
                        <p className="text-lg font-semibold">{measurement.bodyFat}%</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Muscle Mass</Label>
                        <p className="text-lg font-semibold">{measurement.muscleMass} kg</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">BMI</Label>
                        <p className="text-lg font-semibold">{measurement.bmi}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Visceral Fat</Label>
                      <p className="text-lg font-semibold">{measurement.visceralFat}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                      <p>{measurement.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Injuries Tab */}
          <TabsContent value="injuries" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Injuries & Medical Cases</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Injury Record
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No injury records found</p>
                  <p className="text-sm">Add injury records to track client's medical history</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounting Tab */}
          <TabsContent value="accounting" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Financial Records</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Total Paid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,450.00</div>
                  <p className="text-xs text-muted-foreground">All time payments</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Outstanding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">$150.00</div>
                  <p className="text-xs text-muted-foreground">Due this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Next Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$200.00</div>
                  <p className="text-xs text-muted-foreground">Due on Sep 15, 2024</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No payment history available</p>
                  <p className="text-sm">Payment records will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Files & Documents</h2>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No files uploaded</p>
                    <p className="text-sm">Upload client documents and files</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientProfile;

