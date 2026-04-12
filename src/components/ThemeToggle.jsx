import { useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const iconSpring = {
    type: 'spring',
    stiffness: 260,
    damping: 20,
};

const rays = [
    { angle: 0, y1: 1.2, y2: 4.1 },
    { angle: 45, y1: 1.4, y2: 4.1 },
    { angle: 90, y1: 1.2, y2: 4.2 },
    { angle: 135, y1: 1.6, y2: 4.15 },
    { angle: 180, y1: 1.2, y2: 4.1 },
    { angle: 225, y1: 1.6, y2: 4.15 },
    { angle: 270, y1: 1.2, y2: 4.2 },
    { angle: 315, y1: 1.4, y2: 4.1 },
];

const ThemeToggle = () => {
    const { theme, isDark, isTransitioning, toggleTheme, transition } = useTheme();
    const buttonRef = useRef(null);
    const iconId = useId().replace(/:/g, '');
    const maskId = `${iconId}-mask`;
    const sunGradientId = `${iconId}-sun-gradient`;
    const moonGradientId = `${iconId}-moon-gradient`;
    const lightAuraId = `${iconId}-light-aura`;
    const darkAuraId = `${iconId}-dark-aura`;
    const isGoingDark = isTransitioning && transition.nextTheme === 'dark';
    const isGoingLight = isTransitioning && transition.nextTheme === 'light';

    const buttonAnimation = isGoingDark
        ? {
              boxShadow:
                  '0 0 0 1px rgba(56, 189, 248, 0.24), 0 0 20px rgba(56, 189, 248, 0.28), 0 0 34px rgba(16, 185, 129, 0.16)',
              borderColor: 'rgba(125, 211, 252, 0.36)',
              color: '#e2e8f0',
          }
        : isGoingLight
          ? {
                boxShadow:
                    '0 0 0 1px rgba(255, 255, 255, 0.54), 0 0 18px rgba(255, 255, 255, 0.34), 0 0 30px rgba(251, 191, 36, 0.18)',
                borderColor: 'rgba(253, 224, 71, 0.38)',
                color: '#92400e',
            }
          : isDark
            ? {
                  boxShadow:
                      '0 0 0 1px rgba(56, 189, 248, 0.18), 0 0 14px rgba(56, 189, 248, 0.2), 0 0 24px rgba(16, 185, 129, 0.1)',
                  borderColor: 'rgba(125, 211, 252, 0.28)',
                  color: '#e2e8f0',
              }
            : {
                  boxShadow:
                      '0 0 0 1px rgba(245, 158, 11, 0.16), 0 0 14px rgba(251, 191, 36, 0.2), 0 0 22px rgba(245, 158, 11, 0.12)',
                  borderColor: 'rgba(245, 158, 11, 0.26)',
                  color: '#92400e',
              };

    const iconAnimation = isGoingDark
        ? { rotate: [14, -8, -18], y: [0, -3, 0], scale: [1, 1.08, 0.98] }
        : isGoingLight
          ? { rotate: [-12, 18, 4], y: [0, -1.5, 0], scale: [0.98, 1.08, 1.02] }
          : { rotate: isDark ? -20 : 18, y: 0, scale: isDark ? 0.96 : 1.04 };

    const iconTransition = isTransitioning
        ? {
              duration: 0.78,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.45, 1],
          }
        : iconSpring;

    const handleClick = () => {
        toggleTheme(buttonRef.current);
    };

    return (
        <motion.button
            ref={buttonRef}
            type="button"
            className="theme-toggle"
            data-mode={theme}
            disabled={isTransitioning}
            onClick={handleClick}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            whileHover={isTransitioning ? undefined : { scale: 1.05, y: -1 }}
            whileTap={isTransitioning ? undefined : { scale: 0.94 }}
            animate={buttonAnimation}
            transition={isTransitioning ? { duration: 0.68, ease: [0.22, 1, 0.36, 1] } : iconSpring}
        >
            <span className="theme-toggle-shell">
                <motion.svg
                    className="theme-toggle-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    animate={iconAnimation}
                    transition={iconTransition}
                >
                    <defs>
                        <radialGradient id={sunGradientId} cx="35%" cy="35%" r="75%">
                            <stop offset="0%" stopColor="#fff7bf" />
                            <stop offset="58%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </radialGradient>

                        <linearGradient id={moonGradientId} x1="6" y1="5.5" x2="19" y2="18.5" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#f8fbff" />
                            <stop offset="52%" stopColor="#dbe7f5" />
                            <stop offset="100%" stopColor="#94a3b8" />
                        </linearGradient>

                        <radialGradient id={lightAuraId} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255, 247, 191, 0.95)" />
                            <stop offset="48%" stopColor="rgba(251, 191, 36, 0.28)" />
                            <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
                        </radialGradient>

                        <radialGradient id={darkAuraId} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(226, 232, 240, 0.85)" />
                            <stop offset="48%" stopColor="rgba(56, 189, 248, 0.24)" />
                            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                        </radialGradient>

                        <mask id={maskId}>
                            <rect x="0" y="0" width="24" height="24" fill="white" />
                            <motion.circle
                                fill="black"
                                initial={false}
                                animate={{
                                    cx: isDark ? 15.8 : 22,
                                    cy: isDark ? 8.8 : 4,
                                    r: isDark ? 5.2 : 0.25,
                                }}
                                transition={iconSpring}
                            />
                        </mask>
                    </defs>

                    <motion.circle
                        cx="12"
                        cy="12"
                        r="8.2"
                        fill={`url(#${lightAuraId})`}
                        animate={{
                            opacity: isDark ? 0 : isGoingLight ? [0.24, 0.8, 0.46] : 0.52,
                            scale: isDark ? 0.76 : isGoingLight ? [0.88, 1.12, 1] : 1,
                        }}
                        transition={iconTransition}
                    />

                    <motion.circle
                        cx="12"
                        cy="12"
                        r="8.2"
                        fill={`url(#${darkAuraId})`}
                        animate={{
                            opacity: isDark ? (isGoingDark ? [0.2, 0.72, 0.44] : 0.44) : 0,
                            scale: isDark ? (isGoingDark ? [0.84, 1.08, 1] : 1) : 0.78,
                        }}
                        transition={iconTransition}
                    />

                    <motion.g
                        animate={{
                            opacity: isDark ? 0 : 1,
                            rotate: isGoingLight ? [0, 18, 0] : isDark ? 42 : 0,
                            scale: isGoingLight ? [0.78, 1.16, 1] : isDark ? 0.52 : 1,
                        }}
                        transition={iconTransition}
                    >
                        {rays.map((ray) => (
                            <line
                                key={ray.angle}
                                className="theme-toggle-ray"
                                x1="12"
                                y1={ray.y1}
                                x2="12"
                                y2={ray.y2}
                                transform={`rotate(${ray.angle} 12 12)`}
                            />
                        ))}
                    </motion.g>

                    <motion.circle
                        className="theme-toggle-sun-core"
                        cx="12"
                        cy="12"
                        r="4.85"
                        fill={`url(#${sunGradientId})`}
                        animate={{
                            opacity: isDark ? 0 : 1,
                            scale: isDark ? 0.76 : 1,
                        }}
                        transition={iconTransition}
                    />

                    <motion.circle
                        className="theme-toggle-sun-highlight"
                        cx="12"
                        cy="12"
                        r="2.05"
                        animate={{
                            opacity: isDark ? 0 : 0.22,
                            scale: isDark ? 0.7 : 1,
                        }}
                        transition={iconTransition}
                    />

                    <motion.circle
                        className="theme-toggle-core"
                        cx="12"
                        cy="12"
                        r="5.2"
                        mask={`url(#${maskId})`}
                        fill={`url(#${moonGradientId})`}
                        animate={{
                            opacity: isDark ? 1 : 0,
                            scale: isDark ? 1 : 0.84,
                        }}
                        transition={iconTransition}
                    />

                    <motion.g
                        mask={`url(#${maskId})`}
                        animate={{
                            opacity: isDark ? 0.4 : 0,
                            scale: isDark ? 1 : 0.8,
                        }}
                        transition={iconTransition}
                    >
                        <circle className="theme-toggle-crater theme-toggle-crater-large" cx="9.65" cy="10.15" r="0.86" />
                        <circle className="theme-toggle-crater theme-toggle-crater-small" cx="8.25" cy="13.05" r="0.56" />
                        <circle className="theme-toggle-crater theme-toggle-crater-tiny" cx="11.15" cy="14.2" r="0.34" />
                    </motion.g>

                    <motion.g
                        animate={{
                            opacity: isDark ? 1 : 0,
                            scale: isDark ? 1 : 0.5,
                            rotate: isGoingDark ? [0, -10, 0] : 0,
                        }}
                        transition={iconTransition}
                    >
                        <motion.circle
                            className="theme-toggle-star"
                            cx="17.25"
                            cy="6.55"
                            r="0.95"
                            animate={{
                                opacity: isDark ? [0.34, 1, 0.42] : 0,
                                scale: isDark ? [1, 1.46, 1] : 0.2,
                            }}
                            transition={{
                                duration: 2,
                                ease: 'easeInOut',
                                repeat: isDark ? Infinity : 0,
                            }}
                        />

                        <motion.path
                            className="theme-toggle-star-cross"
                            d="M18.7 12.2L18.7 14.6M17.5 13.4L19.9 13.4"
                            animate={{
                                opacity: isDark ? [0.18, 0.72, 0.2] : 0,
                                scale: isDark ? [0.94, 1.14, 1] : 0.2,
                            }}
                            transition={{
                                duration: 2.3,
                                ease: 'easeInOut',
                                repeat: isDark ? Infinity : 0,
                                delay: 0.25,
                            }}
                        />
                    </motion.g>

                    <motion.g
                        initial={false}
                        animate={{
                            opacity: isGoingLight ? 1 : 0,
                            scale: isGoingLight ? [0.76, 1.04, 0.92] : 0.72,
                        }}
                        transition={{
                            duration: 0.68,
                            ease: [0.22, 1, 0.36, 1],
                            times: [0, 0.6, 1],
                        }}
                    >
                        <motion.path
                            className="theme-toggle-shine"
                            d="M7.4 7.4L10.1 7.4M8.75 6.05L8.75 8.75"
                            initial={false}
                            animate={{
                                opacity: isGoingLight ? [0, 0.95, 0] : 0,
                                pathLength: isGoingLight ? [0, 1, 1] : 0,
                            }}
                            transition={{
                                duration: 0.64,
                                ease: [0.22, 1, 0.36, 1],
                                times: [0, 0.56, 1],
                            }}
                        />
                        <motion.path
                            className="theme-toggle-shine"
                            d="M15.9 5.8L18.5 5.8M17.2 4.5L17.2 7.1"
                            initial={false}
                            animate={{
                                opacity: isGoingLight ? [0, 0.72, 0] : 0,
                                pathLength: isGoingLight ? [0, 1, 1] : 0,
                            }}
                            transition={{
                                duration: 0.72,
                                ease: [0.22, 1, 0.36, 1],
                                times: [0, 0.56, 1],
                                delay: 0.06,
                            }}
                        />
                    </motion.g>
                </motion.svg>
            </span>

            <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
        </motion.button>
    );
};

export default ThemeToggle;
