import React from 'react';
import { useNavigate } from 'react-router-dom';

const InternalChecklist: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#211119] group/design-root overflow-x-hidden font-display">
      <header className="flex justify-center items-center p-6 bg-[#2a1622]/50">
        <img alt="Logomarca da Oficina" className="h-10 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAn90FWbIPgOhcVLnz_K4ZQo9Py5N0kkiVHpaLg6keGVytUL4d4DHdbgYMQHcKUY3atCqYeWEkVDp08G9KbsBd-7mJmWbrS8eKgpfFfGIXioFaQCpYWzIsKOpu-u98-6BWHCafrPDnbxouRK1evuZ_-RY-tkCFGeVJphRs5UddGHHvye2mDPipbjUp41rs6LCxn820iLilRsrwTWRU8qQj683WfxiIUHYYCo_p5zvL6H0nbvo0EwYBtETn5ab76e19cH5H6J2I9zs" />
      </header>

      <main className="flex flex-col gap-4 p-4 flex-1">
        <div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-2 pb-4 pt-2">Check-list de Entrada</h2>
            <div className="flex flex-col bg-[#2a1622] rounded-lg p-4 gap-4">
                
                {/* Item 1 */}
                <div className="flex flex-col gap-3 py-2 border-b border-b-[#472436]">
                    <p className="text-white text-base font-medium">Nível do óleo</p>
                    <div className="flex items-center justify-between gap-2">
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-[#2E7D32] bg-[#2E7D32]/20 text-[#2E7D32] flex-1">
                            <span className="material-symbols-outlined text-2xl">check_circle</span>
                            <span className="text-xs font-semibold">OK</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-transparent text-[#c893ad] flex-1">
                            <span className="material-symbols-outlined text-2xl">cancel</span>
                            <span className="text-xs font-semibold">Problema</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-transparent text-[#c893ad] flex-1">
                            <span className="material-symbols-outlined text-2xl">help</span>
                            <span className="text-xs font-semibold">Não verificado</span>
                        </button>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col gap-3 py-2 border-b border-b-[#472436]">
                    <p className="text-white text-base font-medium">Pastilhas de freio</p>
                    <div className="flex items-center justify-between gap-2">
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-transparent text-[#c893ad] flex-1">
                            <span className="material-symbols-outlined text-2xl">check_circle</span>
                            <span className="text-xs font-semibold">OK</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-[#B71C1C] bg-[#B71C1C]/20 text-[#B71C1C] flex-1">
                            <span className="material-symbols-outlined text-2xl">cancel</span>
                            <span className="text-xs font-semibold">Problema</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-transparent text-[#c893ad] flex-1">
                            <span className="material-symbols-outlined text-2xl">help</span>
                            <span className="text-xs font-semibold">Não verificado</span>
                        </button>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col gap-3 py-2">
                    <p className="text-white text-base font-medium">Sistema de arrefecimento</p>
                    <div className="flex items-center justify-between gap-2">
                         <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-transparent text-[#c893ad] flex-1">
                            <span className="material-symbols-outlined text-2xl">check_circle</span>
                            <span className="text-xs font-semibold">OK</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-transparent text-[#c893ad] flex-1">
                            <span className="material-symbols-outlined text-2xl">cancel</span>
                            <span className="text-xs font-semibold">Problema</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-[#654a5a] bg-[#654a5a]/20 text-[#654a5a] flex-1">
                            <span className="material-symbols-outlined text-2xl">help</span>
                            <span className="text-xs font-semibold">Não verificado</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-2 pb-2 pt-4">Observações do Mecânico</h3>
            <div className="bg-[#2a1622] rounded-lg p-2">
                <textarea className="w-full bg-transparent text-[#c893ad] placeholder:text-[#654a5a] border-0 focus:ring-0 resize-none text-sm" placeholder="Adicione suas observações aqui..." rows={4}></textarea>
            </div>
        </div>

        <div>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-2 pb-2 pt-4">Anexar Fotos</h3>
            <div className="flex w-full gap-3 overflow-x-auto pb-2">
                <div className="w-28 h-28 flex-shrink-0 bg-center bg-no-repeat bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGU5XTOMk-T6plOM7T7JZO57ZYjy_kvxfhDr47dZwlVPTGbSpTpx8iIU3WeU4nCsE4AkZOyhKKB9w8iyCmjljGzf3sKL-87BWrD8wZ9_98hc1tWIL_S7ySdgrGz1vyQuih7SSSSWU9KiDkc6akmJirJ4wOOow0TYQ4ENpM7MoNylJtBVG9qaTsdqNtmnSSYdKb3vKmBU6F4fRJSs8BAXkAOpiO9QA2_2fFyRuMmH0e6sDG2RBAaFI3Fq2hwdW0yNkZ0-A9pHADuWQ")'}}></div>
                <div className="w-28 h-28 flex-shrink-0 bg-center bg-no-repeat bg-cover rounded-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMTmN1szlmIRrxD1gGpEbtxjeLWOfv6M-qPPBuXeTAlc5yfwbcKMn2Dvc7yaE5e0tDgSb9B3xTyD7-lZGyIwSkHN4ywwBrYbjtN1o1fOS-pzufU2Gup9Fms4pkfp40qn_4EGWOCXKkRyqdOmwwikG9TcMYHwprvFj_vU9-7vL7aXpfgyRij4Dib_YwLCVGL-C9kWafUuKJXzH93979_psRig3psDif0IoB94aCL9O6hsrSMJh0mAUp3HrGhzDHq74sO27yB-pvlug")'}}></div>
                <button className="w-28 h-28 flex-shrink-0 bg-[#2a1622] rounded-lg flex flex-col items-center justify-center text-[#99334C]">
                    <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                    <span className="text-xs mt-1">Adicionar</span>
                </button>
            </div>
        </div>
      </main>

      <footer className="p-4 mt-auto">
        <button onClick={() => navigate('/login')} className="w-full bg-[#800020] text-white font-bold py-3.5 px-4 rounded-full text-base">
            Finalizar Checklist
        </button>
      </footer>
    </div>
  );
};

export default InternalChecklist;