import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-10">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="h-10 flex items-center justify-center">
            <img alt="Logomarca do Cliente" className="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsiRbUmhueXVuex4B9iRhXip81KPtGc2db9kEYFOSBpSNMjPoLnVQIRTqJ_DNMXQkAHVSFacFBmkQmk2YUKFZsTcGXmeol4QA_9Y1CclWC-4taT7_3IHgnMhe0QCh_zS4GheE9UZhEMeseUaFS3gcjyWnKMlGGYQP04EMj6kPvdqd-U9o8NGFIActwtcwFQK3OAvguEtBMYDn6q8rK-ANqVcBPLVhTQ9AudnI0O6FtXO2-3-YrPKCtLK21zdNGqwqVn0xLTT73yCM" />
        </div>
        <div className="size-10 shrink-0"></div>
      </div>

      <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
        <div className="flex flex-col items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
            <p className="text-[#800020] text-xs font-bold">Serviço</p>
        </div>
        <div className="w-6 h-px bg-slate-700"></div>
        <div className="flex flex-col items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
            <p className="text-slate-500 text-xs font-medium">Consultor</p>
        </div>
        <div className="w-6 h-px bg-slate-700"></div>
        <div className="flex flex-col items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
            <p className="text-slate-500 text-xs font-medium">Mecânico</p>
        </div>
        <div className="w-6 h-px bg-slate-700"></div>
        <div className="flex flex-col items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
            <p className="text-slate-500 text-xs font-medium">Data/Hora</p>
        </div>
      </div>

      <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">Qual serviço você precisa?</h1>

      <div className="px-4 py-3 sticky top-[68px] bg-[#121212] z-10">
        <label className="flex flex-col min-w-40 h-14 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-slate-400 flex border-slate-700 border bg-[#1E1E1E] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span className="material-symbols-outlined">search</span>
            </div>
            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#800020]/50 border-slate-700 border bg-[#1E1E1E] h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Buscar serviço" value="" readOnly />
            </div>
        </label>
      </div>

      <div className="flex flex-col gap-3 px-4 py-3">
        {[
            { icon: "oil_barrel", text: "Troca de Óleo e Filtro" },
            { icon: "tire_repair", text: "Alinhamento e Balanceamento" },
            { icon: "warning", text: "Sistema de Freios", highlight: true },
            { icon: "auto_stories", text: "Revisão Completa" },
            { icon: "airwave", text: "Ar Condicionado" },
            { icon: "electrical_services", text: "Elétrica e Bateria" }
        ].map((service, index) => (
            <div key={index} className={`flex items-center gap-4 bg-[#1E1E1E] p-3 rounded-xl border ${service.highlight ? 'border-[#800020]/50' : 'border-transparent'} hover:border-[#800020]/50 transition-all cursor-pointer`}>
                <div className="text-[#800020] flex items-center justify-center rounded-lg bg-[#800020]/20 shrink-0 size-12">
                    <span className="material-symbols-outlined">{service.icon}</span>
                </div>
                <p className={`text-white text-base ${service.highlight ? 'font-bold' : 'font-medium'} leading-normal flex-1 truncate`}>{service.text}</p>
                <div className={`shrink-0 ${service.highlight ? 'text-[#800020]' : 'text-slate-500'}`}>
                    <span className="material-symbols-outlined">{service.highlight ? 'check_circle' : 'chevron_right'}</span>
                </div>
            </div>
        ))}
      </div>
      
      <div className="flex-grow"></div>
      <div className="bg-[#121212] p-4 pt-2 sticky bottom-0 border-t border-slate-800/50">
        <button className="w-full h-14 rounded-xl bg-[#800020] text-white font-bold text-base flex items-center justify-center shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-colors">
            Próximo
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;