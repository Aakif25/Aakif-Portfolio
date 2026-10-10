// Source: supplied resume.pdf (all 8 pages and all link annotations).
// User additions: expected graduation 2029, CGPA 3.4, student ID IT25103780.
// Section headings, controls and illustrative-UI labels are presentation copy from the brief.
export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  role: string | null;
};
export type PathEntry = {
  date: string;
  title: string;
  place: string;
  details: string[];
  tech?: string[];
};
export type SkillGroup = { family: string; skills: string[] };
export type Achievement = {
  label: string;
  caption: string;
  detail: string;
  value: number;
  suffix: string;
  decimals: number;
  logo: string | null;
};
export const PROFILE = {
  name: "Aakif Ahamed",
  firstName: "Aakif",
  initials: "AA",
  role: "IT Undergraduate | Student Developer | Aspiring Cybersecurity Professional",
  heroRole: "Student Developer",
  email: "aakif2295@gmail.com",
  phone: "+94 71 900 2295",
  phoneHref: "tel:+94719002295",
  location: "Sri Lanka",
  resumeSummary:
    "Information Technology undergraduate specializing in Cyber Security at the Sri Lanka Institute of Information Technology (SLIIT), currently in Year 2, Semester 2. Practical experience through academic group projects, client projects, and freelance work in web development, desktop software development, AI and machine learning, IoT, and graphic design. Experienced in translating requirements into functional applications, integrating databases, testing and troubleshooting software, and creating digital designs. Strong interest in independent learning and developing practical cybersecurity expertise.",
  objective:
    "To pursue opportunities that strengthen my practical experience in information technology and cybersecurity while contributing programming, problem-solving, and application development skills. Committed to continuous learning and developing the expertise needed to build secure, reliable technology solutions and pursue a professional career in information security.",
  quote:
    "Continuously learning to build secure, reliable technology solutions.",
  github: null,
  linkedin: null,
  resume: "/resume.pdf",
  graduationYear: 2029,
  cgpa: "3.4",
  studentId: "IT25103780",
  degree: "BSc (Hons) in Information Technology",
  specialization: "Cyber Security",
  institution: "Sri Lanka Institute of Information Technology (SLIIT)",
  studyStatus: "Year 2, Semester 2",
  portraitAlt:
    "Illustrated avatar of Aakif Ahamed, extracted from the supplied introduction video",
};

export const NAV = [
  {
    id: "about",
    label: "About",
  },
  {
    id: "skills",
    label: "Skills",
  },
  {
    id: "work",
    label: "Work",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "achievements",
    label: "Achievements",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    "family": "Web Development",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js"
    ]
  },
  {
    "family": "Programming",
    "skills": [
      "Java",
      "Python"
    ]
  },
  {
    "family": "Database",
    "skills": [
      "MySQL"
    ]
  },
  {
    "family": "Design",
    "skills": [
      "Canva",
      "Adobe Illustrator",
      "Adobe Photoshop"
    ]
  },
  {
    "family": "Microsoft Office",
    "skills": [
      "Microsoft Word",
      "Microsoft PowerPoint",
      "Microsoft Excel"
    ]
  }
];

export const EXPERIENCE: PathEntry[] = [
  {
    title: "Freelance Web Developer",
    place: "Various Clients",
    date: "Project-Based / Ongoing",
    details: [
      "Designed and developed responsive websites and web-based management systems according to client requirements.",
      "Developed online food delivery, event booking, and grocery management applications.",
      "Created user interfaces and integrated databases to support application features.",
      "Implemented CRUD operations for managing application records.",
      "Performed testing and debugging to identify and resolve application issues.",
      "Troubleshot functionality and database integration problems.",
      "Prepared applications for deployment.",
    ],
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Java",
      "JSP",
      "SQL Server",
      "Git",
      "GitHub",
    ],
  },
  {
    title: "Freelance Software Developer",
    place: "Private Client Projects",
    date: "Project-Based",
    details: [
      "Developed customized software solutions based on business requirements.",
      "Built Mini POS Software to support product, inventory, sales, billing, and customer management.",
      "Developed application interfaces and implemented required functionality.",
      "Managed application databases and supported stock updates and sales records.",
      "Conducted testing and troubleshooting.",
    ],
    tech: ["JavaScript", "HTML", "CSS", "Electron", "SQLite"],
  },
  {
    title: "Freelance Website Designer & Developer",
    place: "Local Businesses / Small Business Clients",
    date: "Project-Based",
    details: [
      "Designed and developed websites to present business information, products, and services.",
      "Created responsive layouts for different screen sizes.",
      "Added service and product galleries.",
      "Integrated WhatsApp and other customer contact options.",
      "Included business locations and opening-hour information.",
      "Assisted with basic hosting and domain setup requirements.",
    ],
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "responsive web design",
      "web hosting",
      "domain management",
    ],
  },
  {
    title: "Freelance Graphic Designer",
    place: "Various Clients",
    date: "Project-Based / Ongoing",
    details: [
      "Created logos and visual branding materials.",
      "Designed posters, flyers, and promotional graphics.",
      "Produced social media graphics and cover designs.",
      "Worked directly with clients to understand design requirements.",
      "Revised designs based on client feedback.",
    ],
    tech: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
  },
];

export const EDUCATION: PathEntry[] = [
  {
    date: "2020",
    title: "G.C.E. Ordinary Level",
    place: "Al-Azhar College, Hemmathagama, Sri Lanka",
    details: ["5 A passes, 3 B passes, and 1 C pass."],
  },
  {
    date: "2023",
    title: "G.C.E. Advanced Level · Commerce Stream",
    place: "Badhuriya Central College, Mawanella, Sri Lanka",
    details: [
      "Accounting, Business Studies, and Information & Communication Technology (ICT).",
      "Results: B, C, C.",
    ],
  },
  {
    date: "Ongoing · 2029",
    title: "BSc (Hons) in Information Technology",
    place: "Sri Lanka Institute of Information Technology (SLIIT)",
    details: [
      "Specialization in Cyber Security.",
      "Year 2, Semester 2.",
      "CGPA: 3.4. Expected graduation: 2029.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    index: "01",
    title: "Online Exam and Results Management System",
    kicker: "Web Application | Group Project | Completed",
    description:
      "Contributed to a web-based system for conducting online examinations, managing student assessments, and publishing results.",
    features: [
      "Supported examination, assessment, and result management through a web interface.",
      "Incorporated database-driven application functionality.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "JSP", "Java"],
    github: null,
    role: null,
  },
  {
    id: "project-2",
    index: "02",
    title: "Library Management System",
    kicker: "Web Application | Group Project | Completed",
    description:
      "Contributed to a library management application for maintaining books, members, and library records.",
    features: [
      "Included functionality for borrowing and returning books.",
      "Supported book reservations and fine management.",
      "Used SQL Server to store and manage application data.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "JSP", "Java", "SQL Server"],
    github: null,
    role: null,
  },
  {
    id: "project-3",
    index: "03",
    title: "Online Food Delivery System",
    kicker: "Web Application | Client Project | Completed",
    description:
      "Developed an online food delivery platform that allows customers to browse food items and place orders.",
    features: [
      "Included customer information management, payment processing, and delivery tracking.",
      "Integrated a MySQL database to manage application records.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: null,
    role: null,
  },
  {
    id: "project-4",
    index: "04",
    title: "Event Booking System",
    kicker: "Web Application | Client Project | Completed",
    description:
      "Developed an application for browsing available events and booking tickets.",
    features: [
      "Included customer information management and reservation management.",
      "Supported payment processing and database-backed booking records.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: null,
    role: null,
  },
  {
    id: "project-5",
    index: "05",
    title: "Grocery Management System",
    kicker: "Web Application | Client Project | Completed",
    description:
      "Developed a grocery management application for managing products, inventory, customers, and orders.",
    features: [
      "Implemented billing functionality and stock updates.",
      "Integrated database management to maintain business records.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: null,
    role: null,
  },
  {
    id: "project-6",
    index: "06",
    title: "Mini POS Software",
    kicker: "Desktop Application | Client Project | Completed",
    description:
      "Developed a desktop Point of Sale application for product, sales, billing, and customer management.",
    features: [
      "Included inventory management and stock updates.",
      "Maintained daily sales records.",
      "Used Electron for the desktop application and SQLite for data storage.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Electron", "SQLite"],
    github: null,
    role: null,
  },
  {
    id: "project-7",
    index: "07",
    title: "ObesiSense AI",
    kicker:
      "AI / Machine Learning Application | Academic Group Project | Completed",
    description:
      "Contributed to an AI-powered application that predicts obesity levels using physical, dietary, demographic, and lifestyle information.",
    features: [
      "Classified users into seven obesity-level categories.",
      "Worked on data preprocessing, data analysis, classification, and SVM model development.",
      "Included prediction confidence and BMI-related insights.",
      "Contributed to the Streamlit application for interacting with the prediction model.",
      "The best-performing SVM model achieved 98.56% test accuracy and a 98.53% Macro F1 Score on the project's test data.",
    ],
    tech: ["Python", "Scikit-learn", "SVM", "Streamlit", "Pandas", "NumPy"],
    github: null,
    role: "AI/ML Developer",
  },
  {
    id: "project-8",
    index: "08",
    title: "Smart Bin Monitoring System",
    kicker: "IoT / Embedded Systems | Group Project | Completed",
    description:
      "Contributed to an Arduino-based system for automated waste detection, separation, and bin monitoring.",
    features: [
      "Used an ultrasonic sensor to detect nearby objects.",
      "Used a moisture sensor to distinguish wet and dry waste.",
      "Used an IR sensor to monitor the bin's fill level.",
      "Supported automatic segregation of wet and dry waste into separate compartments.",
      "Provided an indication when the bin became full.",
    ],
    tech: [
      "Arduino",
      "C/C++",
      "ultrasonic sensor",
      "moisture sensor",
      "IR sensor",
      "embedded systems",
      "IoT",
    ],
    github: null,
    role: null,
  },
  {
    id: "project-9",
    index: "09",
    title: "Graphic Design Projects",
    kicker:
      "Creative Design & Branding | Freelance / Client Projects | Multiple Projects Completed",
    description:
      "Completed creative design projects for client branding, promotion, and digital content.",
    features: [
      "Created logos, posters, flyers, and promotional materials.",
      "Designed social media graphics, cover designs, and branding content.",
      "Adapted designs to client requirements and feedback.",
    ],
    tech: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
    github: null,
    role: null,
  },
];

export const CERTIFICATIONS = [
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    status: "External Course · Completed",
    details: [
      "Python fundamentals",
      "Basic programming concepts",
      "Programming logic",
      "Python development fundamentals",
    ],
    url: null,
  },
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    status: "External Course · Completed",
    details: [
      "Web design fundamentals",
      "HTML and CSS",
      "Basic web development concepts",
      "Web page design",
    ],
    url: null,
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    label: "Test accuracy",
    caption: "ObesiSense AI",
    detail: "Best-performing SVM model on the project's test data.",
    value: 98.56,
    suffix: "%",
    decimals: 2,
    logo: "Scikit-learn",
  },
  {
    label: "Macro F1 Score",
    caption: "ObesiSense AI",
    detail: "Best-performing SVM model on the project's test data.",
    value: 98.53,
    suffix: "%",
    decimals: 2,
    logo: "Python",
  },
  {
    label: "CGPA",
    caption: "BSc (Hons) in Information Technology",
    detail: "Cyber Security · SLIIT",
    value: 3.4,
    suffix: "",
    decimals: 1,
    logo: null,
  },
];

export const COPY = {
  headings: {
    about: ["Hi, I’m", "Aakif."],
    skills: ["The tools I", "work with."],
    work: ["Things I’ve", "built."],
    certifications: ["Always", "learning."],
    experience: ["A path in", "progress."],
    achievements: ["Learning, in", "numbers."],
    contact: ["Let’s build", "something together."],
  },
  sectionLabels: {
    about: "About me",
    skills: "Technical skills",
    work: "Selected work",
    certifications: "Completed courses",
    experience: "Education & experience",
    achievements: "Achievements",
    contact: "Get in touch",
  },
  sections: [
    "about",
    "skills",
    "work",
    "certifications",
    "experience",
    "achievements",
    "contact",
  ],
  heroSubtitle: "IT Undergraduate · Aspiring Cybersecurity Professional",
  languageDetails: {
    Tamil: "Native",
    Sinhala: "Fluent",
    English: "Good working proficiency",
  },
};
