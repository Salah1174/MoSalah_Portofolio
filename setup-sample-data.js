const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("./models/portofolioModel");

// Sample data
const sampleData = {
  intro: {
    welcomeText: "Hi, I'm",
    firstName: "Mohamed",
    lastName: "Salah",
    caption: "I build things for the web.",
    description:
      "I'm a passionate Full Stack Developer with expertise in modern web technologies. I love creating digital experiences that are not only functional but also beautiful and user-friendly.",
  },
  about: {
    lottieURL:
      "https://lottie.host/7de3e8a1-4fc5-4443-ba63-819ab18d20ae/kDpEyYtUtM.lottie",
    description1:
      "I'm a Full Stack Developer with a passion for creating innovative web solutions. My journey in web development started with curiosity and has evolved into a professional career focused on delivering high-quality applications.",
    description2:
      "I specialize in React, Node.js, MongoDB, and modern JavaScript frameworks. I'm always eager to learn new technologies and take on challenging projects that push the boundaries of what's possible on the web.",
    skills: [
      "JavaScript (ES6+)",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Git & GitHub",
      "RESTful APIs",
      "Redux",
      "Next.js",
    ],
  },
  experiences: [
    {
      title: "Full Stack Developer",
      period: "2023 - Present",
      company: "Tech Solutions Inc.",
      description:
        "Developed and maintained web applications using React, Node.js, and MongoDB. Led a team of 3 developers and improved application performance by 40%.",
    },
    {
      title: "Frontend Developer",
      period: "2022 - 2023",
      company: "Digital Agency",
      description:
        "Created responsive web interfaces using React and Tailwind CSS. Collaborated with designers and backend developers to deliver pixel-perfect user experiences.",
    },
    {
      title: "Web Development Intern",
      period: "2021 - 2022",
      company: "StartUp Hub",
      description:
        "Assisted in developing web applications and gained hands-on experience with modern web technologies. Contributed to multiple projects and learned industry best practices.",
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with user authentication, payment integration, and admin dashboard.",
      image:
        "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=E-Commerce+Platform",
      link: "https://github.com/yourusername/ecommerce-platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      image:
        "https://via.placeholder.com/400x300/059669/FFFFFF?text=Task+Manager",
      link: "https://github.com/yourusername/task-manager",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL", "Redux"],
    },
    {
      title: "Portfolio Website",
      description:
        "A responsive portfolio website with admin panel for content management and contact form integration.",
      image:
        "https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Portfolio+Site",
      link: "https://github.com/yourusername/portfolio",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "Nodemailer",
      ],
    },
  ],
  contact: {
    name: "Mohamed Salah",
    email: "mohamed.salah@example.com",
    country: "Egypt",
  },
};

async function setupSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Intro.deleteMany({});
    await About.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Contact.deleteMany({});

    console.log("Creating new portfolio data...");

    // Create intro data
    const intro = new Intro(sampleData.intro);
    await intro.save();
    console.log("✅ Intro data created");

    // Create about data
    const about = new About(sampleData.about);
    await about.save();
    console.log("✅ About data created");

    // Create experience data
    for (let exp of sampleData.experiences) {
      const experience = new Experience(exp);
      await experience.save();
    }
    console.log("✅ Experience data created");

    // Create project data
    for (let proj of sampleData.projects) {
      const project = new Project(proj);
      await project.save();
    }
    console.log("✅ Project data created");

    // Create contact data
    const contact = new Contact(sampleData.contact);
    await contact.save();
    console.log("✅ Contact data created");

    console.log("\n🎉 Database setup complete!");
    console.log("🚀 You can now:");
    console.log("   1. Visit http://localhost:3000 to see your portfolio");
    console.log(
      "   2. Visit http://localhost:3000/admin-login to manage content"
    );
    console.log("   3. Login with username: admin, password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  }
}

// Run the setup
setupSampleData();
