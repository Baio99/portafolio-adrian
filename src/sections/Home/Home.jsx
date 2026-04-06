import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import './Home.css';
import profilePhoto from '../../assets/images/perfil.png';

const Home = () => {
  const { t, i18n } = useTranslation();

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [phase, setPhase] = useState(0);
  const typingSpeed = 100;
  const displayDuration = 2000;

  const fullText1 = t('home.typingText1');
  const fullText2 = t('home.typingText2');

  // Reset animation when language changes
  useEffect(() => {
    setText1('');
    setText2('');
    setPhase(0);
  }, [i18n.language]);

  useEffect(() => {
    let timeoutIds = [];

    const startAnimation = () => {
      if (phase === 0) {
        if (text1.length < fullText1.length) {
          const id = setTimeout(() => {
            setText1(fullText1.substring(0, text1.length + 1));
          }, typingSpeed);
          timeoutIds.push(id);
        } else {
          const id = setTimeout(() => setPhase(1), 500);
          timeoutIds.push(id);
        }
      } else if (phase === 1) {
        if (text2.length < fullText2.length) {
          const id = setTimeout(() => {
            setText2(fullText2.substring(0, text2.length + 1));
          }, typingSpeed);
          timeoutIds.push(id);
        } else {
          const id = setTimeout(() => setPhase(2), displayDuration);
          timeoutIds.push(id);
        }
      } else if (phase === 2) {
        if (text1.length > 0 || text2.length > 0) {
          const id = setTimeout(() => {
            if (text1.length > 0) setText1(text1.substring(0, text1.length - 1));
            if (text2.length > 0) setText2(text2.substring(0, text2.length - 1));
          }, typingSpeed / 2);
          timeoutIds.push(id);
        } else {
          const id = setTimeout(() => setPhase(0), 500);
          timeoutIds.push(id);
        }
      }
    };

    startAnimation();
    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, [text1, text2, phase, fullText1, fullText2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90, damping: 10, mass: 0.5 }
    }
  };

  const photoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 10, delay: 0.2 }
    }
  };

  const techIconVariants = (delay) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 10, delay: 0.8 + delay * 0.2 }
    }
  });

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <motion.div
          className="home-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={containerVariants}
        >
          <motion.div className="home-text" variants={itemVariants}>
            <motion.h1 className="home-greeting" variants={itemVariants}>
              {t('home.greeting')}
            </motion.h1>
            <motion.h1 className="home-name" variants={itemVariants}>
              Adrian Iza
            </motion.h1>
            <motion.h2 className="home-title" variants={itemVariants}>
              {t('home.jobTitle')}
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
              <Link to="projects" smooth={true} duration={500} className="primary-button">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {t('home.ctaProjects')}
                </motion.span>
              </Link>
              <Link to="contact" smooth={true} duration={500} className="secondary-button">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {t('home.ctaContact')}
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="home-image" variants={photoVariants}>
            <div className="photo-container">
              <img src={profilePhoto} alt="Adrian Iza" className="profile-photo" />
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
