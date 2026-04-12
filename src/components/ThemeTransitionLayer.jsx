import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

const revealTransition = {
    duration: 0.84,
    ease: [0.22, 1, 0.36, 1],
};

const haloTransition = {
    duration: 0.94,
    ease: [0.16, 1, 0.3, 1],
};

const createStars = () =>
    Array.from({ length: 12 }, (_, index) => ({
        id: index,
        top: `${6 + ((index * 17) % 82)}%`,
        left: `${4 + ((index * 31) % 92)}%`,
        size: 1.2 + (index % 3) * 0.9,
        opacity: 0.26 + (index % 4) * 0.1,
        delay: index * 0.22,
        duration: 3.1 + (index % 5) * 0.45,
    }));

const createRays = () =>
    Array.from({ length: 5 }, (_, index) => ({
        id: index,
        top: `${8 + index * 13}%`,
        right: `${-8 + index * 2}%`,
        width: `${34 + index * 6}vw`,
        rotation: -28 + index * 9,
        opacity: 0.07 + index * 0.03,
        delay: index * 0.14,
        duration: 4.6 + index * 0.4,
    }));

const getCircleStyle = (transition) => {
    const diameter = transition.radius * 2.45;

    return {
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: `${transition.origin.x}px`,
        top: `${transition.origin.y}px`,
    };
};

const ThemeScene = ({ theme, stars, rays }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`theme-scene theme-scene-${theme}`}>
            <div className={`theme-surface theme-surface-${theme}`} />

            <div className={`theme-atmosphere theme-atmosphere-${theme}`}>
                {isDark
                    ? stars.map((star) => (
                          <motion.span
                              key={`${theme}-${star.id}`}
                              className="theme-star"
                              style={{
                                  top: star.top,
                                  left: star.left,
                                  width: `${star.size}px`,
                                  height: `${star.size}px`,
                              }}
                              initial={false}
                              animate={{
                                  opacity: [star.opacity * 0.56, star.opacity, star.opacity * 0.72],
                                  scale: [1, 1.14, 1],
                              }}
                              transition={{
                                  duration: star.duration,
                                  ease: 'easeInOut',
                                  repeat: Infinity,
                                  delay: star.delay,
                              }}
                          />
                      ))
                    : rays.map((ray) => (
                          <span
                              key={`${theme}-${ray.id}`}
                              className="theme-ray-frame"
                              style={{
                                  top: ray.top,
                                  right: ray.right,
                                  width: ray.width,
                                  transform: `rotate(${ray.rotation}deg)`,
                              }}
                          >
                              <motion.span
                                  className="theme-ray"
                                  initial={false}
                                  animate={{
                                      opacity: [ray.opacity * 0.74, ray.opacity, ray.opacity * 0.82],
                                      scaleX: [0.9, 1.04, 0.95],
                                  }}
                                  transition={{
                                      duration: ray.duration,
                                      ease: 'easeInOut',
                                      repeat: Infinity,
                                      delay: ray.delay,
                                  }}
                              />
                          </span>
                      ))}
            </div>
        </div>
    );
};

const CircularThemeTransition = ({ transition, stars, rays }) => {
    const circleStyle = useMemo(
        () => getCircleStyle(transition),
        [transition.key, transition.origin.x, transition.origin.y, transition.radius],
    );

    return (
        <motion.div
            className="theme-transition-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
        >
            <ThemeScene theme={transition.previousTheme} stars={stars} rays={rays} />

            <motion.div
                className={`theme-reveal-circle theme-reveal-${transition.nextTheme}`}
                style={circleStyle}
                initial={{
                    scale: 0,
                    opacity: transition.nextTheme === 'dark' ? 0.94 : 0.82,
                }}
                animate={{ scale: 1.03, opacity: 1 }}
                transition={revealTransition}
            >
                <ThemeScene theme={transition.nextTheme} stars={stars} rays={rays} />
            </motion.div>

            <motion.div
                className={`theme-reveal-halo theme-reveal-halo-${transition.nextTheme}`}
                style={circleStyle}
                initial={{ scale: 0.12, opacity: transition.nextTheme === 'dark' ? 0.26 : 0.44 }}
                animate={{ scale: 1.08, opacity: 0 }}
                transition={haloTransition}
            />

            <motion.div
                className={`theme-ripple-ring theme-ripple-ring-${transition.nextTheme}`}
                style={circleStyle}
                initial={{ scale: 0.16, opacity: transition.nextTheme === 'dark' ? 0.3 : 0.48 }}
                animate={{ scale: 1.12, opacity: 0 }}
                transition={{
                    duration: 0.98,
                    ease: [0.16, 1, 0.3, 1],
                }}
            />

            <motion.div
                className={`theme-ripple-ring theme-ripple-ring-secondary theme-ripple-ring-${transition.nextTheme}`}
                style={circleStyle}
                initial={{ scale: 0.22, opacity: transition.nextTheme === 'dark' ? 0.22 : 0.38 }}
                animate={{ scale: 1.22, opacity: 0 }}
                transition={{
                    duration: 1.06,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.08,
                }}
            />
        </motion.div>
    );
};

const ThemeTransitionLayer = () => {
    const { theme, transition, isTransitioning } = useTheme();
    const stars = useMemo(() => createStars(), []);
    const rays = useMemo(() => createRays(), []);

    return (
        <div className="theme-stage" aria-hidden="true">
            <ThemeScene theme={theme} stars={stars} rays={rays} />

            <AnimatePresence initial={false}>
                {isTransitioning ? (
                    <CircularThemeTransition
                        key={transition.key}
                        transition={transition}
                        stars={stars}
                        rays={rays}
                    />
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default ThemeTransitionLayer;
