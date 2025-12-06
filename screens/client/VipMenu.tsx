
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';

const VipMenu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white font-display">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
                <button onClick={() => navigate('/dashboard')} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">diamond</span>
                    Área V.I.P
                </h1>
                <div className="size-10 shrink-0"></div>
            </div>

            <main className="flex-1 p-4 pb-24 flex flex-col gap-6">

                {/* Carteirinha Digital */}
                <div className="w-full aspect-[1.6] rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-amber-500/50 relative overflow-hidden shadow-2xl shadow-amber-500/10 p-6 flex flex-col justify-between">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #B8860B 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <h2 className="text-amber-500 font-black italic text-2xl tracking-tighter">DIAMOND</h2>
                            <p className="text-white/60 text-xs uppercase tracking-widest">Membro desde 2023</p>
                        </div>
                        <span className="material-symbols-outlined text-amber-500 text-4xl">workspace_premium</span>
                    </div>

                    <div className="relative z-10">
                        <p className="text-white font-mono text-lg tracking-widest">#### #### #### 8921</p>
                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <p className="text-white/60 text-[10px] uppercase">Titular</p>
                                <p className="text-white font-bold">JOÃO SILVA</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-[10px] uppercase text-right">Validade</p>
                                <p className="text-white font-bold text-right">12/25</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Economy Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col items-center justify-center text-center">
                        <span className="text-amber-500 font-bold text-2xl">R$ 450</span>
                        <p className="text-[#A0A0A0] text-xs">Economizados este ano</p>
                    </div>
                    <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col items-center justify-center text-center">
                        <span className="text-green-500 font-bold text-2xl">3</span>
                        <p className="text-[#A0A0A0] text-xs">Serviços Gratuitos Restantes</p>
                    </div>
                </div>

                {/* Exclusive Benefits Actions */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-3">Benefícios Ativos</h3>
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center gap-4 bg-[#1E1E1E] p-4 rounded-xl border border-amber-500/20 hover:bg-[#2a2a2a] transition-colors text-left group">
                            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">local_towing</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold">Solicitar Guincho 24h</h4>
                                <p className="text-[#A0A0A0] text-xs">Gratuito até 100km</p>
                            </div>
                            <span className="material-symbols-outlined text-amber-500">chevron_right</span>
                        </button>

                        <button className="flex items-center gap-4 bg-[#1E1E1E] p-4 rounded-xl border border-amber-500/20 hover:bg-[#2a2a2a] transition-colors text-left group">
                            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">directions_car</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold">Carro Reserva</h4>
                                <p className="text-[#A0A0A0] text-xs">Disponível por 3 dias</p>
                            </div>
                            <span className="material-symbols-outlined text-amber-500">chevron_right</span>
                        </button>

                        <button onClick={() => navigate('/pickup/request')} className="flex items-center gap-4 bg-[#1E1E1E] p-4 rounded-xl border border-amber-500/20 hover:bg-[#2a2a2a] transition-colors text-left group">
                            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">water_drop</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold">Leva e Traz</h4>
                                <p className="text-[#A0A0A0] text-xs">Agendar busca do veículo</p>
                            </div>
                            <span className="material-symbols-outlined text-amber-500">chevron_right</span>
                        </button>
                    </div>
                </div>

            </main>
            <BottomMenu />
        </div>
    );
};

export default VipMenu;
