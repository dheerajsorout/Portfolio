import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const easing = [0.22, 1, 0.36, 1];

const variants = {
    idle: () => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.3,
            ease: easing,
        },
    }),
    toDark: (index = 0) => ({
        opacity: [1, 0.74, 1],
        y: [0, -10, 0],
        filter: ['blur(0px)', 'blur(0.8px)', 'blur(0px)'],
        transition: {
            duration: 0.68,
            delay: index * 0.03,
            times: [0, 0.34, 1],
            ease: easing,
        },
    }),
    toLight: (index = 0) => ({
        opacity: [1, 0.82, 1],
        y: [0, 8, 0],
        filter: ['blur(0px)', 'blur(0.6px)', 'blur(0px)'],
        transition: {
            duration: 0.62,
            delay: index * 0.028,
            times: [0, 0.3, 1],
            ease: easing,
        },
    }),
};

const ThemeAnimatedBlock = ({ children, index = 0 }) => {
    const { isTransitioning, transition } = useTheme();

    const activeVariant = isTransitioning
        ? transition.nextTheme === 'dark'
            ? 'toDark'
            : 'toLight'
        : 'idle';

    return (
        <motion.div
            className="theme-motion-group"
            custom={index}
            initial={false}
            animate={activeVariant}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default ThemeAnimatedBlock;
