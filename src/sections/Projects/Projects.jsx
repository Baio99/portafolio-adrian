import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './Projects.css';

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

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Sistema de Gestión Empresarial',
      description: 'Plataforma integral para gestión de recursos empresariales con dashboard analítico en tiempo real y generación de reportes automatizados.',
      technologies: ['Node.js', 'React', 'MongoDB', 'Express', 'Redux'],
      image: 'project-1.jpg',
      link: '#',
      code: '#'
    },
    {
      id: 2,
      title: 'Plataforma de Chat en Tiempo Real',
      description: 'Sistema completo de mensajería instantánea con salas de chat, autenticación segura y estado de usuarios en tiempo real. Arquitectura escalable que combina REST API con WebSockets para una experiencia interactiva, implementando Redis para gestión de sesiones y MongoDB para persistencia de datos.',
      technologies: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'Redis', 'JWT', 'Render (Deploy)', 'HTML/CSS/JS (Frontend)'],
      image: 'project-2.png',
      link: 'https://baio99.github.io/BaioChat/',
      code: 'https://github.com/Baio99/Backend-Chat'
    },
    {
      id: 3,
      title: 'Aplicación Móvil Educativa',
      description: 'Plataforma de aprendizaje con cursos interactivos, seguimiento de progreso y sistema de gamificación para aumentar el engagement.',
      technologies: ['React Native', 'Firebase', 'GraphQL', 'Node.js'],
      image: 'project-3.jpg',
      link: '#',
      code: '#'
    }
  ];

  return (
    <motion.section 
      id="projects" 
      className="projects-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-20% 0px -20% 0px" }} // Margen más amplio para mejor detección
      variants={containerVariants}
    >
      <div className="section-header">
        <motion.h2 
          variants={itemVariants}
        >
          Mis Proyectos
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
        className="projects-container"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 10
                }
              }
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;