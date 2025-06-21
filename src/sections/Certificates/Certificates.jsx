import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Certificates.css';
import { FaExternalLinkAlt, FaTimes, FaAward, FaEye } from 'react-icons/fa';

// Variantes de animación (consistentes con Contact.jsx)
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(108, 99, 255, 0.2)"
  }
};

// Nuevas variantes de animación mejoradas
const badgeVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.3
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { 
    opacity: 1, 
    backdropFilter: "blur(10px)",
    transition: { duration: 0.3 }
  }
};

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const certificates = [
    {
      id: 1,
      title: "Certificado Remote Work",
      image: "/portafolio-adrian/certificados/CertificateRemote.png",
      description: "Remote Work Certificate: habilidades en colaboración remota, optimizacion de comunicacion y productividad digital",
      link: "https://www.credly.com/badges/de589a51-7171-4a4e-862f-4676354a0903",
      category: "Trabajo Remoto",
      date: "2023"
    },
    {
      id: 2,
      title: "Certificado Scrum",
      image: "/portafolio-adrian/certificados/CertificateScrum.png",
      description: "Certificación en metodologías ágiles con enfoque en Scrum, con conocimientos prácticos sobre gestión de proyectos, roles de Scrum, planificación de sprints y mejora continua, para liderar y colaborar en equipos de desarrollo.",
      category: "Metodologías Ágiles",
      date: "2023"
    },
    {
      id: 3,
      title: "Certificado de Backend Developer and APIs",
      image: "/portafolio-adrian/certificados/CertificateBackend.png",
      description: "Certificado de Backend developer and APIs en Javascript",
      link: "https://www.freecodecamp.org/certification/fccd8d67ff4-cade-4d25-92fd-f4b159b4fbcb/back-end-development-and-apis",
      category: "Desarrollo Backend",
      date: "2025"
    },
  ];

  const openModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <motion.section 
      id="certificates" 
      className="certificates-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-20% 0px -20% 0px" }}
      variants={containerVariants}
    >
      {/* Elementos de fondo decorativos */}
      <div className="bg-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      <div className="section-header">
        <motion.div 
        
        >
          <FaAward />
        </motion.div>
        <motion.h2 variants={itemVariants}>
          Mis Certificados
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          variants={itemVariants}
        >
          Certificaciones que validan mis habilidades y conocimientos
        </motion.p>
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
        className="certificates-grid"
        variants={containerVariants}
      >
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            className="certificate-card"
            onClick={() => openModal(cert)}
            onHoverStart={() => setHoveredCard(cert.id)}
            onHoverEnd={() => setHoveredCard(null)}
            variants={cardVariants}
            whileHover="hover"
            layout
          >
            <div className="certificate-image-container">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="certificate-thumbnail"
                loading="lazy"
              />
              <div className="certificate-overlay">
                <motion.div 
                  className="overlay-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <FaEye className="view-icon" />
                  <span>Ver detalles</span>
                </motion.div>
              </div>
              <div className="certificate-category">
                {cert.category}
              </div>
            </div>
            
            <div className="certificate-content">
              <h3>{cert.title}</h3>
              <div className="certificate-meta">
                <span className="certificate-date">{cert.date}</span>
                {cert.link && (
                  <motion.span 
                    className="verified-badge"
                    animate={{ 
                      scale: hoveredCard === cert.id ? 1.1 : 1,
                      rotate: hoveredCard === cert.id ? 360 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓ Verificado
                  </motion.span>
                )}
              </div>
            </div>
            
            {/* Efecto de brillo en hover */}
            <div className="shine-effect"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal para vista ampliada */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className="certificate-modal" 
            onClick={closeModal}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.button 
                className="close-modal" 
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
              
              <div className="modal-header">
                <motion.div 
                  className="modal-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <FaAward />
                </motion.div>
                <div className="modal-category">{selectedCert.category}</div>
              </div>
              
              <motion.div 
                className="certificate-image-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="certificate-full"
                />
              </motion.div>
              
              <motion.div 
                className="certificate-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3>{selectedCert.title}</h3>
                <p>{selectedCert.description}</p>
                <div className="certificate-details">
                  <span className="detail-item">
                    <strong>Fecha:</strong> {selectedCert.date}
                  </span>
                  <span className="detail-item">
                    <strong>Categoría:</strong> {selectedCert.category}
                  </span>
                </div>
                {selectedCert.link && (
                  <motion.a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-link"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaExternalLinkAlt />
                    Ver insignia validada
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Certificates;