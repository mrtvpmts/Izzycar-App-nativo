import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesAvailable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#121212]">
      <header className="flex h-20 items-center justify-center px-4 sticky top-0 z-10 bg-[#121212]/80 backdrop-blur-sm">
        <img alt="Logomarca da Oficina" className="h-9 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAn90FWbIPgOhcVLnz_K4ZQo9Py5N0kkiVHpaLg6keGVytUL4d4DHdbgYMQHcKUY3atCqYeWEkVDp08G9KbsBd-7mJmWbrS8eKgpfFfGIXioFaQCpYWzIsKOpu-u98-6BWHCafrPDnbxouRK1evuZ_-RY-tkCFGeVJphRs5UddGHHvye2mDPipbjUp41rs6LCxn820iLilRsrwTWRU8qQj683WfxiIUHYYCo_p5zvL6H0nbvo0EwYBtETn5ab76e19cH5H6J2I9zs" />
      </header>

      <main className="flex flex-1 flex-col px-4 pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tighter mb-4 text-white">Serviços Disponíveis</h1>
        <div className="relative mb-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0]">search</span>
            <input className="w-full rounded-full border border-[#333333] bg-[#1E1E1E] py-3 pl-12 pr-4 text-white placeholder-[#A0A0A0] focus:border-[#800020] focus:ring-1 focus:ring-[#800020]" placeholder="Buscar por serviço..." type="text"/>
        </div>

        <div className="mb-6">
            <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4">
                <button className="flex-shrink-0 rounded-full bg-[#800020] px-4 py-2 text-sm font-semibold text-white">Todos</button>
                <button className="flex-shrink-0 rounded-full bg-[#1E1E1E] px-4 py-2 text-sm font-medium text-[#A0A0A0]">Revisão</button>
                <button className="flex-shrink-0 rounded-full bg-[#1E1E1E] px-4 py-2 text-sm font-medium text-[#A0A0A0]">Freios</button>
                <button className="flex-shrink-0 rounded-full bg-[#1E1E1E] px-4 py-2 text-sm font-medium text-[#A0A0A0]">Troca de Óleo</button>
            </div>
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex flex-col rounded-lg bg-[#1E1E1E] p-4">
                <div className="flex-1">
                    <h2 className="text-lg font-bold text-white">Revisão Completa</h2>
                    <p className="mt-1 text-sm text-[#A0A0A0]">Verificação de mais de 50 itens essenciais do seu veículo para garantir segurança e performance.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-base font-semibold text-white">R$ 350,00</p>
                    <button className="rounded-full bg-[#800020] px-5 py-2.5 text-sm font-bold text-white">Adicionar à OS</button>
                </div>
            </div>

            <div className="flex flex-col rounded-lg bg-[#1E1E1E] p-4">
                <div className="flex-1">
                    <h2 className="text-lg font-bold text-white">Troca de Pastilhas de Freio</h2>
                    <p className="mt-1 text-sm text-[#A0A0A0]">Substituição do jogo de pastilhas de freio dianteiras ou traseiras. Peças de alta qualidade.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-base font-semibold text-white">A partir de R$ 180,00</p>
                    <button className="rounded-full bg-[#800020] px-5 py-2.5 text-sm font-bold text-white">Adicionar à OS</button>
                </div>
            </div>

            <div className="flex flex-col rounded-lg bg-[#1E1E1E] p-4">
                <div className="flex-1">
                    <h2 className="text-lg font-bold text-white">Troca de Óleo e Filtro</h2>
                    <p className="mt-1 text-sm text-[#A0A0A0]">Troca do óleo do motor e do filtro de óleo, utilizando produtos recomendados pela montadora.</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-base font-semibold text-white">R$ 250,00</p>
                    <button className="rounded-full bg-[#800020] px-5 py-2.5 text-sm font-bold text-white">Adicionar à OS</button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesAvailable;