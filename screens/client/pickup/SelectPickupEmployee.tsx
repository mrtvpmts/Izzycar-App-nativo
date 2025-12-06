
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectPickupEmployee: React.FC = () => {
    const navigate = useNavigate();
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

    const employees = [
        {
            id: 0,
            name: 'Qualquer Funcionário',
            role: 'Primeiro disponível',
            rating: null,
            image: null,
            icon: 'group'
        },
        {
            id: 1,
            name: 'Roberto Silva',
            role: 'Motorista Sênior',
            rating: 4.9,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOmYiktVEajxMJTeC4ZLeQWnTGm1YEIlQYT4_3_LZORhme2DYV2lSWntsjwl11U6en7-90AqCwi4GxDagpUKfQYBYC5RkAOrURbzlI2crFyB5ABmRYm9iHSzkShz8w_tgnR8Ts-wdECH3Phk7FpT6v8fQivaV6dh9Qe-CCVMY_yeiabidB8oBShmS8l540EXl_g-yk49dLfkRI-cfQivBmpOvEZITTgDFMpkxAZ5g8w-Msf6XrZd2YMkoT_xv6PfWjciS4MGBGlcY',
            icon: null
        },
        {
            id: 2,
            name: 'Marcos Santos',
            role: 'Motorista',
            rating: 4.7,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyefDiGpwI5QZKMke2XhUx4n3H3bod-QtF-4bRotsuDJbfaecqo2AOJgnlvIWisdyUQk-wcI9oeYlJwu5NJLeCIDErBphHDMg314xSgpXG491DCRP9su_2YmXMinHFwN8XMTYwFXHOlKZtTHr0B4UZldqXz9xh1EezYBRU0xvklJ31fKp2yAwuEmngAirkSMUPpnHhLLFXBZoKZ6l5m2fN4msdEc_A_f749-YmcopoNt7pE5TOmfvP6m2OJ9wMnz3TcpxMi-QMJI',
            icon: null
        },
        {
            id: 3,
            name: 'Paulo Costa',
            role: 'Motorista',
            rating: 4.8,
            image: null,
            icon: 'person'
        }
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white font-display">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
                <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center">Selecionar Motorista</h1>
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
                <div className="w-6 h-px bg-[#333333]"></div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#333333]"></div>
                    <p className="text-[#555555] text-xs font-bold">Data</p>
                </div>
            </div>

            <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-2">
                Quem vai buscar?
            </h2>
            <p className="px-4 text-[#A0A0A0] text-sm">Escolha o motorista de sua preferência.</p>

            <main className="flex-1 p-4 pb-24 flex flex-col gap-3 mt-2">
                {employees.map((employee) => (
                    <div
                        key={employee.id}
                        onClick={() => setSelectedEmployee(employee.id)}
                        className={`bg-[#1E1E1E] rounded-xl p-4 border-2 cursor-pointer transition-all ${selectedEmployee === employee.id
                                ? 'border-[#d41142] bg-[#d41142]/5'
                                : 'border-[#333333] hover:border-[#d41142]/30'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            {employee.image ? (
                                <img
                                    src={employee.image}
                                    alt={employee.name}
                                    className="h-14 w-14 rounded-full object-cover border-2 border-[#333333]"
                                />
                            ) : (
                                <div className="h-14 w-14 rounded-full bg-[#333333] flex items-center justify-center text-[#A0A0A0]">
                                    <span className="material-symbols-outlined text-3xl">{employee.icon}</span>
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className="text-white font-bold text-base">{employee.name}</h3>
                                <p className="text-[#A0A0A0] text-sm">{employee.role}</p>
                                {employee.rating && (
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                        <span className="text-yellow-500 text-xs font-bold">{employee.rating}</span>
                                    </div>
                                )}
                            </div>

                            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedEmployee === employee.id
                                    ? 'border-[#d41142] bg-[#d41142]'
                                    : 'border-[#555555]'
                                }`}>
                                {selectedEmployee === employee.id && (
                                    <span className="material-symbols-outlined text-white text-sm">check</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
                <button
                    onClick={() => navigate('/pickup/datetime')}
                    disabled={selectedEmployee === null}
                    className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${selectedEmployee !== null
                            ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90'
                            : 'bg-[#333333] text-[#A0A0A0] cursor-not-allowed'
                        }`}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default SelectPickupEmployee;
