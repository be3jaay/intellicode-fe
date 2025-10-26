export const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TypeScript" },
];

export const defaultCode = {
  javascript: `// JavaScript Example
;

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

;`,
  python: `# Python Example
print("Hello, World!")

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci(10):", fibonacci(10))`,
  c: `// C Example
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Hello, World!\\n");
    printf("Fibonacci(10): %d\\n", fibonacci(10));
    return 0;
}`,
  cpp: `// C++ Example
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Hello, World!" << endl;
    cout << "Fibonacci(10): " << fibonacci(10) << endl;
    return 0;
}`,
  java: `// Java Example
public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Fibonacci(10): " + fibonacci(10));
    }
}`,
  typescript: `// TypeScript Example
;

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

;`,
};

export const themeData = [
  { value: "vs-dark", label: "Dark" },
  { value: "light", label: "Light" },
];
