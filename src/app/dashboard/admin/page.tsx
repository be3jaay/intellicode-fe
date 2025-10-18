"use client";

import { useAuth } from "@/providers/auth-context";
import {
  Grid,
  Paper,
  Group,
  Text,
  ThemeIcon,
  Badge,
  Stack,
  Button,
  Table,
  Avatar,
} from "@mantine/core";
import {
  BookOpen,
  FileText,
  Settings,
  UserPlus,
  Shield,
  LogOut,
  CheckCircle,
  Users,
} from "lucide-react";
import { recentActivities, stats } from "./dashboard-mock";

function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Header Section */}
        <div
          style={{
            marginBottom: "2rem",
            backgroundColor: "#BDF052",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <Group justify="space-between" align="center">
            <Group>
              <Avatar
                size="lg"
                radius="xl"
                style={{ backgroundColor: "#222222" }}
              >
                <Shield size={24} color="#BDF052" />
              </Avatar>
              <div>
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                    color: "#222222",
                  }}
                >
                  Admin Dashboard
                </h1>
                <p
                  style={{ fontSize: "0.9375rem", color: "#222222", margin: 0 }}
                >
                  {user?.firstName} {user?.lastName} • Administrator
                </p>
              </div>
            </Group>
            <Group gap="sm">
              <Button
                leftSection={<UserPlus size={18} />}
                style={{
                  backgroundColor: "#222222",
                  color: "#BDF052",
                  border: "2px solid #222222",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "#333333",
                    },
                  },
                }}
              >
                Add User
              </Button>
              <Button
                leftSection={<LogOut size={18} />}
                variant="outline"
                style={{
                  borderColor: "#222222",
                  color: "#222222",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "rgba(34, 34, 34, 0.1)",
                    },
                  },
                }}
                onClick={signOut}
              >
                Sign Out
              </Button>
            </Group>
          </Group>
        </div>

        {/* Stats Grid */}
        <Grid gutter="lg" style={{ marginBottom: "2rem" }}>
          {stats.map((stat) => (
            <Grid.Col key={stat.label} span={{ base: 12, sm: 6, md: 3 }}>
              <Paper
                style={{
                  backgroundColor: "#333333",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #444444",
                }}
              >
                <Group>
                  <ThemeIcon
                    size="xl"
                    radius="md"
                    style={{ backgroundColor: stat.color }}
                  >
                    <stat.icon size={24} />
                  </ThemeIcon>
                  <div>
                    <Text
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {stat.value}
                    </Text>
                    <Text style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>
                      {stat.label}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid gutter="lg">
          {/* Recent Activities - Table */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper
              style={{
                backgroundColor: "#333333",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #444444",
              }}
            >
              <Group justify="space-between" style={{ marginBottom: "1.5rem" }}>
                <Text
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  Recent Activities
                </Text>
                <Badge
                  style={{
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                  }}
                >
                  Live
                </Badge>
              </Group>

              <div style={{ overflow: "hidden", borderRadius: "6px" }}>
                <Table
                  highlightOnHover
                  verticalSpacing="md"
                  styles={{
                    table: {
                      backgroundColor: "#2A2A2A",
                    },
                    thead: {
                      backgroundColor: "#1F1F1F",
                    },
                    th: {
                      color: "#BDF052",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      padding: "1rem",
                    },
                    td: {
                      color: "#FFFFFF",
                      padding: "1rem",
                      fontSize: "0.9375rem",
                      borderBottom: "1px solid #3A3A3A",
                    },
                    tbody: {
                      tr: {
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#3A3A3A !important",
                        },
                      },
                    },
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Action</Table.Th>
                      <Table.Th>User</Table.Th>
                      <Table.Th>Time</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {recentActivities.map((activity, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{activity.action}</Table.Td>
                        <Table.Td style={{ color: "#E9EEEA" }}>
                          {activity.user}
                        </Table.Td>
                        <Table.Td>
                          <Text
                            style={{
                              fontSize: "0.875rem",
                              color: "#9CA3AF",
                            }}
                          >
                            {activity.time}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Paper>
          </Grid.Col>

          {/* Sidebar - Quick Actions & System Status */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              {/* Quick Actions */}
              <Paper
                style={{
                  backgroundColor: "#333333",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #444444",
                }}
              >
                <Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "1rem",
                  }}
                >
                  Quick Actions
                </Text>
                <Stack gap="sm">
                  <Button
                    fullWidth
                    leftSection={<UserPlus size={18} />}
                    style={{
                      backgroundColor: "#BDF052",
                      color: "#222222",
                    }}
                    styles={{
                      root: {
                        "&:hover": { backgroundColor: "#A8D944" },
                      },
                    }}
                  >
                    Add Student
                  </Button>
                  <Button
                    fullWidth
                    leftSection={<BookOpen size={18} />}
                    variant="outline"
                    style={{
                      borderColor: "#BDF052",
                      color: "#BDF052",
                    }}
                    styles={{
                      root: {
                        "&:hover": {
                          backgroundColor: "rgba(189, 240, 82, 0.1)",
                        },
                      },
                    }}
                  >
                    Create Course
                  </Button>
                  <Button
                    fullWidth
                    leftSection={<CheckCircle size={18} />}
                    variant="outline"
                    style={{
                      borderColor: "#BDF052",
                      color: "#BDF052",
                    }}
                    styles={{
                      root: {
                        "&:hover": {
                          backgroundColor: "rgba(189, 240, 82, 0.1)",
                        },
                      },
                    }}
                    component="a"
                    href="/dashboard/admin/course-management"
                  >
                    Course Approvals
                  </Button>
                  <Button
                    fullWidth
                    leftSection={<Users size={18} />}
                    variant="outline"
                    style={{
                      borderColor: "#BDF052",
                      color: "#BDF052",
                    }}
                    styles={{
                      root: {
                        "&:hover": {
                          backgroundColor: "rgba(189, 240, 82, 0.1)",
                        },
                      },
                    }}
                    component="a"
                    href="/dashboard/admin/user-management"
                  >
                    User Management
                  </Button>
                  <Button
                    fullWidth
                    leftSection={<FileText size={18} />}
                    variant="outline"
                    style={{
                      borderColor: "#BDF052",
                      color: "#BDF052",
                    }}
                    styles={{
                      root: {
                        "&:hover": {
                          backgroundColor: "rgba(189, 240, 82, 0.1)",
                        },
                      },
                    }}
                  >
                    Generate Report
                  </Button>
                  <Button
                    fullWidth
                    leftSection={<Settings size={18} />}
                    variant="outline"
                    style={{
                      borderColor: "#BDF052",
                      color: "#BDF052",
                    }}
                    styles={{
                      root: {
                        "&:hover": {
                          backgroundColor: "rgba(189, 240, 82, 0.1)",
                        },
                      },
                    }}
                  >
                    System Settings
                  </Button>
                </Stack>
              </Paper>

              {/* System Status */}
              <Paper
                style={{
                  backgroundColor: "#333333",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #444444",
                }}
              >
                <Group style={{ marginBottom: "1rem" }}>
                  <ThemeIcon
                    size="lg"
                    radius="md"
                    style={{ backgroundColor: "#BDF052" }}
                  >
                    <Shield size={20} color="#222222" />
                  </ThemeIcon>
                  <Text
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    System Status
                  </Text>
                </Group>
                <Stack gap="sm">
                  <Group
                    justify="space-between"
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#2A2A2A",
                      borderRadius: "6px",
                    }}
                  >
                    <Text style={{ fontSize: "0.875rem", color: "#E9EEEA" }}>
                      Server Status
                    </Text>
                    <Badge
                      style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
                    >
                      Online
                    </Badge>
                  </Group>
                  <Group
                    justify="space-between"
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#2A2A2A",
                      borderRadius: "6px",
                    }}
                  >
                    <Text style={{ fontSize: "0.875rem", color: "#E9EEEA" }}>
                      Database
                    </Text>
                    <Badge
                      style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
                    >
                      Healthy
                    </Badge>
                  </Group>
                  <Group
                    justify="space-between"
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#2A2A2A",
                      borderRadius: "6px",
                    }}
                  >
                    <Text style={{ fontSize: "0.875rem", color: "#E9EEEA" }}>
                      API Status
                    </Text>
                    <Badge
                      style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
                    >
                      Active
                    </Badge>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </main>
    </div>
  );
}

export default AdminDashboard;
