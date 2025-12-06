
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PickupDeliverySummary: React.FC = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleConfirm = () => {
        setIsSuccess(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-[#121212] p-4 text-center">
                <div className="h-24 w-24 rounded-full bg-[#2E7D32]/20 flex items-center justify-center mb-6 animate-bounce">
                    <span className="material-symbols-outlined text-[#2E7D32] text-5xl">check_circle</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Solicitação Confirmada!</h1>
                <p className="text-[#A0A0A0]">Seu pedido de busca e entrega foi enviado com sucesso. Em breve você receberá a confirmação.</p>
            </div>
        );
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white font-display">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
                <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center">Resumo</h1>
                <div className="size-10 shrink-0"></div>
            </div>

            <main className="flex-1 p-4 pb-24 flex flex-col gap-6">
                <div>
                    <h2 className="text-[28px] font-bold leading-tight">Tudo certo?</h2>
                    <p className="text-[#A0A0A0] text-base mt-1">Confira os detalhes da sua solicitação.</p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Service Type */}
                    <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333]">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#800020] to-[#b00e36] flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-2xl">sync_alt</span>
                            </div>
                            <div>
                                <p className="text-[#A0A0A0] text-xs uppercase font-bold">Serviço</p>
                                <h3 className="text-white font-bold text-base">Buscar e Entregar</h3>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Card */}
                    <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex items-center gap-4">
                        <div className="h-14 w-14 rounded-lg bg-cover bg-center border border-[#333333]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc")' }}></div>
                        <div>
                            <p className="text-[#A0A0A0] text-xs uppercase font-bold">Veículo</p>
                            <h3 className="text-white font-bold">Honda Civic 2022</h3>
                            <p className="text-[#A0A0A0] text-sm">ABC-1234</p>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-blue-500 text-xl">south</span>
                                <p className="text-[#A0A0A0] text-xs uppercase font-bold">Endereço de Coleta</p>
                            </div>
                            <p className="text-white font-medium text-sm">Rua das Flores, 123 - Apto 45</p>
                            <p className="text-[#A0A0A0] text-xs">Centro - São Paulo, SP</p>
                        </div>

                        <div className="h-px bg-[#333333] w-full"></div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-green-500 text-xl">north</span>
                                <p className="text-[#A0A0A0] text-xs uppercase font-bold">Endereço de Entrega</p>
                            </div>
                            <p className="text-white font-medium text-sm">Rua das Flores, 123 - Apto 45</p>
                            <p className="text-[#A0A0A0] text-xs">Centro - São Paulo, SP</p>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333]">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[#A0A0A0] text-xs uppercase font-bold mb-1">Data</p>
                                <p className="text-white font-medium">25 Dez, 2025</p>
                            </div>
                            <div>
                                <p className="text-[#A0A0A0] text-xs uppercase font-bold mb-1">Horário</p>
                                <p className="text-white font-medium">14:30</p>
                            </div>
                        </div>
                    </div>

                    {/* Driver */}
                    <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333]">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOmYiktVEajxMJTeC4ZLeQWnTGm1YEIlQYT4_3_LZORhme2DYV2lSWntsjwl11U6en7-90AqCwi4GxDagpUKfQYBYC5RkAOrURbzlI2crFyB5ABmRYm9iHSzkShz8w_tgnR8Ts-wdECH3Phk7FpT6v8fQivaV6dh9Qe-CCVMY_yeiabidB8oBShmS8l540EXl_g-yk49dLfkRI-cfQivBmpOvEZITTgDFMpkxAZ5g8w-Msf6XrZd2YMkoT_xv6PfWjciS4MGBGlcY"
                                className="h-12 w-12 rounded-full object-cover border-2 border-[#333333]"
                                alt="Motorista"
                            />
                            <div>
                                <p className="text-[#A0A0A0] text-xs uppercase font-bold">Motorista</p>
                                <p className="text-white font-medium">Roberto Silva</p>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                    <span className="text-yellow-500 text-xs font-bold">4.9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
                <button
                    onClick={handleConfirm}
                    className="w-full h-14 rounded-xl bg-[#800020] text-white font-bold text-base flex items-center justify-center shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-colors"
                >
                    Confirmar Solicitação
                </button>
            </div>
        </div>
    );
};

export default PickupDeliverySummary;
