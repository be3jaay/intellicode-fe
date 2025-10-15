export interface Student {
  id: number;
  name: string;
  email: string;
  enrolledDate: string;
  courses: number;
  status: "active" | "suspended";
}

export interface PendingInstructor {
  id: number;
  name: string;
  email: string;
  appliedDate: string;
  specialization: string;
  experience: string;
  qualifications: string;
  status: "pending";
}

export interface Instructor {
  id: number;
  name: string;
  email: string;
  specialization: string;
  courses: number;
  students: number;
  status: "active" | "on-leave";
}

export const mockStudents: Student[] = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.j@example.com",
    enrolledDate: "2024-01-15",
    courses: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    enrolledDate: "2024-02-20",
    courses: 3,
    status: "active",
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    enrolledDate: "2024-01-08",
    courses: 7,
    status: "active",
  },
  {
    id: 4,
    name: "James Rodriguez",
    email: "james.r@example.com",
    enrolledDate: "2024-03-12",
    courses: 2,
    status: "suspended",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.b@example.com",
    enrolledDate: "2024-02-05",
    courses: 4,
    status: "active",
  },
];

export const mockPendingInstructors: PendingInstructor[] = [
  {
    id: 1,
    name: "Dr. Robert Martinez",
    email: "r.martinez@example.com",
    appliedDate: "2024-10-10",
    specialization: "Computer Science",
    experience: "8 years",
    qualifications: "PhD in Computer Science, MIT",
    status: "pending",
  },
  {
    id: 2,
    name: "Prof. Lisa Anderson",
    email: "l.anderson@example.com",
    appliedDate: "2024-10-12",
    specialization: "Mathematics",
    experience: "12 years",
    qualifications: "PhD in Applied Mathematics, Stanford",
    status: "pending",
  },
  {
    id: 3,
    name: "Dr. Ahmed Hassan",
    email: "a.hassan@example.com",
    appliedDate: "2024-10-13",
    specialization: "Data Science",
    experience: "6 years",
    qualifications: "PhD in Statistics, UC Berkeley",
    status: "pending",
  },
];

export const mockInstructors: Instructor[] = [
  {
    id: 1,
    name: "Dr. Jennifer Lee",
    email: "j.lee@example.com",
    specialization: "Physics",
    courses: 4,
    students: 156,
    status: "active",
  },
  {
    id: 2,
    name: "Prof. David Kumar",
    email: "d.kumar@example.com",
    specialization: "Engineering",
    courses: 6,
    students: 203,
    status: "active",
  },
  {
    id: 3,
    name: "Dr. Maria Garcia",
    email: "m.garcia@example.com",
    specialization: "Biology",
    courses: 3,
    students: 98,
    status: "active",
  },
  {
    id: 4,
    name: "Prof. Thomas Wright",
    email: "t.wright@example.com",
    specialization: "Chemistry",
    courses: 5,
    students: 187,
    status: "on-leave",
  },
];
