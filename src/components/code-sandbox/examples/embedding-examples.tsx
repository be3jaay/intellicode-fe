/**
 * Simple examples of embedding CodeEditor component
 */

import { CodeEditor } from "../code-editor";
import {
  Box,
  Container,
  Title,
  Text,
  Paper,
  Grid,
  GridCol,
} from "@mantine/core";

// ============================================
// Example 1: Embedded with content above and below
// ============================================
export function EmbeddedExample() {
  return (
    <Box style={{ background: "#0d1117", minHeight: "100vh", padding: "2rem" }}>
      <Container size="xl">
        <Title order={1} c="white" mb="xl">
          Python Programming Lesson
        </Title>

        <Paper p="xl" mb="xl" style={{ background: "#161b22" }}>
          <Title order={2} c="white" mb="md">
            Introduction to Functions
          </Title>
          <Text c="dimmed">
            Functions are reusable blocks of code. Try the code below!
          </Text>
        </Paper>

        <CodeEditor
          title="Practice Area"
          initialLanguage="python"
          fullPage={false}
          editorHeight="400px"
        />

        <Paper p="xl" mt="xl" style={{ background: "#161b22" }}>
          <Title order={3} c="white" mb="md">
            Next Steps
          </Title>
          <Text c="dimmed">
            Try creating your own function that calculates the area of a circle.
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

// ============================================
// Example 2: Side-by-side layout
// ============================================
export function SideBySideExample() {
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
              <Text c="dimmed" size="sm" mt="xl">
                <strong>Hints:</strong>
                <ul>
                  <li>You can use string slicing</li>
                  <li>Or use a loop to build the reversed string</li>
                  <li>Don&apos;t forget to return the result!</li>
                </ul>
              </Text>
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

// ============================================
// Example 3: Compact mode
// ============================================
export function CompactExample() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">
        Quick Code Test
      </Title>
      <Text mb="xl" c="dimmed">
        Test your JavaScript code snippets:
      </Text>

      <CodeEditor
        showHeader={false}
        fullPage={false}
        editorHeight="300px"
        initialLanguage="javascript"
      />
    </Container>
  );
}

// ============================================
// Example 4: Multiple editors
// ============================================
export function MultipleEditorsExample() {
  return (
    <Box style={{ background: "#0d1117", minHeight: "100vh", padding: "2rem" }}>
      <Container size="xl">
        <Title order={1} c="white" mb="xl">
          Compare Languages
        </Title>

        <Box mb="xl">
          <Title order={3} c="white" mb="md">
            JavaScript
          </Title>
          <CodeEditor
            showHeader={false}
            fullPage={false}
            initialLanguage="javascript"
            editorHeight="350px"
          />
        </Box>

        <Box>
          <Title order={3} c="white" mb="md">
            Python
          </Title>
          <CodeEditor
            showHeader={false}
            fullPage={false}
            initialLanguage="python"
            editorHeight="350px"
          />
        </Box>
      </Container>
    </Box>
  );
}

// ============================================
// Example 5: In a card
// ============================================
export function CardExample() {
  return (
    <Container size="md" py="xl">
      <Paper
        shadow="lg"
        radius="md"
        p="xl"
        style={{ background: "#161b22", border: "1px solid #30363d" }}
      >
        <Title order={2} c="white" mb="md">
          Code Challenge #1
        </Title>
        <Text c="dimmed" mb="lg">
          Write a function that checks if a number is prime.
        </Text>

        <CodeEditor
          showHeader={false}
          fullPage={false}
          useContainer={false}
          editorHeight="400px"
        />
      </Paper>
    </Container>
  );
}

// ============================================
// Example 6: Full width
// ============================================
export function FullWidthExample() {
  return (
    <Box style={{ background: "#0d1117", minHeight: "100vh" }}>
      <Box p="xl">
        <Title order={1} c="white" mb="md" ta="center">
          Full Width Editor
        </Title>
      </Box>

      <CodeEditor
        showHeader={false}
        fullPage={false}
        useContainer={false}
        editorHeight="calc(100vh - 200px)"
      />
    </Box>
  );
}
