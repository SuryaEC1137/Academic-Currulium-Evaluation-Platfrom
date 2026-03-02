import { motion } from 'framer-motion';

const CourseSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array(count).fill(0).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="glass-ultra rounded-[2.5rem] p-8 border border-white/20 dark:border-white/5 shadow-xl relative overflow-hidden h-[400px]"
                >
                    {/* Animated Mesh Pulse Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 animate-mesh opacity-30" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-slate-200/50 dark:bg-white/10 animate-pulse" />
                            <div className="w-20 h-8 rounded-xl bg-slate-200/50 dark:bg-white/10 animate-pulse" />
                        </div>

                        <div className="w-3/4 h-8 rounded-xl bg-slate-200/50 dark:bg-white/10 animate-pulse mb-4" />
                        <div className="w-1/2 h-4 rounded-lg bg-slate-200/50 dark:bg-white/10 animate-pulse mb-8" />

                        <div className="mt-auto space-y-4">
                            <div className="w-full h-14 rounded-[1.5rem] bg-slate-200/50 dark:bg-white/10 animate-pulse" />
                            <div className="w-full h-14 rounded-[1.8rem] bg-slate-200/50 dark:bg-white/10 animate-pulse" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default CourseSkeleton;
