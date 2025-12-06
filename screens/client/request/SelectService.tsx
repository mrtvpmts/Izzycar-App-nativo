import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectService: React.FC = () => {
  const navigate = useNavigate();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [description, setDescription] = useState('');

  // Mock data provided by the shop's system
  const services = [
    { id: 'oil', label: 'Troca de Óleo e Filtro', icon: 'oil_barrel', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'tires', label: 'Alinhamento e Balanceamento', icon: 'tire_repair', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'brakes', label: 'Sistema de Freios', icon: 'warning', color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'review', label: 'Revisão Completa', icon: 'auto_stories', color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'ac', label: 'Ar Condicionado', icon: 'airwave', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 'electric', label: 'Elétrica e Bateria', icon: 'electrical_services', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  const filteredServices = services.filter(service => 
    service.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="h-10 flex items-center justify-center">
            <img alt="Logomarca do Cliente" className="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsiRbUmhueXVuex4B9iRhXip81KPtGc2db9kEYFOSBpSNMjPoLnVQIRTqJ_DNMXQkAHVSFacFBmkQmk2YUKFZsTcGXmeol4QA_9Y1CclWC-4taT7_3IHgnMhe0QCh_zS4GheE9UZhEMeseUaFS3gcjyWnKMlGGYQP04EMj6kPvdqd-U9o8NGFIActwtcwFQK3OAvguEtBMYDn6q8rK-ANqVcBPLVhTQ9AudnI0O6FtXO2-3-YrPKCtLK21zdNGqwqVn0xLTT73yCM" />
        </div>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Stepper */}
      <div className="flex w-full flex-row items-center justify-center gap-3 py-5 px-4">
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

      <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-2">Qual serviço você precisa?</h1>

      {/* Search */}
      <div className="px-4 py-2 sticky top-[68px] bg-[#121212] z-40">
        <div className="flex w-full flex-1 items-stretch rounded-xl h-14 bg-[#1E1E1E] border border-slate-700">
            <div className="text-slate-400 flex items-center justify-center pl-4 pr-2">
                <span className="material-symbols-outlined">search</span>
            </div>
            <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex w-full min-w-0 flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-400 text-base font-normal leading-normal" 
                placeholder="Buscar serviço" 
            />
        </div>
      </div>

      <main className="flex-1 p-4 pb-24 flex flex-col gap-6">
        {/* Service List */}
        <div className="flex flex-col gap-3">
            {filteredServices.map((service) => (
                <div 
                    key={service.id} 
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`flex items-center gap-4 bg-[#1E1E1E] p-3 rounded-xl border transition-all cursor-pointer ${selectedServiceId === service.id ? 'border-[#800020] bg-[#2a1622]' : 'border-transparent hover:border-[#800020]/50'}`}
                >
                    <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${service.bg} ${service.color}`}>
                        <span className="material-symbols-outlined">{service.icon}</span>
                    </div>
                    <p className={`text-white text-base leading-normal flex-1 truncate ${selectedServiceId === service.id ? 'font-bold' : 'font-medium'}`}>{service.label}</p>
                    <div className={`shrink-0 ${selectedServiceId === service.id ? 'text-[#800020]' : 'text-slate-500'}`}>
                        <span className="material-symbols-outlined">{selectedServiceId === service.id ? 'check_circle' : 'chevron_right'}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Description Field (Below the list as requested) */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#333333]">
            <label className="text-white text-lg font-bold">Observações / Detalhes</label>
            <p className="text-[#A0A0A0] text-sm mb-2">Descreva brevemente o problema ou adicione detalhes importantes.</p>
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[120px] rounded-xl bg-[#1E1E1E] border border-[#333333] p-4 text-white placeholder-[#555555] focus:border-[#800020] focus:ring-1 focus:ring-[#800020] focus:outline-none resize-none"
                placeholder="Ex: Barulho na roda direita ao frear..."
            />
        </div>
      </main>

      <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
        <button 
            onClick={() => navigate('/request/consultant')}
            disabled={!selectedServiceId}
            className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${selectedServiceId ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90' : 'bg-[#333333] text-[#A0A0A0] cursor-not-allowed'}`}
        >
            Próximo
        </button>
      </div>
    </div>
  );
};

export default SelectService;