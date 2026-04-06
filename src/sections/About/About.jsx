import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';
import Skills from './Skills';
import Timeline from './Timeline';
import aboutPhoto from '../../assets/images/36.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 10 }
  }
};

const About = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  const valueProps = t('about.valueProps', { returnObjects: true });
  const stats     = t('about.stats',      { returnObjects: true });
  const tags      = t('about.tags',       { returnObjects: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
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
        <motion.h2 variants={itemVariants}>{t('about.sectionTitle')}</motion.h2>
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
              transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 10 }}
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

            {/* Intro */}
            <motion.p className="about-intro" variants={itemVariants}>
              {t('about.intro')}
            </motion.p>

            {/* Stats */}
            <motion.div className="about-stats" variants={containerVariants}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="about-stat"
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
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
                      transition: { delay: i * 0.08, type: 'spring', stiffness: 120 }
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
