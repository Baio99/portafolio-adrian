import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import './Home.css';
import profilePhoto from '../../assets/images/profile-photo.jpg';

const Home = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [phase, setPhase] = useState(0); // 0: typing text1, 1: showing both, 2: erasing both
  const fullText1 = "Web Developer";
  const fullText2 = "Backend Developer";
  const typingSpeed = 100;
  const displayDuration = 2000;

  useEffect(() => {
    let timeoutIds = [];
    
    const startAnimation = () => {
      // Fase 1: Escribir "Web Developer"
      if (phase === 0) {
        if (text1.length < fullText1.length) {
          const timeoutId = setTimeout(() => {
            setText1(fullText1.substring(0, text1.length + 1));
          }, typingSpeed);
          timeoutIds.push(timeoutId);
        } else {
          // Esperar un poco y pasar a escribir "Backend Developer"
          const timeoutId = setTimeout(() => {
            setPhase(1);
          }, 500);
          timeoutIds.push(timeoutId);
        }
      }
      
      // Fase 2: Escribir "Backend Developer"
      else if (phase === 1) {
        if (text2.length < fullText2.length) {
          const timeoutId = setTimeout(() => {
            setText2(fullText2.substring(0, text2.length + 1));
          }, typingSpeed);
          timeoutIds.push(timeoutId);
        } else {
          // Esperar un rato con ambos textos visibles
          const timeoutId = setTimeout(() => {
            setPhase(2);
          }, displayDuration);
          timeoutIds.push(timeoutId);
        }
      }
      
      // Fase 3: Borrar ambos textos
      else if (phase === 2) {
        if (text1.length > 0 || text2.length > 0) {
          const timeoutId = setTimeout(() => {
            if (text1.length > 0) {
              setText1(text1.substring(0, text1.length - 1));
            }
            if (text2.length > 0) {
              setText2(text2.substring(0, text2.length - 1));
            }
          }, typingSpeed / 2); // Borrar más rápido que escribir
          timeoutIds.push(timeoutId);
        } else {
          // Reiniciar el ciclo
          const timeoutId = setTimeout(() => {
            setPhase(0);
          }, 500);
          timeoutIds.push(timeoutId);
        }
      }
    };

    startAnimation();

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [text1, text2, phase]);

  // Variantes de animación (mantenemos las originales)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 10,
        mass: 0.5
      }
    }
  };

  const photoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: 0.2
      }
    }
  };

  const techIconVariants = (delay) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.8 + delay * 0.2
      }
    }
  });

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <motion.div 
          className="home-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          variants={containerVariants}
        >
          <motion.div className="home-text" variants={itemVariants}>
            <motion.h1 className="home-greeting" variants={itemVariants}>
              Hola, yo soy
            </motion.h1>
            <motion.h1 className="home-name" variants={itemVariants}>
              Adrian Iza
            </motion.h1>
            <motion.h2 className="home-title" variants={itemVariants}>
              Ingeniero en Software
            </motion.h2>
            
            <motion.div className="home-subtitle">
              <motion.div 
                className="typing-container"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
              >
                <motion.h3 
                  className="typing-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {text1}
                  {(phase === 0 || phase === 1) && text1.length > 0 && (
                    <span className="cursor">|</span>
                  )}
                </motion.h3>
              </motion.div>
              
              <motion.div 
                className="typing-container"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
              >
                <motion.h3 
                  className="typing-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {text2}
                  {phase === 1 && text2.length > 0 && text2.length < fullText2.length && (
                    <span className="cursor">|</span>
                  )}
                </motion.h3>
              </motion.div>
            </motion.div>
            
            <motion.div className="home-cta" variants={itemVariants}>
              <Link 
                to="projects" 
                smooth={true} 
                duration={500} 
                className="primary-button"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver proyectos
                </motion.span>
              </Link>
              <Link 
                to="contact" 
                smooth={true} 
                duration={500} 
                className="secondary-button"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contacto
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="home-image" variants={photoVariants}>
            <div className="photo-container">
              <img 
                src={profilePhoto} 
                alt="Adrian Iza" 
                className="profile-photo" 
              />
              <div className="decorative-shape"></div>
              <div className="tech-icons">
                {['javascript', 'nodejs', 'python', 'mongodb'].map((tech, index) => (
                  <motion.div 
                    key={tech} 
                    className={`tech-icon tech-${index}`}
                    style={{ backgroundImage: `url(/assets/images/icons/${tech}.svg)` }}
                    variants={techIconVariants(index)}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;