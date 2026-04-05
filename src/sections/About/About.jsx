import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import './About.css';
import Skills from './Skills';
import Timeline from './Timeline';
import aboutPhoto from '../../assets/images/36.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
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

const valueProps = [
  {
    icon: "🏦",
    title: "Fintech & Sistemas Bursátiles",
    description: "APIs financieras con ASP.NET en Eurekabank y modernización de plataforma bursátil en la Bolsa de Valores de Quito, migración SOAP legacy a .NET Core con reglas de negocio críticas."
  },
  {
    icon: "⚡",
    title: "Microservicios & Mensajería Asíncrona",
    description: "Arquitecturas desacopladas con Node.js y FastAPI. Comunicación vía RabbitMQ, contenerización con Docker y despliegue en Railway."
  },
  {
    icon: "🌐",
    title: "Full Stack Multiplataforma",
    description: "Backend en C#/.NET, Node.js y Python. Frontends con Blazor, .NET MAUI y React web, escritorio y móvil desde un solo perfil técnico."
  },
  {
    icon: "🔴",
    title: "Sistemas en Tiempo Real",
    description: "WebSockets + Redis + MongoDB para gestión de sesiones y mensajería instantánea. Autenticación segura con JWT y bcrypt."
  },
  {
    icon: "📋",
    title: "Gestión de Proyectos Técnicos",
    description: "Liderazgo de equipos con Scrum y Kanban en proyectos reales. Planificación de sprints en Jira, seguimiento en Trello y versionamiento con TFS."
  }
];

const stats = [
  { value: "2+", label: "años de experiencia" },
  // { value: "4+", label: "proyectos entregados" },
  { value: "2",  label: "sectores: fintech & tech" }
];

const tags = ["Full Stack", "Backend", "Fintech", "Microservicios", "DBA"];

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

  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.div
        className="section-header"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants}>Sobre Mí</motion.h2>
        <motion.div className="section-divider" variants={itemVariants} />
      </motion.div>

      <div className="about-container">
        <motion.div
          className="about-content"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Foto */}
          <motion.div className="about-image" variants={itemVariants}>
            <motion.img
              src={aboutPhoto}
              alt="Adrian Iza"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 10 }}
              whileHover={{ scale: 1.03 }}
            />
          </motion.div>

          {/* Texto principal */}
          <motion.div className="about-text" variants={containerVariants}>

            {/* Tags de rol */}
            <motion.div className="about-tags" variants={itemVariants}>
              {tags.map((tag) => (
                <span key={tag} className="about-tag">{tag}</span>
              ))}
            </motion.div>

            {/* Intro concisa */}
            <motion.p className="about-intro" variants={itemVariants}>
              {/* Ingeniero en Software con experiencia real en sistemas financieros y de alta disponibilidad.
              Actualmente modernizando la plataforma bursátil de la <strong>Bolsa de Valores de Quito</strong>,
              migrando sistemas legacy SOAP a arquitecturas web modernas con .NET Core.
              Construyo software que funciona bajo presión, en producción, con reglas de negocio críticas. */}


              Ingeniero en Software con experiencia en el ámbito empresarial y financiero, desarrollo soluciones de software pensadas para crecer, escalar y generar impacto real en el negocio. Tengo experiencia en entornos exigentes, donde la estabilidad, el rendimiento y la continuidad operativa son críticos. He trabajado en la modernización de sistemas complejos, transformando plataformas legacy en soluciones modernas. Mi enfoque es claro: entregar software sólido, desde sistemas escalables hasta implementaciones enfocadas en resolver problemáticas específicas de forma eficiente.


            </motion.p>

            {/* Stats */}
            <motion.div className="about-stats" variants={containerVariants}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="about-stat"
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Value Props */}
            <motion.div className="about-value-props" variants={containerVariants}>
              {valueProps.map((prop, i) => (
                <motion.div
                  key={i}
                  className="value-prop"
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: i * 0.08,
                        type: "spring",
                        stiffness: 120
                      }
                    }
                  }}
                  whileHover={{ x: 6 }}
                >
                  <span className="value-prop-icon">{prop.icon}</span>
                  <div className="value-prop-content">
                    <strong className="value-prop-title">{prop.title}</strong>
                    <p className="value-prop-description">{prop.description}</p>
                  </div>
                </motion.div>
              ))}
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
