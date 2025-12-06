
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PickupDeliveryRequest: React.FC = () => {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const services = [
        {
            id: 'pickup',
            title: 'Buscar Veículo',
            description: 'Buscamos seu veículo no endereço indicado',
            icon: 'south',
            color: 'from-blue-600 to-blue-500'
        },
        {
            id: 'delivery',
            title: 'Entregar Veículo',
            description: 'Entregamos seu veículo após o serviço',
            icon: 'north',
            color: 'from-green-600 to-green-500'
        },
        {
            id: 'both',
            title: 'Buscar e Entregar',
            description: 'Serviço completo de busca e entrega',
            icon: 'sync_alt',
            color: 'from-[#800020] to-[#b00e36]'
        }
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white font-display">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
                <button onClick={() => navigate('/dashboard')} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center">Buscar e Entregar</h1>
                <div className="size-10 shrink-0"></div>
            </div>

            <main className="flex-1 p-4 pb-24 flex flex-col gap-6">
                <div>
                    <h2 className="text-[28px] font-bold leading-tight text-white">Como podemos ajudar?</h2>
                    <p className="text-[#A0A0A0] text-base mt-2">Selecione o tipo de serviço que você precisa.</p>
                </div>

                {/* Service Cards */}
                <div className="flex flex-col gap-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`relative bg-[#1E1E1E] rounded-xl p-5 cursor-pointer transition-all border-2 ${selectedService === service.id
                                    ? 'border-[#d41142] bg-[#d41142]/5'
                                    : 'border-[#333333] hover:border-[#d41142]/30'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg`}>
                                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg">{service.title}</h3>
                                    <p className="text-[#A0A0A0] text-sm mt-1">{service.description}</p>
                                </div>
                                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedService === service.id
                                        ? 'border-[#d41142] bg-[#d41142]'
                                        : 'border-[#555555]'
                                    }`}>
                                    {selectedService === service.id && (
                                        <span className="material-symbols-outlined text-white text-sm">check</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333]">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-[#d41142] text-2xl">info</span>
                        <div>
                            <h4 className="text-white font-bold text-sm mb-1">Informações Importantes</h4>
                            <ul className="text-[#A0A0A0] text-xs space-y-1">
                                <li>• Funcionário habilitado e identificado</li>
                                <li>• Seguro para transporte do veículo</li>
                                <li>• Rastreamento em tempo real</li>
                                <li>• Confirmação por SMS e WhatsApp</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
                <button
                    onClick={() => navigate('/pickup/select-vehicle')}
                    disabled={!selectedService}
                    className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${selectedService
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

export default PickupDeliveryRequest;
