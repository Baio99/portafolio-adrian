import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import './Projects.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 140, damping: 5 }
  }
};

// Static data: fields that don't need translation
const projectsStatic = [
  {
    id: 1,
    technologies: ['RabbitMQ', 'Docker', 'MongoDB', 'Railway', 'FastAPI'],
    images: ['Rabbit1.png', 'Rabbit2.png', 'Rabbit3.png'],
    link: 'https://github.com/Baio99/UserService',
    code: 'https://github.com/Baio99/microservices-rabbitmq'
  },
  {
    id: 2,
    technologies: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'Redis', 'JWT', 'Render (Deploy)', 'HTML/CSS/JS (Frontend)'],
    images: ['project-2.png'],
    link: 'https://baio99.github.io/BaioChat/',
    code: 'https://github.com/Baio99/Backend-Chat'
  },
  {
    id: 3,
    technologies: ['Node.js', 'Express.js', 'Vue.js', 'VMware', 'Ubuntu Server', 'MikroTik RouterOS', 'Scrum', 'Microservices Architecture'],
    images: ['Project-3V1.jpg', 'Project-3V2.png', 'Project-3V3.jpg', 'Project-3V4.png'],
    link: 'https://docs.google.com/file/d/1guK6GhCYp5552nmqAfz6kNpXCUXEaOpL/preview?pli=1',
    code: 'https://github.com/CharlRomero/mcsv-penlab'
  }
];

const Projects = () => {
  const { t } = useTranslation();
  const projectTranslations = t('projects.items', { returnObjects: true });

  const projects = projectsStatic.map((p, i) => ({
    ...p,
    title:       projectTranslations[i]?.title       || '',
    description: projectTranslations[i]?.description || ''
  }));

  return (
    <motion.section
      id="projects"
      className="projects-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '-20% 0px -20% 0px' }}
      variants={containerVariants}
    >
      <div className="section-header">
        <motion.h2 variants={itemVariants}>
          {t('projects.sectionTitle')}
        </motion.h2>
        <motion.div
          className="section-divider"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: {
              scaleX: 1,
              transition: { type: 'spring', stiffness: 150, damping: 10, delay: 0.2 }
            }
          }}
        />
      </div>

      <motion.div
        className="projects-container"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 80, damping: 10 }
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
