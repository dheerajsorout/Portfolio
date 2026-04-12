import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

const ThemeContext = createContext(null);

export const THEME_TRANSITION_DURATION = 950;

export const getInitialTheme = () => {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    const storedTheme = window.localStorage.getItem('theme');

    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyThemeToDocument = (theme) => {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.setAttribute('data-theme', theme);

    if (document.body) {
        document.body.setAttribute('data-theme', theme);
    }
};

const getFallbackOrigin = () => {
    if (typeof window === 'undefined') {
        return { x: 0, y: 0 };
    }

    return {
        x: window.innerWidth - 72,
        y: 48,
    };
};

const getOriginFromTarget = (target) => {
    if (!target || typeof target.getBoundingClientRect !== 'function') {
        return getFallbackOrigin();
    }

    const rect = target.getBoundingClientRect();

    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    };
};

const getRippleRadius = (origin) => {
    if (typeof window === 'undefined') {
        return 1200;
    }

    const maxX = Math.max(origin.x, window.innerWidth - origin.x);
    const maxY = Math.max(origin.y, window.innerHeight - origin.y);

    return Math.sqrt(maxX * maxX + maxY * maxY);
};

const playThemeToggleSound = (audioContextRef, nextTheme) => {
    if (typeof window === 'undefined') {
        return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    try {
        const audioContext = audioContextRef.current ?? new AudioContextClass();
        audioContextRef.current = audioContext;

        if (audioContext.state === 'suspended') {
            audioContext.resume().catch(() => {});
        }

        const now = audioContext.currentTime;
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.type = nextTheme === 'dark' ? 'triangle' : 'sine';
        oscillator.frequency.setValueAtTime(nextTheme === 'dark' ? 400 : 540, now);
        oscillator.frequency.exponentialRampToValueAtTime(nextTheme === 'dark' ? 250 : 680, now + 0.15);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(nextTheme === 'dark' ? 1400 : 2000, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.022, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        oscillator.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.19);
    } catch {
        // Ignore audio errors so theme switching never fails.
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => getInitialTheme());
    const [transition, setTransition] = useState(() => {
        const origin = getFallbackOrigin();

        return {
            key: 0,
            isActive: false,
            previousTheme: getInitialTheme(),
            nextTheme: getInitialTheme(),
            origin,
            radius: getRippleRadius(origin),
        };
    });

    const timeoutRef = useRef(null);
    const audioContextRef = useRef(null);

    useLayoutEffect(() => {
        applyThemeToDocument(theme);
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        return () => {
            window.clearTimeout(timeoutRef.current);
            audioContextRef.current?.close?.().catch?.(() => {});
        };
    }, []);

    const toggleTheme = useCallback(
        (originSource) => {
            if (transition.isActive) {
                return;
            }

            const origin =
                originSource && typeof originSource.x === 'number' && typeof originSource.y === 'number'
                    ? originSource
                    : getOriginFromTarget(originSource);
            const nextTheme = theme === 'dark' ? 'light' : 'dark';

            playThemeToggleSound(audioContextRef, nextTheme);

            setTransition({
                key: Date.now(),
                isActive: true,
                previousTheme: theme,
                nextTheme,
                origin,
                radius: getRippleRadius(origin),
            });

            setTheme(nextTheme);

            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                setTransition((currentTransition) => ({
                    ...currentTransition,
                    isActive: false,
                }));
            }, THEME_TRANSITION_DURATION);
        },
        [theme, transition.isActive],
    );

    const value = useMemo(
        () => ({
            theme,
            isDark: theme === 'dark',
            toggleTheme,
            transition,
            isTransitioning: transition.isActive,
        }),
        [theme, toggleTheme, transition],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
};
