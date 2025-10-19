import { CodeEditor } from "@/components/code-sandbox";
import {
  Box,
  Container,
  Paper,
  Title,
  Text,
  GridCol,
  Grid,
  List,
  ListItem,
} from "@mantine/core";

export default function CodeSandboxPage() {
  return (
    <Box style={{ background: "#0d1117", minHeight: "100vh", padding: "2rem" }}>
      <Container size="xl" style={{ maxWidth: "1600px" }}>
        <Grid>
          {/* Instructions Column */}
          <GridCol span={{ base: 12, md: 4 }}>
            <Paper p="xl" style={{ background: "#161b22", height: "100%" }}>
              <Title order={2} c="white" mb="md">
                Challenge Instructions
              </Title>
              <Text c="dimmed" mb="md">
                Write a function that reverses a string.
              </Text>
              <Box mt="xl">
                <Text c="dimmed" size="sm" fw={500} mb="xs">
                  Hints:
                </Text>
                <List size="sm" c="dimmed" spacing="xs">
                  <ListItem>You can use string slicing</ListItem>
                  <ListItem>
                    Or use a loop to build the reversed string
                  </ListItem>
                  <ListItem>Don't forget to return the result!</ListItem>
                </List>
              </Box>
            </Paper>
          </GridCol>

          {/* Code Editor Column */}
          <GridCol span={{ base: 12, md: 8 }}>
            <CodeEditor
              showHeader={false}
              fullPage={false}
              useContainer={false}
              editorHeight="600px"
            />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}
