import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import {
    UserIcon,
    LockClosedIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
    SparklesIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';

const Login = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // 'student' or 'faculty'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Role-specific aesthetic mapping
    const aesthetics = {
        student: {
            primary: '#0D9488', // Teal 600
            bg: 'from-teal-500/10 to-indigo-500/10',
            glow: 'shadow-teal-500/30',
            border: 'group-focus-within:border-teal-500/30',
            icon: 'text-teal-600',
            button: 'bg-[#0D9488] hover:bg-[#0F766E] shadow-teal-500/20'
        },
        faculty: {
            primary: '#4F46E5', // Indigo 600
            bg: 'from-indigo-500/10 to-purple-500/10',
            glow: 'shadow-indigo-500/30',
            border: 'group-focus-within:border-indigo-500/30',
            icon: 'text-indigo-600',
            button: 'bg-[#4F46E5] hover:bg-[#4338CA] shadow-indigo-500/20'
        }
    };

    const currentStyle = aesthetics[role];

    useEffect(() => {
        if (location.state?.role) {
            setRole(location.state.role);
        }

        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'faculty') navigate('/faculty/dashboard');
            else navigate('/dashboard');
        }
    }, [navigate, location]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email.toLowerCase().endsWith('@bitsathy.ac.in')) {
            setError("Access Restricted: Please use your institutional email (@bitsathy.ac.in)");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(
                '/api/auth/login',
                { email, password }
            );

            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.role === 'admin') navigate('/admin');
            else if (data.role === 'faculty') navigate('/faculty/dashboard'); // Correct route for faculty
            else if (data.role === 'student') navigate('/dashboard');
            else navigate('/dashboard'); // Fallback
        } catch (err) {
            setError(err.response?.data?.message || 'Access Denied: Terminal mismatch or invalid keys');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden selection:bg-teal-500 selection:text-white transition-colors duration-1000">
            {/* Background Architecture */}
            <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={role}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br ${currentStyle.bg} rounded-full blur-[140px]`}
                    />
                </AnimatePresence>

                {/* HUD Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg relative z-10"
            >
                <div className="relative rounded-[4rem] p-8 md:p-14 border border-white/20 dark:border-white/5 shadow-3xl overflow-hidden glass-ultra transform-gpu antialiased transition-all duration-700">
                    <div className="relative z-10">
                        {/* Header Section */}
                        <div className="text-center mb-12">
                            <motion.div
                                animate={{ backgroundColor: currentStyle.primary }}
                                className={`inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] mb-8 shadow-3xl ${currentStyle.glow} holographic-shine border-4 border-white/10`}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={role}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                    >
                                        {role === 'student' ? (
                                            <AcademicCapIcon className="w-12 h-12 text-white" />
                                        ) : (
                                            <BuildingLibraryIcon className="w-12 h-12 text-white" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>

                            <div className="space-y-3">
                                <AnimatePresence mode="wait">
                                    <motion.h1
                                        key={role}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-5xl font-black text-slate-950 dark:text-white mb-4 tracking-tighter uppercase leading-[0.9]"
                                    >
                                        Welcome Back
                                    </motion.h1>
                                </AnimatePresence>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-px w-8 bg-indigo-500/20 dark:bg-indigo-500/40" />
                                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.5em] kinetic-text">Sign in to your academic account</p>
                                    <div className="h-px w-8 bg-indigo-500/20 dark:bg-indigo-500/40" />
                                </div>
                            </div>
                        </div>

                        {/* Role Selector */}
                        <div className="flex p-2 bg-slate-100 dark:bg-white/5 rounded-[2rem] mb-12 relative border border-slate-200 dark:border-white/5">
                            <motion.div
                                className={`absolute inset-y-2 rounded-[1.5rem] ${currentStyle.bg} shadow-lg transition-all duration-700`}
                                initial={false}
                                animate={{
                                    x: role === 'student' ? '4%' : '108%',
                                    width: '46%'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => setRole('student')}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] relative z-10 transition-all duration-500 ${role === 'student' ? 'text-white' : 'text-slate-500 dark:text-gray-400'}`}
                            >
                                <UserIcon className="w-5 h-5 flex-shrink-0" />
                                <span className="font-black text-sm uppercase tracking-widest whitespace-nowrap">Student</span>
                            </button>
                            <button
                                onClick={() => setRole('faculty')}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] relative z-10 transition-all duration-500 ${role === 'faculty' ? 'text-white' : 'text-slate-500 dark:text-gray-400'}`}
                            >
                                <AcademicCapIcon className="w-5 h-5 flex-shrink-0" />
                                <span className="font-black text-sm uppercase tracking-widest whitespace-nowrap">Faculty</span>
                            </button>
                        </div>

                        {/* Input Form */}
                        <form onSubmit={submitHandler} className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-3 group/field">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300 ml-1 transition-colors group-focus-within/field:text-indigo-500">Email Address</label>
                                    <div className="relative group/input">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within/input:scale-110 transition-transform duration-500">
                                            <UserIcon className={`w-6 h-6 ${currentStyle.icon} opacity-40 group-focus-within/input:opacity-100 transition-opacity`} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-16 pr-8 py-5 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 focus:border-indigo-500/40 rounded-[1.5rem] text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-600 transition-all outline-none font-bold text-base shadow-inner"
                                            placeholder={role === 'student' ? "student.id@bitsathy.ac.in" : "faculty.name@bitsathy.ac.in"}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 group/field">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300 ml-1 transition-colors group-focus-within/field:text-indigo-500">Password</label>
                                    <div className="relative group/input">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within/input:scale-110 transition-transform duration-500">
                                            <LockClosedIcon className={`w-6 h-6 ${currentStyle.icon} opacity-40 group-focus-within/input:opacity-100 transition-opacity`} />
                                        </div>
                                        <input
                                            required
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-16 pr-16 py-5 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 focus:border-indigo-500/40 rounded-[1.5rem] text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-600 transition-all outline-none font-bold text-base shadow-inner"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all group/eye"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="w-5 h-5 text-slate-400 group-hover/eye:text-indigo-500" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5 text-slate-400 group-hover/eye:text-indigo-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="hidden"
                                    />
                                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${rememberMe ? `${currentStyle.button} border-transparent` : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 group-hover:border-slate-300'}`}>
                                        {rememberMe && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 dark:text-white/70 uppercase tracking-[0.15em] group-hover:text-slate-700 dark:group-hover:text-white transition-colors">Remember me</span>
                                </label>
                                <Link to="/recovery" className="text-[10px] font-black text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 uppercase tracking-widest transition-colors">Forgot Password?</Link>
                            </div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-3 backdrop-blur-md"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: 1.01, boxShadow: "0 30px 60px -15px rgba(99, 102, 241, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className={`w-full py-6 rounded-[2rem] ${currentStyle.button} text-white font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 relative overflow-hidden group holographic-shine`}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {loading ? "Signing in..." : "Sign In"}
                                    {!loading && <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />}
                                </span>
                            </motion.button>
                        </form>

                        <div className="mt-12 text-center space-y-8">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent" />
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
                                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                    New here?{' '}
                                    <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-white transition-colors ml-2 kinetic-text">
                                        Create Account
                                    </Link>
                                </p>
                                <Link to="/admin/login" className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/5">
                                    Admin Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
