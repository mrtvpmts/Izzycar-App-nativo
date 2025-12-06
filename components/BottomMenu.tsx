
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { label: 'Início', icon: 'home', path: '/dashboard' },
    { label: 'Veículos', icon: 'directions_car', path: '/vehicles' },
    { label: 'Agendar', icon: 'add_circle', path: '/request/select-vehicle', isMain: true },
    { label: 'Status', icon: 'schedule', path: '/order-status' },
    { label: 'Perfil', icon: 'person', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto h-[72px] bg-[#1E1E1E] border-t border-[#333333] flex justify-between items-center px-2 z-50 shadow-2xl">
      {menuItems.map((item) => {
        const active = isActive(item.path);
        
        if (item.isMain) {
          return (
            <div key={item.path} className="relative -top-6">
              <button
                onClick={() => navigate(item.path)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#800020] text-white shadow-lg shadow-[#800020]/40 transition-transform active:scale-95 border-4 border-[#121212]"
              >
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </button>
            </div>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${
              active ? 'text-[#800020]' : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${active ? 'filled-icon' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomMenu;
