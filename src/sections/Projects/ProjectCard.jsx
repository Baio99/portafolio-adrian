import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="project-card"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ margin: "-50px 0px -100px 0px" }} // Margen ajustado
      variants={cardVariants}
      whileHover={{ 
        y: -5,
        boxShadow: "0 15px 30px -5px rgba(108, 99, 255, 0.3)",
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      <motion.div 
        className="project-image-container"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <div className="project-image">
          <motion.img 
            src={`/assets/images/${project.image}`} 
            alt={project.title}
            loading="lazy"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
        </div>
        
        <motion.div 
          className="project-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          <motion.a
            href={project.link}
            className="preview-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver proyecto ${project.title}`}
            initial={{ scale: 1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Vista Previa
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="project-content"
        initial={{ y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.h3 
          className="project-title"
          whileHover={{ color: "var(--primary-dark)" }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="project-description"
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.2 }}
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          className="project-technologies"
          whileHover={{ 
            scale: 1.01,
            transition: { staggerChildren: 0.05 }
          }}
        >
          {project.technologies.map((tech, index) => (
            <motion.span 
              key={index} 
              className="tech-tag"
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.1,
                y: -3,
                backgroundColor: "var(--primary-dark)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div 
          className="project-links"
          whileHover={{ scale: 1.01 }}
        >
          <motion.a
            href={project.link}
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              y: -3,
              boxShadow: "0 8px 20px rgba(108, 99, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ver Proyecto
          </motion.a>
          
          {project.code && (
            <motion.a
              href={project.code}
              className="code-link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -3,
                backgroundColor: "rgba(108, 99, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Código
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;