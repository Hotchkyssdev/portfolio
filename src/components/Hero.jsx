import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolio';
import './Hero.css';

const iconMap = { FiGithub, FiLinkedin, FiTwitter };

const roles = [
  'Full Stack Developer',
  'React Enthusiast',
  'UI Craftsman',
  'Open Source Contributor',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 6 + 5,
  delay: Math.random() * 4,
}));

export default function Hero() {
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting,  setIsDeleting]  = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 45);
    } else {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <motion.div
          className="hero__glow"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="hero__particle"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-12, 12, -12], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="container hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {personalInfo.availability && (
          <motion.div className="hero__badge" variants={item}>
            <span className="hero__badge-dot" />
            Disponible para proyectos
          </motion.div>
        )}

        <motion.h1 className="hero__name" variants={item}>
          Hola, soy<br />
          <span className="hero__name-highlight">{personalInfo.name}</span>
        </motion.h1>

        <motion.p className="hero__role" variants={item}>
          <span className="hero__role-prefix">~/</span>
          <span className="hero__role-text">{displayText}</span>
          <span className="hero__cursor">|</span>
        </motion.p>

        <motion.p className="hero__tagline" variants={item}>
          {personalInfo.tagline}
        </motion.p>

        <motion.div className="hero__ctas" variants={item}>
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(0,229,255,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            Ver proyectos <FiArrowDown size={16} />
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-outline"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Contactame
          </motion.a>
        </motion.div>

        <motion.div className="hero__socials" variants={item}>
          {socialLinks.map(({ name, url, icon }) => {
            const Icon = iconMap[icon];
            return (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label={name}
                whileHover={{ y: -4, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                whileTap={{ scale: 0.9 }}
              >
                {Icon && <Icon size={20} />}
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll-hint"
        aria-label="Ir a la siguiente sección"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.15 }}
      >
        <FiArrowDown size={18} />
      </motion.a>
    </section>
  );
}