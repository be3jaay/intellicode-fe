import { Box, Group, Text, Divider, Avatar } from "@mantine/core";
import { IconFile, IconTrophy, IconCalendar } from "@tabler/icons-react";
import { colors, styles } from "../styles";

interface AssignmentHeaderProps {
  title: string;
  instructorName: string;
  postedDate: string;
  points?: number;
  dueDate: string;
}

export function AssignmentHeader({
  title,
  instructorName,
  postedDate,
  points = 0,
  dueDate,
}: AssignmentHeaderProps) {
  return (
    <>
      <Group gap="md" wrap="nowrap">
        <Avatar size="lg" radius="md" style={styles.headerAvatar}>
          <IconFile size={28} color={colors.background} />
        </Avatar>
        <Box style={{ flex: 1 }}>
          <Text size="h2" fw={700} c={colors.text} mb={4}>
            {title}
          </Text>
          <Group gap="xs">
            <Text size="sm" c={colors.textDimmed}>
              {instructorName}
            </Text>
            <Text size="sm" c={colors.textMuted}>
              •
            </Text>
            <Text size="sm" c={colors.textDimmed}>
              Posted {postedDate}
            </Text>
          </Group>
        </Box>
      </Group>

      <Divider color={colors.border} />

      <Group gap="xl" wrap="wrap">
        <Group gap="xs">
          <IconCalendar size={18} color={colors.textDimmed} />
          <Box>
            <Text size="xs" c={colors.textMuted}>
              Due Date
            </Text>
            <Text size="sm" c={colors.text} fw={500}>
              {dueDate}
            </Text>
          </Box>
        </Group>
        <Group gap="xs">
          <IconTrophy size={18} color={colors.textDimmed} />
          <Box>
            <Text size="xs" c={colors.textMuted}>
              Points
            </Text>
            <Text size="sm" c={colors.text} fw={500}>
              {points} points
            </Text>
          </Box>
        </Group>
      </Group>
    </>
  );
}
