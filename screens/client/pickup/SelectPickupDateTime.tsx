
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectPickupDateTime: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<number | null>(25);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Mock calendar days
    const days = [
        { day: 24, week: 'SEG', available: true },
        { day: 25, week: 'TER', available: true },
        { day: 26, week: 'QUA', available: true },
        { day: 27, week: 'QUI', available: true },
        { day: 28, week: 'SEX', available: true },
        { day: 29, week: 'SAB', available: false },
    ];

    const times = ['08:00', '09:00', '10:30', '13:00', '14:30', '16:00'];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white font-display">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
                <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center">Data e Horário</h1>
                <div className="size-10 shrink-0"></div>
            </div>

            {/* Stepper */}
            <div className="flex w-full flex-row items-center justify-center gap-3 py-5 px-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
                    <p className="text-[#800020] text-xs font-bold">Veículo</p>
                </div>
                <div className="w-6 h-px bg-[#800020]"></div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
                    <p className="text-[#800020] text-xs font-bold">Endereços</p>
                </div>
                <div className="w-6 h-px bg-[#800020]"></div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
                    <p className="text-[#800020] text-xs font-bold">Motorista</p>
                </div>
                <div className="w-6 h-px bg-[#800020]"></div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
                    <p className="text-[#800020] text-xs font-bold">Data/Hora</p>
                </div>
            </div>

            <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-2">
                Quando buscar o veículo?
            </h2>
            <p className="px-4 text-[#A0A0A0] text-sm">Dezembro 2025</p>

            <main className="flex-1 p-4 pb-24 flex flex-col gap-8 mt-2">

                {/* Calendar Strip */}
                <div className="flex justify-between items-center bg-[#1E1E1E] p-4 rounded-xl border border-[#333333]">
                    {days.map((item) => (
                        <div
                            key={item.day}
                            onClick={() => item.available && setSelectedDate(item.day)}
                            className={`flex flex-col items-center justify-center h-16 w-12 rounded-lg cursor-pointer transition-all ${selectedDate === item.day
                                    ? 'bg-[#800020] text-white shadow-lg'
                                    : item.available
                                        ? 'text-[#A0A0A0] hover:bg-[#333333]'
                                        : 'opacity-30 cursor-not-allowed text-[#555]'
                                }`}
                        >
                            <span className="text-[10px] font-bold">{item.week}</span>
                            <span className="text-xl font-bold">{item.day}</span>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-bold text-lg">Horários Disponíveis</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {times.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`h-12 rounded-lg border font-medium text-sm transition-all ${selectedTime === time
                                        ? 'bg-[#800020] border-[#800020] text-white'
                                        : 'bg-[#1E1E1E] border-[#333333] text-[#E0E0E0] hover:border-[#800020]/50'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333]">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-[#d41142] text-xl">schedule</span>
                        <div>
                            <h4 className="text-white font-bold text-sm mb-1">Tempo estimado</h4>
                            <p className="text-[#A0A0A0] text-xs">O motorista chegará em até 30 minutos após o horário selecionado.</p>
                        </div>
                    </div>
                </div>
            </main>

            <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
                <button
                    onClick={() => navigate('/pickup/summary')}
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${selectedDate && selectedTime
                            ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90'
                            : 'bg-[#333333] text-[#A0A0A0] cursor-not-allowed'
                        }`}
                >
                    Revisar Solicitação
                </button>
            </div>
        </div>
    );
};

export default SelectPickupDateTime;
