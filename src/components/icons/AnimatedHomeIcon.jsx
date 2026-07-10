import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from 'react';

const DEFAULT_TRANSITION = {
    duration: 0.6,
    opacity: { duration: 0.2 },
};

const PATH_VARIANTS = {
    normal: { pathLength: 1, opacity: 1 },
    animate: { opacity: [0, 1], pathLength: [0, 1] },
};

const AnimatedHomeIcon = forwardRef(
    ({ onMouseEnter, onMouseLeave, isActive, size = 20, style, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            return {
                startAnimation: () => controls.start('animate'),
                stopAnimation: () => controls.start('normal'),
            };
        });

        useEffect(() => {
            if (isActive) {
                controls.start('animate');
            } else {
                controls.start('normal');
            }
        }, [isActive, controls]);

        const handleMouseEnter = useCallback(
            (e) => {
                onMouseEnter?.(e);
            }, [onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e) => {
                onMouseLeave?.(e);
            }, [onMouseLeave]
        );

        return (
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: 'inline-flex', ...style }} {...props}>
                <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
                    <motion.path initial="normal" animate={controls} d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" transition={DEFAULT_TRANSITION} variants={PATH_VARIANTS} />
                    <motion.path initial="normal" animate={controls} d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" transition={{...DEFAULT_TRANSITION, delay: 0.1}} variants={PATH_VARIANTS} />
                </svg>
            </div>
        );
    }
);

AnimatedHomeIcon.displayName = 'AnimatedHomeIcon';
export default AnimatedHomeIcon;
