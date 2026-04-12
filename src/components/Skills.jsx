import { motion } from 'framer-motion';

const Skills = () => {
    const skills = [
        "React.js", "Next.js", "JavaScript", "HTML5", "CSS3", 
        "Node.js", "Express.js", "MongoDB", "Neon DB", 
        "Git", "GitHub", "VS Code", "Vercel"
    ];

    return (
        <section id="skills" className="skills section">
            <motion.h2 
                className="section-title" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Technical Skills
            </motion.h2>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <motion.span 
                        key={skill}
                        className="skill-chip"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "var(--accent)", 
                            color: "#000",
                            boxShadow: "0 0 15px var(--accent)"
                        }}
                        transition={{ 
                            delay: index * 0.05,
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                        }}
                        viewport={{ once: true }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </section>
    );
};

export default Skills;
