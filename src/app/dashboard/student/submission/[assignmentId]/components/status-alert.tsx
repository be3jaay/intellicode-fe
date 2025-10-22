import { Box, Group, Text } from "@mantine/core";
import { IconClock, IconAlertTriangle } from "@tabler/icons-react";
import { colors, styles } from "../styles";

interface StatusAlertProps {
  isDueSoon: boolean;
  isOverdue: boolean;
  dueDate: string;
}

export function StatusAlert({ isDueSoon, isOverdue, dueDate }: StatusAlertProps) {
  if (!isDueSoon && !isOverdue) return null;

  if (isDueSoon && !isOverdue) {
    return (
      <Box p="md" style={styles.dueSoonAlert}>
        <Group gap="sm">
          <IconClock size={20} color={colors.warning} />
          <Text size="sm" c={colors.warning} fw={500}>
            Due soon: {dueDate}
          </Text>
        </Group>
      </Box>
    );
  }

  if (isOverdue) {
    return (
      <Box p="md" style={styles.overdueAlert}>
        <Group gap="sm">
          <IconAlertTriangle size={20} color={colors.error} />
          <Text size="sm" c={colors.error} fw={500}>
            This assignment is overdue. Late submission penalties may apply.
          </Text>
        </Group>
      </Box>
    );
  }

  return null;
}
