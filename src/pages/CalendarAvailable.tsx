import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAppointments, type Appointment } from "@/data/mockData";
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronDown, 
  ChevronRight,
  Search,
  Filter,
  Plus
} from "lucide-react";
import { useState } from "react";

// Mock doctors data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Fitness Trainer",
    avatar: "/placeholder-avatar.jpg",
    availability: "Mon-Fri, 9AM-6PM",
    appointments: mockAppointments.filter(apt => apt.coach === "Sarah Johnson")
  },
  {
    id: 2,
    name: "Dr. Mike Chen",
    specialization: "Nutrition Specialist",
    avatar: "/placeholder-avatar.jpg",
    availability: "Mon-Sat, 8AM-7PM",
    appointments: mockAppointments.filter(apt => apt.coach === "Mike Chen")
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialization: "Rehabilitation Expert",
    avatar: "/placeholder-avatar.jpg",
    availability: "Tue-Sun, 10AM-8PM",
    appointments: mockAppointments.filter(apt => apt.coach === "Emily Davis")
  },
  {
    id: 4,
    name: "Dr. Alex Thompson",
    specialization: "Strength Coach",
    avatar: "/placeholder-avatar.jpg",
    availability: "Mon-Fri, 7AM-5PM",
    appointments: mockAppointments.filter(apt => apt.coach === "Alex Thompson")
  }
];

const CalendarAvailable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [expandedDoctors, setExpandedDoctors] = useState<number[]>([]);

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === "all" || 
                                 doctor.specialization.toLowerCase().includes(specializationFilter.toLowerCase());
    return matchesSearch && matchesSpecialization;
  });

  const toggleDoctorExpansion = (doctorId: number) => {
    setExpandedDoctors(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const getStatusVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      case 'no-show':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getTypeColor = (type: Appointment['type']) => {
    switch (type) {
      case 'training':
        return 'bg-primary text-primary-foreground';
      case 'consultation':
        return 'bg-success text-success-foreground';
      case 'assessment':
        return 'bg-warning text-warning-foreground';
      case 'follow-up':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getUpcomingAppointments = (appointments: Appointment[]) => {
    const now = new Date();
    return appointments
      .filter(apt => new Date(apt.date) > now && apt.status === 'scheduled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <DashboardLayout title="Available Appointments">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Available Appointments</h1>
            <p className="text-muted-foreground">
              View available doctors and their appointment schedules
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              <SelectItem value="fitness">Fitness Trainer</SelectItem>
              <SelectItem value="nutrition">Nutrition Specialist</SelectItem>
              <SelectItem value="rehabilitation">Rehabilitation Expert</SelectItem>
              <SelectItem value="strength">Strength Coach</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Doctors</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredDoctors.length}</div>
              <p className="text-xs text-muted-foreground">
                Active and available
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredDoctors.reduce((total, doctor) => total + doctor.appointments.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all doctors
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Slots</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredDoctors.reduce((total, doctor) => 
                  total + getUpcomingAppointments(doctor.appointments).length, 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Available for booking
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => {
            const upcomingAppointments = getUpcomingAppointments(doctor.appointments);
            const isExpanded = expandedDoctors.includes(doctor.id);
            
            return (
              <Collapsible
                key={doctor.id}
                open={isExpanded}
                onOpenChange={() => toggleDoctorExpansion(doctor.id)}
              >
                <Card>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{doctor.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {doctor.specialization}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {upcomingAppointments.length} upcoming
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {doctor.availability}
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      {upcomingAppointments.length > 0 ? (
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Upcoming Appointments</h4>
                          <div className="grid gap-3">
                            {upcomingAppointments.map((appointment) => (
                              <div
                                key={appointment.id}
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div>
                                    <div className="font-medium">{appointment.clientName}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getTypeColor(appointment.type)}>
                                    {appointment.type}
                                  </Badge>
                                  <Badge variant={getStatusVariant(appointment.status)}>
                                    {appointment.status}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {appointment.duration} min
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No upcoming appointments</p>
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarAvailable;

