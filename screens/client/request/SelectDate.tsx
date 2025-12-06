import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../../context/RequestContext';

const SelectDate: React.FC = () => {
  const navigate = useNavigate();
  const { date, time, setDate, setTime } = useRequest();

  // Mock calendar logic for visualization
  // In a real app this would generate valid dates
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      dateObject: d,
      day: d.getDate(),
      week: d.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase().slice(0, 3),
      available: d.getDay() !== 0 // Closed on Sunday
    };
  });

  const times = ['08:00', '09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];

  const handleSelectDate = (d: Date) => {
    setDate(d);
    setTime(null); // Reset time when date changes
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="h-10 flex items-center justify-center">
          <h1 className="text-lg font-bold">LC PNEUS</h1>
        </div>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Stepper */}
      <div className="flex w-full flex-row items-center justify-center gap-3 py-5 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
          <p className="text-[#800020] text-xs font-bold">Serviço</p>
        </div>
        <div className="w-6 h-px bg-[#800020]"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
          <p className="text-[#800020] text-xs font-bold">Consultor</p>
        </div>
        <div className="w-6 h-px bg-[#800020]"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
          <p className="text-[#800020] text-xs font-bold">Data/Hora</p>
        </div>
      </div>

      <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-2">Quando podemos te atender?</h1>
      <p className="px-4 text-[#A0A0A0] text-sm">Selecione uma data e horário.</p>

      <main className="flex-1 p-4 pb-24 flex flex-col gap-8 mt-2">

        {/* Calendar Strip */}
        <div className="flex justify-between items-center bg-[#1E1E1E] p-4 rounded-xl border border-[#333333] overflow-x-auto gap-2">
          {days.map((item) => {
            const isSelected = date?.getDate() === item.day;
            return (
              <div
                key={item.day}
                onClick={() => item.available && handleSelectDate(item.dateObject)}
                className={`flex flex-col items-center justify-center h-16 w-12 rounded-lg cursor-pointer transition-all flex-shrink-0 ${isSelected
                    ? 'bg-[#800020] text-white shadow-lg'
                    : item.available
                      ? 'text-[#A0A0A0] hover:bg-[#333333]'
                      : 'opacity-30 cursor-not-allowed text-[#555]'
                  }`}
              >
                <span className="text-[10px] font-bold">{item.week}</span>
                <span className="text-xl font-bold">{item.day}</span>
              </div>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-bold text-lg">Horários Disponíveis</h3>
          <div className="grid grid-cols-3 gap-3">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`h-12 rounded-lg border font-medium text-sm transition-all ${time === t
                    ? 'bg-[#800020] border-[#800020] text-white'
                    : 'bg-[#1E1E1E] border-[#333333] text-[#E0E0E0] hover:border-[#800020]/50'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
        <button
          onClick={() => navigate('/request/summary')}
          disabled={!date || !time}
          className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${date && time ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90' : 'bg-[#333333] text-[#A0A0A0] cursor-not-allowed'}`}
        >
          Revisar Agendamento
        </button>
      </div>
    </div>
  );
};

export default SelectDate;