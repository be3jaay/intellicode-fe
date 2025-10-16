export interface SystemMetrics {
  totalUsers: number;
  activeStudents: number;
  activeInstructors: number;
  totalCourses: number;
  pendingApprovals: number;
}

export interface MonthlyData {
  month: string;
  students: number;
  instructors: number;
  courses: number;
}

export interface StudentPerformanceData {
  id: number;
  name: string;
  averageGrade: number;
  coursesCompleted: number;
  coursesInProgress: number;
  attendanceRate: number;
}

export interface CourseProgressData {
  courseId: number;
  courseName: string;
  instructor: string;
  enrolled: number;
  completed: number;
  inProgress: number;
  averageProgress: number;
}

export const mockSystemMetrics: SystemMetrics = {
  totalUsers: 1247,
  activeStudents: 892,
  activeInstructors: 47,
  totalCourses: 156,
  pendingApprovals: 3,
};

export const mockMonthlyData: MonthlyData[] = [
  { month: "Jan", students: 650, instructors: 38, courses: 120 },
  { month: "Feb", students: 720, instructors: 40, courses: 128 },
  { month: "Mar", students: 780, instructors: 42, courses: 135 },
  { month: "Apr", students: 810, instructors: 43, courses: 142 },
  { month: "May", students: 845, instructors: 45, courses: 148 },
  { month: "Jun", students: 892, instructors: 47, courses: 156 },
];

export const mockStudentPerformance: StudentPerformanceData[] = [
  {
    id: 1,
    name: "Emma Johnson",
    averageGrade: 92,
    coursesCompleted: 3,
    coursesInProgress: 2,
    attendanceRate: 95,
  },
  {
    id: 2,
    name: "Michael Chen",
    averageGrade: 88,
    coursesCompleted: 2,
    coursesInProgress: 1,
    attendanceRate: 92,
  },
  {
    id: 3,
    name: "Sarah Williams",
    averageGrade: 95,
    coursesCompleted: 5,
    coursesInProgress: 2,
    attendanceRate: 98,
  },
  {
    id: 4,
    name: "Olivia Brown",
    averageGrade: 85,
    coursesCompleted: 2,
    coursesInProgress: 2,
    attendanceRate: 88,
  },
  {
    id: 5,
    name: "Daniel Lee",
    averageGrade: 90,
    coursesCompleted: 4,
    coursesInProgress: 1,
    attendanceRate: 94,
  },
];

export const mockCourseProgress: CourseProgressData[] = [
  {
    courseId: 1,
    courseName: "Introduction to Computer Science",
    instructor: "Dr. Jennifer Lee",
    enrolled: 156,
    completed: 98,
    inProgress: 58,
    averageProgress: 73,
  },
  {
    courseId: 2,
    courseName: "Advanced Mathematics",
    instructor: "Prof. David Kumar",
    enrolled: 203,
    completed: 145,
    inProgress: 58,
    averageProgress: 78,
  },
  {
    courseId: 3,
    courseName: "Data Structures & Algorithms",
    instructor: "Dr. Maria Garcia",
    enrolled: 98,
    completed: 62,
    inProgress: 36,
    averageProgress: 71,
  },
  {
    courseId: 4,
    courseName: "Web Development Fundamentals",
    instructor: "Prof. Thomas Wright",
    enrolled: 187,
    completed: 112,
    inProgress: 75,
    averageProgress: 68,
  },
  {
    courseId: 5,
    courseName: "Machine Learning Basics",
    instructor: "Dr. Jennifer Lee",
    enrolled: 134,
    completed: 78,
    inProgress: 56,
    averageProgress: 65,
  },
];
