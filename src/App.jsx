import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeTransitionLayer from './components/ThemeTransitionLayer';
import { hoverLift, revealScale, revealUp, sectionStagger, viewport } from './components/animations/variants';
import { useTheme } from './context/ThemeContext';

function App() {
    const { scrollYProgress } = useScroll();
    const { isTransitioning } = useTheme();
    const resumeUrl = `${import.meta.env.BASE_URL}Dheeraj_Resume.pdf`;

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="portfolio-app">
            <ThemeTransitionLayer />

            <div className={`page-shell ${isTransitioning ? 'is-transitioning' : ''}`}>
                <motion.div className="progress-bar" style={{ scaleX }} />

                <Navbar />

                <main>
                    <Hero />
                    <About />
                    <Experience />
                    <Projects />
                    <Skills />

                    <motion.section
                        id="resume"
                        className="resume section"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        variants={sectionStagger(0.14, 0.08)}
                    >
                        <motion.div className="resume-shell card" variants={revealScale()}>
                            <motion.span
                                className="resume-orb resume-orb-one"
                                aria-hidden="true"
                                animate={{
                                    x: [0, 18, -8, 0],
                                    y: [0, -16, 10, 0],
                                    scale: [1, 1.08, 0.96, 1],
                                }}
                                transition={{
                                    duration: 11,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                }}
                            />
                            <motion.span
                                className="resume-orb resume-orb-two"
                                aria-hidden="true"
                                animate={{
                                    x: [0, -18, 8, 0],
                                    y: [0, 14, -12, 0],
                                    scale: [1, 0.96, 1.1, 1],
                                }}
                                transition={{
                                    duration: 12.5,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                }}
                            />

                            <motion.h2
                                className="section-title text-gradient"
                                variants={revealUp(24)}
                            >
                                Resume
                            </motion.h2>

                            <motion.p className="resume-copy" variants={revealUp(20, 0.05)}>
                                Download the latest version of my CV with skills, project work, and contact details in one file.
                            </motion.p>

                            <motion.div className="resume-btn-container" variants={revealUp(28, 0.1)}>
                                <motion.a
                                    href={resumeUrl}
                                    className="btn btn-primary"
                                    download="Dheeraj_Resume.pdf"
                                    whileHover={hoverLift}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <i className="fas fa-file-pdf"></i> Download Resume
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </motion.section>

                    <Contact />
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default App
