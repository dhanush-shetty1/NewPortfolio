const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "My Stuff", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Safari", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Terminal", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "notes",
    name: "Notes", // was "Trash"
    icon: "notes.png",
    canOpen: true,
  },
  {
    id: "spotify",
    name: "Spotify", // was "Trash"
    icon: "spotify.png",
    canOpen: true,
  },
  {
    id: "calculator",
    name: "Calculator", // was "Trash"
    icon: "calculator.png",
    canOpen: true,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

const techStack = [
  {
    category: "Languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C/C++",
      "Solidity",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "ShadCN",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
    ],
  },
  {
    category: "Blockchain",
    items: [
      "Solidity",
      "Ethers.js",
      "Hardhat",
    ],
  },
  {
    category: "AI / ML",
    items: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Database",
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQL",
    ],
  },
  {
    category: "Developer Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Vercel",
      "Vite",
      "VS Code",
      "Figma",
      "Canva",
    ],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/JavaScript-Mastery-Pro",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://jsmastery.com/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/jsmasterypro",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
  },
];

const safariSocialLinks = [
  {
    id: 1,
    name: "Email",
    color: "#E74C3C",
    letter: "✉",
    icon: "/images/gmail.svg",
    link: "mailto:your-email@example.com",
  },
  {
    id: 2,
    name: "GitHub",
    color: "#1B1B1B",
    icon: "/images/github.png",
    link: "https://github.com/dhanush-shetty1",
  },
  {
    id: 3,
    name: "LinkedIn",
    color: "#0077B5",
    icon: "/images/linkedin.svg",
    link: "https://www.linkedin.com/in/dhanush-shetty-b81468296/",
  },
  {
    id: 4,
    name: "X",
    color: "#1DA1F2",
    icon:"/images/x.avif",
    link: "https://x.com/Decaptiator",
  },
  {
    id: 5,
    name: "Instagram",
    color: "#E4405F",
    icon:"/images/insta.jpg",
    link: "https://www.instagram.com/dhan.ushs",
  },
];

const safariCodingLinks = [
  {
    id: 1,
    name: "LeetCode",
    color: "#FFA500",
    letter: "LC",
    icon: "/images/leetcode.svg",
    link: "https://leetcode.com/u/KamiGatso/",
  },
  {
    id: 2,
    name: "Neetcode",
    color: "#1B1B1B",
    letter: "GH",
    icon: "/images/nc.jpeg",
    link: "https://neetcode.io/profile",
  },
  {
    id: 3,
    name: "GeeksforGeeks",
    color: "#2F8D46",
    letter: "GG",
    icon: "/images/gfg.png",
    link: "https://geeksforgeeks.org",
  },
  {
    id: 4,
    name: "Codolio",
    color: "#667EEA",
    icon:"/images/codolio.jpeg",
    link: "https://codolio.com",
  },
  {
    id: 5,
    name: "HackerRank",
    color: "#00EA64",
    icon:"/images/hr.jpg",
    link: "https://hackerrank.com",
  },
  {
    id: 6,
    name: "CodeChef",
    color: "#5B4A8F",
    icon:"/images/cf.png",
    link: "https://codechef.com",
  },
  {
    id: 7,
    name: "CodeForces",
    color: "#1F8ACB",
    icon:"/images/forces.webp",
    link: "https://codeforces.com",
  },
];

const safariNews = [
  {
    id: 1,
    title: "JavaScript Continues Dominance in Web Development",
    source: "Tech Weekly",
    date: "May 10, 2026",
  },
  {
    id: 2,
    title: "React 19 Released with Major Performance Improvements",
    source: "Dev News",
    date: "May 8, 2026",
  },
  {
    id: 3,
    title: "AI-Powered Code Generation Tools Transform Development Workflow",
    source: "Coding Today",
    date: "May 5, 2026",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/pp.jpeg",
  },
  {
    id: 2,
    img: "/images/eth.jpeg",
  },
  {
    id: 3,
    img: "/images/sih.jpeg",
  },
  {
    id: 4,
    img: "/images/1.jpeg",
  },
  {
    id: 5,
    img: "/images/2.jpeg",
  },
  
];

const typoraNotes = [
  {
    id: 1,
    title: "Project Ideas",
    preview: "Collection of innovative project ideas for personal portfolio development...",
    lastEdited: "May 10, 2026",
    content: [
      {
        type: "heading",
        text: "Project Ideas for 2026",
      },
      {
        type: "subheading",
        text: "Web Applications",
      },
      {
        type: "list",
        items: [
          "AI-powered Task Management App with real-time collaboration",
          "Interactive Data Visualization Dashboard using D3.js",
          "Progressive Web App for Offline Note-taking",
          "Real-time Chat Application with WebSocket",
        ],
      },
      {
        type: "subheading",
        text: "Portfolio Enhancements",
      },
      {
        type: "text",
        text: "Focus on building projects that showcase modern web technologies including React, Next.js, and blockchain integration. Document the development process and create detailed case studies for each project.",
      },
    ],
  },
  {
    id: 2,
    title: "Learning Resources",
    preview: "Curated list of books, courses, and documentation for skill improvement...",
    lastEdited: "May 8, 2026",
    content: [
      {
        type: "heading",
        text: "Learning Resources",
      },
      {
        type: "subheading",
        text: "Recommended Books",
      },
      {
        type: "list",
        items: [
          "Clean Code by Robert C. Martin",
          "Design Patterns by Gang of Four",
          "You Don't Know JS by Kyle Simpson",
          "The Pragmatic Programmer",
        ],
      },
      {
        type: "subheading",
        text: "Online Courses",
      },
      {
        type: "text",
        text: "Master advanced concepts through structured online courses on platforms like Udemy, Coursera, and Frontend Masters. Focus on practical projects and real-world applications.",
      },
    ],
  },
  {
    id: 3,
    title: "Daily Notes",
    preview: "Quick thoughts and progress updates from daily development work...",
    lastEdited: "May 12, 2026",
    content: [
      {
        type: "heading",
        text: "Today's Progress",
      },
      {
        type: "text",
        text: "Successfully completed the portfolio redesign with improved UI/UX. All window components are now functional and properly integrated with the Zustand store.",
      },
      {
        type: "subheading",
        text: "Completed Tasks",
      },
      {
        type: "list",
        items: [
          "Fixed Text window file opening functionality",
          "Created Image window component for project images",
          "Redesigned Safari window with links and news",
          "Built complete Notes application",
        ],
      },
      {
        type: "text",
        text: "Next steps: Add animation improvements and optimize performance across all windows.",
      },
    ],
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
  safariSocialLinks,
  safariCodingLinks,
  safariNews,
  typoraNotes,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    {
      id: 5,
      name: "Mockly",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-16 left-5",
      windowPosition: "top-[6vh] left-5",
      children: [
        {
          id: 1,
          name: "README.md",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Mockly is an intelligent job application platform that leverages AI to help job seekers optimize their applications and prepare for interviews.",
            "The platform provides comprehensive analysis of resumes against job descriptions, generates customized MCQ tests, and delivers detailed performance reports.",
            "Mockly bridges the gap between job seekers and employers by combining AI-powered resume optimization with dynamic skill assessments.",
            "It uses Google Gemini for smart resume analysis, provides comprehensive performance analytics, and helps users track and manage job applications efficiently.",
          ],
        },
        {
          id: 2,
          name: "Link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://mockly-ai.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "Showcase.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/Mockly.png",
        },
        {
          id: 5,
          name: "Github",
          icon: "/images/github.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/dhanush-shetty1/MocklyAI",
          position: "top-60 right-20",
        },
      ],
    },

    {
      id: 6,
      name: "StakED",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-16 left-48",
      windowPosition: "top-[21vh] left-5",
      children: [
        {
          id: 1,
          name: "README.md",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "StakED is a decentralized and gamified platform that allows students to stake on academic performance using PayPal’s PYUSD stablecoin.",
        "Students can earn rewards based on real and verified academic results, creating an incentive driven learning ecosystem powered by blockchain.",
        "The platform combines the transparency of Blockscout, the stability of PYUSD, and the reliability of Hardhat 3 into one seamless on-chain experience.",
        "StakED transforms academic achievement into a rewarding and competitive system where learning is backed by real incentives and decentralized trust.",
          ],
        },
        {
          id: 2,
          name: "Link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://stak-ed.vercel.app/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "Showcase.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/staked.png",
        },
        {
          id: 5,
          name: "Github",
          icon: "/images/github.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Craig-Rosario/StakED",
          position: "top-60 left-5",
        },
      ],
    },

    {
      id: 7,
      name: "HiFI",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-16 left-80",
      windowPosition: "top-[36vh] left-5",
      children: [
        {
          id: 1,
          name: "README.md",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "HI.FI is a decentralized treasury pooling platform that bridges the gap between AI driven strategy and DeFi execution.",
        "By separating advice from execution, HI.FI allows users to define risk parameters once and let a deterministic on-chain agent manage capital within those strict bounds.",
        "The platform leverages Arc Protocol for yield infrastructure and Circle's cross-chain USDC gateway to deliver a seamless and chain abstracted experience.",
        "\"The agent can execute. But only YOU define the bounds.\"",
          ],
        },
        {
          id: 2,
          name: "Link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://hi-fi-web.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "Showcase.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/HIFI.png",
        },
        {
          id: 5,
          name: "Github",
          icon: "/images/github.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Craig-Rosario/HI.FI",
          position: "top-60 right-20",
        },
      ],
    },

    {
      id: 8,
      name: "Old Portfolio",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-16 right-5",
      windowPosition: "top-[51vh] left-4",
      children: [
        {
          id: 1,
          name: "README.md",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "This was my older portfolio before rebuilding everything with a macOS inspired experience.",
            "Instead of focusing on interaction and animations, the old version was more minimal and straightforward.",
            "It helped me experiment with layouts, responsiveness, and personal branding while improving my frontend skills.",
            "Looking back at it now, it shows how much my design sense and development workflow have evolved over time.",
          ],
        },
        {
          id: 2,
          name: "Link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://dhanushshetty.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Showcase.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/portfolio.png",
        },
        {
          id: 4,
          name: "Github",
          icon: "/images/github.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/dhanush-shetty1/Portfolio",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};
const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/adrian.jpg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/adrian-2.jpg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/adrian-3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/adrian.jpg",
      description: [
        "Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/mog.jpeg",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/monkeh.jpeg",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },   
  spotify: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null }, 
  calculator: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null }, 
  notes: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },   
  about: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };