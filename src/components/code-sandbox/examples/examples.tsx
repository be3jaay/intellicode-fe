/**
 * Example usage of the CodeEditor component
 * 
 * This file demonstrates various ways to use the CodeEditor component
 * throughout your application.
 */

import { CodeEditor } from "../code-editor";


// ============================================
// Example 1: Default Usage
// ============================================
export function DefaultCodeEditor() {
  return <CodeEditor />;
}

// ============================================
// Example 2: Python Learning Page
// ============================================
export function PythonLearningEditor() {
  return (
    <CodeEditor 
      title="Python Learning Lab"
      initialLanguage="python"
    />
  );
}

// ============================================
// Example 3: Compact Editor (No Header)
// ============================================
export function CompactCodeEditor() {
  return (
    <CodeEditor 
      showHeader={false}
      editorHeight="400px"
    />
  );
}

// ============================================
// Example 4: Interview Challenge Editor
// ============================================
export function InterviewChallengeEditor() {
  const challengeCode = `// Challenge: Implement a function to reverse a string
function reverseString(str) {
  // Your code here
}

console.log(reverseString("hello")); // Expected: "olleh"`;

  return (
    <CodeEditor 
      title="Coding Interview Challenge"
      initialLanguage="javascript"
      initialCode={challengeCode}
      editorHeight="600px"
    />
  );
}

// ============================================
// Example 5: Assignment Submission Editor
// ============================================
export function AssignmentEditor() {
  const assignmentTemplate = `# Assignment: Fibonacci Sequence
# Implement a function that returns the nth Fibonacci number

def fibonacci(n):
    # Your implementation here
    pass

# Test your function
print(fibonacci(10))`;

  return (
    <CodeEditor 
      title="Assignment Submission"
      initialLanguage="python"
      initialCode={assignmentTemplate}
      containerMaxWidth="1200px"
    />
  );
}

// ============================================
// Example 6: C++ Algorithm Practice
// ============================================
export function CppAlgorithmEditor() {
  return (
    <CodeEditor 
      title="C++ Algorithm Practice"
      initialLanguage="cpp"
      editorHeight="700px"
    />
  );
}

// ============================================
// Example 7: Silent Mode (No Console Logs)
// ============================================
export function SilentCodeEditor() {
  return (
    <CodeEditor 
      title="Production Code Editor"
      enableConsoleLog={false}
    />
  );
}

// ============================================
// Example 8: Mobile-Friendly Compact Editor
// ============================================
export function MobileCodeEditor() {
  return (
    <CodeEditor 
      showHeader={false}
      editorHeight="350px"
      containerMaxWidth="100%"
      initialLanguage="javascript"
    />
  );
}

// ============================================
// Example 9: TypeScript Playground
// ============================================
export function TypeScriptPlayground() {
  const tsCode = `// TypeScript Playground
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = { name: "Alice", age: 25 };
console.log(greet(user));`;

  return (
    <CodeEditor 
      title="TypeScript Playground"
      initialLanguage="typescript"
      initialCode={tsCode}
    />
  );
}

// ============================================
// Example 10: Java Development Environment
// ============================================
export function JavaDevEnvironment() {
  return (
    <CodeEditor 
      title="Java Development Environment"
      initialLanguage="java"
      editorHeight="650px"
      containerMaxWidth="1600px"
    />
  );
}

// ============================================
// Example 11: Code Snippet Tester
// ============================================
export function CodeSnippetTester() {
  return (
    <CodeEditor 
      title="Quick Code Tester"
      showHeader={true}
      editorHeight="450px"
      containerMaxWidth="1000px"
    />
  );
}

// ============================================
// Example 12: Documentation with Live Code
// ============================================
export function DocumentationCodeEditor() {
  const exampleCode = `// Array Methods Example
const numbers = [1, 2, 3, 4, 5];

// Map - Transform each element
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Filter - Get elements that match condition
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Reduce - Combine into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);`;

  return (
    <CodeEditor 
      title="Array Methods - Interactive Example"
      initialLanguage="javascript"
      initialCode={exampleCode}
      editorHeight="500px"
    />
  );
}
