import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, useSpring, useTransform } from 'framer-motion';
import './About.css';
import Skills from './Skills';
import Timeline from './Timeline';
import aboutPhoto from '../../assets/images/about-photo.jpg';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const listItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 120
      }
    })
  };

  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants}>Sobre Mí</motion.h2>
        <motion.div 
          className="section-divider"
          variants={itemVariants}
        />
      </motion.div>
      
      <div className="about-container">
        <motion.div 
          className="about-content"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div 
            className="about-image"
            variants={itemVariants}
          >
            <motion.img 
              src={aboutPhoto} 
              alt="Adrian Iza" 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              whileHover={{ scale: 1.03 }}
            />
          </motion.div>
          
          <motion.div 
            className="about-text"
            variants={containerVariants}
          >
            <motion.p 
              className="about-description"
              variants={itemVariants}
            >
              Ingeniero de Software apasionado con una fuerte dedicación a la programación y la resolución 
              de desafíos complejos. Destaco en organización, priorización de tareas y adaptabilidad en 
              entornos de trabajo dinámicos. Domino metodologías ágiles como Scrum, lo que garantiza una 
              gestión eficiente de proyectos y la mejora continua. Siempre con ganas de aprender, innovar 
              y aprovechar nuevas oportunidades de crecimiento profesional.
            </motion.p>
            
            <motion.div 
              className="about-contributions"
              variants={containerVariants}
            >
              <motion.h3 variants={itemVariants}>Aportaciones Profesionales</motion.h3>
              <motion.ul variants={containerVariants}>
                {[
                  "Desarrollador Backend, especializado en aplicaciones escalables y de alto rendimiento.",
                  "Desarrollo de soluciones alternativas para optimizar el rendimiento y la escalabilidad.",
                  "Planificación con Scrum para optimizar los flujos de trabajo y mejorar la colaboración en equipo.",
                  "Diseño de arquitectura de microservicios para mejorar la modularidad y la mantenibilidad del sistema."
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={listItemVariants}
                    custom={i}
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.h3 variants={itemVariants}>Aportaciones Personales</motion.h3>
              <motion.ul variants={containerVariants}>
                {[
                  "Responsabilidad y compromiso con la excelencia.",
                  "Adaptabilidad a diversos retos y entornos de trabajo.",
                  "Esfuerzo y dedicación al aprendizaje continuo y al desarrollo profesional."
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={listItemVariants}
                    custom={i + 4}
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <Skills />
        <Timeline />
      </div>
    </section>
  );
};

export default About;