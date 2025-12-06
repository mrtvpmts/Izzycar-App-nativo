
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const appointments = [
    {
      id: 1,
      service: 'Revisão Completa',
      date: '25 JUL',
      time: '14:00',
      year: '2024',
      vehicle: 'Honda Civic',
      status: 'Confirmado',
      statusColor: 'text-green-500 bg-green-500/10',
      type: 'upcoming'
    },
    {
      id: 2,
      service: 'Troca de Óleo e Filtro',
      date: '10 AGO',
      time: '09:30',
      year: '2024',
      vehicle: 'Toyota Corolla',
      status: 'Pendente',
      statusColor: 'text-yellow-500 bg-yellow-500/10',
      type: 'upcoming'
    },
    {
      id: 3,
      service: 'Alinhamento e Balanceamento',
      date: '15 JUN',
      time: '10:00',
      year: '2024',
      vehicle: 'Honda Civic',
      status: 'Concluído',
      statusColor: 'text-[#A0A0A0] bg-[#333333]',
      type: 'past'
    },
    {
      id: 4,
      service: 'Troca de Pastilhas',
      date: '02 FEV',
      time: '15:30',
      year: '2024',
      vehicle: 'Toyota Corolla',
      status: 'Concluído',
      statusColor: 'text-[#A0A0A0] bg-[#333333]',
      type: 'past'
    }
  ];

  const filteredAppointments = appointments.filter(apt => apt.type === activeTab);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50 shadow-sm border-b border-[#333333]">
        <button onClick={() => navigate('/dashboard')} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Meus Agendamentos</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Tabs */}
      <div className="p-4 flex gap-2">
        <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'upcoming' ? 'bg-[#800020] text-white' : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#333333]'}`}
        >
            Próximos
        </button>
        <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'past' ? 'bg-[#800020] text-white' : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#333333]'}`}
        >
            Anteriores
        </button>
      </div>

      <main className="flex-1 p-4 pb-24 pt-0 flex flex-col gap-4">
        {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
                <div key={apt.id} className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#333333] shadow-lg">
                    <div className="flex items-stretch">
                        {/* Date Box */}
                        <div className="w-20 bg-[#2a1622] flex flex-col items-center justify-center p-2 border-r border-[#333333]">
                            <span className="text-[#800020] font-bold text-sm text-center uppercase leading-tight">{apt.date}</span>
                            <span className="text-white font-bold text-xl">{apt.year}</span>
                            <span className="text-[#A0A0A0] text-xs mt-1">{apt.time}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-white text-base leading-tight">{apt.service}</h3>
                                </div>
                                <p className="text-[#A0A0A0] text-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">directions_car</span>
                                    {apt.vehicle}
                                </p>
                            </div>
                            
                            <div className="flex justify-between items-end mt-3">
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${apt.statusColor}`}>
                                    {apt.status}
                                </span>
                                {activeTab === 'upcoming' && (
                                    <button className="text-[#800020] text-sm font-bold">Ver Detalhes</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-[#A0A0A0] opacity-60">
                <span className="material-symbols-outlined text-5xl mb-2">event_busy</span>
                <p>Nenhum agendamento encontrado.</p>
            </div>
        )}

        {activeTab === 'upcoming' && (
            <button 
                onClick={() => navigate('/request/select-vehicle')}
                className="w-full h-14 rounded-xl bg-[#1E1E1E] border border-dashed border-[#333333] text-[#A0A0A0] font-bold text-base flex items-center justify-center gap-2 hover:bg-[#2a1622] transition-colors mt-2"
            >
                <span className="material-symbols-outlined">add_circle</span>
                Novo Agendamento
            </button>
        )}
      </main>

      <BottomMenu />
    </div>
  );
};

export default Appointments;
