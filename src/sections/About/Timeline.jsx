import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.3 }
  }
};

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 10, mass: 0.5 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 10 }
  }
};

const Timeline = () => {
  const { t } = useTranslation();
  const education = t('about.timeline.items', { returnObjects: true });

  return (
    <motion.div
      id="timeline"
      className="timeline-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '-20% 0px -20% 0px' }}
      variants={containerVariants}
    >
      <motion.h3
        className="timeline-heading"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.1 }
          }
        }}
      >
        {t('about.timeline.title')}
      </motion.h3>

      <motion.div className="timeline" variants={timelineVariants}>
        {education.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            variants={itemVariants}
            custom={index}
          >
            <motion.div
              className="timeline-content"
              whileHover={{
                y: -8,
                boxShadow: '0 15px 35px rgba(108, 99, 255, 0.2)',
                transition: { type: 'spring', stiffness: 400 }
              }}
            >
              <motion.span className="timeline-year" variants={contentVariants} transition={{ delay: 0.2 }}>
                {item.year}
              </motion.span>

              <motion.h4 className="timeline-title" variants={contentVariants} transition={{ delay: 0.2 }}>
                {item.title}
              </motion.h4>

              <motion.h5 className="timeline-institution" variants={contentVariants} transition={{ delay: 0.2 }}>
                {item.institution}
              </motion.h5>

              {item.description && (
                <motion.p className="timeline-description" variants={contentVariants} transition={{ delay: 0.2 }}>
                  {item.description}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Timeline;
