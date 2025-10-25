"use client";

import { useAuth } from "@/providers/auth-context";
import { Stack, NavLink, Box, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Settings,
  BarChart,
  Calendar,
  Award,
  Shield,
  GraduationCap,
  User,
} from "lucide-react";
import { IconUserCog } from "@tabler/icons-react";

export function NavigationBar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Navigation items based on user role
  const getNavigationItems = () => {
    const role = user?.role;

    const commonItems = [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: `/dashboard/${role}`,
      },
    ];

    const studentItems = [
      ...commonItems,
      {
        icon: BookOpen,
        label: "My Courses",
        href: `/dashboard/${role}/courses`,
      },
      {
        icon: Award,
        label: "Certificates",
        href: `/dashboard/${role}/certificates`,
      },
      {
        icon: User,
        label: "Profile",
        href: `/dashboard/${role}/profile`,
      },
    ];

    const teacherItems = [
      ...commonItems,
      {
        icon: BookOpen,
        label: "My Courses",
        href: `/dashboard/${role}/courses`,
      },
      {
        icon: User,
        label: "Profile",
        href: `/dashboard/${role}/profile`,
      },
    ];

    const adminItems = [
      ...commonItems,
      {
        icon: IconUserCog,
        label: "User Management",
        href: `/dashboard/${role}/user-management`,
      },
      {
        icon: BookOpen,
        label: "Course Management",
        href: `/dashboard/${role}/course-management`,
      },
      {
        icon: User,
        label: "Profile",
        href: `/dashboard/${role}/profile`,
      },
    ];

    switch (role) {
      case "student":
        return studentItems;
      case "teacher":
        return teacherItems;
      case "admin":
        return adminItems;
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <Stack gap="xs">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <NavLink
            key={item.href}
            active={isActive}
            label={item.label}
            leftSection={<Icon size={20} />}
            onClick={() => router.push(item.href)}
            style={{
              borderRadius: "8px",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#b3a1ff" : "#e9eeea",
              backgroundColor: isActive ? "#b3a1ff25" : "#2a2a2a",
            }}
          />
        );
      })}
    </Stack>
  );
}
