
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50); // 50ms * 50 steps ~= 2.5s to 3s

    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#121212] overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2a0a10] via-[#121212] to-[#121212] opacity-80"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-xs px-6">
        
        {/* Logo Composition (CSS/Typography to ensure correct look) */}
        <div className="flex items-center justify-center gap-2 mb-2 animate-fade-in-up">
            {/* Icon */}
            <div className="h-16 w-16 bg-[#d41142] rounded-lg flex items-center justify-center shadow-lg shadow-[#800020]/50 transform -skew-x-12">
                <span className="material-symbols-outlined text-white text-4xl transform skew-x-12">tire_repair</span>
            </div>
            
            {/* Text Logo */}
            <div className="flex flex-col items-start ml-2">
                <h1 className="text-white text-5xl font-black italic tracking-tighter leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>
                    LC<span className="text-[#d41142]">PNEUS</span>
                </h1>
            </div>
        </div>
        
        {/* Subtitle */}
        <p className="text-[#A0A0A0] text-xs font-bold tracking-[0.4em] uppercase mb-12 ml-1">
            Centro Automotivo
        </p>

        {/* Loading Bar */}
        <div className="w-64 bg-[#333333] h-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#800020] to-[#d41142] transition-all duration-75 ease-out shadow-[0_0_10px_#d41142]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="mt-4 text-[#555555] text-[10px] font-medium animate-pulse tracking-wide">CARREGANDO SISTEMA...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
