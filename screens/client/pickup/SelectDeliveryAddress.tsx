
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectDeliveryAddress: React.FC = () => {
    const navigate = useNavigate();
    const [useSameAddress, setUseSameAddress] = useState(false);
    const [formData, setFormData] = useState({
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isFormValid = () => {
        return formData.cep && formData.street && formData.number && formData.neighborhood && formData.city;
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white font-display">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
                <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center">Endereço de Entrega</h1>
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
                    <p className="text-[#800020] text-xs font-bold">Coleta</p>
                </div>
                <div className="w-6 h-px bg-[#800020]"></div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
                    <p className="text-[#800020] text-xs font-bold">Entrega</p>
                </div>
                <div className="w-6 h-px bg-[#333333]"></div>
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#333333]"></div>
                    <p className="text-[#555555] text-xs font-bold">Data</p>
                </div>
            </div>

            <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-2">
                Onde entregar o veículo?
            </h2>

            <main className="flex-1 p-4 pb-24 flex flex-col gap-4">
                {/* Use Same Address Option */}
                <div
                    onClick={() => setUseSameAddress(!useSameAddress)}
                    className={`bg-[#1E1E1E] rounded-xl p-4 border-2 cursor-pointer transition-all ${useSameAddress ? 'border-[#d41142] bg-[#d41142]/5' : 'border-[#333333] hover:border-[#d41142]/30'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-all ${useSameAddress ? 'border-[#d41142] bg-[#d41142]' : 'border-[#555555]'
                            }`}>
                            {useSameAddress && (
                                <span className="material-symbols-outlined text-white text-sm">check</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-sm">Mesmo endereço de coleta</h3>
                            <p className="text-[#A0A0A0] text-xs mt-0.5">Entregar no mesmo local</p>
                        </div>
                    </div>
                </div>

                {/* Address Form */}
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label className="text-[#A0A0A0] text-xs font-bold uppercase mb-2 block">CEP</label>
                            <input
                                type="text"
                                placeholder="00000-000"
                                value={formData.cep}
                                onChange={(e) => handleInputChange('cep', e.target.value)}
                                disabled={useSameAddress}
                                className="w-full h-12 bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 text-white placeholder:text-[#555555] focus:border-[#d41142] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[#A0A0A0] text-xs font-bold uppercase mb-2 block">Rua</label>
                        <input
                            type="text"
                            placeholder="Nome da rua"
                            value={formData.street}
                            onChange={(e) => handleInputChange('street', e.target.value)}
                            disabled={useSameAddress}
                            className="w-full h-12 bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 text-white placeholder:text-[#555555] focus:border-[#d41142] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[#A0A0A0] text-xs font-bold uppercase mb-2 block">Número</label>
                            <input
                                type="text"
                                placeholder="123"
                                value={formData.number}
                                onChange={(e) => handleInputChange('number', e.target.value)}
                                disabled={useSameAddress}
                                className="w-full h-12 bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 text-white placeholder:text-[#555555] focus:border-[#d41142] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-[#A0A0A0] text-xs font-bold uppercase mb-2 block">Complemento</label>
                            <input
                                type="text"
                                placeholder="Apto, Bloco..."
                                value={formData.complement}
                                onChange={(e) => handleInputChange('complement', e.target.value)}
                                disabled={useSameAddress}
                                className="w-full h-12 bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 text-white placeholder:text-[#555555] focus:border-[#d41142] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[#A0A0A0] text-xs font-bold uppercase mb-2 block">Bairro</label>
                        <input
                            type="text"
                            placeholder="Nome do bairro"
                            value={formData.neighborhood}
                            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                            disabled={useSameAddress}
                            className="w-full h-12 bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 text-white placeholder:text-[#555555] focus:border-[#d41142] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="text-[#A0A0A0] text-xs font-bold uppercase mb-2 block">Cidade</label>
                        <input
                            type="text"
                            placeholder="Nome da cidade"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            disabled={useSameAddress}
                            className="w-full h-12 bg-[#1E1E1E] border border-[#333333] rounded-lg px-4 text-white placeholder:text-[#555555] focus:border-[#d41142] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>
            </main>

            <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
                <button
                    onClick={() => navigate('/pickup/employee')}
                    disabled={!useSameAddress && !isFormValid()}
                    className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${useSameAddress || isFormValid()
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

export default SelectDeliveryAddress;
