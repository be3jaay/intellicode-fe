"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Title,
  Select,
  Group,
  Loader,
  Paper,
  Text,
} from "@mantine/core";
import { Button } from "@/components/ui";
import { Play, Trash2, Code } from "lucide-react";
import { CodeService } from "@/services/code-service";
import { defaultCode, languageOptions, themeData } from "./code-constants";
import { CodeEditorProps } from "./types";
import { MonacoEditor } from "./monaco-editor";

export function CodeEditor({
  title = "Code Sandbox IDE",
  showHeader = true,
  initialLanguage = "javascript",
  initialCode,
  editorHeight = "500px",
  containerMaxWidth = "1400px",
  enableConsoleLog = true,
  fullPage = true,
  useContainer = true,
  initialTheme = "vs-dark",
  onRunningStateChange,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [theme, setTheme] = useState<string>(initialTheme);
  const [code, setCode] = useState<string>(
    initialCode || defaultCode[initialLanguage as keyof typeof defaultCode]
  );
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [executionInfo, setExecutionInfo] = useState<string>("");

  const handleThemeChange = async (value: string | null) => {
    if (value) {
      setTheme(value);
    }
  };

  const handleLanguageChange = (value: string | null) => {
    if (value) {
      setLanguage(value);
      setCode(defaultCode[value as keyof typeof defaultCode] || "");
      setOutput("");
      setHasError(false);
      setExecutionInfo("");
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    onRunningStateChange?.(true);
    setHasError(false);
    setOutput("Running code...");
    setExecutionInfo("");

    // Log the code being submitted
    if (enableConsoleLog) {
      console.log("🚀 Submitting code for execution:");
      console.log("Language:", language);
      console.log("Code:\n", code);
      console.log("─────────────────────────────────────");
    }

    try {
      const response = await CodeService.executeCode({
        code,
        language,
      });

      if (response.error) {
        setHasError(true);
        setOutput(response.error);
      } else {
        setHasError(false);
        setOutput(response.output || "Code executed successfully (no output)");

        if (response.time || response.memory) {
          const time = response.time ? `${response.time}s` : "N/A";
          const memory = response.memory
            ? `${Math.round(response.memory / 1024)} KB`
            : "N/A";
          setExecutionInfo(`⏱️ Time: ${time} | 💾 Memory: ${memory}`);
        }
      }
    } catch (error) {
      setHasError(true);
      setOutput(
        `Network Error: Unable to connect to the API.\n\nError details: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsRunning(false);
      onRunningStateChange?.(false);
    }
  };

  const handleClearOutput = () => {
    setOutput("");
    setHasError(false);
    setExecutionInfo("");
  };

  const content = (
    <>
      {/* Header */}
      {showHeader && (
        <Group justify="space-between" mb="xl" p="md">
          <Group gap="sm">
            <Code size={32} color="#8bc232"  />
            <Title order={1} c={theme === "light" ? "#24292f" : "white"} size="clamp(1.25rem, 2vw + 0.5rem, 2rem)">
              {title}
            </Title>
          </Group>
          {/* Action Buttons */}
          <Group>
            <Select
              data={languageOptions}
              value={language}
              onChange={handleLanguageChange}
              placeholder="Select Language"
              size="md"
              w={200}
              styles={{
                input: {
                  background: theme === "light" ? "#ffffff" : "#161b22",
                  border: theme === "light" ? "1px solid #d0d7de" : "1px solid #30363d",
                  color: theme === "light" ? "#24292f" : "white",
                },
              }}
            />
            <Button
              size="sm"
              variant="primary"
              leftIcon={<Play size={16} />}
              onClick={handleRunCode}
              loading={isRunning}
              disabled={isRunning}
            >
              Run Code
            </Button>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Trash2 size={16} />}
              onClick={handleClearOutput}
              disabled={isRunning || !output}
            >
              Clear Output
            </Button>
          </Group>
        </Group>
      )}

      {!showHeader && (
        <Group justify="space-between" mb="lg">
          <Select
            data={languageOptions}
            value={language}
            onChange={handleLanguageChange}
            placeholder="Select Language"
            size="md"
            w={200}
            styles={{
              input: {
                background: theme === "light" ? "#ffffff" : "#161b22",
                border: theme === "light" ? "1px solid #d0d7de" : "1px solid #30363d",
                color: theme === "light" ? "#24292f" : "white",
              },
            }}
          />
          <Group>
            <Button
              size="sm"
              variant="primary"
              leftIcon={<Play size={16} />}
              onClick={handleRunCode}
              loading={isRunning}
              disabled={isRunning}
            >
              Run Code
            </Button>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Trash2 size={16} />}
              onClick={handleClearOutput}
              disabled={isRunning || !output}
            >
              Clear Output
            </Button>
          </Group>
        </Group>
      )}

      {/* Editor Section */}
      <Paper
        shadow="md"
        radius="md"
        style={{
          background: theme === "light" ? "#f6f8fa" : "#161b22",
          border: theme === "light" ? "1px solid #d0d7de" : "1px solid #30363d",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <Box
          style={{
            background: theme === "light" ? "#ffffff" : "#0d1117",
            padding: "0.75rem 1rem",
            borderBottom: theme === "light" ? "1px solid #d0d7de" : "1px solid #30363d",
          }}
        >
          <Group justify="space-between" align="center">
            <Text size="sm" c={theme === "light" ? "#57606a" : "dimmed"} fw={500}>
              Editor -{" "}
              {languageOptions.find((l) => l.value === language)?.label}
            </Text>
            <Select
              data={themeData}
              value={theme}
              onChange={handleThemeChange}
              styles={{
                input: {
                  background: theme === "light" ? "#ffffff" : "#161b22",
                  border: theme === "light" ? "1px solid #d0d7de" : "1px solid #30363d",
                  color: theme === "light" ? "#24292f" : "white",
                },
              }}
            />
          </Group>
        </Box>
        <Box style={{ height: editorHeight }}>
          <MonacoEditor
            height={editorHeight}
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme={theme}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              formatOnPaste: true,
              formatOnType: true,
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
              fontLigatures: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
              padding: { top: 16, bottom: 16 },
              lineHeight: 24,
            }}
          />
        </Box>
      </Paper>

      {/* Output Section */}
      <Paper
        shadow="md"
        radius="md"
        style={{
          background: theme === "light" ? "#f6f8fa" : "#161b22",
          border: hasError 
            ? theme === "light" ? "1px solid #d1242f" : "1px solid #f85149"
            : theme === "light" ? "1px solid #d0d7de" : "1px solid #30363d",
          overflow: "hidden",
          minHeight: "200px",
        }}
      >
        <Box
          style={{
            background: hasError 
              ? theme === "light" ? "#fff5f5" : "#1a0e0e"
              : theme === "light" ? "#ffffff" : "#0d1117",
            padding: "0.75rem 1rem",
            borderBottom: hasError 
              ? theme === "light" ? "1px solid #d1242f" : "1px solid #f85149"
              : theme === "light" ? "1px solid #d0d7de" : "1px solid #30363d",
          }}
        >
          <Group justify="space-between">
            <Text 
              size="sm" 
              c={hasError 
                ? theme === "light" ? "#d1242f" : "#f85149"
                : theme === "light" ? "#57606a" : "dimmed"
              } 
              fw={500}
            >
              {hasError ? "Error Output" : "Program Output"}
            </Text>
            <Group gap="sm">
              {executionInfo && !hasError && (
                <Text size="xs" c={theme === "light" ? "#57606a" : "dimmed"}>
                  {executionInfo}
                </Text>
              )}
              {isRunning && <Loader size="sm" color="blue" />}
            </Group>
          </Group>
        </Box>
        <Box
          style={{
            padding: "1rem",
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
            fontSize: "14px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            minHeight: "150px",
            maxHeight: "400px",
            overflowY: "auto",
            background: hasError 
              ? theme === "light" ? "#fff8f8" : "#0d0d0d"
              : theme === "light" ? "#ffffff" : "#0d1117",
            color: hasError 
              ? theme === "light" ? "#d1242f" : "#f85149"
              : theme === "light" ? "#24292f" : "#c9d1d9",
            lineHeight: "1.6",
          }}
        >
          {output || (
            <Text c={theme === "light" ? "#57606a" : "dimmed"} fs="italic">
              Output will appear here after running the code...
            </Text>
          )}
        </Box>
      </Paper>
    </>
  );

  if (fullPage) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: theme === "light" ? "#f6f8fa" : "#0d1117",
          color: theme === "light" ? "#24292f" : "white",
          padding: "1.5rem",
        }}
      >
        {useContainer ? (
          <Container size="xl" style={{ maxWidth: containerMaxWidth }}>
            {content}
          </Container>
        ) : (
          content
        )}
      </Box>
    );
  }

  if (useContainer) {
    return (
      <Container size="xl" style={{ maxWidth: containerMaxWidth }}>
        {content}
      </Container>
    );
  }

  return <>{content}</>;
}
