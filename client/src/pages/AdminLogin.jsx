import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import {
    ShieldCheckIcon,
    LockClosedIcon,
    EnvelopeIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon,
    CommandLineIcon,
    CpuChipIcon,
    KeyIcon
} from '@heroicons/react/24/outline';

const AdminLogin = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'faculty') navigate('/faculty/dashboard');
            else navigate('/dashboard');
        }
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data } = await axios.post(
                '/api/auth/login',
                { email, password }
            );

            if (data.role !== 'admin') {
                setError('PERMISSION_DENIED: ADMINISTRATIVE_KEY_REQUIRED');
                setLoading(false);
                return;
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/admin');
        } catch (err) {
            setError('INVALID EMAIL OR PASSWORD');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-1000 font-inter">
            {/* Background HUD Grid */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#F0F2F5_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[520px] relative z-10"
            >
                {/* Main Card */}
                <div className="bg-white dark:bg-[#0A0F1E] rounded-[3.5rem] p-10 md:p-14 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.08)] border border-white/40 dark:border-white/5 relative overflow-hidden">
                    <div className="relative z-10">
                        {/* Security Shield Logo */}
                        <div className="flex justify-center mb-10">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-20 h-20 rounded-[2rem] bg-slate-900 dark:bg-white flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] relative group"
                            >
                                <ShieldCheckIcon className="w-10 h-10 text-white dark:text-slate-900" />
                                <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </motion.div>
                        </div>

                        {/* Title Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-[-0.04em] leading-[0.9] uppercase mb-4">
                                Admin<br />
                                <span className="text-indigo-600">Portal</span>
                            </h1>
                            <div className="flex items-center justify-center gap-4">
                                <span className="text-[10px] font-black tracking-[0.6em] text-slate-400 dark:text-slate-500 uppercase">Authorized Personnel Only</span>
                            </div>
                        </div>

                        {/* Status Module */}
                        <div className="bg-[#F8FAFC] dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 mb-10 flex items-center justify-between group cursor-default">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping opacity-40"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">System: Active</span>
                                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Administrator authentication required</span>
                                </div>
                            </div>
                            <CommandLineIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 transition-colors" />
                        </div>

                        {/* Login Form */}
                        <form onSubmit={submitHandler} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase ml-1">Admin Email</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-slate-300 group-focus-within/input:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-14 pr-6 py-5 bg-[#F8FAFC] dark:bg-white/[0.05] border border-slate-100 dark:border-white/10 focus:border-indigo-600/30 rounded-2xl text-slate-900 dark:text-white font-bold transition-all outline-none"
                                        placeholder="surya@ec23"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-indigo-600/10 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase">Password</label>
                                    <LockClosedIcon className="w-4 h-4 text-indigo-500" />
                                </div>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-slate-300 group-focus-within/input:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-14 pr-6 py-5 bg-[#F8FAFC] dark:bg-white/[0.05] border border-slate-100 dark:border-white/10 focus:border-indigo-600/30 rounded-2xl text-slate-900 dark:text-white font-bold tracking-[0.4em] transition-all outline-none"
                                        placeholder="••••••••••"
                                    />
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-5 bg-red-50 border border-red-100 dark:bg-red-500/5 dark:border-red-500/10 rounded-2xl flex items-center gap-4"
                                    >
                                        <div className="p-2 rounded-lg bg-red-500/10">
                                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <span className="text-[11px] font-black text-red-600 dark:text-red-500 uppercase tracking-widest">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative overflow-hidden bg-[#1E293B] dark:bg-white text-white dark:text-[#1E293B] py-6 rounded-2xl font-black text-sm tracking-[0.3em] uppercase transition-all shadow-[0_20px_40px_-10px_rgba(30,41,59,0.3)] hover:shadow-indigo-500/30 hover:-translate-y-1 flex items-center justify-center gap-4 group"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Secure Diagnostic Footer */}
                <div className="mt-12 flex flex-col items-center opacity-30 hover:opacity-100 transition-opacity duration-700">
                    <div className="flex items-center gap-4 mb-4">
                        <CpuChipIcon className="w-5 h-5 text-slate-400" />
                        <div className="h-px w-24 bg-slate-200 dark:bg-white/10"></div>
                        <span className="text-[9px] font-bold text-indigo-600 tracking-widest">4096-BIT ENCRYPTED</span>
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.6em] text-center">Secured · Academic Curriculum Evaluation Platform</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
