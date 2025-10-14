# Activity Creation Components

This folder contains modular, separated components for creating activities in the course management system.

## 📁 Structure

```
activity-creation/
├── types.ts                    # Shared TypeScript types and interfaces
├── activity-info-step.tsx      # Step 1: Basic activity information form
├── quiz-content-step.tsx       # Step 2: Quiz questions builder
├── code-sandbox-step.tsx       # Step 2: Code sandbox configuration
├── question-editor.tsx         # Reusable question editing form
├── question-card.tsx           # Reusable question display card
├── index.ts                    # Barrel exports
└── README.md                   # This file
```

## 🧩 Components

### **1. Types (`types.ts`)**
Central location for all type definitions:
- `ActivityType` - "code_sandbox" | "quiz_form"
- `Difficulty` - "easy" | "medium" | "hard"
- `QuestionType` - "multiple_choice" | "enumeration" | "identification" | "true_false"
- `QuizQuestion` - Question data structure
- `ActivityFormData` - Complete form data structure

### **2. ActivityInfoStep**
**Purpose**: First step of activity creation wizard

**Features**:
- Controlled text, textarea, select, and number inputs
- Difficulty level selection with color coding
- Activity type selection (Quiz Form vs Code Sandbox)
- Due date picker
- Module selection
- Validation before proceeding to next step

**Props**:
- `control` - React Hook Form control
- `setValue` - Form setValue function
- `watch` - Form watch function
- `onNext` - Callback when validation passes

### **3. QuizContentStep**
**Purpose**: Second step for quiz form activities

**Features**:
- Question list display
- Add/Edit/Remove questions
- Empty state with helpful prompt
- Question count limit (50 max)
- Integration with dynamic field array
- Submission controls

**Props**:
- All dynamic field array props
- Form control props
- `onBack` - Navigate to previous step
- `onSubmit` - Handle form submission

### **4. CodeSandboxStep**
**Purpose**: Second step for code sandbox activities

**Features**:
- Starter code textarea (monospace font)
- Test cases textarea
- Back and submit navigation
- Clean, focused interface

**Props**:
- `register` - React Hook Form register
- `onBack` - Navigate to previous step
- `onSubmit` - Handle form submission

### **5. QuestionEditor**
**Purpose**: Reusable form for creating/editing questions

**Features**:
- Question type selector with dynamic fields
- Multiple choice (2-6 options)
- Enumeration (1-10 ordered answers)
- Identification (single text answer)
- True/False (radio selection)
- Points input (1-100)
- Optional explanation field
- Validation on save

**Props**:
- `index` - Question index in array
- `isAddingNew` - Whether adding new or editing existing
- Form control props
- `onSave` - Callback on save
- `onCancel` - Callback on cancel

### **6. QuestionCard**
**Purpose**: Display card for saved questions

**Features**:
- Numbered badge with question type color
- Question type icon and label
- Points display
- Question text preview (line clamp)
- Optional explanation display
- Edit and delete actions
- Disabled state when editing

**Props**:
- `question` - Question data
- `index` - Question number
- `onEdit` - Edit callback
- `onRemove` - Remove callback
- `isEditing` - Disable actions when editing

## 🎨 Design Patterns

### **Separation of Concerns**
- Each component handles a specific responsibility
- Presentation logic separated from business logic
- Reusable components for common patterns

### **Controlled Components**
- All inputs use controlled components from `@/components/controlled-fields`
- Consistent styling and behavior
- Type-safe with React Hook Form

### **Color Coding**
```javascript
// Activity types
Quiz Form: #ffa500 (orange)
Code Sandbox: #34d399 (green)

// Difficulty levels
Easy: #4ade80 (green)
Medium: #facc15 (yellow)
Hard: #f87171 (red)

// Question types
Multiple Choice: #ffa500 (orange)
Enumeration: #ff6b6b (red)
Identification: #4ecdc4 (cyan)
True/False: #95e1d3 (light cyan)

// Form fields
Activity Title: #a78bfa (purple)
Instructions: #8b5cf6 (violet)
Module: #7c3aed (dark violet)
Score: #ffd700 (gold)
Due Date: #60a5fa (blue)
```

## 🔄 Data Flow

```
ActivityCreator (Main)
├── Manages form state (React Hook Form)
├── Handles dynamic field array for questions
├── Controls stepper navigation
└── Submits final data

ActivityInfoStep
├── Collects basic activity details
├── Validates required fields
└── Enables navigation to step 2

QuizContentStep / CodeSandboxStep
├── Collects activity-specific content
├── QuizContentStep uses QuestionEditor & QuestionCard
└── Handles final submission

QuestionEditor
├── Manages question creation/editing
├── Dynamic fields based on question type
└── Validation before save

QuestionCard
├── Displays saved question
└── Provides edit/delete actions
```

## 🚀 Usage

```typescript
import { ActivityCreator } from "./activity-creator"

<ActivityCreator 
  course={courseData} 
  onBack={handleBack} 
/>
```

## 📝 Console Output

```javascript
=== ACTIVITY SUBMISSION ===
Course ID: "..."
Activity Type: quiz_form | code_sandbox
Difficulty: easy | medium | hard
Activity Data: {
  title: "...",
  instructions: "...",
  dueDate: Date,
  totalScore: number,
  difficulty: "...",
  activityType: "...",
  moduleId: "..."
}

// For Quiz Form:
Quiz Questions: number
Question Details: [...questions]

// For Code Sandbox:
Code Sandbox Details: {
  starterCode: "...",
  testCases: "..."
}
```

## 🔧 Future Enhancements

- Add topic/tag selection
- Support for attachments in questions
- Rich text editor for questions
- Question bank/templates
- Bulk import questions
- Preview mode before submission
- Auto-save drafts

