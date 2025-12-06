
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestDetails: React.FC = () => {
  const navigate = useNavigate();
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const serviceTypes = [
    { id: 'review', label: 'Revisão', icon: 'auto_stories' },
    { id: 'oil', label: 'Troca de Óleo', icon: 'oil_barrel' },
    { id: 'repair', label: 'Reparo Mecânico', icon: 'build' },
    { id: 'brakes', label: 'Freios', icon: 'warning' },
    { id: 'tires', label: 'Pneus/Alinhamento', icon: 'tire_repair' },
    { id: 'other', label: 'Outro', icon: 'more_horiz' },
  ];

  const handleSubmit = () => {
    // Logic to submit request would go here
    navigate('/order-status'); // Navigate to status or a success screen
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Detalhes do Serviço</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      <main className="flex-1 p-4 pb-24 flex flex-col gap-6">
        {/* Problem Description */}
        <div className="flex flex-col gap-2">
            <label className="text-[#E0E0E0] text-lg font-bold">O que está acontecendo?</label>
            <p className="text-[#A0A0A0] text-sm mb-2">Descreva o problema ou o serviço que você deseja realizar.</p>
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[150px] rounded-xl bg-[#1E1E1E] border border-[#333333] p-4 text-white placeholder-[#555555] focus:border-[#800020] focus:ring-1 focus:ring-[#800020] focus:outline-none resize-none"
                placeholder="Ex: O carro está fazendo um barulho estranho ao frear..."
            />
        </div>

        {/* Optional Service Type */}
        <div className="flex flex-col gap-3">
            <label className="text-[#E0E0E0] text-lg font-bold">Tipo de serviço (Opcional)</label>
            <div className="grid grid-cols-2 gap-3">
                {serviceTypes.map((service) => (
                    <div 
                        key={service.id}
                        onClick={() => setSelectedServiceType(selectedServiceType === service.id ? null : service.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedServiceType === service.id ? 'bg-[#800020]/20 border-[#800020]' : 'bg-[#1E1E1E] border-[#333333] hover:border-[#800020]/50'}`}
                    >
                        <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${selectedServiceType === service.id ? 'bg-[#800020] text-white' : 'bg-[#333333] text-[#A0A0A0]'}`}>
                            <span className="material-symbols-outlined">{service.icon}</span>
                        </div>
                        <span className={`text-sm font-medium ${selectedServiceType === service.id ? 'text-white' : 'text-[#E0E0E0]'}`}>{service.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </main>

      <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
        <button 
            onClick={handleSubmit}
            className="w-full h-14 rounded-xl bg-[#800020] text-white font-bold text-base flex items-center justify-center shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-colors"
        >
            Enviar Solicitação
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;
