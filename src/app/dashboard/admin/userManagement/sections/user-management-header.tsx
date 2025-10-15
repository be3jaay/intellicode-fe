import {
  Box,
  Container,
  Group,
  Avatar,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { IconUserPlus, IconLogout, IconUserCog } from "@tabler/icons-react";

export function UserManagementHeader() {
  const signOut = () => {
    console.log("Sign out clicked");
  };

  const user = {
    firstName: "Admin",
    lastName: "User",
  };

  return (
    <Box className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 md:p-8">
      <Container size="xl">
        <Group
          justify="space-between"
          align="center"
          className="flex-wrap gap-4"
        >
          <Group gap="sm" className="min-w-0 flex-1">
            <Avatar
              size="lg"
              radius="xl"
              color="red"
              className="w-12 h-12 md:w-12 md:h-12"
            >
              <IconUserCog size={24} />
            </Avatar>
            <Box className="min-w-0">
              <Title
                order={2}
                className="text-2xl md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis"
              >
                User Management
              </Title>
              <Text
                size="sm"
                opacity={0.9}
                className="whitespace-nowrap overflow-hidden text-ellipsis md:text-sm text-xs"
              >
                {user?.firstName} {user?.lastName} • Administrator
              </Text>
            </Box>
          </Group>
          <Group gap="xs" className="shrink-0">
            <Button
              variant="white"
              leftSection={<IconUserPlus size={16} />}
              size="sm"
              className="sm:flex hidden"
            >
              Add User
            </Button>
            <Button
              variant="white"
              size="sm"
              px="xs"
              className="flex sm:hidden"
              aria-label="Add User"
            >
              <IconUserPlus size={16} />
            </Button>
            <Button
              variant="subtle"
              color="white"
              leftSection={<IconLogout size={16} />}
              size="sm"
              className="sm:text-sm text-xs sm:py-2 sm:px-3 py-2 px-3"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
