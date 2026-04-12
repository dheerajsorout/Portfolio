import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Resume', href: '#resume' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''} ${isOpen ? 'nav-open' : ''}`}>
            <motion.div
                className="logo"
                whileHover={{
                    scale: 1.1,
                    color: 'var(--accent)',
                    textShadow: "0 0 8px var(--accent)"
                }}
                whileTap={{ scale: 0.9 }}
            >
                DHEERAJ
            </motion.div>

            <div className="header-actions">
                <ThemeToggle />

                <button
                    className={`nav-toggle ${isOpen ? 'nav-open' : ''}`}
                    aria-label="toggle navigation"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="hamburger"></span>
                </button>
            </div>

            <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
                <ul className="nav-list">
                    {navLinks.map((link, i) => (
                        <motion.li
                            key={link.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <motion.a
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                whileHover={{ x: 5, color: 'var(--accent)' }}
                            >
                                {link.name}
                            </motion.a>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
