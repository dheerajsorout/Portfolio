import { motion, useScroll, useTransform } from 'framer-motion';
import heroProfile from '../../hero-profile.png';
import { hoverLift, revealScale, revealUp, sectionStagger, springSoft } from './animations/variants';

const Hero = () => {
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 0.45], [0, 110]);

    return (
        <motion.section
            id="home"
            className="hero section"
            initial="hidden"
            animate="visible"
            variants={sectionStagger(0.14, 0.14)}
        >
            <motion.div
                className="hero-content"
                variants={sectionStagger(0.12, 0.12)}
            >
                <motion.span className="hero-kicker" variants={revealUp(18)}>
                    Full-stack web developer
                </motion.span>

                <motion.h1 className="hero-title" variants={revealUp(36)}>
                    Hi, I'm <span className="hero-name-gradient">DHEERAJ</span>
                </motion.h1>

                <motion.h2
                    className="hero-subtitle accent"
                    variants={revealUp(28, 0.02)}
                >
                    MERN Stack Developer
                </motion.h2>

                <motion.p className="hero-description" variants={revealUp(30, 0.05)}>
                    MERN Stack Developer with strong expertise in building scalable, responsive, and user-centric web applications. Skilled in full-stack development using React.js, Next.js, Node.js, and MongoDB, with hands-on experience in AI-integrated applications and real-world deployment.
                </motion.p>

                <motion.div className="hero-buttons" variants={revealUp(24, 0.08)}>
                    <motion.a
                        href="#projects"
                        className="btn btn-primary"
                        whileHover={hoverLift}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Projects
                    </motion.a>

                    <motion.a
                        href="#contact"
                        className="btn btn-outline"
                        whileHover={hoverLift}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Me
                    </motion.a>
                </motion.div>

                <motion.div className="hero-stats" variants={revealUp(24, 0.12)}>
                    <motion.div className="hero-stat-chip" whileHover={{ y: -4 }} transition={springSoft}>
                        <strong>MERN + AI</strong>
                        <span>Frontend, backend, APIs, and deployment</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-image-container"
                style={{ y: yParallax }}
                variants={revealScale(0.08)}
            >
                <motion.span
                    className="hero-orb hero-orb-one"
                    aria-hidden="true"
                    animate={{
                        x: [0, 22, -10, 0],
                        y: [0, -18, 12, 0],
                        scale: [1, 1.08, 0.96, 1],
                    }}
                    transition={{
                        duration: 10,
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }}
                />
                <motion.span
                    className="hero-orb hero-orb-two"
                    aria-hidden="true"
                    animate={{
                        x: [0, -18, 12, 0],
                        y: [0, 14, -10, 0],
                        scale: [1, 0.94, 1.1, 1],
                    }}
                    transition={{
                        duration: 12,
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }}
                />

                <motion.div
                    className="hero-image-shell"
                    whileHover={{
                        y: -10,
                        rotate: 1.5,
                        scale: 1.02,
                    }}
                    transition={springSoft}
                >
                    <motion.span
                        className="hero-image-ring"
                        aria-hidden="true"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
                    />

                    <motion.img
                        src={heroProfile}
                        alt="Dheeraj"
                        className="hero-image"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5.4, ease: 'easeInOut', repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Hero;
