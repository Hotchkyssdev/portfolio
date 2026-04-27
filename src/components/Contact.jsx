import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiMapPin } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolio';
import './Contact.css';

const EMAILJS_SERVICE_ID  = 'service_v610ds1';   
const EMAILJS_TEMPLATE_ID = 'template_upb2odz';  
const EMAILJS_PUBLIC_KEY  = 'Bg6RGkjOTrXE_l3bX';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          message:      form.message,
          to_name:      'Gersom',
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);

    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          className="contact__inner"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Info lateral */}
          <motion.div className="contact__info" variants={fadeUp}>
            <span className="section-tag">Contacto</span>
            <h2 className="section-title">
              ¿Trabajamos<br /><span>juntos?</span>
            </h2>
            <p className="contact__desc">
              Estoy abierto a nuevas oportunidades, proyectos freelance y colaboraciones.
              Mandame un mensaje y te respondo a la brevedad.
            </p>
            <div className="contact__details">
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="contact__detail"
                whileHover={{ x: 4, color: 'var(--accent)' }}
              >
                <FiMail size={18} /><span>{personalInfo.email}</span>
              </motion.a>
              <div className="contact__detail">
                <FiMapPin size={18} /><span>{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            variants={fadeUp}
          >
            {['name', 'email'].map((field) => (
              <div className="contact__field" key={field}>
                <label htmlFor={field}>{field === 'name' ? 'Nombre' : 'Email'}</label>
                <motion.input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  placeholder={field === 'name' ? 'Tu nombre' : 'tu@email.com'}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  whileFocus={{ borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-dim)' }}
                />
              </div>
            ))}

            <div className="contact__field">
              <label htmlFor="message">Mensaje</label>
              <motion.textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Contame tu proyecto o propuesta..."
                value={form.message}
                onChange={handleChange}
                required
                whileFocus={{ borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-dim)' }}
              />
            </div>

            <motion.button
              type="submit"
              className={`btn-primary contact__submit ${status}`}
              disabled={status === 'sending'}
              whileHover={status === 'idle' ? { scale: 1.03, boxShadow: '0 0 28px rgba(0,229,255,0.4)' } : {}}
              whileTap={{ scale: 0.97 }}
            >
              {status === 'idle'    && <><FiSend size={16} /> Enviar mensaje</>}
              {status === 'sending' && <><span className="contact__spinner" /> Enviando...</>}
              {status === 'success' && <>✓ Mensaje enviado</>}
              {status === 'error'   && <>Error, intentá de nuevo</>}
            </motion.button>
          </motion.form>

        </motion.div>
      </div>
    </section>
  );
}