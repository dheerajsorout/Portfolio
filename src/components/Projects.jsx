import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            title: 'BookMyInfluencer',
            desc: 'Developed a platform for brands to collaborate with influencers. Implemented discovery, campaign tracking, and workflows.',
            link: 'https://bookmyinfluencer.vercel.app/'
        },
        {
            title: 'Data-Pedia AI',
            desc: 'Built an AI-powered spreadsheet assistant using natural language processing for data cleaning and insights.',
            link: 'https://data-pedia-ai.vercel.app/'
        },
        {
            title: 'Lead-Genius',
            desc: 'Developed a lead management system for organizing and tracking business leads efficiently.',
            link: null
        },
        {
            title: 'Hotel-Hider',
            desc: 'Designed a modern hotel website with responsive UI and service showcase.',
            link: 'https://hider-two.vercel.app/'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <section id="projects" className="projects section">
            <motion.h2 
                className="section-title" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Projects
            </motion.h2>
            <motion.div 
                className="projects-grid dynamic-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {projects.map((project, index) => (
                    <motion.div 
                        key={index}
                        className="card project-card" 
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.05, 
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <div>
                            <h3 className="text-center" style={{ color: 'var(--text-main)' }}>{project.title}</h3>
                            <p className="project-desc text-center">{project.desc}</p>
                        </div>
                        {project.link && (
                            <div className="text-center" style={{ marginTop: '15px' }}>
                                <motion.a 
                                    href={project.link}
                                    target="_blank" 
                                    rel="noreferrer"
                                    style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9em', fontWeight: 500 }}
                                    whileHover={{ x: 5 }}
                                >
                                    Live Demo &nbsp;<i className="fas fa-external-link-alt"></i>
                                </motion.a>
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;
