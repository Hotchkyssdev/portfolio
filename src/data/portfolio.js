export const personalInfo = {
  name: "Gersom Hotchkyss",
  role: "Full Stack Developer",
  tagline: "Construyo experiencias web rápidas, accesibles y con propósito.",
  location: "Chaco, Argentina",
  email: "gersomtomasosky@gmail.com",
  availability: true,
  cvUrl: "/CV_Gersom_Hotchkyss.pdf",
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Hotchkyssdev",
    icon: "FiGithub",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/gersom-tomás-hotchkyss-359691320", 
    icon: "FiLinkedin",
  },
];

export const skills = [
  // Frontend
  { name: "HTML & CSS",    category: "Frontend", level: 95 },
  { name: "JavaScript",    category: "Frontend", level: 88 },
  { name: "React",         category: "Frontend", level: 80 },

  // Backend
  { name: "PHP / MySQL",   category: "Backend",  level: 82 },
  { name: "Node.js",       category: "Backend",  level: 75 },
  { name: "Python",        category: "Backend",  level: 72 },
  { name: "Java / Spring", category: "Backend",  level: 65 },
  { name: "C",             category: "Backend",  level: 60 },

  // Tools
  { name: "Git & GitHub",  category: "Tools",    level: 88 },
  { name: "Docker",        category: "Tools",    level: 65 },
];

export const projects = [
  {
    id: 1,
    title: "Dups Parfums — E-commerce",
    description:
      "Plataforma e-commerce completa para perfumería: catálogo, carrito, autenticación, gestión de pedidos, integración con MercadoPago, calculadora de envíos y panel de administración.",
    tags: ["PHP", "MySQL", "JavaScript", "MercadoPago", "SMTP"],
    githubUrl: "https://github.com/Hotchkyssdev",
    liveUrl: "https://dupsparfumsj.page.gd",
    featured: true,
  },
  {
    id: 2,
    title: "Notorium — App tipo Trello",
    description:
      "Aplicación web colaborativa de gestión de tareas con columnas y funcionalidad drag & drop. Desarrollada en el bootcamp de Streambe Argentina.",
    tags: ["React", "Node.js", "Drag & Drop"],
    githubUrl: "https://github.com/MarcosBrabo/ProyectoStreamBE",
    liveUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: "AquaFenix — Torre de enfriamiento IoT",
    description:
      "Torre de enfriamiento inteligente con ESP32 y sensores de temperatura. Visualización en app móvil y sitio web informativo. Presentado en la UNNE. Calificación: 9/10.",
    tags: ["ESP32", "HTML", "CSS", "JS", "MIT App Inventor"],
    githubUrl: "https://github.com/Hotchkyssdev/AquaFenix",
    liveUrl: null,
    featured: false,
  },
];

export const experience = [
  {
    role: "Desarrollador Web Full Stack — Freelance",
    company: "Dups Parfums",
    period: "2026",
    description:
      "E-commerce completo desde cero con MercadoPago, panel de administración, cálculo de envíos y emails automáticos vía SMTP. Sitio en producción.",
  },
  {
    role: "Desarrollador Web Full Stack Jr.",
    company: "Streambe Argentina",
    period: "Abr 2024 – Oct 2024",
    description:
      "Bootcamp intensivo. Desarrollo de Notorium, app tipo Trello con frontend y backend, funcionalidades drag & drop y trabajo en equipo.",
  },
];