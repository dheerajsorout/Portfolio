import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <section id="experience" className="experience section">
            <motion.h2 
                className="section-title" 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                Experience
            </motion.h2>
            <div className="experience-grid">
                <motion.div 
                    className="card experience-card" 
                    style={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    viewport={{ once: true }}
                >
                    <h3 className="accent">Internship</h3>
                    <p className="company-date">Go Hype Media, Delhi</p>
                    <p className="experience-desc">
                        Gained practical knowledge in full-stack web development and collaborated on scaling web experiences. 
                        Actively contributed to professional projects while exploring industry standards and workflows.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
