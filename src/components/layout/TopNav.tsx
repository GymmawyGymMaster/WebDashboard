import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Calendar,
  MessageSquare,
  Plus,
  Search,
  Settings,
  User,
  LogOut,
  Dumbbell,
  Utensils,
  Activity,
  Heart,
  Users,
  FileText,
  Menu,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { mockNotifications } from "@/data/mockData";

interface TopNavProps {
  title: string;
  onMenuToggle: () => void;
}

export function TopNav({ title, onMenuToggle }: TopNavProps) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;

  const handleSendFeedback = () => {
    // Send feedback to server
    console.log('Sending feedback:', { title: feedbackTitle, message: feedbackMessage });
    setFeedbackTitle("");
    setFeedbackMessage("");
    setIsFeedbackOpen(false);
  };

  return (
    <header className="flex h-14 sm:h-16 items-center justify-between border-b border-border bg-card px-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
          <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-32 sm:w-48 lg:w-64 pl-10"
          />
        </div>

        {/* Feedback Button */}
        <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="hidden xl:flex">
              <MessageSquare className="h-4 w-4 mr-2" />
              Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send Feedback</DialogTitle>
              <DialogDescription>
                Share your thoughts, suggestions, or report issues. We value your feedback!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feedback-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="feedback-title"
                  value={feedbackTitle}
                  onChange={(e) => setFeedbackTitle(e.target.value)}
                  placeholder="Brief title for your feedback"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feedback-message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="feedback-message"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Describe your feedback in detail..."
                  className="col-span-3 min-h-[120px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFeedbackOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendFeedback} disabled={!feedbackTitle.trim() || !feedbackMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Calendar Button */}
        <Button variant="outline" size="sm" className="hidden xl:flex">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                <div className="flex items-start gap-2 w-full">
                  <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center">
              <Link to="/notifications" className="w-full">View All Notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Create New Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gradient-primary hidden sm:flex">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Create New</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Utensils className="h-4 w-4 mr-2" />
              Diet Plan
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Dumbbell className="h-4 w-4 mr-2" />
              Resistance Workout
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Activity className="h-4 w-4 mr-2" />
              Fitness Plan
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart className="h-4 w-4 mr-2" />
              Mobility Plan
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="h-4 w-4 mr-2" />
              Team Member
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              Invoice
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              Appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Create Button */}
        <Button className="bg-gradient-primary sm:hidden" size="icon">
          <Plus className="h-4 w-4" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 pl-1 sm:pl-2">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs sm:text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <span className="hidden xl:block text-sm font-medium">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-destructive">
              <Link to="/login" className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}