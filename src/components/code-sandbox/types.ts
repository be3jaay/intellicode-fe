export interface CodeEditorProps {
  /**
   * Title displayed in the header
   * @default "Code Sandbox IDE"
   */
  title?: string;

  /**
   * Show/hide the header with title and icon
   * @default true
   */
  showHeader?: boolean;

  /**
   * Starting programming language
   * @default "javascript"
   */
  initialLanguage?: "javascript" | "python" | "cpp" | "java" | "typescript";
  
  /**
   * Starting programming language
   * @default "light"
   */
  initialTheme?: "vs-dark" | "light";

  /**
   * Custom code to load on mount
   * @default Default code for the selected language
   */
  initialCode?: string;

  /**
   * Height of the code editor
   * @default "500px"
   */
  editorHeight?: string;

  /**
   * Maximum width of the container
   * @default "1400px"
   */
  containerMaxWidth?: string;

  /**
   * Enable console logging on code execution
   * @default true
   */
  enableConsoleLog?: boolean;

  /**
   * Use full-page layout with background and padding
   * Set to false when embedding in other components
   * @default true
   */
  fullPage?: boolean;

  /**
   * Use container wrapper
   * Set to false when you want to control the width yourself
   * @default true
   */
  useContainer?: boolean;
}

export interface LanguageOption {
  value: string;
  label: string;
}

export interface DefaultCodeMap {
  javascript: string;
  python: string;
  cpp: string;
  java: string;
  typescript: string;
}

