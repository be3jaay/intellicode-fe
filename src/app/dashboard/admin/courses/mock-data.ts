export interface PendingCourse {
  id: number;
  title: string;
  instructor: string;
  instructorEmail: string;
  submittedDate: string;
  description: string;
  status: "pending";
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  enrolled: number;
  status: "active" | "archived";
}

export const mockPendingCourses: PendingCourse[] = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Dr. Robert Martinez",
    instructorEmail: "r.martinez@example.com",
    submittedDate: "2024-10-14",
    description:
      "Deep dive into advanced React patterns including render props, HOCs, and compound components.",
    status: "pending",
  },
  {
    id: 2,
    title: "Introduction to Quantum Computing",
    instructor: "Prof. Lisa Anderson",
    instructorEmail: "l.anderson@example.com",
    submittedDate: "2024-10-15",
    description:
      "Explore the fundamentals of quantum computing, quantum algorithms, and their applications.",
    status: "pending",
  },
  {
    id: 3,
    title: "Machine Learning for Business Analytics",
    instructor: "Dr. Ahmed Hassan",
    instructorEmail: "a.hassan@example.com",
    submittedDate: "2024-10-16",
    description:
      "Apply machine learning techniques to solve real-world business problems and make data-driven decisions.",
    status: "pending",
  },
  {
    id: 4,
    title: "Blockchain Fundamentals",
    instructor: "Dr. Jennifer Lee",
    instructorEmail: "j.lee@example.com",
    submittedDate: "2024-10-13",
    description:
      "Understanding blockchain technology, cryptocurrencies, and decentralized applications.",
    status: "pending",
  },
  {
    id: 5,
    title: "Cloud Architecture & DevOps",
    instructor: "Prof. David Kumar",
    instructorEmail: "d.kumar@example.com",
    submittedDate: "2024-10-17",
    description:
      "Master cloud infrastructure design, deployment automation, and DevOps best practices.",
    status: "pending",
  },
];

export const mockCourses: Course[] = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Jennifer Lee",
    enrolled: 156,
    status: "active",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Prof. David Kumar",
    enrolled: 203,
    status: "active",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    instructor: "Dr. Maria Garcia",
    enrolled: 98,
    status: "active",
  },
  {
    id: 4,
    title: "Web Development Fundamentals",
    instructor: "Prof. Thomas Wright",
    enrolled: 187,
    status: "active",
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    instructor: "Dr. Jennifer Lee",
    enrolled: 134,
    status: "archived",
  },
  {
    id: 6,
    title: "Mobile App Development",
    instructor: "Dr. Rachel Kim",
    enrolled: 165,
    status: "active",
  },
  {
    id: 7,
    title: "Cybersecurity Essentials",
    instructor: "Prof. David Kumar",
    enrolled: 178,
    status: "active",
  },
  {
    id: 8,
    title: "UI/UX Design Principles",
    instructor: "Dr. Maria Garcia",
    enrolled: 142,
    status: "active",
  },
];
