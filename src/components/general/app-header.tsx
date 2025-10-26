"use client";

import { Code } from "lucide-react";
import {
  Burger,
  Container,
  Group,
  Menu,
  Flex,
  Box,
  UnstyledButton,
  Avatar,
  Text,
  Button,
  Stack,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-context";
import { useCurrentUser } from "@/hooks/query-hooks/user-management-query";

const links = [
  { link: "#features", label: "Features" },
  { link: "#workflow", label: "Course Workflow" },
  { link: "#testimonials", label: "Testimonials" },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Safely get auth state
  let isAuthenticated = false;
  let user: any = null;
  let logout: () => void = () => {};

  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    user = auth.user;
    logout = auth.signOut;
  } catch (error) {
    console.warn(`AuthProvider not available in HeaderMenu. ${error}`);
  }

  const { data: userData } = useCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: string) => {
    if (link.startsWith("#")) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(link);
    }
    if (opened) {
      toggle();
    }
  };

  const items = (
    <Flex gap="lg" align="center">
      {links.map((link) => (
        <Button
          key={link.label}
          variant="subtle"
          style={{
            fontWeight: 500,
            color: "#FFFFFF",
            transition: "all 0.2s",
          }}
          onClick={() => handleNavClick(link.link)}
        >
          {link.label}
        </Button>
      ))}
    </Flex>
  );

  return (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? "rgba(26, 26, 26, 0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(189, 240, 82, 0.1)"
          : "1px solid transparent",
        transition: "all 0.3s ease-in-out",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
      }}
    >
      <Container size="xl" py={isScrolled ? 20 : 24}>
        <Group justify="space-between" h="100%">
          <Group
            gap="xs"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Code size={32} color="#BDF052" />
            <Text
              size="xl"
              fw={800}
              style={{
                color: "#FFFFFF",
              }}
            >
              Intellicode
            </Text>
          </Group>

          <Group gap="sm" visibleFrom="sm">
            {items}
          </Group>

          <Group gap={12} visibleFrom="sm">
            {isAuthenticated ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(189, 240, 82, 0.1)",
                      border: "1px solid rgba(189, 240, 82, 0.2)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(189, 240, 82, 0.15)";
                      e.currentTarget.style.borderColor =
                        "rgba(189, 240, 82, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(189, 240, 82, 0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(189, 240, 82, 0.2)";
                    }}
                  >
                    <Avatar
                      src={userData?.profile_picture || undefined}
                      alt={user?.email || "User"}
                      size={32}
                      radius="xl"
                      style={{
                        border: "2px solid #BDF052",
                      }}
                    />
                    <Text
                      size="sm"
                      fw={600}
                      style={{
                        color: "#FFFFFF",
                      }}
                    >
                      Dashboard
                    </Text>
                    <ChevronDown size={16} color="#FFFFFF" />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>
                    {userData?.first_name || user?.email || "User"}
                  </Menu.Label>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<User size={14} />}
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<Settings size={14} />}
                    onClick={() => router.push("/dashboard")}
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    leftSection={<LogOut size={14} />}
                    onClick={logout}
                  >
                    Sign Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Button
                  variant="subtle"
                  style={{
                    color: "#fff",
                    fontWeight: 500,
                  }}
                  onClick={() => router.push("/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  style={{
                    background: "#BDF052",
                    color: "#222222",
                    fontWeight: 600,
                    border: "none",
                  }}
                  onClick={() => router.push("/sign-up")}
                >
                  Get Started
                </Button>
              </>
            )}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            color="#FFFFFF"
          />
        </Group>
      </Container>

      {/* Mobile Drawer Menu */}
      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="xl"
        withCloseButton={false}
        styles={{
          content: {
            background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
          },
          header: {
            background: "transparent",
            borderBottom: "1px solid rgba(189, 240, 82, 0.1)",
          },
        }}
        position="right"
        hiddenFrom="sm"
      >
        <Stack gap="lg" mt="xl">
          {/* Navigation Links */}
          {links.map((link) => (
            <Button
              key={link.label}
              variant="subtle"
              fullWidth
              size="lg"
              style={{
                fontWeight: 500,
                color: "#FFFFFF",
                justifyContent: "flex-start",
              }}
              onClick={() => handleNavClick(link.link)}
            >
              {link.label}
            </Button>
          ))}

          {/* Auth Section */}
          {isAuthenticated ? (
            <>
              <Box
                style={{
                  padding: "1rem",
                  background: "rgba(189, 240, 82, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(189, 240, 82, 0.1)",
                }}
              >
                <Group gap="sm">
                  <Avatar
                    src={userData?.profile_picture || undefined}
                    alt={user?.email || "User"}
                    size={40}
                    radius="xl"
                    style={{
                      border: "2px solid #BDF052",
                    }}
                  />
                  <Text c="#FFFFFF" fw={600}>
                    {userData?.first_name || user?.email || "User"}
                  </Text>
                </Group>
              </Box>

              <Button
                variant="subtle"
                fullWidth
                size="lg"
                leftSection={<User size={18} />}
                style={{
                  fontWeight: 500,
                  color: "#FFFFFF",
                  justifyContent: "flex-start",
                }}
                onClick={() => {
                  router.push("/dashboard");
                  toggle();
                }}
              >
                Dashboard
              </Button>

              <Button
                variant="subtle"
                fullWidth
                size="lg"
                leftSection={<Settings size={18} />}
                style={{
                  fontWeight: 500,
                  color: "#FFFFFF",
                  justifyContent: "flex-start",
                }}
                onClick={() => {
                  router.push("/dashboard");
                  toggle();
                }}
              >
                Settings
              </Button>

              <Button
                variant="subtle"
                fullWidth
                size="lg"
                leftSection={<LogOut size={18} />}
                style={{
                  fontWeight: 500,
                  color: "#EF4444",
                  justifyContent: "flex-start",
                }}
                onClick={() => {
                  logout();
                  toggle();
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="subtle"
                fullWidth
                size="lg"
                style={{
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
                onClick={() => {
                  router.push("/sign-in");
                  toggle();
                }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                size="lg"
                style={{
                  background: "#BDF052",
                  color: "#222222",
                  fontWeight: 600,
                  border: "none",
                }}
                onClick={() => {
                  router.push("/sign-up");
                  toggle();
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
