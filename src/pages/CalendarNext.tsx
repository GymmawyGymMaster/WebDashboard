import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAppointments, type Appointment } from "@/data/mockData";
import { Clock, User, Calendar, MapPin, Phone, Mail, Search } from "lucide-react";
import { useState } from "react";

const CalendarNext = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter to show only upcoming appointments
  const upcomingAppointments = mockAppointments.filter(
    (appointment) => {
      const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`);
      return appointmentDateTime > new Date() && appointment.status === 'scheduled';
    }
  ).sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  const filteredAppointments = upcomingAppointments.filter((appointment) => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.coach.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || appointment.type === typeFilter;
    
    if (timeFilter === "today") {
      const today = new Date().toISOString().split('T')[0];
      return appointment.date === today && matchesSearch && matchesType;
    } else if (timeFilter === "week") {
      const appointmentDate = new Date(appointment.date);
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      return appointmentDate <= weekFromNow && matchesSearch && matchesType;
    }
    
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: Appointment['type']) => {
    switch (type) {
      case 'training':
        return 'border-primary bg-primary/10 text-primary';
      case 'consultation':
        return 'border-success bg-success/10 text-success';
      case 'assessment':
        return 'border-warning bg-warning/10 text-warning';
      case 'follow-up':
        return 'border-accent bg-accent/10 text-accent';
      default:
        return 'border-muted bg-muted/10 text-muted-foreground';
    }
  };

  const getTimeUntil = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const diffMs = appointmentDateTime.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `In ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else {
      return `In ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    }
  };

  const todayCount = upcomingAppointments.filter(
    a => a.date === new Date().toISOString().split('T')[0]
  ).length;

  const thisWeekCount = upcomingAppointments.filter(a => {
    const appointmentDate = new Date(a.date);
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return appointmentDate <= weekFromNow;
  }).length;

  return (
    <DashboardLayout title="Next Appointments">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <>
                  <div className="text-2xl font-bold text-primary">
                    {getTimeUntil(upcomingAppointments[0].date, upcomingAppointments[0].time)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {upcomingAppointments[0].clientName}
                  </p>
                </>
              ) : (
                <div className="text-2xl font-bold text-muted-foreground">None</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{todayCount}</div>
              <p className="text-xs text-muted-foreground">Appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <User className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{thisWeekCount}</div>
              <p className="text-xs text-muted-foreground">Appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">All future</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <CardTitle>Upcoming Appointments</CardTitle>
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                  <p>There are no appointments matching your current filters.</p>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-6 border-l-4 rounded-lg border bg-card hover:shadow-md transition-shadow ${getTypeColor(appointment.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold">{appointment.clientName}</h3>
                          <Badge variant="outline" className="capitalize">
                            {appointment.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time} ({appointment.duration} min)</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{appointment.coach}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="flex items-start space-x-2 text-sm">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{appointment.notes}</span>
                          </div>
                        )}

                        <div className="flex items-center space-x-1 text-sm font-medium text-primary">
                          <Clock className="h-4 w-4" />
                          <span>{getTimeUntil(appointment.date, appointment.time)}</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                        <Button variant="default" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalendarNext;