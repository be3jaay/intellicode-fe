import { BookOpen, Shield, TrendingUp, Users } from "lucide-react";

export const stats = [
  { label: "Total Students", value: "1,234", icon: Users, color: "#3B82F6" },
  { label: "Total Courses", value: "45", icon: BookOpen, color: "#10B981" },
  { label: "Instructors", value: "28", icon: Shield, color: "#F59E0B" },
  {
    label: "Enrollments",
    value: "3,456",
    icon: TrendingUp,
    color: "#EF4444",
  },
];

export const recentActivities = [
  {
    action: "New student enrolled",
    user: "John Doe",
    time: "5 minutes ago",
  },
  { action: "Course created", user: "Dr. Smith", time: "1 hour ago" },
  {
    action: "Assignment submitted",
    user: "Jane Smith",
    time: "2 hours ago",
  },
  { action: "Grade updated", user: "Prof. Johnson", time: "3 hours ago" },
  {
    action: "New instructor approved",
    user: "Dr. Williams",
    time: "4 hours ago",
  },
];
