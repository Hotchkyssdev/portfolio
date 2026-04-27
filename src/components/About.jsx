import { motion } from 'framer-motion';
import { personalInfo, experience } from '../data/portfolio';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
};

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">

        <motion.div
          className="about__text"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span className="section-tag" variants={fadeUp}>Sobre mí</motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Quién soy y<br /><span>qué construyo</span>
          </motion.h2>
          <motion.p className="about__bio" variants={fadeUp}>
            Soy estudiante de la Tecnicatura Universitaria en Programación en la UTN y Técnico en
            Informática egresado con promedio 8.66. Gané medallas en las Olimpiadas de Programación 2023
            a nivel provincial y nacional.
          </motion.p>
          <motion.p className="about__bio" variants={fadeUp}>
            Me especializo en desarrollo web Full Stack: desde e-commerce con integraciones de pago hasta
            aplicaciones colaborativas. Actualmente cursando en la UTN y abierto a proyectos freelance y
            oportunidades de crecimiento profesional.
          </motion.p>

          {/* Timeline */}
          <motion.div className="about__timeline" variants={stagger}>
            {experience.map((exp, i) => (
              <motion.div
                className="about__timeline-item"
                key={i}
                variants={fadeUp}
              >
                <div className="about__timeline-dot" />
                <div>
                  <p className="about__timeline-role">{exp.role}</p>
                  <p className="about__timeline-company">
                    {exp.company} · <span>{exp.period}</span>
                  </p>
                  <p className="about__timeline-desc">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="about__stats"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { value: '2+',  label: 'Años desarrollando' },
            { value: '3',   label: 'Proyectos en producción' },
            { value: '9/10', label: 'Proyecto final UNNE' },
          ].map(({ value, label }) => (
            <motion.div
              className="about__stat"
              key={label}
              variants={fadeUp}
              whileHover={{ scale: 1.04, borderColor: 'var(--border-accent)' }}
            >
              <span className="about__stat-value">{value}</span>
              <span className="about__stat-label">{label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}