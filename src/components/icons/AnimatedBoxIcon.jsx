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

const AnimatedBoxIcon = forwardRef(
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

        useEffect(() => {
            if (!isControlledRef.current) {
                if (isActive) {
                    controls.start('animate');
                } else {
                    controls.start('normal');
                }
            }
        }, [isActive, controls]);

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
                    <motion.path initial="normal" animate={controls} d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" transition={DEFAULT_TRANSITION} variants={PATH_VARIANTS} />
                    <motion.polyline initial="normal" animate={controls} points="3.27 6.96 12 12.01 20.73 6.96" transition={{...DEFAULT_TRANSITION, delay: 0.1}} variants={PATH_VARIANTS} />
                    <motion.line initial="normal" animate={controls} x1="12" y1="22.08" x2="12" y2="12" transition={{...DEFAULT_TRANSITION, delay: 0.2}} variants={PATH_VARIANTS} />
                </svg>
            </div>
        );
    }
);

AnimatedBoxIcon.displayName = 'AnimatedBoxIcon';
export default AnimatedBoxIcon;
