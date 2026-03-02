import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Color palette for particles
const PARTICLE_COLORS = [
    'rgba(99, 102, 241, 0.35)',   // indigo
    'rgba(168, 85, 247, 0.35)',   // purple
    'rgba(6, 182, 212, 0.35)',    // cyan
    'rgba(244, 63, 94, 0.25)',    // rose
    'rgba(16, 185, 129, 0.25)',   // emerald
];

const BackgroundSystem = ({ children }) => {
    // ── Static Stars ──────────────────────────────────────────────────────────
    const stars = useMemo(() =>
        Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 1.8 + 0.6}px`,
            duration: `${Math.random() * 4 + 2}s`,
            delay: `${Math.random() * 6}s`,
            minOpacity: (Math.random() * 0.15 + 0.1).toFixed(2),
            maxOpacity: (Math.random() * 0.5 + 0.5).toFixed(2),
        })), []
    );

    // ── Particles ─────────────────────────────────────────────────────────────
    const particles = useMemo(() =>
        Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 4 + 2}px`,
            duration: `${Math.random() * 12 + 10}s`,
            delay: `${Math.random() * 12}s`,
            color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        })), []
    );

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-700">

            {/* ── Layer 0: Aurora Borealis Waves ───────────────────────────── */}
            <div className="fixed inset-0 pointer-events-none z-0 transform-gpu overflow-hidden">
                {/* Band A — Indigo/Blue aurora sweeping from top-left */}
                <div
                    className="aurora-band"
                    style={{
                        top: '-20%',
                        left: '-15%',
                        width: '80%',
                        height: '60%',
                        background: 'radial-gradient(ellipse at center, #6366f1 0%, #818cf8 30%, #a78bfa 60%, transparent 80%)',
                        '--aurora-duration': '22s',
                        '--aurora-delay': '0s',
                        '--aurora-opacity-dark': '0.14',
                        '--aurora-opacity-light': '0.05',
                    }}
                />
                {/* Band B — Purple/Pink aurora from bottom-right */}
                <div
                    className="aurora-band"
                    style={{
                        bottom: '-25%',
                        right: '-10%',
                        width: '75%',
                        height: '65%',
                        background: 'radial-gradient(ellipse at center, #7c3aed 0%, #9333ea 25%, #c026d3 55%, transparent 80%)',
                        '--aurora-duration': '28s',
                        '--aurora-delay': '-10s',
                        '--aurora-opacity-dark': '0.12',
                        '--aurora-opacity-light': '0.04',
                    }}
                />
                {/* Band C — Cyan/Teal aurora from center-right */}
                <div
                    className="aurora-band"
                    style={{
                        top: '20%',
                        right: '-20%',
                        width: '60%',
                        height: '50%',
                        background: 'radial-gradient(ellipse at center, #06b6d4 0%, #0891b2 30%, #0e7490 60%, transparent 80%)',
                        '--aurora-duration': '25s',
                        '--aurora-delay': '-6s',
                        '--aurora-opacity-dark': '0.10',
                        '--aurora-opacity-light': '0.03',
                    }}
                />
            </div>

            {/* ── Layer 1: Mesh Orbs ────────────────────────────────────────── */}
            <div className="fixed inset-0 pointer-events-none z-[1] transform-gpu">
                <motion.div
                    className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[130px] animate-mesh"
                    style={{ animationDelay: '0s' }}
                />
                <motion.div
                    className="absolute -bottom-[10%] -right-[10%] w-[55%] h-[55%] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[130px] animate-mesh"
                    style={{ animationDelay: '-10s' }}
                />
                <motion.div
                    className="absolute top-[30%] -right-[5%] w-[35%] h-[35%] bg-cyan-500/8 dark:bg-cyan-400/12 rounded-full blur-[100px] animate-mesh"
                    style={{ animationDelay: '-5s' }}
                />
                <motion.div
                    className="absolute bottom-[20%] -left-[5%] w-[30%] h-[30%] bg-rose-500/6 dark:bg-rose-400/10 rounded-full blur-[90px] animate-mesh"
                    style={{ animationDelay: '-15s' }}
                />
            </div>

            {/* ── Layer 2: Perspective Cyber Grid ───────────────────────────── */}
            <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-[2] transform-gpu" />

            {/* ── Layer 3: Star Field (Dark Mode Only) ──────────────────────── */}
            <div className="fixed inset-0 pointer-events-none z-[3] transform-gpu">
                {stars.map((s) => (
                    <div
                        key={s.id}
                        className="star"
                        style={{
                            '--star-top': s.top,
                            '--star-left': s.left,
                            '--star-size': s.size,
                            '--star-duration': s.duration,
                            '--star-delay': s.delay,
                            '--star-min-opacity': s.minOpacity,
                            '--star-max-opacity': s.maxOpacity,
                        }}
                    />
                ))}
            </div>

            {/* ── Layer 4: Floating Particles ───────────────────────────────── */}
            <div className="fixed inset-0 pointer-events-none z-[4] transform-gpu">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            '--left': p.left,
                            '--size': p.size,
                            '--duration': p.duration,
                            '--delay': p.delay,
                            '--color': p.color,
                            bottom: '-5%',
                        }}
                    />
                ))}
            </div>

            {/* ── Layer 5: Analog Noise Grain ───────────────────────────────── */}
            <div className="animate-noise z-[5] transform-gpu" />

            {/* ── Content Layer ─────────────────────────────────────────────── */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default BackgroundSystem;
