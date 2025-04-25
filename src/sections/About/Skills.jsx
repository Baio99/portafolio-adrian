import React from 'react';
//import './Skills.css';
//import '../../assets/images/icons/javascript.svg'; // Import the CSS file for styling
import javascriptIcon from '../../assets/images/icons/javascript.svg';
import typescriptIcon from '../../assets/images/icons/typescript.svg';
import nodejsIcon from '../../assets/images/icons/nodejs.svg';
import pythonIcon from '../../assets/images/icons/python.svg';
import mysqlIcon from '../../assets/images/icons/mysql.svg';
import postgresqlIcon from '../../assets/images/icons/postgresql.svg';
import mongodbIcon from '../../assets/images/icons/mongodb.svg';
import dotnetIcon from '../../assets/images/icons/dotnet.svg';



const Skills = () => {
  const skills = [
    { name: 'JavaScript', icon: javascriptIcon },
    { name: 'TypeScript', icon: typescriptIcon },
    { name: 'Node.js', icon: nodejsIcon },
    { name: 'Python', icon: pythonIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'PostgreSQL', icon: postgresqlIcon },
    { name: 'MongoDB', icon: mongodbIcon },
    { name: '.NET', icon: dotnetIcon }
  ];

  return (
    <div className="skills-section">
      <h3>Mis Habilidades</h3>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="skill-icon"
            />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;