import React from "react";
import {
  Layers,
  Database,
  Search,
  Zap,
  ShieldCheck,
  Globe,
} from "lucide-react";

export const allCourses = [
  {
    id: "full-stack",
    title: "Full Stack Development",
    category: "Web",
    duration: "6 Months",
    level: "Beginner",
    icon: <Layers size={24} />,
    price: "$499",
    rating: 4.9,
    reviews: 1250,
    instructor: "Sarah Jenkins",
    description:
      "Master the complete web development lifecycle from frontend to backend. You'll learn modern frameworks, database management, and deployment strategies used by top tech companies.",
    longDescription:
      "This comprehensive program is designed to take you from zero to a professional full-stack engineer. We focus on the MERN stack (MongoDB, Express, React, Node.js) while ensuring you understand the fundamental principles of software engineering that apply to any technology stack.",
    whatYouWillLearn: [
      "Build responsive user interfaces with React and Tailwind CSS",
      "Develop robust backend APIs with Node.js and Express",
      "Master database design with MongoDB and PostgreSQL",
      "Implement secure authentication and authorization",
      "Deploy applications using Docker and AWS",
      "Understand system architecture and design patterns",
    ],
    curriculum: [
      {
        module: "Module 1: Frontend Foundations",
        topics: [
          "HTML5 & Semantic Web",
          "CSS3 & Modern Layouts",
          "JavaScript ES6+",
          "DOM Manipulation",
        ],
      },
      {
        module: "Module 2: React Ecosystem",
        topics: [
          "Hooks & State Management",
          "React Router",
          "Component Patterns",
          "Testing with Jest",
        ],
      },
      {
        module: "Module 3: Backend Mastery",
        topics: [
          "Node.js Core",
          "Express Framework",
          "RESTful API Design",
          "Middleware & Security",
        ],
      },
      {
        module: "Module 4: Databases & DevOps",
        topics: [
          "SQL vs NoSQL",
          "ORM/ODM (Prisma/Mongoose)",
          "CI/CD Pipelines",
          "Cloud Deployment",
        ],
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Science & AI",
    category: "Data",
    duration: "8 Months",
    level: "Intermediate",
    icon: <Database size={24} />,
    price: "$599",
    rating: 4.8,
    reviews: 850,
    instructor: "David Chen",
    description:
      "Unlock the power of data. Learn to build predictive models, analyze complex datasets, and implement state-of-the-art AI solutions.",
    longDescription:
      "Our Data Science program bridges the gap between theoretical mathematics and practical engineering. You'll work with real-world datasets from partners like Netflix and Uber to solve actual business problems using machine learning and deep learning.",
    whatYouWillLearn: [
      "Advanced Python for Data Analysis",
      "Statistical Modeling and Hypothesis Testing",
      "Machine Learning Algorithms (Regression, Clustering, Trees)",
      "Deep Learning with PyTorch and TensorFlow",
      "Natural Language Processing (NLP)",
      "Data Visualization with D3.js and Tableau",
    ],
    curriculum: [
      {
        module: "Module 1: Mathematical Foundations",
        topics: [
          "Linear Algebra",
          "Calculus for ML",
          "Probability & Statistics",
        ],
      },
      {
        module: "Module 2: Data Engineering",
        topics: [
          "SQL for Data Science",
          "Pandas & NumPy",
          "Data Cleaning & ETL",
        ],
      },
      {
        module: "Module 3: Machine Learning",
        topics: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
        ],
      },
      {
        module: "Module 4: Advanced AI",
        topics: ["Neural Networks", "Computer Vision", "LLMs & Generative AI"],
      },
    ],
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    category: "Design",
    duration: "4 Months",
    level: "Beginner",
    icon: <Search size={24} />,
    price: "$399",
    rating: 4.7,
    reviews: 920,
    instructor: "Sarah Jenkins",
    description:
      "Create beautiful, intuitive, and user-centered digital experiences. Master the tools and methodologies used by world-class design teams.",
    longDescription:
      "Design is more than just making things look pretty. This course teaches you the psychology of user behavior, the rigor of usability testing, and the craft of high-fidelity prototyping. You'll graduate with a professional portfolio that stands out.",
    whatYouWillLearn: [
      "User Research and Persona Development",
      "Information Architecture and Wireframing",
      "Visual Design Principles (Typography, Color, Grid)",
      "Interactive Prototyping with Figma",
      "Usability Testing and Iteration",
      "Design Systems and Handoff",
    ],
    curriculum: [
      {
        module: "Module 1: Design Thinking",
        topics: ["Empathize & Define", "Ideation Techniques", "User Flows"],
      },
      {
        module: "Module 2: Visual Craft",
        topics: ["UI Components", "Layout Systems", "Design Patterns"],
      },
      {
        module: "Module 3: Prototyping",
        topics: ["Advanced Figma", "Micro-interactions", "Animation"],
      },
      {
        module: "Module 4: Professional Practice",
        topics: [
          "Portfolio Building",
          "Client Communication",
          "Developer Handoff",
        ],
      },
    ],
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    category: "Mobile",
    duration: "6 Months",
    level: "Intermediate",
    icon: <Zap size={24} />,
    price: "$499",
    rating: 4.8,
    reviews: 640,
    instructor: "Dr. Aris Thorne",
    description:
      "Build high-performance native and cross-platform mobile applications for iOS and Android using modern frameworks.",
    longDescription:
      "The mobile landscape is evolving. We teach you how to build apps that feel native, perform flawlessly, and scale to millions of users. You'll master React Native and Flutter, giving you the flexibility to work on any mobile project.",
    whatYouWillLearn: [
      "Cross-platform development with React Native",
      "Native iOS and Android concepts",
      "Mobile UI/UX best practices",
      "State management for mobile apps",
      "Offline-first architecture",
      "App Store and Play Store deployment",
    ],
    curriculum: [
      {
        module: "Module 1: Mobile Essentials",
        topics: ["Mobile Ecosystem", "React Native Basics", "Navigation"],
      },
      {
        module: "Module 2: Advanced Features",
        topics: [
          "Native Modules",
          "Device APIs (Camera, GPS)",
          "Push Notifications",
        ],
      },
      {
        module: "Module 3: Performance",
        topics: [
          "Optimization Techniques",
          "Memory Management",
          "Testing Mobile Apps",
        ],
      },
      {
        module: "Module 4: Launch",
        topics: [
          "App Store Guidelines",
          "Beta Testing",
          "Monetization Strategies",
        ],
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    category: "Security",
    duration: "7 Months",
    level: "Advanced",
    icon: <ShieldCheck size={24} />,
    price: "$699",
    rating: 4.9,
    reviews: 410,
    instructor: "Elena Vance",
    description:
      "Protect digital assets and infrastructure. Learn ethical hacking, network security, and incident response from industry experts.",
    longDescription:
      "In an era of increasing digital threats, cybersecurity is the most critical field in tech. Our program is hands-on, putting you in simulated 'war rooms' where you'll defend against real-world attack vectors and learn to build unshakeable systems.",
    whatYouWillLearn: [
      "Ethical Hacking and Penetration Testing",
      "Network Security and Cryptography",
      "Security Operations Center (SOC) Workflows",
      "Incident Response and Forensics",
      "Cloud Security (AWS/Azure)",
      "Compliance and Risk Management",
    ],
    curriculum: [
      {
        module: "Module 1: Security Fundamentals",
        topics: ["OS Security", "Networking Protocols", "Linux for Security"],
      },
      {
        module: "Module 2: Offensive Security",
        topics: [
          "Vulnerability Assessment",
          "Exploitation Techniques",
          "Web App Hacking",
        ],
      },
      {
        module: "Module 3: Defensive Security",
        topics: ["SIEM Tools", "Firewalls & IDS/IPS", "Hardening Systems"],
      },
      {
        module: "Module 4: Governance",
        topics: ["ISO 27001", "GDPR/HIPAA", "Security Auditing"],
      },
    ],
  },
  {
    id: "cloud-engineering",
    title: "Cloud Engineering",
    category: "Cloud",
    duration: "5 Months",
    level: "Intermediate",
    icon: <Globe size={24} />,
    price: "$549",
    rating: 4.8,
    reviews: 530,
    instructor: "Dr. Aris Thorne",
    description:
      "Architect and manage scalable cloud infrastructure. Master AWS, Azure, and DevOps practices to power modern applications.",
    longDescription:
      "Cloud is the backbone of modern software. This course transforms you into a Cloud Architect capable of designing resilient, cost-effective, and scalable systems. You'll earn hands-on experience with the major cloud providers and the entire DevOps toolchain.",
    whatYouWillLearn: [
      "Cloud Architecture Design (AWS/Azure)",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Containerization with Docker and Kubernetes",
      "Serverless Computing",
      "Cloud Security and Identity Management",
      "Cost Optimization and Monitoring",
    ],
    curriculum: [
      {
        module: "Module 1: Cloud Core",
        topics: [
          "Compute, Storage, Networking",
          "IAM & Security",
          "Cloud Economics",
        ],
      },
      {
        module: "Module 2: DevOps & Automation",
        topics: ["CI/CD Pipelines", "GitOps", "Configuration Management"],
      },
      {
        module: "Module 3: Containers",
        topics: [
          "Docker Deep Dive",
          "Kubernetes Orchestration",
          "Microservices",
        ],
      },
      {
        module: "Module 4: Solutions Architecture",
        topics: [
          "High Availability",
          "Disaster Recovery",
          "Migration Strategies",
        ],
      },
    ],
  },
];
