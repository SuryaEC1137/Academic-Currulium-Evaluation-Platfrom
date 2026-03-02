import { motion } from 'framer-motion';

const variants = {
    initial: {
        opacity: 0,
        scale: 0.98,
        rotateX: 4,
    },
    enter: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
    },
    exit: {
        opacity: 0,
        scale: 1.02,
        rotateX: -4,
    }
};

const RouteTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full perspective-2000"
        >
            {children}
        </motion.div>
    );
};

export default RouteTransition;
