import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="contact section" style={{ maxWidth: '800px' }}>
            <motion.h2 
                className="section-title text-gradient" 
                style={{ marginBottom: '10px' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Contact Me
            </motion.h2>
            <motion.p 
                className="text-center" 
                style={{ marginBottom: '40px', color: 'var(--text-muted)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
            >
                Feel free to reach out for collaborations or just a friendly chat.
            </motion.p>
            <motion.div 
                className="contact-card card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                <div className="contact-item">
                    <div className="contact-icon"><i className="fas fa-user"></i></div>
                    <div className="contact-info">
                        <span className="contact-label">Name</span>
                        <span className="contact-value">Dheeraj</span>
                    </div>
                </div>
                <div className="contact-item">
                    <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                    <div className="contact-info">
                        <span className="contact-label">Mobile</span>
                        <span className="contact-value">+91 9518184601</span>
                    </div>
                </div>
                <div className="contact-item">
                    <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                    <div className="contact-info">
                        <span className="contact-label">Email</span>
                        <a href="mailto:dheerajsorout16500@gmail.com" className="contact-value highlight">dheerajsorout16500@gmail.com</a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
