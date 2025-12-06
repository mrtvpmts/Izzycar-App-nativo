import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SchedulingSummary: React.FC = () => {
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
            <h1 className="text-2xl font-bold text-white mb-2">Agendamento Confirmado!</h1>
            <p className="text-[#A0A0A0]">Sua solicitação foi enviada com sucesso. Em breve você receberá a confirmação.</p>
        </div>
      );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Resumo</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      <main className="flex-1 p-4 pb-24 flex flex-col gap-6">
        <h2 className="text-[28px] font-bold leading-tight">Tudo certo?</h2>
        <p className="text-[#A0A0A0] text-base -mt-4">Confira os detalhes do seu agendamento.</p>

        <div className="flex flex-col gap-4">
            {/* Vehicle Card */}
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex items-center gap-4">
                <div className="h-14 w-14 rounded-lg bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc")'}}></div>
                <div>
                    <p className="text-[#A0A0A0] text-xs uppercase font-bold">Veículo</p>
                    <h3 className="text-white font-bold">Honda Civic 2022</h3>
                    <p className="text-[#A0A0A0] text-sm">ABC-1234</p>
                </div>
            </div>

            {/* Service Details */}
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[#A0A0A0] text-xs uppercase font-bold">Serviço</p>
                        <h3 className="text-white font-bold">Troca de Óleo e Filtro</h3>
                    </div>
                    <span className="material-symbols-outlined text-[#800020]">oil_barrel</span>
                </div>
                <div className="h-px bg-[#333333] w-full"></div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[#A0A0A0] text-xs uppercase font-bold">Data</p>
                        <p className="text-white font-medium">25 Jul, 2024</p>
                    </div>
                    <div>
                        <p className="text-[#A0A0A0] text-xs uppercase font-bold">Horário</p>
                        <p className="text-white font-medium">14:30</p>
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOmYiktVEajxMJTeC4ZLeQWnTGm1YEIlQYT4_3_LZORhme2DYV2lSWntsjwl11U6en7-90AqCwi4GxDagpUKfQYBYC5RkAOrURbzlI2crFyB5ABmRYm9iHSzkShz8w_tgnR8Ts-wdECH3Phk7FpT6v8fQivaV6dh9Qe-CCVMY_yeiabidB8oBShmS8l540EXl_g-yk49dLfkRI-cfQivBmpOvEZITTgDFMpkxAZ5g8w-Msf6XrZd2YMkoT_xv6PfWjciS4MGBGlcY" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                        <p className="text-[#A0A0A0] text-xs uppercase font-bold">Consultor</p>
                        <p className="text-white font-medium">Carlos Silva</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#333333] flex items-center justify-center text-[#A0A0A0]">
                        <span className="material-symbols-outlined">handyman</span>
                    </div>
                    <div>
                        <p className="text-[#A0A0A0] text-xs uppercase font-bold">Mecânico</p>
                        <p className="text-white font-medium">Qualquer Especialista</p>
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
            Confirmar Agendamento
        </button>
      </div>
    </div>
  );
};

export default SchedulingSummary;