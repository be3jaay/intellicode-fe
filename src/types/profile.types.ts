export interface BaseProfile {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  bio?: string;
  joinedDate: string;
  lastActive: string;
}

export interface StudentProfile extends BaseProfile {
  role: "student";
  studentNumber: string;
  section: string;
  yearLevel: string;
  program: string;
  gpa?: number;
  totalCredits: number;
  enrollmentStatus: "active" | "inactive" | "suspended";
  guardianName?: string;
  guardianPhone?: string;
  emergencyContact?: string;
}

export interface TeacherProfile extends BaseProfile {
  role: "teacher";
  employeeId: string;
  department: string;
  specialization: string[];
  degree: string;
  yearsOfExperience: number;
  employmentStatus: "full-time" | "part-time" | "contract";
  officeLocation?: string;
  officeHours?: string;
  researchInterests?: string[];
  publications?: number;
}

export interface AdminProfile extends BaseProfile {
  role: "admin";
  employeeId: string;
  department: string;
  position: string;
  accessLevel: "super-admin" | "admin" | "moderator";
  permissions: string[];
  lastLoginIP?: string;
  securityClearance: string;
  managedDepartments: string[];
}

export type UserProfile = StudentProfile | TeacherProfile | AdminProfile;

// Mock Data
export const mockStudentProfile: StudentProfile = {
  id: "student-001",
  role: "student",
  firstName: "Juan",
  middleName: "Carlos",
  lastName: "Dela Cruz",
  email: "juan.delacruz@university.edu",
  profilePicture:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  phone: "+63 917 123 4567",
  dateOfBirth: "2002-05-15",
  address: "123 Rizal Street, Quezon City, Metro Manila",
  bio: "Computer Science student passionate about web development and artificial intelligence. Currently working on various coding projects and contributing to open-source initiatives.",
  joinedDate: "2021-08-15",
  lastActive: "2025-10-20T10:30:00Z",
  studentNumber: "2021-00123",
  section: "BSCS 3A",
  yearLevel: "3rd Year",
  program: "Bachelor of Science in Computer Science",
  gpa: 3.75,
  totalCredits: 120,
  enrollmentStatus: "active",
  guardianName: "Maria Dela Cruz",
  guardianPhone: "+63 917 987 6543",
  emergencyContact: "+63 917 987 6543",
};

export const mockTeacherProfile: TeacherProfile = {
  id: "teacher-001",
  role: "teacher",
  firstName: "Dr. Maria",
  middleName: "Santos",
  lastName: "Rodriguez",
  email: "maria.rodriguez@university.edu",
  profilePicture:
    "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face",
  phone: "+63 917 555 0123",
  dateOfBirth: "1985-03-22",
  address: "456 Academic Avenue, University Town",
  bio: "Associate Professor of Computer Science with expertise in machine learning and data science. Published researcher with over 20 peer-reviewed papers.",
  joinedDate: "2015-01-10",
  lastActive: "2025-10-20T09:15:00Z",
  employeeId: "EMP-2015-001",
  department: "Computer Science",
  specialization: [
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence",
  ],
  degree: "Ph.D. in Computer Science",
  yearsOfExperience: 10,
  employmentStatus: "full-time",
  officeLocation: "CS Building, Room 304",
  officeHours: "MWF 2:00-4:00 PM, TTH 10:00-12:00 PM",
  researchInterests: [
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
  ],
  publications: 25,
};

export const mockAdminProfile: AdminProfile = {
  id: "admin-001",
  role: "admin",
  firstName: "Robert",
  middleName: "James",
  lastName: "Chen",
  email: "robert.chen@university.edu",
  profilePicture:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  phone: "+63 917 888 9999",
  dateOfBirth: "1980-11-08",
  address: "789 Administrative Plaza, University Campus",
  bio: "System Administrator with over 15 years of experience in educational technology and institutional management. Responsible for overseeing platform operations and user management.",
  joinedDate: "2010-03-01",
  lastActive: "2025-10-20T11:45:00Z",
  employeeId: "ADM-2010-001",
  department: "Information Technology Services",
  position: "Senior System Administrator",
  accessLevel: "super-admin",
  permissions: [
    "user-management",
    "course-management",
    "system-configuration",
    "analytics-access",
    "backup-management",
    "security-settings",
  ],
  lastLoginIP: "192.168.1.100",
  securityClearance: "Level 5",
  managedDepartments: [
    "Information Technology Services",
    "Student Services",
    "Academic Affairs",
  ],
};
