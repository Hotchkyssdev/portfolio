import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/portfolio';
import './Projects.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">

        <motion.div
          className="projects__header"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="section-tag" variants={fadeUp}>Proyectos</motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Lo que he<br /><span>construido</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="projects__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const { title, description, tags, githubUrl, liveUrl, featured } = project;
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
      variants={fadeUp}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {featured && <span className="project-card__badge">Destacado</span>}

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tags">
          {tags.map(tag => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-card__links">
        {githubUrl && (
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            whileHover={{ x: 3 }}
          >
            <FiGithub size={18} /><span>Código</span>
          </motion.a>
        )}
        {liveUrl && (
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Demo"
            whileHover={{ x: 3 }}
          >
            <FiExternalLink size={18} /><span>Demo</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}