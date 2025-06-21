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
       images: [''], // Cambiado a array
      link: '#',
      code: '#'
    },
    {
      id: 2,
      title: 'Plataforma de Chat en Tiempo Real',
      description: 'Sistema completo de mensajería instantánea con salas de chat, autenticación segura y estado de usuarios en tiempo real. Arquitectura escalable que combina REST API con WebSockets para una experiencia interactiva, implementando Redis para gestión de sesiones y MongoDB para persistencia de datos.',
      technologies: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'Redis', 'JWT', 'Render (Deploy)', 'HTML/CSS/JS (Frontend)'],
       images: ['project-2.png'], // Cambiado a array
      link: 'https://baio99.github.io/BaioChat/',
      code: 'https://github.com/Baio99/Backend-Chat'
    },
    {
      id: 3,
      title: 'Sistema de Gestión de Acceso a Laboratorio de Ciberseguridad',
      description: 'Sistema de gestión de usuarios basado en microservicios que permite el acceso seguro, controlado y escalable a un laboratorio virtual de ciberseguridad. El sistema autentica y autoriza usuarios, gestiona sesiones activas y controla el acceso a entornos vulnerables simulados, diseñados para prácticas educativas, implementado con Node.js y Express.js en el backend, y gestionado bajo la metodología ágil Scrum, El laboratorio se conecta a través de una infraestructura de red con router MikroTik y VPN en Ubuntu Server',
      technologies: ['Node.js', 'Express.js', 'Vue.js', 'VMware', 'Ubuntu Server', 'MikroTik RouterOS', 'Scrum', 'Microservices Architecture'],

      images: ['Project-3V1.jpg', 'Project-3V2.png', 'Project-3V3.jpg', 'Project-3V4.png'], // Cambiado a array
      link: 'https://docs.google.com/file/d/1guK6GhCYp5552nmqAfz6kNpXCUXEaOpL/preview?pli=1',
      code: 'https://github.com/CharlRomero/mcsv-penlab'
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