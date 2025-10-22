import { Container, Box, Button, Alert } from "@mantine/core";
import { IconArrowLeft, IconAlertCircle } from "@tabler/icons-react";
import { colors, styles } from "../styles";

interface ErrorStateProps {
  error?: Error | null;
  onBack: () => void;
}

export function ErrorState({ error, onBack }: ErrorStateProps) {
  return (
    <Box style={styles.pageContainer}>
      <Container size="xl" py="xl">
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          onClick={onBack}
          mb="xl"
          style={{ color: colors.primary }}
        >
          Back to Assignments
        </Button>
        <Alert
          icon={<IconAlertCircle size={20} />}
          title="Failed to load assignment"
          color="red"
          variant="light"
          radius="md"
        >
          {error?.message ?? "Unable to fetch assignment details. Please try again later."}
        </Alert>
      </Container>
    </Box>
  );
}
