import React from 'react';
import { useTranslation } from 'react-i18next';
import javascriptIcon from '../../assets/images/icons/javascript.svg';
import nodejsIcon     from '../../assets/images/icons/nodejs.svg';
import pythonIcon     from '../../assets/images/icons/python.svg';
import mysqlIcon      from '../../assets/images/icons/mysql.svg';
import postgresqlIcon from '../../assets/images/icons/postgresql.svg';
import mongodbIcon    from '../../assets/images/icons/mongodb.svg';
import dotnetIcon     from '../../assets/images/icons/dotnet.svg';
import sqlIcon        from '../../assets/images/icons/sql.svg';

const skillsData = [
  { name: 'JavaScript', icon: javascriptIcon },
  { name: 'Node.js',    icon: nodejsIcon },
  { name: 'Python',     icon: pythonIcon },
  { name: 'MySQL',      icon: mysqlIcon },
  { name: 'PostgreSQL', icon: postgresqlIcon },
  { name: 'MongoDB',    icon: mongodbIcon },
  { name: 'SQL',        icon: sqlIcon },
  { name: '.NET',       icon: dotnetIcon }
];

const Skills = () => {
  const { t } = useTranslation();

  return (
    <div className="skills-section">
      <h3>{t('about.skills.title')}</h3>
      <div className="skills-grid">
        {skillsData.map((skill, index) => (
          <div key={index} className="skill-card">
            <img src={skill.icon} alt={skill.name} className="skill-icon" />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
