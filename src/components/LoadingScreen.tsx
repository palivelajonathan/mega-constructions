/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, ShieldCheck, Cpu, HardHat } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    'Initializing Heavy Systems...',
    'Calibrating GW-42J Reinforcement Benders...',
    'Testing GQ-40 Phase Loss Safety Sensors...',
    'Aligning 10/7 Concrete Mixer Gears...',
    'Verifying Moula-Ali Dispatch Logs...',
    'Establishing Secure Connection...'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 120);

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 1600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="loading-screen"
        className="fixed inset-0 bg-secondary flex flex-col items-center justify-center z-50 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Animated industrial background grid */}
        <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center px-4 max-w-lg w-full text-center">
          {/* Top Logo Icon */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary text-secondary p-3.5 rounded-xl shadow-lg relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              >
                <Settings className="w-8 h-8 stroke-[2.5]" />
              </motion.div>
              <div className="absolute -top-1 -right-1 bg-white p-0.5 rounded-full shadow text-secondary">
                <HardHat className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-normal text-white uppercase">
                MEGA <span className="text-primary">CONSTRUCTIONS</span>
              </span>
              <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-mono mt-0.5">Heavy Plant & Spares Yard</p>
            </div>
          </motion.div>

          {/* Loader Percentage Display */}
          <div className="relative mb-6">
            <motion.div
              className="text-8xl font-display font-black text-white/5 select-none"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.min(progress, 100)}%
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-display font-black text-primary tracking-tight">
                {Math.min(progress, 100)}%
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="h-8 mb-8 overflow-hidden relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={statusIndex}
                className="text-gray-400 text-sm font-medium tracking-wide flex items-center justify-center gap-2"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {statusIndex % 3 === 0 && <Cpu className="w-4 h-4 text-primary animate-pulse" />}
                {statusIndex % 3 === 1 && <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />}
                {statusIndex % 3 === 2 && <Settings className="w-4 h-4 text-primary animate-spin" />}
                {statuses[statusIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Loading Bar Container */}
          <div className="w-full h-[6px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
            <motion.div
              className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(253,185,19,0.5)]"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex justify-between w-full text-[10px] text-gray-500 font-mono">
            <span>SYS_READY: OK</span>
            <span>HYD_TELANGANA_STST_REG</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
