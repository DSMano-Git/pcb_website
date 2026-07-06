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

const AnimatedLayersIcon = forwardRef(
    ({ onMouseEnter, onMouseLeave, isActive, size = 20, style, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;
            return {
                startAnimation: () => controls.start('animate'),
                stopAnimation: () => controls.start('normal'),
            };
        });

        const handleMouseEnter = useCallback(
            (e) => {
                if (isControlledRef.current) { onMouseEnter?.(e); }
                else { controls.start('animate'); }
            }, [controls, onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e) => {
                if (isControlledRef.current) { onMouseLeave?.(e); }
                else { controls.start('normal'); }
            }, [controls, onMouseLeave]
        );

        return (
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: 'inline-flex', ...style }} {...props}>
                <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <motion.path animate={controls} d="M2 12l10 5 10-5" transition={{...DEFAULT_TRANSITION, delay: 0.1}} variants={PATH_VARIANTS} />
                    <motion.path animate={controls} d="M2 17l10 5 10-5" transition={{...DEFAULT_TRANSITION, delay: 0.2}} variants={PATH_VARIANTS} />
                </svg>
            </div>
        );
    }
);

AnimatedLayersIcon.displayName = 'AnimatedLayersIcon';
export default AnimatedLayersIcon;
