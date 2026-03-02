import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    MagnifyingGlassIcon,
    HomeIcon,
    AcademicCapIcon,
    UserIcon,
    SunIcon,
    MoonIcon,
    ArrowRightOnRectangleIcon,
    CommandLineIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const OmniCommand = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleOpen();
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, toggleOpen]);

    const actions = [
        { id: 'dash', title: 'Dashboard', icon: HomeIcon, action: () => navigate(user?.role === 'admin' ? '/admin' : user?.role === 'faculty' ? '/faculty/dashboard' : '/dashboard') },
        { id: 'profile', title: 'My Profile', icon: UserIcon, action: () => navigate('/profile') },
        { id: 'theme', title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? SunIcon : MoonIcon, action: toggleTheme },
        { id: 'logout', title: 'Terminate Session', icon: ArrowRightOnRectangleIcon, action: () => { localStorage.removeItem('userInfo'); navigate('/login'); } },
    ];

    const filteredActions = actions.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

    if (!user) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-[15vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="w-full max-w-2xl glass-ultra rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden relative z-10"
                    >
                        <div className="p-6">
                            <div className="relative group">
                                <CommandLineIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500 opacity-50 group-focus-within:opacity-100 transition-opacity" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Execute command or search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-white/5 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xl font-bold text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500/50 shadow-inner"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-100 dark:bg-white/10 rounded-lg text-[10px] font-black text-slate-400 dark:text-indigo-400 uppercase tracking-widest border border-slate-200 dark:border-white/5">ESC</div>
                            </div>

                            <div className="mt-8 space-y-2">
                                <h3 className="px-4 text-[10px] font-black text-slate-400 dark:text-indigo-400/50 uppercase tracking-[0.3em] mb-4">Core Protocols</h3>
                                {filteredActions.map((action) => (
                                    <button
                                        key={action.id}
                                        onClick={() => { action.action(); setIsOpen(false); }}
                                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                <action.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-base font-bold text-slate-700 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{action.title}</span>
                                        </div>
                                        <ArrowRightOnRectangleIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-500" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/[0.02] p-4 text-center border-t border-slate-100 dark:border-white/5">
                            <p className="text-[10px] font-black text-slate-400 dark:text-indigo-400/30 uppercase tracking-[0.2em]">ProAcademic Neural Link Interface v1.0</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OmniCommand;
