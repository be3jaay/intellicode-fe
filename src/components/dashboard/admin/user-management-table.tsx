"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Group,
  Text,
  Avatar,
  Badge,
  ActionIcon,
  Tooltip,
  TextInput,
  Card,
  Stack,
  Pagination,
  Loader,
  Center,
} from "@mantine/core";
import {
  User,
  Calendar,
  BookOpen,
  Shield,
  GraduationCap,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";
import { UserProfile } from "@/services/user-service/user-management-types";
import { StatusBadge, getUserStatus } from "@/components/ui/status-badge";
import { useDebouncedValue } from "@mantine/hooks";

export interface UserManagementTableProps {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  isRefetching?: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearch: (search: string) => void;
  onRoleFilter: (role: string | null) => void;
  onStatusFilter: (status: string | null) => void;
  onAction: (action: string, user: UserProfile) => void;
  onRefresh: () => void;
  selectedUsers: string[];
  onSelectionChange: (selectedUsers: string[]) => void;
}

export function UserManagementTable({
  users,
  total,
  page,
  limit,
  loading,
  isRefetching,
  onPageChange,
  onSearch,
  onAction,
}: UserManagementTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchQuery, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <GraduationCap size={16} />;
      case "teacher":
        return <BookOpen size={16} />;
      case "admin":
        return <Shield size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "#3B82F6";
      case "teacher":
        return "#10B981";
      case "admin":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <Card
        style={{
          backgroundColor: "#1A1A1A",
          border: "1px solid #2D2D2D",
          borderRadius: "12px",
        }}
        padding="xl"
      >
        <Center style={{ height: "400px" }}>
          <Stack align="center" gap="md">
            <Loader size="lg" color="#BDF052" />
            <Text style={{ color: "#9CA3AF" }}>Loading users...</Text>
          </Stack>
        </Center>
      </Card>
    );
  }

  return (
    <Card
      style={{
        backgroundColor: "#1A1A1A",
        border: "1px solid #2D2D2D",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
      padding={0}
    >
      {isRefetching && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 15, 15, 0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Loader size="lg" color="#BDF052" />
            <Text
              style={{
                color: "#BDF052",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Refreshing users...
            </Text>
          </div>
        </div>
      )}

      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid #2D2D2D",
          background: "#0F0F0F",
        }}
      >
        <TextInput
          placeholder="Search users by name or email..."
          leftSection={<Search size={16} color="#9CA3AF" />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          size="md"
          styles={{
            input: {
              backgroundColor: "#1A1A1A",
              border: "1px solid #2D2D2D",
              color: "#FFFFFF",
              "&:focus": {
                borderColor: "#BDF052",
              },
              "&::placeholder": {
                color: "#6B7280",
              },
            },
          }}
        />
      </div>

      <div style={{ overflow: "auto" }}>
        <Table
          highlightOnHover
          verticalSpacing="md"
          styles={{
            table: {
              backgroundColor: "transparent",
            },
            thead: {
              backgroundColor: "#0F0F0F",
            },
            th: {
              color: "#BDF052",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "1rem 1.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderBottom: "2px solid #2D2D2D",
            },
            td: {
              color: "#FFFFFF",
              padding: "1rem 1.5rem",
              fontSize: "0.9375rem",
              borderBottom: "1px solid #2D2D2D",
            },
            tr: {
              backgroundColor: "#1A1A1A",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#252525 !important",
              },
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th style={{ width: "100px", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  <Stack align="center" gap="md" py="xl">
                    <User size={48} color="#6B7280" />
                    <div>
                      <Text
                        style={{
                          color: "#9CA3AF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        No users found
                      </Text>
                      <Text
                        style={{
                          color: "#6B7280",
                          fontSize: "0.875rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {searchQuery
                          ? "Try adjusting your search"
                          : "No users available"}
                      </Text>
                    </div>
                  </Stack>
                </Table.Td>
              </Table.Tr>
            ) : (
              users.map((user) => {
                const status = getUserStatus(user);
                const fullName = `${user.first_name} ${user.last_name}`.trim();

                return (
                  <Table.Tr key={user.id}>
                    <Table.Td>
                      <Group gap="md">
                        <Avatar
                          size="md"
                          radius="md"
                          style={{ backgroundColor: "#BDF052" }}
                        >
                          <User size={18} color="#0F0F0F" />
                        </Avatar>
                        <div>
                          <Text
                            style={{
                              fontWeight: 600,
                              color: "#FFFFFF",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {fullName}
                          </Text>
                          <Text
                            style={{ fontSize: "0.875rem", color: "#9CA3AF" }}
                          >
                            {user.email}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        leftSection={getRoleIcon(user.role)}
                        style={{
                          backgroundColor: getRoleBadgeColor(user.role),
                          color: "#FFFFFF",
                          textTransform: "capitalize",
                          fontWeight: 600,
                        }}
                      >
                        {user.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <StatusBadge status={status} size="sm" />
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Calendar size={16} color="#9CA3AF" />
                        <Text
                          style={{ fontSize: "0.875rem", color: "#9CA3AF" }}
                        >
                          {formatDate(user.created_at)}
                        </Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" justify="center">
                        {user.role === "teacher" && !user.is_approved ? (
                          <Tooltip label="Approve Instructor">
                            <ActionIcon
                              size="md"
                              variant="filled"
                              style={{
                                backgroundColor: "#10B981",
                                color: "#FFFFFF",
                              }}
                              styles={{
                                root: {
                                  "&:hover": { backgroundColor: "#059669" },
                                },
                              }}
                              onClick={() => onAction("approve", user)}
                            >
                              <UserCheck size={16} />
                            </ActionIcon>
                          </Tooltip>
                        ) : !user.is_suspended ? (
                          <Tooltip label="Suspend User">
                            <ActionIcon
                              size="md"
                              variant="filled"
                              style={{
                                backgroundColor: "#EF4444",
                                color: "#FFFFFF",
                              }}
                              styles={{
                                root: {
                                  "&:hover": { backgroundColor: "#DC2626" },
                                },
                              }}
                              onClick={() => onAction("suspend", user)}
                            >
                              <UserX size={16} />
                            </ActionIcon>
                          </Tooltip>
                        ) : (
                          <Tooltip label="Unsuspend User">
                            <ActionIcon
                              size="md"
                              variant="filled"
                              style={{
                                backgroundColor: "#10B981",
                                color: "#FFFFFF",
                              }}
                              styles={{
                                root: {
                                  "&:hover": { backgroundColor: "#059669" },
                                },
                              }}
                              onClick={() => onAction("unsuspend", user)}
                            >
                              <UserCheck size={16} />
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid #2D2D2D",
            background: "#0F0F0F",
          }}
        >
          <Group justify="space-between" align="center">
            <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} users
            </Text>
            <Pagination
              total={totalPages}
              value={page}
              onChange={onPageChange}
              size="sm"
              styles={{
                control: {
                  backgroundColor: "#2D2D2D",
                  border: "1px solid #2D2D2D",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#BDF052",
                    color: "#0F0F0F",
                  },
                  "&[dataActive]": {
                    backgroundColor: "#BDF052",
                    color: "#0F0F0F",
                    fontWeight: 700,
                  },
                },
              }}
            />
          </Group>
        </div>
      )}
    </Card>
  );
}
