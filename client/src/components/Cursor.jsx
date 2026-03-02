import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [cursorType, setCursorType] = useState('default');
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 250 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setCursorType('interactive');
            } else if (target.classList.contains('kinetic-text') || target.tagName === 'H1' || target.tagName === 'H2') {
                setCursorType('text');
            } else {
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            width: 32,
            height: 32,
            backgroundColor: 'transparent',
            border: '2px solid rgba(99, 102, 241, 0.5)',
        },
        interactive: {
            width: 64,
            height: 64,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '2px solid rgba(99, 102, 241, 0.8)',
        },
        text: {
            width: 4,
            height: 32,
            backgroundColor: 'rgba(99, 102, 241, 1)',
            border: 'none',
            borderRadius: 2
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block">
            {/* Main Ring */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={cursorType}
                variants={variants}
                transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
                className="rounded-full flex items-center justify-center mix-blend-difference"
            >
                <motion.div
                    animate={{ scale: cursorType === 'interactive' ? 1.5 : 1 }}
                    className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                />
            </motion.div>
        </div>
    );
};

export default Cursor;
