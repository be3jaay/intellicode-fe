"use client";

import { useState } from "react";
import {
    Table,
    Group,
    Text,
    Avatar,
    Badge,
    ActionIcon,
    Tooltip,
    Checkbox,
    Select,
    TextInput,
    Button,
    Card,
    Stack,
    Pagination,
    Loader,
    Center,
} from "@mantine/core";
import {
    User,
    Mail,
    Calendar,
    Hash,
    BookOpen,
    Shield,
    GraduationCap,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    UserCheck,
    UserX,
    RefreshCw,
} from "lucide-react";
import { UserProfile, UserManagementQuery } from "@/services/user-service/user-management-types";
import { StatusBadge, getUserStatus } from "@/components/ui/status-badge";

interface UserManagementTableProps {
    users: UserProfile[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
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
    onPageChange,
    onLimitChange,
    onSearch,
    onRoleFilter,
    onStatusFilter,
    onAction,
    onRefresh,
    selectedUsers,
    onSelectionChange,
}: UserManagementTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        onSearch(value);
    };

    const handleRoleFilter = (value: string | null) => {
        setRoleFilter(value);
        onRoleFilter(value);
    };

    const handleStatusFilter = (value: string | null) => {
        setStatusFilter(value);
        onStatusFilter(value);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            onSelectionChange(users.map(user => user.id));
        } else {
            onSelectionChange([]);
        }
    };

    const handleSelectUser = (userId: string, checked: boolean) => {
        if (checked) {
            onSelectionChange([...selectedUsers, userId]);
        } else {
            onSelectionChange(selectedUsers.filter(id => id !== userId));
        }
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
            case 'student':
                return <GraduationCap size={16} />;
            case 'teacher':
                return <BookOpen size={16} />;
            case 'admin':
                return <Shield size={16} />;
            default:
                return <User size={16} />;
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
            }}
            padding={0}
        >
            {/* Table Header with Filters */}
            <div
                style={{
                    padding: "1.5rem",
                    borderBottom: "1px solid #2D2D2D",
                    background: "linear-gradient(90deg, #1A1A1A 0%, #0F0F0F 100%)",
                }}
            >
                <Group justify="space-between" align="center" style={{ marginBottom: "1rem" }}>
                    <Group gap="md">
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#BDF052",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <User size={20} color="#0F0F0F" />
                        </div>
                        <div>
                            <Text
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    marginBottom: "0.25rem",
                                }}
                            >
                                User Management
                            </Text>
                            <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                Manage students, instructors, and administrators
                            </Text>
                        </div>
                    </Group>
                    <Button
                        leftSection={<RefreshCw size={16} />}
                        onClick={onRefresh}
                        style={{
                            backgroundColor: "#BDF052",
                            color: "#0F0F0F",
                        }}
                        styles={{
                            root: {
                                "&:hover": {
                                    backgroundColor: "#A8D944",
                                },
                            },
                        }}
                    >
                        Refresh
                    </Button>
                </Group>

                {/* Filters */}
                <Group gap="md" wrap="wrap">
                    <TextInput
                        placeholder="Search users..."
                        leftSection={<Search size={16} color="#9CA3AF" />}
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ flex: 1, minWidth: "200px" }}
                        styles={{
                            input: {
                                backgroundColor: "#0F0F0F",
                                border: "1px solid #2D2D2D",
                                color: "#FFFFFF",
                                "&:focus": {
                                    borderColor: "#BDF052",
                                },
                            },
                        }}
                    />
                    <Select
                        placeholder="Filter by role"
                        leftSection={<Filter size={16} color="#9CA3AF" />}
                        data={[
                            { value: 'student', label: 'Students' },
                            { value: 'teacher', label: 'Instructors' },
                            { value: 'admin', label: 'Administrators' },
                        ]}
                        value={roleFilter}
                        onChange={handleRoleFilter}
                        clearable
                        style={{ minWidth: "150px" }}
                        styles={{
                            input: {
                                backgroundColor: "#0F0F0F",
                                border: "1px solid #2D2D2D",
                                color: "#FFFFFF",
                                "&:focus": {
                                    borderColor: "#BDF052",
                                },
                            },
                            dropdown: {
                                backgroundColor: "#1A1A1A",
                                border: "1px solid #2D2D2D",
                            },
                        }}
                    />
                    <Select
                        placeholder="Filter by status"
                        leftSection={<Filter size={16} color="#9CA3AF" />}
                        data={[
                            { value: 'active', label: 'Active' },
                            { value: 'suspended', label: 'Suspended' },
                            { value: 'pending_approval', label: 'Pending Approval' },
                            { value: 'rejected', label: 'Rejected' },
                        ]}
                        value={statusFilter}
                        onChange={handleStatusFilter}
                        clearable
                        style={{ minWidth: "150px" }}
                        styles={{
                            input: {
                                backgroundColor: "#0F0F0F",
                                border: "1px solid #2D2D2D",
                                color: "#FFFFFF",
                                "&:focus": {
                                    borderColor: "#BDF052",
                                },
                            },
                            dropdown: {
                                backgroundColor: "#1A1A1A",
                                border: "1px solid #2D2D2D",
                            },
                        }}
                    />
                </Group>
            </div>

            {/* Table */}
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
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
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
                            verticalAlign: "top",
                        },
                        tbody: {
                            tr: {
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: "#2A2A2A !important",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                                },
                            },
                        },
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: "40px" }}>
                                <Checkbox
                                    checked={selectedUsers.length === users.length && users.length > 0}
                                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                                />
                            </Table.Th>
                            <Table.Th>User</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Student Info</Table.Th>
                            <Table.Th>Created</Table.Th>
                            <Table.Th style={{ width: "120px" }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {users.map((user) => {
                            const status = getUserStatus(user);
                            const fullName = `${user.first_name} ${user.last_name}`.trim();

                            return (
                                <Table.Tr key={user.id}>
                                    <Table.Td>
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={(e) => handleSelectUser(user.id, e.currentTarget.checked)}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="md">
                                            <Avatar
                                                size="md"
                                                radius="md"
                                                style={{ backgroundColor: "#BDF052" }}
                                            >
                                                <User size={16} color="#0F0F0F" />
                                            </Avatar>
                                            <div>
                                                <Text
                                                    style={{
                                                        fontWeight: 700,
                                                        color: "#FFFFFF",
                                                        marginBottom: "0.25rem",
                                                    }}
                                                >
                                                    {fullName}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: "0.875rem",
                                                        color: "#9CA3AF",
                                                    }}
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
                                                backgroundColor: "#2D2D2D",
                                                color: "#BDF052",
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
                                        {user.student_number && (
                                            <Stack gap="xs">
                                                <Group gap="xs">
                                                    <Hash size={14} color="#9CA3AF" />
                                                    <Text style={{ color: "#E9EEEA", fontSize: "0.875rem" }}>
                                                        {user.student_number}
                                                    </Text>
                                                </Group>
                                                {user.section && (
                                                    <Group gap="xs">
                                                        <BookOpen size={14} color="#9CA3AF" />
                                                        <Text style={{ color: "#E9EEEA", fontSize: "0.875rem" }}>
                                                            {user.section}
                                                        </Text>
                                                    </Group>
                                                )}
                                            </Stack>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <Calendar size={16} color="#9CA3AF" />
                                            <Text
                                                style={{
                                                    fontSize: "0.875rem",
                                                    color: "#9CA3AF",
                                                }}
                                            >
                                                {formatDate(user.created_at)}
                                            </Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <Tooltip label="Edit User">
                                                <ActionIcon
                                                    size="md"
                                                    variant="outline"
                                                    style={{
                                                        borderColor: "#6B7280",
                                                        color: "#9CA3AF",
                                                    }}
                                                    onClick={() => onAction('edit', user)}
                                                >
                                                    <Edit size={16} />
                                                </ActionIcon>
                                            </Tooltip>

                                            {user.role === 'teacher' && !user.is_approved ? (
                                                <Tooltip label="Approve Instructor">
                                                    <ActionIcon
                                                        size="md"
                                                        variant="filled"
                                                        style={{
                                                            backgroundColor: "#10B981",
                                                            color: "#FFFFFF",
                                                        }}
                                                        onClick={() => onAction('approve', user)}
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
                                                        onClick={() => onAction('suspend', user)}
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
                                                        onClick={() => onAction('unsuspend', user)}
                                                    >
                                                        <UserCheck size={16} />
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div
                    style={{
                        padding: "1.5rem",
                        borderTop: "1px solid #2D2D2D",
                        background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)",
                    }}
                >
                    <Group justify="space-between" align="center">
                        <Group gap="md">
                            <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} users
                            </Text>
                            <Select
                                value={limit.toString()}
                                onChange={(value) => onLimitChange(parseInt(value || "10"))}
                                data={[
                                    { value: "10", label: "10 per page" },
                                    { value: "25", label: "25 per page" },
                                    { value: "50", label: "50 per page" },
                                    { value: "100", label: "100 per page" },
                                ]}
                                style={{ width: "120px" }}
                                styles={{
                                    input: {
                                        backgroundColor: "#0F0F0F",
                                        border: "1px solid #2D2D2D",
                                        color: "#FFFFFF",
                                    },
                                    dropdown: {
                                        backgroundColor: "#1A1A1A",
                                        border: "1px solid #2D2D2D",
                                    },
                                }}
                            />
                        </Group>
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
                                    "&[data-active]": {
                                        backgroundColor: "#BDF052",
                                        color: "#0F0F0F",
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
