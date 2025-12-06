import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#211119] group/design-root overflow-x-hidden text-white">
      <header className="flex justify-center items-center p-6">
        <img onClick={() => navigate(-1)} alt="Logomarca da Oficina" className="h-10 w-auto cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAn90FWbIPgOhcVLnz_K4ZQo9Py5N0kkiVHpaLg6keGVytUL4d4DHdbgYMQHcKUY3atCqYeWEkVDp08G9KbsBd-7mJmWbrS8eKgpfFfGIXioFaQCpYWzIsKOpu-u98-6BWHCafrPDnbxouRK1evuZ_-RY-tkCFGeVJphRs5UddGHHvye2mDPipbjUp41rs6LCxn820iLilRsrwTWRU8qQj683WfxiIUHYYCo_p5zvL6H0nbvo0EwYBtETn5ab76e19cH5H6J2I9zs" />
      </header>
      
      <main className="flex flex-1 flex-col gap-6 p-4">
        <div className="bg-[#2a1622] rounded-lg p-4">
          <div className="flex justify-between items-start pb-4 border-b border-b-[#472436]">
             <div>
                <p className="text-[#c893ad] text-sm">Ordem de Serviço</p>
                <p className="text-white text-2xl font-bold">#2024-0718A</p>
             </div>
             <div className="bg-[#800020] text-white text-xs font-bold py-1 px-3 rounded-full">
                EM ANDAMENTO
             </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 pt-4">
             <p className="text-[#c893ad] text-sm font-normal leading-normal">Cliente:</p>
             <p className="text-white text-sm font-medium leading-normal text-right">Mariana Costa</p>
             <p className="text-[#c893ad] text-sm font-normal leading-normal">Veículo:</p>
             <p className="text-white text-sm font-medium leading-normal text-right">Honda Civic 1.8</p>
             <p className="text-[#c893ad] text-sm font-normal leading-normal">Data de Entrada:</p>
             <p className="text-white text-sm font-medium leading-normal text-right">18 de Julho, 2024</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
           <h3 className="text-white text-lg font-bold px-2">Problemas Relatados</h3>
           <div className="bg-[#2a1622] rounded-lg p-4">
              <p className="text-[#c893ad] text-sm leading-relaxed">Cliente relatou barulho agudo ao frear e uma leve trepidação no volante em velocidades acima de 80km/h. Também mencionou que o motor parece estar "engasgando" ao dar a partida pela manhã.</p>
           </div>
        </div>

        <div className="flex flex-col gap-2">
           <h3 className="text-white text-lg font-bold px-2">Serviços Solicitados</h3>
           <div className="bg-[#2a1622] rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 text-white text-sm">
                 <li>Diagnóstico do sistema de freios</li>
                 <li>Verificação e balanceamento das rodas</li>
                 <li>Análise do sistema de ignição</li>
                 <li>Revisão geral de 50.000 km</li>
              </ul>
           </div>
        </div>

        <div className="flex flex-col gap-2">
           <h3 className="text-white text-lg font-bold px-2">Peças Utilizadas</h3>
           <div className="bg-[#2a1622] rounded-lg p-4">
              <p className="text-[#c893ad] text-sm italic">Nenhuma peça foi definida até o momento.</p>
           </div>
        </div>

        <div className="mt-auto pt-6 text-center">
           <button onClick={() => navigate('/order-status')} className="inline-flex items-center gap-2 text-[#800020] font-bold">
              Ver Acompanhamento da OS
              <span className="material-symbols-outlined">arrow_forward</span>
           </button>
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;