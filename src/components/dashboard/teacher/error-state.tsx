import { Box, Card, Text, Button, Stack, Center } from "@mantine/core";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <Center style={{ minHeight: "60vh" }}>
      <Card
        padding="xl"
        radius="md"
        style={{
          background: "rgba(246, 172, 174, 0.1)",
          border: "1px solid rgba(246, 172, 174, 0.3)",
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <Stack gap="md" align="center">
          <Box
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(246, 172, 174, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={30} color="#f6acae" />
          </Box>
          <Box>
            <Text size="lg" fw={600} c="#f6acae" mb={4}>
              Failed to Load Dashboard
            </Text>
            <Text size="sm" c="dimmed">
              We couldn't fetch your dashboard data. Please check your
              connection and try again.
            </Text>
          </Box>
          <Button
            leftSection={<RefreshCw size={16} />}
            onClick={onRetry}
            style={{
              background: "rgba(246, 172, 174, 0.2)",
              color: "#f6acae",
              border: "1px solid rgba(246, 172, 174, 0.3)",
              "&:hover": {
                background: "rgba(246, 172, 174, 0.3)",
              },
            }}
          >
            Try Again
          </Button>
        </Stack>
      </Card>
    </Center>
  );
}
