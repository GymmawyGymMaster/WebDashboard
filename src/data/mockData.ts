// Mock data for the fitness management system

// Dashboard Overview Interfaces
export interface SubscriptionStatus {
  isExpiring: boolean;
  daysLeft: number;
  hoursLeft: number;
  remainingPercentage: number;
}

export interface ClientStatusBreakdown {
  active: { count: number; percentage: number };
  onHold: { count: number; percentage: number };
  prestart: { count: number; percentage: number };
  expired: { count: number; percentage: number };
  refunded: { count: number; percentage: number };
  noSubscription: { count: number; percentage: number };
  total: number;
}

export interface BusinessGrowth {
  dailyNewClients: { count: number; percentage: number };
  dailyRenewals: { count: number; percentage: number };
}

export interface PlanStatus {
  diet: { current: number; total: number };
  resistance: { current: number; total: number };
  fitness: { current: number; total: number };
  mobility: { current: number; total: number };
}

export interface DashboardMetrics {
  subscription: SubscriptionStatus;
  clientBreakdown: ClientStatusBreakdown;
  businessGrowth: BusinessGrowth;
  planStatus: PlanStatus;
  activeClients: number;
  activeTeamMembers: number;
  totalClients: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'on-hold' | 'prestart' | 'expired' | 'refunded' | 'no-subscription';
  joinDate: string;
  avatar?: string;
  program?: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'training' | 'assessment' | 'follow-up';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  coach: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: 'website' | 'referral' | 'social' | 'ads' | 'other';
  assignedTo?: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
  category: string;
}

export interface FollowUp {
  id: string;
  clientId: string;
  clientName: string;
  type: 'check-in' | 'assessment' | 'payment' | 'program-update' | 'other';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  description: string;
  assignedTo: string;
  createdAt: string;
}

export interface ReminderType {
  id: string;
  name: string;
  description: string;
  category: 'warning' | 'success' | 'info' | 'error' | 'timeout' | 'custom';
  color: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay: boolean;
  type: 'appointment' | 'meeting' | 'reminder' | 'task';
  status: 'scheduled' | 'completed' | 'cancelled';
  color: string;
  attendees?: string[];
  location?: string;
}

// Mock Clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    joinDate: '2024-01-15',
    program: 'Weight Loss Program',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    joinDate: '2024-02-20',
    program: 'Strength Training',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 (555) 345-6789',
    status: 'pending',
    joinDate: '2024-08-20',
    program: 'Nutrition Coaching',
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Sarah Johnson',
    date: '2024-08-26',
    time: '09:00',
    duration: 60,
    type: 'training',
    status: 'scheduled',
    coach: 'Alex Rodriguez',
    notes: 'Focus on lower body strength',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Mike Chen',
    date: '2024-08-26',
    time: '14:30',
    duration: 45,
    type: 'consultation',
    status: 'scheduled',
    coach: 'Jessica Smith',
    notes: 'Initial consultation for new program',
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Emma Davis',
    date: '2024-08-27',
    time: '10:00',
    duration: 30,
    type: 'assessment',
    status: 'scheduled',
    coach: 'Alex Rodriguez',
    notes: 'Body composition assessment',
  },
  {
    id: '4',
    clientId: '1',
    clientName: 'Sarah Johnson',
    date: '2024-08-28',
    time: '16:00',
    duration: 60,
    type: 'training',
    status: 'scheduled',
    coach: 'Alex Rodriguez',
  },
  {
    id: '5',
    clientId: '2',
    clientName: 'Mike Chen',
    date: '2024-08-25',
    time: '11:00',
    duration: 60,
    type: 'training',
    status: 'completed',
    coach: 'Jessica Smith',
    notes: 'Great progress on bench press',
  },
  {
    id: '6',
    clientId: '4',
    clientName: 'David Wilson',
    date: '2024-08-26',
    time: '08:00',
    duration: 45,
    type: 'training',
    status: 'completed',
    coach: 'Alex Rodriguez',
    notes: 'Cardio session completed',
  },
  {
    id: '7',
    clientId: '5',
    clientName: 'Lisa Anderson',
    date: '2024-08-26',
    time: '12:00',
    duration: 60,
    type: 'consultation',
    status: 'cancelled',
    coach: 'Jessica Smith',
    notes: 'Client requested reschedule',
  },
  {
    id: '8',
    clientId: '6',
    clientName: 'Robert Brown',
    date: '2024-08-26',
    time: '15:00',
    duration: 30,
    type: 'assessment',
    status: 'no-show',
    coach: 'Alex Rodriguez',
    notes: 'Client did not show up',
  },
  {
    id: '9',
    clientId: '7',
    clientName: 'Maria Garcia',
    date: '2024-08-27',
    time: '07:30',
    duration: 60,
    type: 'training',
    status: 'scheduled',
    coach: 'Jessica Smith',
    notes: 'Morning strength training',
  },
  {
    id: '10',
    clientId: '8',
    clientName: 'James Taylor',
    date: '2024-08-27',
    time: '13:00',
    duration: 45,
    type: 'follow-up',
    status: 'scheduled',
    coach: 'Alex Rodriguez',
    notes: 'Progress review and program adjustment',
  },
  {
    id: '11',
    clientId: '9',
    clientName: 'Amanda White',
    date: '2024-08-27',
    time: '17:00',
    duration: 60,
    type: 'training',
    status: 'scheduled',
    coach: 'Jessica Smith',
    notes: 'HIIT training session',
  },
  {
    id: '12',
    clientId: '10',
    clientName: 'Christopher Lee',
    date: '2024-08-28',
    time: '09:30',
    duration: 30,
    type: 'assessment',
    status: 'scheduled',
    coach: 'Alex Rodriguez',
    notes: 'Fitness assessment for new client',
  },
  {
    id: '13',
    clientId: '11',
    clientName: 'Rachel Green',
    date: '2024-08-28',
    time: '11:00',
    duration: 60,
    type: 'consultation',
    status: 'scheduled',
    coach: 'Jessica Smith',
    notes: 'Nutrition consultation',
  },
  {
    id: '14',
    clientId: '12',
    clientName: 'Thomas Martinez',
    date: '2024-08-28',
    time: '14:00',
    duration: 45,
    type: 'training',
    status: 'scheduled',
    coach: 'Alex Rodriguez',
    notes: 'Recovery and mobility work',
  },
  {
    id: '15',
    clientId: '13',
    clientName: 'Jennifer Lopez',
    date: '2024-08-29',
    time: '08:00',
    duration: 60,
    type: 'training',
    status: 'scheduled',
    coach: 'Jessica Smith',
    notes: 'Strength training - upper body focus',
  },
];

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Jennifer Wilson',
    email: 'jennifer.wilson@email.com',
    phone: '+1 (555) 987-6543',
    status: 'new',
    source: 'website',
    createdAt: '2024-08-25',
    category: 'Weight Loss',
    notes: 'Interested in 3-month program',
  },
  {
    id: '2',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 876-5432',
    status: 'contacted',
    source: 'referral',
    assignedTo: 'Alex Rodriguez',
    createdAt: '2024-08-24',
    lastContact: '2024-08-25',
    category: 'Strength Training',
    notes: 'Referred by Sarah Johnson, looking for strength training',
  },
  {
    id: '3',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 765-4321',
    status: 'qualified',
    source: 'social',
    assignedTo: 'Jessica Smith',
    createdAt: '2024-08-23',
    lastContact: '2024-08-24',
    category: 'Nutrition',
    notes: 'Ready to start nutrition program next week',
  },
  {
    id: '4',
    name: 'Robert Taylor',
    email: 'robert.taylor@email.com',
    phone: '+1 (555) 654-3210',
    status: 'converted',
    source: 'ads',
    assignedTo: 'Alex Rodriguez',
    createdAt: '2024-08-20',
    lastContact: '2024-08-22',
    category: 'Personal Training',
    notes: 'Signed up for 6-month personal training package',
  },
  {
    id: '5',
    name: 'Michelle Garcia',
    email: 'michelle.garcia@email.com',
    phone: '+1 (555) 543-2109',
    status: 'lost',
    source: 'website',
    assignedTo: 'Jessica Smith',
    createdAt: '2024-08-18',
    lastContact: '2024-08-20',
    category: 'Group Classes',
    notes: 'Decided to go with another gym',
  },
];

// Mock Follow-ups
export const mockFollowUps: FollowUp[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Sarah Johnson',
    type: 'check-in',
    priority: 'medium',
    dueDate: '2024-08-27',
    status: 'pending',
    description: 'Weekly progress check-in and measurements',
    assignedTo: 'Alex Rodriguez',
    createdAt: '2024-08-20',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Mike Chen',
    type: 'program-update',
    priority: 'high',
    dueDate: '2024-08-26',
    status: 'overdue',
    description: 'Update workout program based on recent progress',
    assignedTo: 'Jessica Smith',
    createdAt: '2024-08-15',
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Emma Davis',
    type: 'assessment',
    priority: 'high',
    dueDate: '2024-08-28',
    status: 'pending',
    description: 'Initial fitness assessment and goal setting',
    assignedTo: 'Alex Rodriguez',
    createdAt: '2024-08-22',
  },
  {
    id: '4',
    clientId: '1',
    clientName: 'Sarah Johnson',
    type: 'payment',
    priority: 'medium',
    dueDate: '2024-08-25',
    status: 'completed',
    description: 'Monthly subscription payment reminder',
    assignedTo: 'Admin',
    createdAt: '2024-08-20',
  },
];

// Mock data for charts
export const mockLeadConversionData = [
  { name: 'New', value: 25, color: 'hsl(var(--primary))' },
  { name: 'Contacted', value: 18, color: 'hsl(var(--warning))' },
  { name: 'Qualified', value: 12, color: 'hsl(var(--success))' },
  { name: 'Converted', value: 8, color: 'hsl(var(--accent))' },
  { name: 'Lost', value: 5, color: 'hsl(var(--destructive))' },
];

// Mock Reminder Types
export const mockReminderTypes: ReminderType[] = [
  {
    id: '1',
    name: 'Warning',
    description: 'General warning notifications for important alerts',
    category: 'warning',
    color: '#f59e0b',
    icon: '⚠️',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-08-20',
    usageCount: 45,
  },
  {
    id: '2',
    name: 'Success',
    description: 'Success notifications for completed actions',
    category: 'success',
    color: '#10b981',
    icon: '✅',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-08-20',
    usageCount: 128,
  },
  {
    id: '3',
    name: 'Info',
    description: 'Informational notifications for general updates',
    category: 'info',
    color: '#3b82f6',
    icon: 'ℹ️',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-08-20',
    usageCount: 89,
  },
  {
    id: '4',
    name: 'Error',
    description: 'Error notifications for critical issues',
    category: 'error',
    color: '#ef4444',
    icon: '❌',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-08-20',
    usageCount: 12,
  },
  {
    id: '5',
    name: 'Time-out',
    description: 'Timeout notifications for expired sessions or deadlines',
    category: 'timeout',
    color: '#8b5cf6',
    icon: '⏰',
    isActive: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-08-20',
    usageCount: 67,
  },
  {
    id: '6',
    name: 'Payment Due',
    description: 'Payment reminder notifications',
    category: 'warning',
    color: '#f59e0b',
    icon: '💰',
    isActive: true,
    createdAt: '2024-03-05',
    updatedAt: '2024-08-20',
    usageCount: 34,
  },
  {
    id: '7',
    name: 'Appointment Reminder',
    description: 'Appointment reminder notifications',
    category: 'info',
    color: '#3b82f6',
    icon: '📅',
    isActive: true,
    createdAt: '2024-03-15',
    updatedAt: '2024-08-20',
    usageCount: 156,
  },
  {
    id: '8',
    name: 'Program Update',
    description: 'Program update notifications',
    category: 'success',
    color: '#10b981',
    icon: '📈',
    isActive: true,
    createdAt: '2024-04-01',
    updatedAt: '2024-08-20',
    usageCount: 78,
  },
  {
    id: '9',
    name: 'Check-in Reminder',
    description: 'Check-in reminder notifications',
    category: 'info',
    color: '#3b82f6',
    icon: '📝',
    isActive: true,
    createdAt: '2024-04-10',
    updatedAt: '2024-08-20',
    usageCount: 203,
  },
  {
    id: '10',
    name: 'Subscription Expiry',
    description: 'Subscription expiry warning notifications',
    category: 'warning',
    color: '#f59e0b',
    icon: '⏳',
    isActive: true,
    createdAt: '2024-05-01',
    updatedAt: '2024-08-20',
    usageCount: 23,
  },
  {
    id: '11',
    name: 'Custom Alert',
    description: 'Custom alert notifications',
    category: 'custom',
    color: '#6b7280',
    icon: '🔔',
    isActive: false,
    createdAt: '2024-06-01',
    updatedAt: '2024-08-20',
    usageCount: 5,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Client Appointment',
    message: 'Sarah Johnson has scheduled a new appointment for tomorrow at 10:00 AM',
    type: 'info',
    isRead: false,
    createdAt: '2024-08-26T08:30:00Z',
    actionUrl: '/calendar/appointments',
    priority: 'medium'
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Payment of $150 received from Mike Chen for monthly subscription',
    type: 'success',
    isRead: false,
    createdAt: '2024-08-26T07:15:00Z',
    actionUrl: '/finance/invoices',
    priority: 'low'
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM',
    type: 'warning',
    isRead: true,
    createdAt: '2024-08-25T16:00:00Z',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Client Check-in Overdue',
    message: 'Emma Davis has not completed her weekly check-in (3 days overdue)',
    type: 'error',
    isRead: false,
    createdAt: '2024-08-25T14:30:00Z',
    actionUrl: '/checkins',
    priority: 'high'
  },
  {
    id: '5',
    title: 'New Lead Assignment',
    message: 'New lead Jennifer Wilson has been assigned to you',
    type: 'info',
    isRead: false,
    createdAt: '2024-08-25T11:45:00Z',
    actionUrl: '/leads',
    priority: 'medium'
  },
  {
    id: '6',
    title: 'Program Update Available',
    message: 'New workout program templates are available for your clients',
    type: 'success',
    isRead: true,
    createdAt: '2024-08-24T09:20:00Z',
    actionUrl: '/workout/plans',
    priority: 'low'
  },
  {
    id: '7',
    title: 'Subscription Expiry Warning',
    message: 'Your premium subscription will expire in 7 days',
    type: 'warning',
    isRead: false,
    createdAt: '2024-08-24T08:00:00Z',
    actionUrl: '/settings',
    priority: 'high'
  },
  {
    id: '8',
    title: 'Team Meeting Reminder',
    message: 'Weekly team meeting starts in 30 minutes',
    type: 'info',
    isRead: false,
    createdAt: '2024-08-26T09:30:00Z',
    actionUrl: '/calendar',
    priority: 'medium'
  }
];

// Mock Calendar Events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Training Session - Sarah Johnson',
    description: 'Strength training focus on lower body',
    start: '2024-08-26T09:00:00Z',
    end: '2024-08-26T10:00:00Z',
    allDay: false,
    type: 'appointment',
    status: 'scheduled',
    color: '#3b82f6',
    attendees: ['Sarah Johnson'],
    location: 'Gym Studio A'
  },
  {
    id: '2',
    title: 'Consultation - Mike Chen',
    description: 'Initial consultation for new program',
    start: '2024-08-26T14:30:00Z',
    end: '2024-08-26T15:15:00Z',
    allDay: false,
    type: 'appointment',
    status: 'scheduled',
    color: '#10b981',
    attendees: ['Mike Chen'],
    location: 'Consultation Room'
  },
  {
    id: '3',
    title: 'Team Meeting',
    description: 'Weekly team meeting to discuss progress',
    start: '2024-08-26T10:00:00Z',
    end: '2024-08-26T11:00:00Z',
    allDay: false,
    type: 'meeting',
    status: 'scheduled',
    color: '#f59e0b',
    attendees: ['Alex Rodriguez', 'Jessica Smith', 'John Doe'],
    location: 'Conference Room'
  },
  {
    id: '4',
    title: 'Assessment - Emma Davis',
    description: 'Body composition assessment',
    start: '2024-08-27T10:00:00Z',
    end: '2024-08-27T10:30:00Z',
    allDay: false,
    type: 'appointment',
    status: 'scheduled',
    color: '#8b5cf6',
    attendees: ['Emma Davis'],
    location: 'Assessment Room'
  },
  {
    id: '5',
    title: 'Client Follow-up',
    description: 'Follow-up call with David Wilson',
    start: '2024-08-27T15:00:00Z',
    end: '2024-08-27T15:30:00Z',
    allDay: false,
    type: 'reminder',
    status: 'scheduled',
    color: '#ef4444',
    attendees: ['David Wilson']
  },
  {
    id: '6',
    title: 'Program Review',
    description: 'Review and update client programs',
    start: '2024-08-28T09:00:00Z',
    end: '2024-08-28T11:00:00Z',
    allDay: false,
    type: 'task',
    status: 'scheduled',
    color: '#6b7280'
  },
  {
    id: '7',
    title: 'Training Session - Lisa Anderson',
    description: 'Cardio and HIIT training',
    start: '2024-08-28T16:00:00Z',
    end: '2024-08-28T17:00:00Z',
    allDay: false,
    type: 'appointment',
    status: 'scheduled',
    color: '#3b82f6',
    attendees: ['Lisa Anderson'],
    location: 'Cardio Studio'
  },
  {
    id: '8',
    title: 'Monthly Report Due',
    description: 'Submit monthly performance report',
    start: '2024-08-29T17:00:00Z',
    end: '2024-08-29T17:00:00Z',
    allDay: true,
    type: 'task',
    status: 'scheduled',
    color: '#ef4444'
  }
];

export const mockMonthlyLeadsData = [
  { month: 'Jan', leads: 45, converted: 12 },
  { month: 'Feb', leads: 52, converted: 15 },
  { month: 'Mar', leads: 48, converted: 11 },
  { month: 'Apr', leads: 61, converted: 18 },
  { month: 'May', leads: 55, converted: 16 },
  { month: 'Jun', leads: 67, converted: 22 },
  { month: 'Jul', leads: 58, converted: 19 },
  { month: 'Aug', leads: 43, converted: 14 },
];

export const mockLeadSourceData = [
  { source: 'Website', count: 35, percentage: 51 },
  { source: 'Referral', count: 18, percentage: 26 },
  { source: 'Social Media', count: 10, percentage: 15 },
  { source: 'Ads', count: 5, percentage: 7 },
  { source: 'Other', count: 1, percentage: 1 },
];

// Dashboard Overview Mock Data
export const mockDashboardMetrics: DashboardMetrics = {
  subscription: {
    isExpiring: true,
    daysLeft: 3,
    hoursLeft: 20,
    remainingPercentage: 9,
  },
  clientBreakdown: {
    active: { count: 334, percentage: 74.06 },
    onHold: { count: 7, percentage: 1.55 },
    prestart: { count: 69, percentage: 15.30 },
    expired: { count: 37, percentage: 8.20 },
    refunded: { count: 4, percentage: 0.89 },
    noSubscription: { count: 0, percentage: 0.00 },
    total: 451,
  },
  businessGrowth: {
    dailyNewClients: { count: 0, percentage: 0 },
    dailyRenewals: { count: 0, percentage: 0 },
  },
  planStatus: {
    diet: { current: 0, total: 46 },
    resistance: { current: 0, total: 44 },
    fitness: { current: 0, total: 0 },
    mobility: { current: 0, total: 6 },
  },
  activeClients: 334,
  activeTeamMembers: 0,
  totalClients: 451,
};