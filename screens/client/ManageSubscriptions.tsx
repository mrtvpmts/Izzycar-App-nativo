import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageSubscriptions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden font-display">
      <div className="flex items-center bg-[#121212] p-4 justify-between">
        <div onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start text-[#E0E0E0] cursor-pointer">
           <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
        </div>
        <div className="flex flex-1 justify-center">
            <img className="h-8 w-auto" data-alt="Logomarca do Cliente" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6ILx-9UvA3mSSVH2wCHHFZg93s4dhaMOWFf2DB2Y7OHq38t3VmbHlZ4yeubNxH-Nk276yyK7tlW2k-2kS1PmXQY0yp5NctzVcSabjBRkzjvqh66bG1biaaZH2KiDkAG9mYXoT4-4OXqI15TvOO6l3dhiLl5VbOK-a1wNSgBbZ9AGC_79b92PvzRJx8v1L5ITGG0z6trQWDbfU60sEJ2wElwE86pDYdKAkfsMgReIsQyQDnVl4C6Z3SD1yba1OrPSiooPvgQV7g98" />
        </div>
        <div className="size-12 shrink-0"></div>
      </div>

      <div className="px-4 pt-5 pb-2">
         <h2 className="text-[#E0E0E0] tracking-light text-[28px] font-bold leading-tight text-left">Seu Plano Atual</h2>
      </div>

      <div className="p-4 @container">
         <div className="flex flex-col items-stretch justify-start rounded-lg bg-[#1E1E1E] p-4">
            <div className="flex w-full flex-col items-stretch justify-center gap-3">
               <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                     <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                  </div>
                  <div>
                     <p className="text-[#800020] text-sm font-bold leading-normal tracking-wider">PLANO OURO</p>
                     <p className="text-[#E0E0E0] text-lg font-bold leading-tight tracking-[-0.015em]">R$ 49,90/mês</p>
                  </div>
               </div>
               <div className="border-t border-white/10 my-2"></div>
               <div className="flex flex-col gap-2">
                  <p className="text-[#E0E0E0] text-base font-bold leading-tight">Benefícios Inclusos:</p>
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">check_circle</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Trocas de óleo anuais</p>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">check_circle</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Desconto de 15% em peças</p>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">check_circle</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Check-up completo semestral</p>
                  </div>
               </div>
               <div className="border-t border-white/10 my-2"></div>
               <p className="text-[#A0A0A0] text-sm font-normal leading-normal">Renova em: 24 de Dezembro, 2024</p>
            </div>
         </div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row">
         <button onClick={() => navigate('/choose-plan')} className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#800020] text-white text-base font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Mudar Plano</span>
         </button>
         <button className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#1E1E1E] text-[#E0E0E0] text-base font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Gerenciar Pagamento</span>
         </button>
      </div>

      <div className="px-4 pt-8 pb-2">
         <h2 className="text-[#E0E0E0] tracking-light text-[28px] font-bold leading-tight text-left">Conheça outros planos</h2>
      </div>

      <div className="p-4 @container">
         <div className="flex flex-col items-stretch justify-start rounded-lg bg-[#1E1E1E] p-4">
            <div className="flex w-full flex-col items-stretch justify-center gap-3">
               <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                     <span className="material-symbols-outlined text-2xl">diamond</span>
                  </div>
                  <div>
                     <p className="text-[#800020] text-sm font-bold leading-normal tracking-wider">PLANO DIAMOND</p>
                     <p className="text-[#E0E0E0] text-lg font-bold leading-tight tracking-[-0.015em]">R$ 79,90/mês</p>
                  </div>
               </div>
               <div className="border-t border-white/10 my-2"></div>
               <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">add</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Todos os benefícios do Ouro</p>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">add</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Serviço de guincho 24h</p>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">add</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Carro reserva por 3 dias</p>
                  </div>
               </div>
               <button className="mt-2 flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-5 bg-[#800020]/20 text-[#800020] text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Saiba Mais</span>
               </button>
            </div>
         </div>
      </div>

      <div className="p-4 pt-0 @container">
         <div className="flex flex-col items-stretch justify-start rounded-lg bg-[#1E1E1E] p-4">
            <div className="flex w-full flex-col items-stretch justify-center gap-3">
               <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                     <span className="material-symbols-outlined text-2xl">military_tech</span>
                  </div>
                  <div>
                     <p className="text-[#800020] text-sm font-bold leading-normal tracking-wider">PLANO PLATINUM</p>
                     <p className="text-[#E0E0E0] text-lg font-bold leading-tight tracking-[-0.015em]">R$ 129,90/mês</p>
                  </div>
               </div>
               <div className="border-t border-white/10 my-2"></div>
               <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">add</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Todos os benefícios do Diamond</p>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">add</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Revisão completa anual</p>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="material-symbols-outlined text-[#800020] text-lg mt-0.5">add</span>
                     <p className="text-[#A0A0A0] text-base font-normal leading-normal flex-1">Leva e traz do veículo</p>
                  </div>
               </div>
               <button className="mt-2 flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-5 bg-[#800020]/20 text-[#800020] text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Saiba Mais</span>
               </button>
            </div>
         </div>
      </div>

      <div className="flex justify-center p-4 pt-8 pb-10">
         <a className="text-[#A0A0A0] text-center text-sm font-normal underline" href="#">Termos e Condições</a>
      </div>
    </div>
  );
};

export default ManageSubscriptions;