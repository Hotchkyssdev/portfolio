import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import './Navbar.css';

const navLinks = [
  { label: 'Sobre mí',    href: '#about'    },
  { label: 'Skills',      href: '#skills'   },
  { label: 'Proyectos',   href: '#projects' },
  { label: 'Contacto',    href: '#contact'  },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="navbar__inner container">

        {/* Logo */}
        <motion.a
          href="#"
          className="navbar__logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="navbar__logo-bracket">&lt;</span>
          Hotchkyss
          <span className="navbar__logo-bracket">/&gt;</span>
        </motion.a>

        {/* Links desktop */}
        <ul className="navbar__links">
          {navLinks.map(({ label, href }, i) => {
            const isActive = activeSection === href.replace('#', '');
            return (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <a href={href} className={`navbar__link ${isActive ? 'active' : ''}`}>
                  {label}
                  {isActive && (
                    <motion.span
                      className="navbar__active-indicator"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            );
          })}
        </ul>

        {/* CTA desktop */}
        <motion.a
          href={personalInfo.cvUrl}
          download="CV_Gersom_Hotchkyss.pdf"
          className="navbar__cta btn-outline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Descargar CV
        </motion.a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Abrir menú"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Menú mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile navbar__mobile--open"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href={personalInfo.cvUrl}
              download="CV_Gersom_Hotchkyss.pdf"
              className="btn-primary"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              Descargar CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}