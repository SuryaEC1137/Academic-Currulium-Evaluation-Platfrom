import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon, ChartBarIcon, UserGroupIcon, ShieldCheckIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            if (userInfo.role === 'admin') navigate('/admin');
            else if (userInfo.role === 'faculty') navigate('/faculty/dashboard');
            else navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white overflow-hidden relative selection:bg-indigo-500 selection:text-white transition-colors duration-500">

            {/* Background Mesh Orbs */}
            {/* Background Mesh (Global System Active) */}

            {/* Noise Overlay */}
            {/* Noise Overlay (Global System Active) */}

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Navbar Placeholder */}
                <div className="h-24"></div>

                {/* Hero Section */}
                <div className="flex flex-col items-center text-center mt-10 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8 hover:bg-white/60 dark:hover:bg-white/10 transition cursor-default shadow-sm"
                    >
                        <SparklesIcon className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-bold tracking-wide text-slate-600 dark:text-gray-300">BIT Sathy — Smart Academic Analytics</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-slate-950 dark:text-white"
                    >
                        Academic Curriculum <br />
                        <span className="text-gradient-vibrant animate-shimmer bg-[length:200%_auto]">Evaluation Platform</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed"
                    >
                        Analyse course difficulty, track student performance, and empower faculty with actionable insights. Built for BIT Sathy's academic excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white dark:bg-white dark:text-gray-900 rounded-2xl font-black text-lg hover:bg-indigo-700 dark:hover:bg-gray-100 transition shadow-xl shadow-indigo-500/20 dark:shadow-white/10 flex items-center gap-2 group justify-center">
                                <RocketLaunchIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Get Started
                            </Link>
                            <Link to="/login" className="px-8 py-4 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-2xl font-bold text-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition backdrop-blur-md justify-center text-center">
                                Student Login
                            </Link>
                            <Link
                                to="/login"
                                state={{ role: 'faculty' }}
                                className="px-8 py-4 bg-purple-500/10 text-purple-600 dark:text-purple-300 rounded-2xl font-bold text-lg border border-purple-500/20 hover:bg-purple-500/20 transition backdrop-blur-md justify-center text-center"
                            >
                                Faculty Login
                            </Link>
                        </div>

                        <div className="md:ml-8 md:border-l border-slate-200 dark:border-white/10 md:pl-8 flex items-center">
                            <Link to="/admin/login" className="px-6 py-4 bg-indigo-50 dark:bg-blue-600/20 text-indigo-700 dark:text-blue-200 rounded-2xl font-bold text-lg border border-indigo-200 dark:border-blue-500/30 hover:bg-indigo-100 dark:hover:bg-blue-600/30 transition backdrop-blur-md flex items-center gap-2">
                                <ShieldCheckIcon className="w-5 h-5" />
                                Admin Access
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Infinite Department Ticker */}
                <div className="mt-20 border-t border-slate-200 dark:border-white/5 pt-10 overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-[#030712] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-[#030712] to-transparent z-10"></div>

                    <motion.div
                        className="flex gap-16 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[
                            "Computer Science", "Information Technology", "Electronics & Comm.",
                            "Mechanical Eng.", "Civil Eng.", "Aerospace", "Biotech", "Artificial Intelligence",
                            "Computer Science", "Information Technology", "Electronics & Comm.",
                            "Mechanical Eng.", "Civil Eng.", "Aerospace", "Biotech", "Artificial Intelligence"
                        ].map((dept, i) => (
                            <div key={i} className="flex flex-col items-center opacity-40 hover:opacity-100 transition duration-300 group">
                                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-400 dark:from-white dark:to-white/50 group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">{dept}</span>
                                <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">•</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-32">
                    {[
                        { title: "Course Difficulty Analysis", icon: <ChartBarIcon className="w-8 h-8 text-indigo-500" />, desc: "Evaluate and map the difficulty level of every course in the curriculum using student feedback and performance data." },
                        { title: "Student Performance Tracking", icon: <UserGroupIcon className="w-8 h-8 text-purple-500" />, desc: "Monitor academic progress across departments, years, and semesters with detailed performance analytics." },
                        { title: "Faculty Insights", icon: <ShieldCheckIcon className="w-8 h-8 text-cyan-500" />, desc: "Provide faculty with clear data on student engagement, common difficulty areas, and curriculum effectiveness." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="interaction-card p-10 rounded-[3rem] glass-ultra group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-inner holographic-shine">
                                {feature.icon}
                            </div>
                            <h3 className="text-3xl font-black mb-4 group-hover:translate-x-2 transition-transform duration-500">{feature.title}</h3>
                            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default LandingPage;
