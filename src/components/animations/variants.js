export const easeOutExpo = [0.16, 1, 0.3, 1];

export const viewport = {
    once: true,
    amount: 0.2,
};

export const viewportTight = {
    once: true,
    amount: 0.3,
};

export const springSoft = {
    type: 'spring',
    stiffness: 140,
    damping: 22,
};

export const sectionStagger = (staggerChildren = 0.12, delayChildren = 0.08) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

export const revealUp = (distance = 32, delay = 0) => ({
    hidden: {
        opacity: 0,
        y: distance,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.72,
            delay,
            ease: easeOutExpo,
        },
    },
});

export const revealSide = (distance = 32, delay = 0) => ({
    hidden: {
        opacity: 0,
        x: distance,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.68,
            delay,
            ease: easeOutExpo,
        },
    },
});

export const revealScale = (delay = 0) => ({
    hidden: {
        opacity: 0,
        scale: 0.92,
        y: 24,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.75,
            delay,
            ease: easeOutExpo,
        },
    },
});

export const hoverLift = {
    y: -10,
    scale: 1.02,
    transition: {
        type: 'spring',
        stiffness: 240,
        damping: 20,
    },
};

export const hoverTilt = {
    y: -12,
    scale: 1.02,
    rotateX: -5,
    rotateY: 4,
    transition: {
        type: 'spring',
        stiffness: 220,
        damping: 20,
    },
};
