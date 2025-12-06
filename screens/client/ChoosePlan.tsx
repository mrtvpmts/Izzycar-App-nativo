
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChoosePlan: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    // 1. Simular assinatura bem-sucedida no "backend" (localStorage)
    console.log("Assinando plano...");
    localStorage.setItem('isVip', 'true');
    
    // 2. Redirecionar para o menu VIP
    // Pequeno timeout para garantir que o estado seja salvo antes da navegação (apenas precaução em ambiente mock)
    setTimeout(() => {
        navigate('/vip-menu');
    }, 100);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] font-display overflow-x-hidden">
      <div className="flex items-center bg-[#121212] p-4 pb-2 justify-between">
        <div onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start cursor-pointer">
           <span className="material-symbols-outlined text-zinc-300">arrow_back_ios_new</span>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center flex items-center justify-center gap-1">
            <div className="h-6 w-6 bg-[#d41142] rounded flex items-center justify-center transform -skew-x-12">
                <span className="material-symbols-outlined text-white text-xs transform skew-x-12">tire_repair</span>
            </div>
            <span className="italic font-black text-lg">LC<span className="text-[#d41142]">PNEUS</span></span>
        </h2>
        <div className="flex w-12 items-center justify-end">
           <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-zinc-300 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
             <span className="material-symbols-outlined">help_outline</span>
           </button>
        </div>
      </div>

      <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">Escolha Seu Plano VIP</h1>

      <div className="grid grid-cols-1 gap-4 px-4 py-3">
        {/* Basic */}
        <div className="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-zinc-800 bg-[#1E1E1E] p-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-white text-base font-bold leading-tight">Básico</h2>
                <p className="flex items-baseline gap-1 text-white">
                    <span className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">R$ 19,90</span>
                    <span className="text-zinc-400 text-base font-bold leading-tight">/mês</span>
                </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Desconto em mão de obra
                </div>
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Check-up semestral
                </div>
            </div>
            <button 
                type="button"
                onClick={handleSubscribe}
                className="mt-2 flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 bg-[#800020] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#600018] transition-colors"
            >
                <span className="truncate">Assinar</span>
            </button>
        </div>

        {/* Diamond */}
        <div className="relative flex flex-1 flex-col gap-4 rounded-lg border border-solid border-[#800020] bg-[#1E1E1E] p-6 overflow-hidden">
            <div className="absolute top-0 right-0 text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-bl-lg bg-[#800020] px-3 py-1 text-center">Mais Popular</div>
            <div className="flex flex-col gap-1 mt-4">
                <h2 className="text-white text-base font-bold leading-tight">Diamond</h2>
                <p className="flex items-baseline gap-1 text-white">
                    <span className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">R$ 49,90</span>
                    <span className="text-zinc-400 text-base font-bold leading-tight">/mês</span>
                </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Todos os benefícios do Básico
                </div>
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Serviço leva e traz
                </div>
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Alinhamento gratuito
                </div>
            </div>
            <button 
                type="button"
                onClick={handleSubscribe}
                className="mt-2 flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 bg-[#800020] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#600018] transition-colors"
            >
                <span className="truncate">Assinar</span>
            </button>
        </div>

        {/* Platinum */}
        <div className="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-zinc-800 bg-[#1E1E1E] p-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-white text-base font-bold leading-tight">Platinum</h2>
                <p className="flex items-baseline gap-1 text-white">
                    <span className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">R$ 89,90</span>
                    <span className="text-zinc-400 text-base font-bold leading-tight">/mês</span>
                </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Todos os benefícios do Diamond
                </div>
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Revisão completa anual
                </div>
                <div className="text-[13px] font-normal leading-normal flex items-center gap-3 text-zinc-300">
                    <span className="material-symbols-outlined text-[#800020] text-xl">check_circle</span>
                    Atendimento prioritário
                </div>
            </div>
            <button 
                type="button"
                onClick={handleSubscribe}
                className="mt-2 flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 bg-[#800020] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#600018] transition-colors"
            >
                <span className="truncate">Assinar</span>
            </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 py-8 px-4">
        <button onClick={() => navigate('/vip-menu')} className="text-amber-500 font-bold text-sm underline cursor-pointer hover:text-amber-400 transition-colors">
            Já sou assinante? Acessar Menu V.I.P
        </button>
        <p className="text-zinc-400 text-sm font-normal leading-normal text-center underline cursor-pointer">Termos e Condições</p>
      </div>
    </div>
  );
};

export default ChoosePlan;
