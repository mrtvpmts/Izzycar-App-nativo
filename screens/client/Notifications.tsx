
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Serviço Concluído',
      message: 'Seu Honda Civic está pronto para retirada.',
      time: 'Há 30 min',
      read: false,
      icon: 'check_circle',
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      id: 2,
      title: 'Orçamento Aprovado',
      message: 'O serviço de Troca de Óleo foi iniciado.',
      time: 'Há 2 horas',
      read: true,
      icon: 'build',
      color: 'text-[#800020]',
      bg: 'bg-[#800020]/10'
    },
    {
      id: 3,
      title: 'Aguardando Aprovação',
      message: 'Novo orçamento disponível para revisão.',
      time: 'Ontem',
      read: true,
      icon: 'receipt_long',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50 border-b border-[#333333]">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Notificações</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      <main className="flex-1 p-4 pb-24 flex flex-col gap-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`flex gap-4 p-4 rounded-xl border ${notification.read ? 'bg-[#121212] border-[#333333]' : 'bg-[#1E1E1E] border-[#800020]/30'}`}
          >
            <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${notification.bg} ${notification.color}`}>
              <span className="material-symbols-outlined">{notification.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold text-base ${notification.read ? 'text-[#A0A0A0]' : 'text-white'}`}>{notification.title}</h3>
                <span className="text-xs text-[#555555]">{notification.time}</span>
              </div>
              <p className="text-sm text-[#A0A0A0] leading-snug">{notification.message}</p>
            </div>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-[#800020] self-center shrink-0"></div>
            )}
          </div>
        ))}

        <div className="text-center mt-4">
          <button className="text-[#800020] text-sm font-bold">Marcar todas como lidas</button>
        </div>
      </main>

      <BottomMenu />
    </div>
  );
};

export default Notifications;
