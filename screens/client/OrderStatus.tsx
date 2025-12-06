
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';

const OrderStatus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display group/design-root overflow-x-hidden text-white bg-[#121212]">
      {/* Top App Bar */}
      <div className="flex items-center bg-[#221117] p-4 pb-2 justify-between sticky top-0 z-50 shadow-md">
        <div onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start cursor-pointer">
           <img className="h-8" alt="Logo da oficina" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKLl5dlnJ2Dk9otTEa5Tp2Q2V3SVJPN9IYsyJInuWB2mWtQxAOiqgjrtfEl430Gk6GSiIFu5PTQHJlY_4iSqN46PI88nKtwGS0GdvO2BylK8X_4ogYBYZHtCX5XA6XiemdXCH4u9lK7J4wDA2ev3VcTwBo7KeQXyjEH856AXr0FOjt-EGe02qLdT1gP9m-YyimKK18eUsM1JFyyKFFG2KeU_ikfzAd-NOGjLRSlN_9i6ryRlk_009-1NKe_RxzRS-tzTGUptp_ZVs" />
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Acompanhamento</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
             <span className="material-symbols-outlined text-white text-2xl">share</span>
          </button>
        </div>
      </div>

      {/* Main Content with Bottom Padding */}
      <div className="flex-1 pb-24">
          {/* Card */}
          <div className="p-4">
             <div onClick={() => navigate('/order-details')} className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px] cursor-pointer shadow-lg" style={{backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc")'}}>
                <div className="flex w-full items-end justify-between gap-4 p-4">
                    <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                        <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">OS #12345</p>
                        <p className="text-gray-300 text-base font-medium leading-normal">Honda Civic 2022</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); navigate('/quote'); }} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#bd0f49] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                       <span className="truncate">Ver Orçamento</span>
                    </button>
                </div>
             </div>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-3 p-4">
             <div className="flex gap-6 justify-between">
                <p className="text-white text-base font-medium leading-normal">Progresso Geral</p>
                <p className="text-white text-sm font-normal leading-normal">75%</p>
             </div>
             <div className="rounded-full bg-[#673244]">
                <div className="h-2 rounded-full bg-[#bd0f49]" style={{width: '75%'}}></div>
             </div>
             <p className="text-[#c992a4] text-sm font-normal leading-normal">Status atual: Serviço em Andamento</p>
          </div>

          {/* Timeline */}
          <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Histórico de Atualizações</h3>
          <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4 pb-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1 pt-3">
               <div className="flex items-center justify-center size-8 rounded-full bg-[#bd0f49]">
                  <span className="material-symbols-outlined text-white text-xl">calendar_month</span>
               </div>
               <div className="w-[2px] bg-[#bd0f49] h-full grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-6 pt-3">
               <p className="text-white text-base font-medium leading-normal">Agendado</p>
               <p className="text-[#c992a4] text-base font-normal leading-normal">10/08/2024, 09:00</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-1">
               <div className="w-[2px] bg-[#bd0f49] h-2"></div>
               <div className="flex items-center justify-center size-8 rounded-full bg-[#bd0f49]">
                  <span className="material-symbols-outlined text-white text-xl">vpn_key</span>
               </div>
               <div className="w-[2px] bg-[#bd0f49] h-full grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-6 py-3">
               <p className="text-white text-base font-medium leading-normal">Veículo Recebido</p>
               <p className="text-[#c992a4] text-base font-normal leading-normal">12/08/2024, 08:30</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-1">
               <div className="w-[2px] bg-[#bd0f49] h-2"></div>
               <div className="flex items-center justify-center size-8 rounded-full bg-[#bd0f49]">
                  <span className="material-symbols-outlined text-white text-xl">search</span>
               </div>
               <div className="w-[2px] bg-[#bd0f49] h-full grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-6 py-3">
               <p className="text-white text-base font-medium leading-normal">Em Diagnóstico</p>
               <p className="text-[#c992a4] text-base font-normal leading-normal">12/08/2024, 10:15</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-1">
               <div className="w-[2px] bg-[#bd0f49] h-2"></div>
               <div className="flex items-center justify-center size-8 rounded-full bg-[#bd0f49]">
                  <span className="material-symbols-outlined text-white text-xl">check_circle</span>
               </div>
               <div className="w-[2px] bg-[#bd0f49] h-full grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-6 py-3">
               <p className="text-white text-base font-medium leading-normal">Aguardando Aprovação</p>
               <p className="text-[#c992a4] text-base font-normal leading-normal">12/08/2024, 14:00</p>
               <div onClick={() => navigate('/quote')} className="mt-3 bg-white/5 p-4 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10">
                  <p className="text-white font-semibold">Orçamento e checklist enviados para aprovação.</p>
                  <p className="text-gray-300 text-sm mt-1">Por favor, verifique o link enviado por e-mail ou WhatsApp para aprovar.</p>
               </div>
            </div>

            {/* Step 5 (Current) */}
            <div className="flex flex-col items-center gap-1">
               <div className="w-[2px] bg-[#bd0f49] h-2"></div>
               <div className="flex items-center justify-center size-8 rounded-full bg-[#bd0f49] ring-4 ring-[#bd0f49]/30">
                  <span className="material-symbols-outlined text-white text-xl">build</span>
               </div>
               <div className="w-[2px] bg-[#673244] h-full grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-6 py-3">
               <p className="text-white text-base font-bold leading-normal text-[#bd0f49]">Serviço em Andamento</p>
               <p className="text-[#c992a4] text-base font-normal leading-normal">13/08/2024, 11:00</p>
            </div>

            {/* Step 6 (Future) */}
            <div className="flex flex-col items-center gap-1">
               <div className="w-[2px] bg-[#673244] h-2"></div>
               <div className="flex items-center justify-center size-8 rounded-full bg-[#673244]">
                  <span className="material-symbols-outlined text-[#c992a4] text-xl">flag</span>
               </div>
               <div className="w-[2px] bg-[#673244] h-full grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-6 py-3">
               <p className="text-[#c992a4] text-base font-medium leading-normal">Serviço Concluído</p>
            </div>

            {/* Step 7 (Future) */}
            <div className="flex flex-col items-center gap-1 pb-3">
               <div className="w-[2px] bg-[#673244] h-2"></div>
               <div className="flex items-center justify-center size-8 rounded-full bg-[#673244]">
                  <span className="material-symbols-outlined text-[#c992a4] text-xl">directions_car</span>
               </div>
            </div>
            <div className="flex flex-1 flex-col py-3">
               <p className="text-[#c992a4] text-base font-medium leading-normal">Pronto para Retirada</p>
            </div>
          </div>
      </div>

      <BottomMenu />
    </div>
  );
};

export default OrderStatus;
