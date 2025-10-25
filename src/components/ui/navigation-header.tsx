"use client";

import { useAuth } from "@/providers/auth-context";
import { useNotifications } from "@/hooks/use-notifications";
import { useCurrentUser } from "@/hooks/query-hooks/user-management-query";
import {
  Box,
  Burger,
  Flex,
  Group,
  Text,
  Avatar,
  Menu,
  UnstyledButton,
  Badge,
  ScrollArea,
  ActionIcon,
  Button,
  Stack,
  Divider,
  Skeleton,
  Loader,
} from "@mantine/core";
import {
  LogOut,
  User,
  Settings,
  ChevronDown,
  Bell,
  Check,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NavigationHeaderProps {
  opened?: boolean;
  toggle?: () => void;
}

export function NavigationHeader({ opened, toggle }: NavigationHeaderProps) {
  const { user, signOut } = useAuth();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();
  const { data: userData, isLoading: isLoadingUser } = useCurrentUser();

  return (
    <Flex h="100%" px="xl" align="center" justify="space-between">
      <Group>
        {toggle && (
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="#e9eeea"
          />
        )}
        <Text
          size="xl"
          fw={700}
          style={{
            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Intellicode
        </Text>
      </Group>

      <Group gap="md">
        {/* Notifications */}
        <Box style={{ position: "relative" }}>
          <Menu shadow="md" width={400} position="bottom-end">
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                style={{ color: "#e9eeea" }}
              >
                <Bell size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <Group justify="space-between">
                  <Text size="sm" fw={600}>
                    Notifications
                  </Text>
                  {unreadCount > 0 && (
                    <Button
                      size="xs"
                      variant="subtle"
                      leftSection={<Check size={12} />}
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </Button>
                  )}
                </Group>
              </Menu.Label>
              <Menu.Divider />

              <ScrollArea.Autosize mah={300}>
                {notifications.length === 0 ? (
                  <Box p="md" ta="center">
                    <Text size="sm" c="dimmed">
                      No notifications
                    </Text>
                  </Box>
                ) : (
                  <Stack gap="xs" p="xs">
                    {notifications.map((notification) => (
                      <Box
                        key={notification.id}
                        p="sm"
                        style={{
                          borderRadius: "4px",
                          backgroundColor: notification.is_read
                            ? "transparent"
                            : "#f8f9fa",
                          border: notification.is_read
                            ? "none"
                            : "1px solid #e9ecef",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={() =>
                          !notification.is_read && markAsRead(notification.id)
                        }
                      >
                        <Group
                          justify="space-between"
                          align="flex-start"
                          wrap="nowrap"
                        >
                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text
                              size="sm"
                              fw={notification.is_read ? 400 : 600}
                            >
                              {notification.title}
                            </Text>
                            <Text size="xs" c="dimmed" mt={4}>
                              {notification.message}
                            </Text>
                            <Text size="xs" c="dimmed" mt={4}>
                              {formatDistanceToNow(
                                new Date(notification.created_at),
                                { addSuffix: true }
                              )}
                            </Text>
                          </Box>
                          <Group
                            gap={4}
                            align="center"
                            style={{ flexShrink: 0 }}
                          >
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              style={{
                                opacity: 0.7,
                                transition: "opacity 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = "1";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = "0.7";
                              }}
                            >
                              <Trash2 size={14} />
                            </ActionIcon>
                            {!notification.is_read && (
                              <Box
                                w={8}
                                h={8}
                                style={{
                                  borderRadius: "50%",
                                  backgroundColor: "#4dabf7",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </Group>
                        </Group>
                      </Box>
                    ))}
                  </Stack>
                )}
              </ScrollArea.Autosize>
            </Menu.Dropdown>
          </Menu>
          {unreadCount > 0 && (
            <Badge
              size="xs"
              color="red"
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                minWidth: 18,
                height: 18,
                borderRadius: "50%",
                fontSize: "10px",
                fontWeight: 600,
                pointerEvents: "none",
              }}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Box>

        {/* User Menu */}
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <UnstyledButton>
              <Group gap="sm">
                {isLoadingUser ? (
                  <Skeleton circle height={40} width={40} />
                ) : (
                  <Avatar
                    src={userData?.profile_picture || undefined}
                    color="lime"
                    radius="xl"
                    size="md"
                    style={{
                      background: userData?.profile_picture
                        ? undefined
                        : "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                      color: "#222222",
                    }}
                  >
                    {!userData?.profile_picture && (
                      <>
                        {userData?.first_name?.charAt(0) ||
                          user?.firstName?.charAt(0)}
                        {userData?.last_name?.charAt(0) ||
                          user?.lastName?.charAt(0)}
                      </>
                    )}
                  </Avatar>
                )}
                <Box style={{ flex: 1 }} visibleFrom="sm">
                  {isLoadingUser ? (
                    <>
                      <Skeleton height={14} width={100} mb={4} />
                      <Skeleton height={10} width={60} />
                    </>
                  ) : (
                    <>
                      <Text size="sm" fw={600} c="#e9eeea">
                        {userData?.first_name || user?.firstName}{" "}
                        {userData?.last_name || user?.lastName}
                      </Text>
                      <Text size="xs" c="#9ca3af" tt="capitalize">
                        {userData?.role || user?.role}
                      </Text>
                    </>
                  )}
                </Box>
                <ChevronDown size={16} color="#e9eeea" />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<User size={14} />}>Profile</Menu.Item>
            <Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>

            <Menu.Divider />

            <Menu.Item
              color="red"
              leftSection={<LogOut size={14} />}
              onClick={() => signOut()}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
}
