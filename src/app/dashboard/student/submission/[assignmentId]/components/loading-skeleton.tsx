import { Container, Grid, Paper, Skeleton, Stack, Group, Box, Divider } from "@mantine/core";
import { colors, styles } from "../styles";

export function LoadingSkeleton() {
  return (
    <Box style={styles.pageContainer}>
      <Container size="xl" py="xl">
        <Skeleton height={40} width={200} mb="xl" />
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p="xl" radius="lg" style={styles.paper}>
              <Stack gap="lg">
                <Group gap="md">
                  <Skeleton height={56} width={56} radius="md" />
                  <Box style={{ flex: 1 }}>
                    <Skeleton height={24} width="60%" mb={8} />
                    <Skeleton height={16} width="40%" />
                  </Box>
                </Group>
                <Divider color={colors.border} />
                <Skeleton height={100} />
              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="lg" radius="lg" style={styles.paper}>
              <Stack gap="md">
                <Skeleton height={24} width="60%" />
                <Skeleton height={44} />
                <Skeleton height={44} />
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
