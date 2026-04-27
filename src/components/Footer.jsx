import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolio';
import './Footer.css';

const iconMap = { FiGithub, FiLinkedin, FiTwitter };

const navLinks = [
  { label: 'Sobre mí',  href: '#about'    },
  { label: 'Skills',    href: '#skills'   },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto',  href: '#contact'  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">

        {/* Logo + tagline */}
        <div className="footer__brand">
          <a href="#" className="footer__logo">
            <span className="footer__logo-bracket">&lt;</span>
            {personalInfo.name.split(' ')[0]}
            <span className="footer__logo-bracket">/&gt;</span>
          </a>
          <p className="footer__tagline">{personalInfo.tagline}</p>
        </div>

        {/* Nav links */}
        <nav className="footer__nav">
          <p className="footer__nav-title">Navegación</p>
          <ul>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="footer__nav-link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div className="footer__contact">
          <p className="footer__nav-title">Contacto</p>
          <a href={`mailto:${personalInfo.email}`} className="footer__email">
            {personalInfo.email}
          </a>
          <div className="footer__socials">
            {socialLinks.map(({ name, url, icon }) => {
              const Icon = iconMap[icon];
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={name}
                >
                  {Icon && <Icon size={17} />}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">
            © {year} {personalInfo.name}. Todos los derechos reservados.
          </span>
          <span className="footer__made">
            Hecho con <FiHeart size={13} className="footer__heart" /> en {personalInfo.location}
          </span>
        </div>
      </div>
    </footer>
  );
}