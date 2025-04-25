import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import './Contact.css';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 5
    }
  }
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 5
    }
  },
  hover: {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 400
    }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send(
      'service_owp7dui',
      'template_mec7kw8',
      formData,
      'wBi-wq0LLBdD8nPXN'
    )
    .then(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(() => {
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    });
  };

  return (
    <motion.section 
      id="contact" 
      className="contact-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-20% 0px -20% 0px" }}
      variants={containerVariants}
    >
      <div className="section-header">
        <motion.h2 
          variants={itemVariants}
        >
          Contacto
        </motion.h2>
        <motion.div 
          className="section-divider"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: { 
              scaleX: 1,
              transition: {
                type: "spring",
                stiffness: 150,
                damping: 10,
                delay: 0.2
              }
            }
          }}
        />
      </div>
      
      <motion.div 
        className="contact-container"
        variants={containerVariants}
      >
        <motion.div 
          className="contact-info"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 80,
                damping: 10
              }
            }
          }}
        >
          <motion.h3 variants={itemVariants}>¡Hablemos!</motion.h3>
          <motion.p variants={itemVariants}>
            Si tienes un proyecto en mente o quieres colaborar, no dudes en contactarme.
          </motion.p>
          <motion.div 
            className="social-links"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.a 
              href="https://www.linkedin.com/in/adrian-iza-460152189/" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <FaLinkedin className="social-icon" />
            </motion.a>
            <motion.a 
              href="https://github.com/Baio99" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <FaGithub className="social-icon" />
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <FaTwitter className="social-icon" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.form 
          className="contact-form" 
          onSubmit={handleSubmit}
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 80,
                damping: 10,
                delay: 0.2
              }
            }
          }}
        >
          <motion.div 
            className="form-group"
            variants={itemVariants}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </motion.div>
          <motion.div 
            className="form-group"
            variants={itemVariants}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </motion.div>
          <motion.div 
            className="form-group"
            variants={itemVariants}
          >
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensaje"
              required
            ></textarea>
          </motion.div>
          <motion.button 
            type="submit" 
            disabled={isSubmitting}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(108, 99, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </motion.button>
          
          {submitStatus === 'success' && (
            <motion.p 
              className="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ¡Mensaje enviado con éxito!
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p 
              className="error-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Error al enviar. Inténtalo de nuevo.
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </motion.section>
  );
};

export default Contact;