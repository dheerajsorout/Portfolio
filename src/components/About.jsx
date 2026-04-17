import { motion } from 'framer-motion';

const About = () => {
    const coreStrengths = [
        'HTML: creating responsive and interactive web pages.',
        'CSS: styling responsive and interactive web pages.',
        'React: creating dynamic and reusable UI components.',
        'Next.js: building fast and production-ready React applications.',
        'JavaScript: building logic and working infrastructure.',
        'MongoDB: efficient database design and CRUD operations.',
        'Express.js: building robust backend services and APIs.',
        'Node.js: full-stack JavaScript environment for seamless development.'
    ];

    const keyResponsibilities = [
        'Full-stack development: client-side and server-side integration.',
        'API development: designing RESTful APIs.',
        'Database management: optimizing data storage and retrieval.',
        'Debugging and maintenance: improving performance and fixing issues.',
        'Collaboration: working with cross-functional teams effectively.',
        'Continuous learning: staying up-to-date with latest web technologies.',
        'UI optimization: improving responsiveness, usability, and overall user experience.',
        'Testing and deployment support: preparing applications for stable production delivery.'
    ];

    const sections = [
        {
            title: 'Core Strengths',
            badge: '01',
            className: 'about-ref-card-strengths',
            items: coreStrengths
        },
        {
            title: 'Key Responsibilities',
            badge: '02',
            className: 'about-ref-card-responsibilities',
            items: keyResponsibilities
        }
    ];

    const gridVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.14,
                delayChildren: 0.08
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 36, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const listVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -18 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section id="about" className="about section">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                About Me
            </motion.h2>

            <motion.p
                className="about-ref-intro"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
            >
                Hello! It&apos;s <strong>Dheeraj</strong>, a <strong>MERN Stack Developer</strong> with 1.3+ years of experience building responsive and user-friendly web applications. I can handle both Frontend and Backend perfectly. My core JavaScript, React, and Next.js skills are strong. I specialize in turning complex problems into simple, elegant solutions.
            </motion.p>

            <motion.div
                className="about-ref-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={gridVariants}
            >
                {sections.map((section) => (
                    <motion.article
                        key={section.title}
                        className={`about-ref-card card ${section.className}`}
                        variants={cardVariants}
                        whileHover={{ y: -8, transition: { duration: 0.24 } }}
                    >
                        <motion.h3 className="about-ref-heading" variants={itemVariants}>
                            <span className="about-ref-heading-badge">{section.badge}</span>
                            <span>{section.title}</span>
                        </motion.h3>

                        <motion.ol className="about-ref-list" variants={listVariants}>
                            {section.items.map((item) => (
                                <motion.li
                                    key={item}
                                    variants={itemVariants}
                                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ol>
                    </motion.article>
                ))}
            </motion.div>

            <motion.p
                className="about-ref-summary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                In short, I&apos;m a FullStack developer delivering modern, scalable web applications efficiently in a unified JavaScript ecosystem.
            </motion.p>
        </section>
    );
};

export default About;
