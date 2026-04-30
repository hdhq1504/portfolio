export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  year: string;
  category: string;
  image: string;
  images?: string[];
  link: string;
  liveUrl?: string;
  features?: string[];
  challenges?: string[];
  role?: string;
  duration?: string;
}

export const projects: Project[] = [
  {
    id: "huit-social-credits",
    title: "HUIT Social Credits",
    description:
      "Student management system with face-recognition attendance, role-based access control (RBAC), activity approval workflows, and automated email notifications. PWA support for cross-platform mobile experience.",
    longDescription: `This is my final year project at university. The system aims to streamline student activity management by automating attendance tracking through face recognition technology.

Built with a modern tech stack including React for the frontend and Node.js with Express for the backend, the application provides a robust and scalable solution for managing student credits and activities.`,
    tags: ["ReactJS", "Node.js", "Express", "PostgreSQL", "Prisma"],
    year: "2025",
    category: "Final Year Project",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    ],
    link: "https://github.com/hdhq1504/huit-social-credits",
    liveUrl: "https://huit-social-credits.vercel.app",
    features: [
      "Face recognition attendance system",
      "Role-based access control (RBAC)",
      "Activity approval workflows",
      "Automated email notifications",
      "PWA support for mobile",
    ],
    challenges: [
      "Implementing accurate face recognition in various lighting conditions",
      "Designing a scalable database schema for RBAC",
      "Optimizing real-time notifications",
    ],
    role: "Full-stack Developer",
    duration: "6 months",
  },
  {
    id: "note-taking-app",
    title: "Note Taking App",
    description:
      "Real-time collaborative document system with hierarchical data structure, authentication & authorization with role-based access control, full-text search, and soft-delete system.",
    longDescription: `A modern note-taking application built with Next.js and Convex for real-time collaboration. Features a hierarchical structure similar to Notion, allowing users to organize their thoughts and documents efficiently.

The application supports real-time collaboration, full-text search, and a sophisticated permission system.`,
    tags: ["Next.js", "TypeScript", "Convex", "Clerk"],
    year: "2026",
    category: "Personal Project",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=800&fit=crop",
    ],
    link: "https://github.com/hdhq1504/jotion-note-taking",
    liveUrl: "https://jotion-clone.vercel.app",
    features: [
      "Real-time collaborative editing",
      "Hierarchical document structure",
      "Full-text search",
      "Role-based permissions",
      "Soft-delete with recovery",
    ],
    role: "Full-stack Developer",
    duration: "3 months",
  },
  {
    id: "nextalk",
    title: "NexTalk",
    description:
      "Collaborated with backend developer to build a real-time chat application with user authentication, real-time messaging, and message handling features.",
    longDescription: `NexTalk is a real-time chat application built as a team project. I worked closely with a backend developer to create a seamless messaging experience.

The application features WebSocket-based real-time messaging, user authentication, and a modern UI designed for both desktop and mobile.`,
    tags: ["ReactJS", "Node.js", "Express", "RESTful API"],
    year: "2026",
    category: "Personal Project",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop",
    ],
    link: "https://github.com/hdhq1504/nextalk",
    features: [
      "Real-time messaging via WebSocket",
      "User authentication system",
      "Online/offline status",
      "Message history",
    ],
    role: "Frontend Developer",
    duration: "2 months",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
