"use client";
import {
  Box,
  Paper,
  Stack,
  Text,
  Button,
  Divider,
  Group,
  Badge,
  Progress,
  Title,
} from "@mantine/core";
import {
  IconCheck,
  IconArrowLeft,
  IconTrophy,
  IconTarget,
  IconClock,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type Answer = {
  id: string;
  submission_id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
  points_earned: number;
  created_at: string;
};

type SubmittedResultProps = {
  score: number;
  finalScore: number;
  submittedAt?: string;
  answers?: Answer[];
  courseId?: string;
};

export function SubmittedResult({
  score,
  finalScore,
  submittedAt,
  answers = [],
  courseId,
}: SubmittedResultProps) {
  const router = useRouter();
  const percentage =
    finalScore > 0 ? Math.round((score / finalScore) * 100) : 0;
  const correctAnswers = answers.filter((a) => a.is_correct).length;
  const totalQuestions = answers.length;

  const getPerformanceColor = () => {
    if (percentage >= 90) return "green";
    if (percentage >= 75) return "teal";
    if (percentage >= 60) return "yellow";
    if (percentage >= 50) return "orange";
    return "red";
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding Performance! 🌟";
    if (percentage >= 75) return "Great Job! 🎯";
    if (percentage >= 60) return "Good Work! 👍";
    if (percentage >= 50) return "Keep Practicing! 📚";
    return "More Practice Needed 💪";
  };

  const handleBackToCourse = () => {
    if (courseId) {
      router.push(
        `http://localhost:3000/dashboard/student/courses/${courseId}`
      );
    } else {
      router.back();
    }
  };

  return (
    <Paper
      shadow="xl"
      p="xl"
      radius="lg"
      style={{
        maxWidth: "600px",
        background: "rgba(34, 34, 34, 0.8)",
        border: "2px solid rgba(189, 240, 82, 0.3)",
      }}
    >
      <Stack gap="xl">
        {/* Success Icon and Header */}
        <Stack align="center" gap="md">
          <Box
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(34, 197, 94, 0.3)",
            }}
          >
            <IconCheck size={50} color="#ffffff" stroke={3} />
          </Box>
          <Title order={2} c="green.4" ta="center">
            Quiz Submitted Successfully!
          </Title>
          <Text size="sm" c="dimmed" ta="center">
            {getPerformanceMessage()}
          </Text>
        </Stack>

        <Divider color="rgba(189, 240, 82, 0.2)" />

        {/* Score Section */}
        <Stack gap="md">
          <Group justify="center" gap="xl">
            <Stack align="center" gap="xs">
              <IconTrophy size={24} color="#BDF052" />
              <Text size="xs" c="dimmed" tt="uppercase">
                Your Score
              </Text>
              <Text size="xl" fw={700} c={getPerformanceColor()}>
                {score} / {finalScore}
              </Text>
            </Stack>

            <Stack align="center" gap="xs">
              <IconTarget size={24} color="#BDF052" />
              <Text size="xs" c="dimmed" tt="uppercase">
                Percentage
              </Text>
              <Text size="xl" fw={700} c={getPerformanceColor()}>
                {percentage}%
              </Text>
            </Stack>

            {totalQuestions > 0 && (
              <Stack align="center" gap="xs">
                <IconCheck size={24} color="#BDF052" />
                <Text size="xs" c="dimmed" tt="uppercase">
                  Correct
                </Text>
                <Text size="xl" fw={700} c={getPerformanceColor()}>
                  {correctAnswers} / {totalQuestions}
                </Text>
              </Stack>
            )}
          </Group>

          {/* Progress Bar */}
          <Box>
            <Progress
              value={percentage}
              size="lg"
              radius="xl"
              color={getPerformanceColor()}
              striped
              animated
            />
          </Box>
        </Stack>

        <Divider color="rgba(189, 240, 82, 0.2)" />

        {/* Submission Details */}
        <Stack gap="xs">
          <Group justify="space-between">
            <Group gap="xs">
              <IconClock size={16} color="#BDF052" />
              <Text size="sm" c="white">
                Submitted At
              </Text>
            </Group>
            <Text size="sm" fw={500}>
              {submittedAt
                ? new Date(submittedAt).toLocaleString()
                : "Just now"}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Status
            </Text>
            <Badge color="green" variant="light" size="lg">
              Submitted
            </Badge>
          </Group>
        </Stack>

        <Divider color="rgba(189, 240, 82, 0.2)" />

        {/* Action Button */}
        <Button
          fullWidth
          size="lg"
          leftSection={<IconArrowLeft size={20} />}
          onClick={handleBackToCourse}
          variant="light"
          color="lime"
          style={{
            background: "rgba(189, 240, 82, 0.1)",
            border: "1px solid rgba(189, 240, 82, 0.3)",
          }}
        >
          Back to Course
        </Button>
      </Stack>
    </Paper>
  );
}
