export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Assessment {
  courseId: string;
  title: string;
  passingScore: number;
  questions: Question[];
}

export const assessments: Assessment[] = [
  {
    courseId: "full-stack",
    title: "Full Stack Development Assessment",
    passingScore: 70,
    questions: [
      {
        id: "fs-1",
        text: "Which of the following best describes a RESTful API?",
        options: [
          "A database management system",
          "An architectural style for networked applications using HTTP methods",
          "A programming language for web development",
          "A type of web browser extension",
        ],
        correctIndex: 1,
      },
      {
        id: "fs-2",
        text: "What does MERN stand for?",
        options: [
          "MySQL, Express, React, Node.js",
          "MongoDB, Ember, Redux, Next.js",
          "MongoDB, Express, React, Node.js",
          "MariaDB, Express, React, Nginx",
        ],
        correctIndex: 2,
      },
      {
        id: "fs-3",
        text: "Which HTTP method is used to partially update a resource?",
        options: ["POST", "PUT", "PATCH", "DELETE"],
        correctIndex: 2,
      },
      {
        id: "fs-4",
        text: "What is the primary purpose of middleware in Express.js?",
        options: [
          "To render HTML templates",
          "To manage database connections only",
          "To process requests between receiving and responding",
          "To define route parameters",
        ],
        correctIndex: 2,
      },
      {
        id: "fs-5",
        text: "Which statement about SQL vs NoSQL databases is correct?",
        options: [
          "NoSQL databases always outperform SQL databases",
          "SQL databases are schema-less while NoSQL databases have rigid schemas",
          "SQL databases use structured tables; NoSQL stores flexible documents, key-value pairs, etc.",
          "Both SQL and NoSQL use the same query language",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    courseId: "data-science",
    title: "Data Science & AI Assessment",
    passingScore: 70,
    questions: [
      {
        id: "ds-1",
        text: "What is supervised learning?",
        options: [
          "Training a model on unlabeled data to find hidden patterns",
          "Training a model on labeled input-output pairs to predict outcomes",
          "A method of reinforcing good behavior in agents",
          "Grouping similar data points without predefined categories",
        ],
        correctIndex: 1,
      },
      {
        id: "ds-2",
        text: "What does a confusion matrix measure?",
        options: [
          "The computational complexity of a model",
          "The correlation between features",
          "True/false positives and negatives of a classification model",
          "The loss function during training",
        ],
        correctIndex: 2,
      },
      {
        id: "ds-3",
        text: "Which Python library is primarily used for data manipulation and analysis?",
        options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
        correctIndex: 1,
      },
      {
        id: "ds-4",
        text: "What is gradient descent?",
        options: [
          "A technique for visualizing multi-dimensional data",
          "An iterative algorithm to minimize a loss function by updating parameters",
          "A method for splitting datasets into training and test sets",
          "A type of neural network architecture",
        ],
        correctIndex: 1,
      },
      {
        id: "ds-5",
        text: "What does overfitting mean in a machine learning context?",
        options: [
          "The model performs poorly on both training and test data",
          "The model trains too slowly due to large datasets",
          "The model learns training data too well and fails to generalize to new data",
          "The model uses too many features causing slow prediction",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    courseId: "ui-ux",
    title: "UI/UX Design Assessment",
    passingScore: 70,
    questions: [
      {
        id: "ux-1",
        text: "What does UX stand for?",
        options: [
          "User Excellence",
          "Unified Experience",
          "User Experience",
          "Universal Exchange",
        ],
        correctIndex: 2,
      },
      {
        id: "ux-2",
        text: "What is the main purpose of wireframing in design?",
        options: [
          "To create high-fidelity visual designs with colors and typography",
          "To sketch low-fidelity layouts and map information architecture",
          "To write frontend code for UI components",
          "To conduct usability testing with real users",
        ],
        correctIndex: 1,
      },
      {
        id: "ux-3",
        text: "What is a user persona in UX design?",
        options: [
          "A real user who tests the product",
          "A fictional character representing a segment of target users",
          "A diagram of the user's journey through the product",
          "A prototype used for stakeholder presentations",
        ],
        correctIndex: 1,
      },
      {
        id: "ux-4",
        text: "Which tool is most widely used for UI/UX prototyping today?",
        options: ["Adobe Photoshop", "Sketch", "Figma", "InVision"],
        correctIndex: 2,
      },
      {
        id: "ux-5",
        text: "What is the purpose of the 8-point grid system in UI design?",
        options: [
          "To restrict designers to exactly 8 component types",
          "To define 8 mandatory breakpoints for responsive design",
          "To create consistent spacing and alignment using multiples of 8",
          "To limit the number of colors in a design system",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    courseId: "mobile-dev",
    title: "Mobile App Development Assessment",
    passingScore: 70,
    questions: [
      {
        id: "mob-1",
        text: "React Native is primarily used for?",
        options: [
          "Building server-side APIs",
          "Building cross-platform iOS and Android applications using JavaScript",
          "Creating desktop applications with web technologies",
          "Developing embedded systems software",
        ],
        correctIndex: 1,
      },
      {
        id: "mob-2",
        text: "What is JSX?",
        options: [
          "A JavaScript runtime environment",
          "A database query language used in mobile apps",
          "A syntax extension that lets you write HTML-like markup inside JavaScript",
          "A CSS preprocessor for React Native",
        ],
        correctIndex: 2,
      },
      {
        id: "mob-3",
        text: "What does Expo provide for React Native development?",
        options: [
          "A paid cloud database for mobile apps",
          "A managed workflow, pre-built native modules, and OTA updates",
          "A replacement for the JavaScript engine in React Native",
          "A native code compiler that converts JS to Swift",
        ],
        correctIndex: 1,
      },
      {
        id: "mob-4",
        text: "Which library is most commonly used for navigation in React Native?",
        options: [
          "React Router",
          "Next.js Router",
          "React Navigation",
          "Expo Router",
        ],
        correctIndex: 2,
      },
      {
        id: "mob-5",
        text: "What is AsyncStorage used for in React Native?",
        options: [
          "Making asynchronous API calls",
          "Storing small amounts of persistent key-value data on device",
          "Managing component state asynchronously",
          "Handling background push notifications",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    courseId: "cybersecurity",
    title: "Cybersecurity Assessment",
    passingScore: 70,
    questions: [
      {
        id: "sec-1",
        text: "What is SQL injection?",
        options: [
          "A method to speed up SQL queries",
          "A backup strategy for SQL databases",
          "An attack that inserts malicious SQL code into queries to manipulate databases",
          "A technique for normalizing database schemas",
        ],
        correctIndex: 2,
      },
      {
        id: "sec-2",
        text: "What does XSS stand for in cybersecurity?",
        options: [
          "Extended Security System",
          "Cross-Site Scripting",
          "External Script Source",
          "Cross-Server Syntax",
        ],
        correctIndex: 1,
      },
      {
        id: "sec-3",
        text: "What is the primary purpose of a firewall?",
        options: [
          "To encrypt all data transmitted over a network",
          "To monitor and control incoming and outgoing network traffic based on rules",
          "To scan files for viruses and malware",
          "To authenticate users with multi-factor methods",
        ],
        correctIndex: 1,
      },
      {
        id: "sec-4",
        text: "Two-factor authentication (2FA) provides security by requiring:",
        options: [
          "Two passwords set by the user",
          "Two separate devices to access the account",
          "Something you know plus something you have or are",
          "Biometric verification twice in a row",
        ],
        correctIndex: 2,
      },
      {
        id: "sec-5",
        text: "What does HTTPS provide over regular HTTP?",
        options: [
          "Faster page load speeds through compression",
          "Encrypted communication using TLS/SSL for confidentiality and integrity",
          "Automatic caching of web resources",
          "Access to restricted government websites",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    courseId: "cloud-engineering",
    title: "Cloud Engineering Assessment",
    passingScore: 70,
    questions: [
      {
        id: "cl-1",
        text: "What does IaaS stand for in cloud computing?",
        options: [
          "Internet as a Service",
          "Infrastructure as a Service",
          "Integration as a System",
          "Instance and Storage Service",
        ],
        correctIndex: 1,
      },
      {
        id: "cl-2",
        text: "What is the primary purpose of a load balancer?",
        options: [
          "To store and retrieve data from the cloud",
          "To compress files before uploading to storage",
          "To distribute incoming network traffic across multiple servers",
          "To monitor CPU usage across all cloud instances",
        ],
        correctIndex: 2,
      },
      {
        id: "cl-3",
        text: "Infrastructure as Code (IaC) refers to:",
        options: [
          "Writing application code that runs on cloud servers",
          "Managing and provisioning infrastructure through machine-readable config files",
          "Coding standards required by cloud providers",
          "A programming language designed for cloud platforms",
        ],
        correctIndex: 1,
      },
      {
        id: "cl-4",
        text: "What is a container in cloud engineering?",
        options: [
          "A virtual machine with a full operating system",
          "A physical storage unit in a data center",
          "A lightweight package that bundles an app with its dependencies and runtime",
          "A security group for isolating cloud resources",
        ],
        correctIndex: 2,
      },
      {
        id: "cl-5",
        text: "Serverless computing means:",
        options: [
          "Applications run without any server hardware anywhere",
          "Developers manage servers manually for every function",
          "The cloud provider handles server management; devs deploy functions only",
          "All compute happens client-side in the user's browser",
        ],
        correctIndex: 2,
      },
    ],
  },
];

export function getAssessment(courseId: string): Assessment | undefined {
  return assessments.find((a) => a.courseId === courseId);
}
