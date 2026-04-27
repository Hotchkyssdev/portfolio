import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';
import './Skills.css';

const categories = ['Todos', 'Frontend', 'Backend', 'Tools'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered = activeCategory === 'Todos'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="skills">
      <div className="container">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="skills__header"
        >
          <motion.span className="section-tag" variants={fadeUp}>Skills</motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Mi stack<br /><span>tecnológico</span>
          </motion.h2>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="skills__filters"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              className={`skills__filter ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="skills__grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          key={activeCategory} // re-anima al cambiar filtro
        >
          {filtered.map(({ name, level, category }) => (
            <motion.div
              className="skill-card"
              key={name}
              variants={fadeUp}
              whileHover={{ y: -3, borderColor: 'var(--border-accent)' }}
            >
              <div className="skill-card__top">
                <span className="skill-card__name">{name}</span>
                <span className="skill-card__percent">{level}%</span>
              </div>

              <div className="skill-card__bar">
                <motion.div
                  className="skill-card__bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                />
              </div>

              <span className="skill-card__category">{category}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}