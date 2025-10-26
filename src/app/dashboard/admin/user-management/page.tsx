"use client";

import { useState } from "react";
import { Group, Text, Button, Card, Tabs, Badge, Stack } from "@mantine/core";
import { Users, UserCheck, UserX, RefreshCw, Plus } from "lucide-react";
import {
  useUsers,
  usePendingApprovals,
  useSuspendedUsers,
  useSuspendUser,
  useApproveInstructor,
} from "@/hooks/query-hooks/user-management-query";
import {
  UserProfile,
  UserManagementQuery,
  SuspendUserRequest,
  ApproveInstructorRequest,
} from "@/services/user-service/user-management-types";
import { UserManagementTable } from "@/components/dashboard/admin/user-management-table";
import { UserProfileCard } from "@/components/ui/user-profile-card";
import { SuspendUserModal } from "@/components/dashboard/admin/suspend-user-modal";
import { ApproveInstructorModal } from "@/components/dashboard/admin/approve-instructor-modal";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Modal states
  const [suspendModal, setSuspendModal] = useState<{
    opened: boolean;
    user: UserProfile | null;
  }>({ opened: false, user: null });

  const [approveModal, setApproveModal] = useState<{
    opened: boolean;
    user: UserProfile | null;
  }>({ opened: false, user: null });

  // Query parameters
  const queryParams: UserManagementQuery = {
    page: currentPage > 0 ? currentPage : 1,
    limit: pageSize > 0 ? pageSize : 10,
    search: searchQuery || undefined,
    role: (roleFilter as "student" | "teacher" | "admin") || undefined,
    isSuspended:
      statusFilter === "suspended"
        ? true
        : statusFilter === "active"
        ? false
        : undefined,
  };

  const {
    data: usersData,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useUsers(queryParams);
  const {
    data: pendingApprovals,
    isLoading: pendingLoading,
    refetch: refetchPending,
  } = usePendingApprovals();
  const {
    data: suspendedUsers,
    isLoading: suspendedLoading,
    refetch: refetchSuspended,
  } = useSuspendedUsers();

  // Mutations
  const suspendUserMutation = useSuspendUser();
  const approveInstructorMutation = useApproveInstructor();

  const handleAction = (action: string, user: UserProfile) => {
    switch (action) {
      case "suspend":
        setSuspendModal({ opened: true, user });
        break;
      case "unsuspend":
        setSuspendModal({ opened: true, user });
        break;
      case "approve":
        setApproveModal({ opened: true, user });
        break;
      case "reject":
        setApproveModal({ opened: true, user });
        break;
      case "edit":
        // Handle edit user
        break;
      case "delete":
        // Handle delete user
        break;
    }
  };

  const handleSuspendUser = async (data: SuspendUserRequest) => {
    if (!suspendModal.user) return;

    try {
      await suspendUserMutation.mutateAsync({
        userId: suspendModal.user.id,
        data,
      });
      setSuspendModal({ opened: false, user: null });
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const handleApproveInstructor = async (data: ApproveInstructorRequest) => {
    if (!approveModal.user) return;

    try {
      await approveInstructorMutation.mutateAsync({
        userId: approveModal.user.id,
        data,
      });
      setApproveModal({ opened: false, user: null });
    } catch (error) {
      console.error("Error approving instructor:", error);
    }
  };

  const handleRefresh = () => {
    refetchUsers();
    refetchPending();
    refetchSuspended();
  };

  const users = usersData?.users || [];
  const totalUsers = usersData?.total || 0;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Header Section */}
        <Card
          style={{
            background: "linear-gradient(135deg, #BDF052 0%, #A8D944 100%)",
            border: "none",
            borderRadius: "16px",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
          padding="xl"
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "150px",
              height: "150px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
            }}
          />
          <Group
            justify="space-between"
            align="center"
            style={{ position: "relative", zIndex: 1 }}
          >
            <Group>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  backgroundColor: "#0F0F0F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Users size={28} color="#BDF052" />
              </div>
              <div>
                <Text
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                    color: "#0F0F0F",
                    lineHeight: 1.2,
                  }}
                >
                  User Management
                </Text>
                <Group gap="lg">
                  <Group gap="xs">
                    <Users size={16} color="#0F0F0F" />
                    <Text
                      style={{
                        fontSize: "1rem",
                        color: "#0F0F0F",
                        fontWeight: 500,
                      }}
                    >
                      {totalUsers} Total Users
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <UserCheck size={16} color="#0F0F0F" />
                    <Text
                      style={{
                        fontSize: "1rem",
                        color: "#0F0F0F",
                        fontWeight: 500,
                      }}
                    >
                      {Array.isArray(pendingApprovals)
                        ? pendingApprovals.length
                        : 0}{" "}
                      Pending Approvals
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <UserX size={16} color="#0F0F0F" />
                    <Text
                      style={{
                        fontSize: "1rem",
                        color: "#0F0F0F",
                        fontWeight: 500,
                      }}
                    >
                      {Array.isArray(suspendedUsers)
                        ? suspendedUsers.length
                        : 0}{" "}
                      Suspended
                    </Text>
                  </Group>
                </Group>
              </div>
            </Group>
            <Group gap="sm">
              <Button
                leftSection={<RefreshCw size={16} />}
                onClick={handleRefresh}
                style={{
                  backgroundColor: "#0F0F0F",
                  color: "#BDF052",
                  border: "2px solid #0F0F0F",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "#1A1A1A",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  },
                }}
              >
                Refresh
              </Button>
            </Group>
          </Group>
        </Card>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value || "all")}
          styles={{
            tab: {
              color: "#9CA3AF",
              "&[dataActive]": {
                color: "#BDF052",
                borderColor: "#BDF052",
              },
            },
            panel: {
              paddingTop: "1.5rem",
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="all" leftSection={<Users size={16} />}>
              All Users
              <Badge
                size="sm"
                style={{
                  backgroundColor: "#2D2D2D",
                  color: "#BDF052",
                  marginLeft: "0.5rem",
                }}
              >
                {totalUsers}
              </Badge>
            </Tabs.Tab>
            <Tabs.Tab value="pending" leftSection={<UserCheck size={16} />}>
              Pending Approvals
              <Badge
                size="sm"
                style={{
                  backgroundColor: "#F59E0B",
                  color: "#FFFFFF",
                  marginLeft: "0.5rem",
                }}
              >
                {Array.isArray(pendingApprovals) ? pendingApprovals.length : 0}
              </Badge>
            </Tabs.Tab>
            <Tabs.Tab value="suspended" leftSection={<UserX size={16} />}>
              Suspended Users
              <Badge
                size="sm"
                style={{
                  backgroundColor: "#EF4444",
                  color: "#FFFFFF",
                  marginLeft: "0.5rem",
                }}
              >
                {Array.isArray(suspendedUsers) ? suspendedUsers.length : 0}
              </Badge>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all">
            <UserManagementTable
              users={users}
              total={totalUsers}
              page={currentPage}
              limit={pageSize}
              loading={usersLoading}
              onPageChange={setCurrentPage}
              onLimitChange={setPageSize}
              onSearch={setSearchQuery}
              onRoleFilter={setRoleFilter}
              onStatusFilter={setStatusFilter}
              onAction={handleAction}
              onRefresh={handleRefresh}
              selectedUsers={selectedUsers}
              onSelectionChange={setSelectedUsers}
            />
          </Tabs.Panel>

          <Tabs.Panel value="pending">
            <Stack gap="md">
              {Array.isArray(pendingApprovals) &&
                pendingApprovals.map((user) => (
                  <UserProfileCard
                    key={user.id}
                    user={user}
                    showActions={true}
                    onAction={handleAction}
                  />
                ))}
              {(!Array.isArray(pendingApprovals) ||
                pendingApprovals.length === 0) &&
                !pendingLoading && (
                  <Card
                    style={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid #2D2D2D",
                      borderRadius: "12px",
                      padding: "3rem",
                      textAlign: "center",
                    }}
                  >
                    <Text style={{ color: "#9CA3AF", fontSize: "1.125rem" }}>
                      No pending instructor approvals
                    </Text>
                  </Card>
                )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="suspended">
            <Stack gap="md">
              {Array.isArray(suspendedUsers) &&
                suspendedUsers.map((user) => (
                  <UserProfileCard
                    key={user.id}
                    user={user}
                    showActions={true}
                    onAction={handleAction}
                  />
                ))}
              {(!Array.isArray(suspendedUsers) ||
                suspendedUsers.length === 0) &&
                !suspendedLoading && (
                  <Card
                    style={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid #2D2D2D",
                      borderRadius: "12px",
                      padding: "3rem",
                      textAlign: "center",
                    }}
                  >
                    <Text style={{ color: "#9CA3AF", fontSize: "1.125rem" }}>
                      No suspended users
                    </Text>
                  </Card>
                )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </main>

      {/* Modals */}
      <SuspendUserModal
        user={suspendModal.user}
        opened={suspendModal.opened}
        onClose={() => setSuspendModal({ opened: false, user: null })}
        onConfirm={handleSuspendUser}
        isLoading={suspendUserMutation.isPending}
      />

      <ApproveInstructorModal
        user={approveModal.user}
        opened={approveModal.opened}
        onClose={() => setApproveModal({ opened: false, user: null })}
        onConfirm={handleApproveInstructor}
        isLoading={approveInstructorMutation.isPending}
      />
    </div>
  );
}
