
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../../components/BottomMenu';

interface Address {
    id: number;
    label: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
}

const Addresses: React.FC = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            label: 'Casa',
            street: 'Rua das Flores',
            number: '123',
            complement: 'Apto 45',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            isDefault: true
        },
        {
            id: 2,
            label: 'Trabalho',
            street: 'Av. Paulista',
            number: '1000',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            isDefault: false
        }
    ]);

    const handleAddAddress = () => {
        // Navegar para formulário de adicionar endereço
        alert('Funcionalidade de adicionar endereço em desenvolvimento');
    };

    const handleEditAddress = (id: number) => {
        alert(`Editar endereço ${id}`);
    };

    const handleDeleteAddress = (id: number) => {
        if (confirm('Deseja realmente excluir este endereço?')) {
            setAddresses(addresses.filter(addr => addr.id !== id));
        }
    };

    const handleSetDefault = (id: number) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] text-white overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#121212]/95 backdrop-blur-sm border-b border-[#333333]">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Meus Endereços</h1>
                <button onClick={handleAddAddress} className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            <main className="flex-1 p-4 pb-24">
                <div className="flex flex-col gap-4">
                    {addresses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <span className="material-symbols-outlined text-6xl text-[#555555]">location_off</span>
                            <p className="text-[#A0A0A0] text-center">Nenhum endereço cadastrado</p>
                            <button
                                onClick={handleAddAddress}
                                className="h-12 px-6 rounded-xl bg-[#800020] text-white font-bold hover:bg-[#b00e36] transition-colors"
                            >
                                Adicionar Endereço
                            </button>
                        </div>
                    ) : (
                        addresses.map((address) => (
                            <div key={address.id} className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333]">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#800020]">location_on</span>
                                        <h3 className="font-bold text-white">{address.label}</h3>
                                        {address.isDefault && (
                                            <span className="text-xs bg-[#800020]/20 text-[#800020] px-2 py-0.5 rounded-full border border-[#800020]/30">
                                                Padrão
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditAddress(address.id)}
                                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAddress(address.id)}
                                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-red-500"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="text-sm text-[#A0A0A0] space-y-1">
                                    <p>{address.street}, {address.number}</p>
                                    {address.complement && <p>{address.complement}</p>}
                                    <p>{address.neighborhood}</p>
                                    <p>{address.city} - {address.state}</p>
                                    <p>CEP: {address.zipCode}</p>
                                </div>

                                {!address.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(address.id)}
                                        className="mt-3 text-sm text-[#800020] font-bold hover:text-[#b00e36] transition-colors"
                                    >
                                        Definir como padrão
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>

            <BottomMenu />
        </div>
    );
};

export default Addresses;
