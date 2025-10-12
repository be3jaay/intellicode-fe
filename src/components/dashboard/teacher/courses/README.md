# Intellicode Course Management System

## 🎨 Design Overview

A modern, modal-based course management interface designed for instructors. Built with React, Next.js, Mantine UI, and TypeScript.

## 📁 Components

### 1. `TeacherCourseManager`
**Location:** `teacher-course-manager.tsx`

Main orchestrator component that manages the state for the entire course management system.

**Features:**
- Manages course list state
- Handles modal visibility
- Switches between grid view and content view
- Integrates course creation logic

**Props:**
```typescript
interface TeacherCourseManagerProps {
  initialCourses?: Course[];
}
```

---

### 2. `CourseCreationModal`
**Location:** `course-creation-modal.tsx`

Modal component for creating new courses with drag-and-drop thumbnail upload.

**Features:**
- Centered modal with smooth animations
- Drag-and-drop image upload with preview
- Form validation using Zod schema
- Image removal functionality
- Real-time validation feedback

**Props:**
```typescript
interface CourseCreationModalProps {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturn<CreateCourseSchemaType>;
  control: Control<CreateCourseSchemaType>;
  onSubmit: (data: CreateCourseSchemaType) => void;
  handleSubmit: UseFormHandleSubmit<CreateCourseSchemaType>;
  isLoading?: boolean;
}
```

**Design Details:**
- Gradient background
- Glass-morphism effects
- Smooth enter/exit animations
- Image preview with remove button
- Category dropdown with 10+ options

---

### 3. `CourseGridViewer`
**Location:** `course-grid-viewer.tsx`

Responsive grid layout displaying all courses with search and filter capabilities.

**Features:**
- Responsive card grid (3 columns on large, 2 on medium, 1 on mobile)
- Real-time search
- Category filtering
- Hover effects with elevation
- Empty state handling
- Course stats display

**Props:**
```typescript
interface CourseGridViewerProps {
  courses: Course[];
  onViewCourse: (course: Course) => void;
  onCreateCourse: () => void;
}
```

**Design Details:**
- Glass-effect search bar
- Smooth hover transitions (lift + shadow)
- Category badge filters
- Gradient "New Course" button with shadow
- Placeholder thumbnails with icons

---

### 4. `CourseContentViewer`
**Location:** `course-content-viewer.tsx`

Dynamic panel that displays course details and content sections.

**Features:**
- Back navigation
- Course invitation link with copy button
- Tabbed interface for:
  - Modules
  - Lessons
  - Activities
  - Quizzes
  - Students
- Smooth tab transitions

**Props:**
```typescript
interface CourseContentViewerProps {
  course: Course;
  onBack: () => void;
}
```

**Design Details:**
- Slide-in animation on load
- Invitation link card with gradient background
- Tab icons from Lucide
- Module cards with numbering
- Student progress badges
- Action buttons (Edit, Delete) on items

---

## 🎯 Data Structure

### Course Interface
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  students?: number;
  modules?: number;
  lastUpdated?: string;
}
```

### Form Schema
```typescript
{
  title: string (3-100 chars);
  description: string (10-1000 chars);
  category: string;
  thumbnail?: File (JPEG, PNG, WebP, max 5MB);
}
```

---

## 🚀 Usage Example

```tsx
import { TeacherCourseManager } from '@/components/dashboard/teacher/courses/teacher-course-manager';

function TeacherPage() {
  const courses = [
    {
      id: '1',
      title: 'Intro to Programming',
      description: 'Learn the basics...',
      category: 'programming',
      students: 50,
      modules: 10,
    },
  ];

  return <TeacherCourseManager initialCourses={courses} />;
}
```

---

## 🎨 Design System

### Colors
- **Primary:** `#2563eb` (Blue 600)
- **Primary Dark:** `#1d4ed8` (Blue 700)
- **Background:** `#f8fafc` (Slate 50)
- **Card Border:** `#e5e7eb` (Gray 200)
- **Text Primary:** `#1f2937` (Gray 800)
- **Text Dimmed:** `#64748b` (Slate 500)

### Gradients
```css
/* Primary Gradient */
linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)

/* Background Gradient */
linear-gradient(to bottom right, #f8fafc 0%, #e5e7eb 100%)

/* Light Blue Gradient */
linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)
```

### Shadows
```css
/* Card Shadow */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

/* Hover Shadow */
box-shadow: 0 12px 24px rgba(37, 99, 235, 0.15)

/* Button Shadow */
box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3)
```

---

## 🎭 Animations

All animations are defined in `src/styles/animations.css`:

- `fadeIn` - 0.3s ease-out
- `slideInRight` - 0.4s ease-out
- `slideInUp` - 0.4s ease-out
- `scaleIn` - 0.3s cubic-bezier
- Card hover - 0.3s cubic-bezier with transform
- Tab transitions - 0.3s ease-out

---

## 📦 Dependencies

### Required Packages
```json
{
  "@mantine/core": "^7.x",
  "@mantine/dropzone": "^7.x",
  "@mantine/notifications": "^7.x",
  "@hookform/resolvers": "^3.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "lucide-react": "^0.x"
}
```

---

## 🔧 Integration with Backend

Replace mock data with API calls:

```typescript
// In TeacherCourseManager.tsx
async function onSubmit(values: CreateCourseSchemaType) {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("category", values.category);
  if (values.thumbnail) {
    formData.append("thumbnail", values.thumbnail);
  }

  const response = await fetch('/api/courses', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  // Handle response...
}
```

---

## 🎬 User Flow

1. **Landing on Dashboard** → User sees course grid
2. **Click "New Course"** → Modal slides in from center
3. **Fill Form** → Real-time validation
4. **Drag Image** → Preview appears immediately
5. **Submit** → Success notification + modal closes
6. **New Course Appears** → Added to grid with animation
7. **Click "View Course"** → Content viewer slides in
8. **Navigate Tabs** → Smooth tab transitions
9. **Click Back** → Returns to grid view

---

## ♿ Accessibility

- Keyboard navigation support
- Focus rings on interactive elements
- ARIA labels on icons
- Screen reader friendly
- Color contrast compliance (WCAG AA)

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (1 column)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (3 columns)

---

## 🐛 Known Limitations

1. Image preview uses `URL.createObjectURL()` - remember to revoke URLs
2. Mock data in tabs - needs backend integration
3. No drag-to-reorder functionality yet
4. Search is client-side only
5. No pagination on course grid

---

## 🔮 Future Enhancements

- [ ] Drag-to-reorder modules
- [ ] Bulk operations on courses
- [ ] Advanced filters (date, status, etc.)
- [ ] Course duplication
- [ ] Archive/Unarchive courses
- [ ] Export course data
- [ ] Course templates
- [ ] Rich text editor for descriptions
- [ ] Video thumbnail support
- [ ] Course analytics dashboard

---

## 🎓 Best Practices

1. **Always validate on client and server**
2. **Compress images before upload**
3. **Use optimistic UI updates for better UX**
4. **Cache course list data**
5. **Implement proper error boundaries**
6. **Add loading skeletons for better perceived performance**
7. **Debounce search input**
8. **Use virtualization for large course lists**

---

## 📞 Support

For questions or issues, contact the development team or refer to the main project documentation.

---

**Built with ❤️ for Intellicode**

