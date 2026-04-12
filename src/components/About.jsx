import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="about section">
            <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                About Me
            </motion.h2>
            <motion.p 
                className="about-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                I am a passionate <strong>MERN Stack Developer</strong> leveraging technologies like React.js, Next.js, Node.js, and MongoDB to create robust web applications. With hands-on experience in AI integrations and building platforms from the ground up, I focus on delivering scalable and elegant solutions tailored to real-world needs.
            </motion.p>
            
            <div className="about-grid">
                <motion.div 
                    className="competencies"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="accent">Education</h3>
                    <ul className="about-list" style={{ listStyleType: 'none', marginLeft: 0 }}>
                        <li style={{ marginBottom: '20px' }}>
                            <strong>Bachelor of Computer Applications (BCA)</strong><br />
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>J.C. Bose University of Science and Technology (YMCA), Faridabad</span>
                        </li>
                        <li>
                            <strong>Senior Secondary (12th)</strong><br />
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>H.B.S.E Board</span>
                        </li>
                    </ul>
                </motion.div>
                <motion.div 
                    className="responsibilities"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="accent">Certifications</h3>
                    <ul className="about-list" style={{ listStyleType: 'none', marginLeft: 0 }}>
                        <li>
                            <strong>MERN Stack Development</strong><br />
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>Ducat IT Training Institute</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
