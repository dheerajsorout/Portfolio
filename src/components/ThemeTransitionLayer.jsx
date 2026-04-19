import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const easeLiquid = [0.16, 1, 0.3, 1];
const easeSoft = [0.22, 1, 0.36, 1];

const liquidSweepTransition = {
    duration: 1.18,
    ease: easeLiquid,
    times: [0, 0.84, 1],
};

const liquidBlobs = [
    {
        key: 'one',
        className: 'theme-liquid-blob theme-liquid-blob-one',
        animate: {
            x: [0, 22, -8],
            y: [-20, 10, 0],
            scale: [0.92, 1.12, 1.02],
        },
        transition: {
            duration: 1.04,
            ease: easeSoft,
            times: [0, 0.62, 1],
        },
    },
    {
        key: 'two',
        className: 'theme-liquid-blob theme-liquid-blob-two',
        animate: {
            x: [0, 18, -6],
            y: [-10, 12, 4],
            scale: [0.94, 1.08, 1],
        },
        transition: {
            duration: 1.1,
            ease: easeSoft,
            times: [0, 0.58, 1],
            delay: 0.04,
        },
    },
    {
        key: 'three',
        className: 'theme-liquid-blob theme-liquid-blob-three',
        animate: {
            x: [0, 28, -12],
            y: [8, -18, -4],
            scale: [0.98, 1.12, 1.04],
        },
        transition: {
            duration: 1.08,
            ease: easeSoft,
            times: [0, 0.56, 1],
            delay: 0.08,
        },
    },
    {
        key: 'four',
        className: 'theme-liquid-blob theme-liquid-blob-four',
        animate: {
            x: [0, 18, -10],
            y: [10, -16, 2],
            scale: [0.96, 1.1, 1.02],
        },
        transition: {
            duration: 1.08,
            ease: easeSoft,
            times: [0, 0.58, 1],
            delay: 0.05,
        },
    },
    {
        key: 'five',
        className: 'theme-liquid-blob theme-liquid-blob-five',
        animate: {
            x: [0, 24, -10],
            y: [20, -8, 6],
            scale: [0.92, 1.1, 1],
        },
        transition: {
            duration: 1.12,
            ease: easeSoft,
            times: [0, 0.6, 1],
            delay: 0.1,
        },
    },
];

const foamDrops = [
    {
        key: 'a',
        className: 'theme-liquid-foam theme-liquid-foam-one',
        animate: {
            opacity: [0, 0.72, 0],
            x: [0, 12, 24],
            y: [0, -10, -16],
            scale: [0.7, 1, 1.08],
        },
        transition: {
            duration: 0.72,
            ease: easeSoft,
            times: [0, 0.42, 1],
            delay: 0.24,
        },
    },
    {
        key: 'b',
        className: 'theme-liquid-foam theme-liquid-foam-two',
        animate: {
            opacity: [0, 0.6, 0],
            x: [0, 14, 26],
            y: [0, 8, 18],
            scale: [0.8, 1.04, 1.12],
        },
        transition: {
            duration: 0.7,
            ease: easeSoft,
            times: [0, 0.38, 1],
            delay: 0.28,
        },
    },
    {
        key: 'c',
        className: 'theme-liquid-foam theme-liquid-foam-three',
        animate: {
            opacity: [0, 0.5, 0],
            x: [0, 10, 18],
            y: [0, -14, -24],
            scale: [0.72, 0.98, 1.08],
        },
        transition: {
            duration: 0.76,
            ease: easeSoft,
            times: [0, 0.42, 1],
            delay: 0.32,
        },
    },
];

const ThemeStage = ({ theme, className = '' }) => (
    <div className={`theme-stage-swatch theme-stage-swatch--${theme} ${className}`.trim()} />
);

const LiquidThemeTransition = ({ transition }) => (
    <motion.div
        className={`theme-liquid-transition theme-liquid-transition--${transition.nextTheme}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
    >
        <svg className="theme-liquid-defs" width="0" height="0" aria-hidden="true" focusable="false">
            <defs>
                <filter id="theme-liquid-goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="
                            1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 22 -10
                        "
                        result="goo"
                    />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </defs>
        </svg>

        <ThemeStage theme={transition.previousTheme} className="theme-liquid-backdrop" />

        <motion.span
            className="theme-liquid-haze"
            initial={{ opacity: 0.04, scale: 0.94 }}
            animate={{
                opacity: [0.04, 0.22, 0.08],
                scale: [0.94, 1.04, 1],
            }}
            transition={{
                duration: 1.08,
                ease: easeSoft,
                times: [0, 0.54, 1],
            }}
        />

        <motion.div
            className="theme-liquid-pass"
            initial={{ x: '100%', rotate: -1.6 }}
            animate={{
                x: ['100%', '-3%', '0%'],
                rotate: [-1.6, 0.45, 0],
            }}
            transition={liquidSweepTransition}
        >
            <ThemeStage theme={transition.nextTheme} className="theme-liquid-surface" />

            <motion.div
                className="theme-liquid-edge"
                initial={{ x: 0, y: 0 }}
                animate={{
                    x: [0, -28, 0],
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 1.12,
                    ease: easeSoft,
                    times: [0, 0.74, 1],
                }}
            >
                <span className="theme-liquid-spine" />
                <span className="theme-liquid-spine theme-liquid-spine-secondary" />

                {liquidBlobs.map((blob) => (
                    <motion.span
                        key={blob.key}
                        className={blob.className}
                        initial={false}
                        animate={blob.animate}
                        transition={blob.transition}
                    />
                ))}

                {foamDrops.map((drop) => (
                    <motion.span
                        key={drop.key}
                        className={drop.className}
                        initial={{ opacity: 0 }}
                        animate={drop.animate}
                        transition={drop.transition}
                    />
                ))}
            </motion.div>

            <motion.span
                className="theme-liquid-shadow-band"
                initial={{ opacity: 0.1, scaleY: 0.88 }}
                animate={{
                    opacity: [0.1, 0.22, 0],
                    scaleY: [0.88, 1.06, 1.12],
                }}
                transition={{
                    duration: 0.96,
                    ease: easeSoft,
                    times: [0, 0.56, 1],
                }}
            />

            <motion.span
                className="theme-liquid-highlight"
                initial={{ opacity: 0.18, scaleY: 0.82, x: -16 }}
                animate={{
                    opacity: [0.18, 0.42, 0],
                    scaleY: [0.82, 1.06, 1.12],
                    x: [-16, 8, 18],
                }}
                transition={{
                    duration: 1,
                    ease: easeSoft,
                    times: [0, 0.52, 1],
                }}
            />

            <motion.span
                className="theme-liquid-glow"
                initial={{ opacity: 0.08, scale: 0.84 }}
                animate={{
                    opacity: [0.08, 0.18, 0],
                    scale: [0.84, 1.08, 1.18],
                }}
                transition={{
                    duration: 1.04,
                    ease: easeSoft,
                    times: [0, 0.58, 1],
                }}
            />
        </motion.div>
    </motion.div>
);

const ThemeTransitionLayer = () => {
    const { transition, isTransitioning } = useTheme();

    return (
        <div className="theme-transition-layer" aria-hidden="true">
            <AnimatePresence initial={false}>
                {isTransitioning ? (
                    <LiquidThemeTransition key={transition.key} transition={transition} />
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default ThemeTransitionLayer;
